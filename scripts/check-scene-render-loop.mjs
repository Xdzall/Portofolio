import assert from "node:assert/strict";
import test from "node:test";
import { createSceneRenderLoop } from "../src/components/3d/createSceneRenderLoop.js";

function createHarness({ maxFps = 30, displayHz = 60 } = {}) {
  let time = 0;
  let nextFrameId = 0;
  let renders = 0;
  let paused = true;
  let visible = true;
  let remainingChanges = 0;
  const pendingFrames = new Map();
  const modes = [];
  const loop = createSceneRenderLoop({
    maxFps,
    isPaused: () => paused,
    isVisible: () => visible,
    onMode: (mode) => modes.push(mode),
    render: () => renders++,
    update: () => {
      if (!remainingChanges) return false;
      remainingChanges--;
      // OrbitControls emits a change while damping updates its camera.
      loop.invalidate();
      return true;
    },
    requestFrame: (callback) => {
      const id = ++nextFrameId;
      pendingFrames.set(id, callback);
      return id;
    },
    cancelFrame: (id) => pendingFrames.delete(id),
  });

  return {
    loop,
    get renders() {
      return renders;
    },
    get queued() {
      return pendingFrames.size;
    },
    get mode() {
      return modes.at(-1);
    },
    pump(milliseconds) {
      const ticks = Math.round(milliseconds / (1000 / displayHz));
      for (let tick = 0; tick < ticks; tick++) {
        time += 1000 / displayHz;
        const callbacks = [...pendingFrames.values()];
        pendingFrames.clear();
        callbacks.forEach((callback) => callback(time));
      }
    },
    pause(value) {
      paused = value;
      loop.invalidate();
    },
    show(value) {
      visible = value;
      loop.visibilityChanged();
    },
    damp(changes) {
      remainingChanges = changes;
      loop.invalidate();
    },
  };
}

test("a paused scene draws once when ready and then stops scheduling", () => {
  const scene = createHarness();
  scene.pump(1000);
  assert.equal(scene.renders, 0);
  scene.loop.setReady();
  scene.pump(1000);
  assert.equal(scene.renders, 1);
  assert.equal(scene.queued, 0);
  assert.equal(scene.mode, "idle");
  scene.pump(1000);
  assert.equal(scene.renders, 1);
  scene.loop.dispose();
});

test("changing a paused scene's theme invalidates exactly one additional frame", () => {
  const scene = createHarness();
  scene.loop.setReady();
  scene.pump(1000);
  const before = scene.renders;
  scene.loop.invalidate();
  scene.pump(1000);
  assert.equal(scene.renders - before, 1);
  assert.equal(scene.queued, 0);
  assert.equal(scene.mode, "idle");
  scene.loop.dispose();
});

for (const displayHz of [60, 120]) {
  test(`mobile and desktop respect 30/60 fps caps on a ${displayHz} Hz display`, () => {
    for (const maxFps of [30, 60]) {
      const scene = createHarness({ maxFps, displayHz });
      scene.pause(false);
      scene.loop.setReady();
      scene.pump(1000);
      assert.equal(scene.renders, maxFps);
      assert.equal(scene.mode, "running");
      scene.loop.dispose();
    }
  });
}

test("an offscreen scene cancels pending frames and resumes when visible", () => {
  const scene = createHarness();
  scene.pause(false);
  scene.loop.setReady();
  scene.pump(1000);
  scene.show(false);
  const before = scene.renders;
  scene.pump(1000);
  assert.equal(scene.renders, before);
  assert.equal(scene.queued, 0);
  assert.equal(scene.mode, "hidden");
  scene.show(true);
  scene.pump(1000);
  assert(scene.renders > before);
  assert.equal(scene.mode, "running");
  scene.loop.dispose();
});

test("damping redraws camera changes and becomes idle when motion settles", () => {
  const scene = createHarness();
  scene.loop.setReady();
  scene.pump(1000);
  const before = scene.renders;
  scene.damp(3);
  scene.pump(1000);
  assert.equal(scene.renders - before, 3);
  assert.equal(scene.queued, 0);
  assert.equal(scene.mode, "idle");
  scene.pump(1000);
  assert.equal(scene.renders - before, 3);
  scene.loop.dispose();
});

test("cleanup cancels queued frames and ignores later invalidations", () => {
  const scene = createHarness();
  scene.pause(false);
  scene.loop.setReady();
  scene.pump(1000);
  assert(scene.queued > 0);
  scene.loop.dispose();
  const before = scene.renders;
  scene.loop.invalidate();
  scene.loop.visibilityChanged();
  scene.pump(1000);
  assert.equal(scene.renders, before);
  assert.equal(scene.queued, 0);
  assert.equal(scene.mode, "stopped");
});
