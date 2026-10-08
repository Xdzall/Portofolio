import * as THREE from "three";

// Coordinates refer to the existing Perseus mesh after its height is normalized
// to six units. Only this small front pelvis region is relaxed into a smooth
// stone surface; topology, silhouette elsewhere, and drapery are retained.
const CENTER = [-0.15, 1, 0.32];
const RADIUS = [0.17, 0.24, 0.2];

function regionWeight(x, y, z) {
  const radius = Math.hypot(
    (x - CENTER[0]) / RADIUS[0],
    (y - CENTER[1]) / RADIUS[1],
    (z - CENTER[2]) / RADIUS[2],
  );
  const blend = THREE.MathUtils.clamp((1 - radius) / 0.25, 0, 1);
  return blend * blend * (3 - 2 * blend);
}

function relaxMesh(mesh) {
  const geometry = mesh.geometry;
  const attribute = geometry.getAttribute("position");
  const index = geometry.index;
  if (!attribute || !index) return 0;

  const point = new THREE.Vector3();
  const welds = new Map();
  const vertexWeld = new Uint32Array(attribute.count);
  const points = [],
    weights = [],
    active = [];

  for (let vertex = 0; vertex < attribute.count; vertex++) {
    point.fromBufferAttribute(attribute, vertex).applyMatrix4(mesh.matrixWorld);
    // Match duplicated UV seam vertices so the modified surface stays closed.
    const key = `${Math.round(point.x * 1e6)},${Math.round(point.y * 1e6)},${Math.round(point.z * 1e6)}`;
    let weld = welds.get(key);
    if (weld === undefined) {
      weld = weights.length;
      welds.set(key, weld);
      points.push(point.x, point.y, point.z);
      const weight = regionWeight(point.x, point.y, point.z);
      weights.push(weight);
      if (weight > 0) active.push(weld);
    }
    vertexWeld[vertex] = weld;
  }
  if (!active.length) return 0;

  const neighbors = new Map(active.map((weld) => [weld, new Set()]));
  for (let face = 0; face < index.count; face += 3) {
    const a = vertexWeld[index.getX(face)];
    const b = vertexWeld[index.getX(face + 1)];
    const c = vertexWeld[index.getX(face + 2)];
    neighbors.get(a)?.add(b).add(c);
    neighbors.get(b)?.add(a).add(c);
    neighbors.get(c)?.add(a).add(b);
  }
  const adjacent = active.map((weld) => [...neighbors.get(weld)]);
  const current = Float64Array.from(points);
  const next = new Float64Array(active.length * 3);

  // The fixed surrounding vertices anchor a continuous patch. Repeated local
  // relaxation retracts the protrusion rather than hiding it from one camera.
  for (let iteration = 0; iteration < 240; iteration++) {
    active.forEach((weld, entry) => {
      const offset = weld * 3;
      const blend = 0.65 * weights[weld];
      for (let axis = 0; axis < 3; axis++) {
        let sum = 0;
        adjacent[entry].forEach((neighbor) => {
          sum += current[neighbor * 3 + axis];
        });
        const average = sum / adjacent[entry].length;
        next[entry * 3 + axis] =
          current[offset + axis] + blend * (average - current[offset + axis]);
      }
    });
    active.forEach((weld, entry) => {
      current.set(next.subarray(entry * 3, entry * 3 + 3), weld * 3);
    });
  }

  const inverse = mesh.matrixWorld.clone().invert();
  const originalNormals = geometry.getAttribute("normal")?.clone();
  let modified = 0;
  for (let vertex = 0; vertex < attribute.count; vertex++) {
    const weld = vertexWeld[vertex];
    if (!weights[weld]) continue;
    point.fromArray(current, weld * 3).applyMatrix4(inverse);
    attribute.setXYZ(vertex, point.x, point.y, point.z);
    modified++;
  }
  attribute.needsUpdate = true;
  geometry.computeVertexNormals();

  const normal = geometry.getAttribute("normal");
  const sharedNormals = new Map(
    active.map((weld) => [weld, new THREE.Vector3()]),
  );
  for (let vertex = 0; vertex < attribute.count; vertex++) {
    const shared = sharedNormals.get(vertexWeld[vertex]);
    if (shared) shared.add(point.fromBufferAttribute(normal, vertex));
  }
  sharedNormals.forEach((shared) => shared.normalize());
  for (let vertex = 0; vertex < attribute.count; vertex++) {
    const shared = sharedNormals.get(vertexWeld[vertex]);
    if (shared) {
      normal.setXYZ(vertex, shared.x, shared.y, shared.z);
    } else if (originalNormals) {
      normal.setXYZ(
        vertex,
        originalNormals.getX(vertex),
        originalNormals.getY(vertex),
        originalNormals.getZ(vertex),
      );
    }
  }
  normal.needsUpdate = true;
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return modified;
}

export function smoothSculpturePelvis(sculpture) {
  sculpture.updateMatrixWorld(true);
  let modified = 0;
  sculpture.traverse((child) => {
    if (child.isMesh) modified += relaxMesh(child);
  });
  return modified;
}
