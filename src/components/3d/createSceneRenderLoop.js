export function createSceneRenderLoop({
  update,
  render,
  isPaused,
  isVisible,
  onMode,
  maxFps,
  requestFrame = requestAnimationFrame,
  cancelFrame = cancelAnimationFrame,
}) {
  let frame = null,
    ready = false,
    disposed = false,
    dirty = true,
    updating = false,
    lastTick = null,
    lastRender = null,
    mode;
  const interval = 1000 / maxFps;
  function reportMode(next) {
    if (next === mode) return;
    mode = next;
    onMode(next);
  }
  function canRender() {
    return !disposed && ready && isVisible();
  }
  function stop() {
    if (frame !== null) cancelFrame(frame);
    frame = null;
    lastTick = null;
    lastRender = null;
  }
  function schedule() {
    if (frame === null && canRender()) frame = requestFrame(tick);
  }
  function tick(timestamp) {
    frame = null;
    if (!canRender()) {
      stop();
      reportMode(ready ? "hidden" : "loading");
      return;
    }
    if (lastRender !== null && timestamp - lastRender < interval - 0.1) {
      schedule();
      return;
    }
    const delta =
      lastTick === null ? 0 : Math.min((timestamp - lastTick) / 1000, 0.05);
    lastTick = timestamp;
    const paused = isPaused();
    const wasDirty = dirty;
    dirty = false;
    updating = true;
    const changed = update(delta, paused);
    updating = false;
    if (disposed) return;
    if (wasDirty || dirty || changed || !paused) {
      render();
      lastRender = timestamp;
    }
    if (disposed) return;
    dirty = false;
    if (!paused || changed) {
      reportMode(paused ? "damping" : "running");
      schedule();
    } else {
      reportMode("idle");
    }
  }
  function invalidate() {
    if (disposed) return;
    dirty = true;
    if (!ready) {
      reportMode("loading");
    } else if (!isVisible()) {
      stop();
      reportMode("hidden");
    } else if (!updating) {
      schedule();
    }
  }
  reportMode("loading");
  return {
    invalidate,
    setReady() {
      ready = true;
      invalidate();
    },
    visibilityChanged() {
      stop();
      invalidate();
    },
    dispose() {
      disposed = true;
      stop();
      reportMode("stopped");
    },
  };
}
