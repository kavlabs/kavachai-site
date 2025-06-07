// js/script.js

class BeforeAfter {
  /**
   * @param {{id: string}} enteryObject - object with CSS selector id
   */
  constructor(enteryObject) {
    const beforeAfterContainer = document.querySelector(enteryObject.id);
    if (!beforeAfterContainer) return;

    const before     = beforeAfterContainer.querySelector('.bal-before');
    const beforeInset= beforeAfterContainer.querySelector('.bal-before-inset');
    const handle     = beforeAfterContainer.querySelector('.bal-handle');
    const afterText  = beforeAfterContainer.querySelector('.bal-afterPosition');
    let dragging     = false;

    // Initialize inset width to full container
    const updateInset = () => {
      const w = beforeAfterContainer.getBoundingClientRect().width;
      if (beforeInset) beforeInset.style.width = `${w}px`;
    };
    updateInset();
    window.addEventListener('resize', updateInset);

    // Start split in middle
    if (before) before.style.width = '50%';
    if (handle) handle.style.left = '50%';

    // Helper to move split
    const moveSplit = clientX => {
      const rect = beforeAfterContainer.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(10, Math.min(x, rect.width - 10));
      const pct = (x / rect.width) * 100;
      if (before) before.style.width = `${pct}%`;
      if (handle) handle.style.left = `${pct}%`;
      if (afterText) afterText.style.zIndex = '1';
    };

    // Touch events
    beforeAfterContainer.addEventListener('touchstart', e => {
      e.preventDefault();
      dragging = true;
    }, { passive: false });
    beforeAfterContainer.addEventListener('touchmove', e => {
      if (!dragging) return;
      e.preventDefault();
      moveSplit(e.touches[0].clientX);
    }, { passive: false });
    beforeAfterContainer.addEventListener('touchend', () => {
      dragging = false;
    });

    // Mouse events: auto-follow on hover/move, no click required
    beforeAfterContainer.addEventListener('mousemove', e => {
      moveSplit(e.clientX);
    });
  }
}

// Initialize all before/after sliders on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.bal-container').forEach(container => {
    if (container.id) {
      new BeforeAfter({ id: `#${container.id}` });
    }
  });
});
