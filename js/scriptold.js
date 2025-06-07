class BeforeAfter {
    constructor(enteryObject) {

        const beforeAfterContainer = document.querySelector(enteryObject.id);
        const before = beforeAfterContainer.querySelector('.bal-before');
        const beforeText = beforeAfterContainer.querySelector('.bal-beforePosition');
        const afterText = beforeAfterContainer.querySelector('.bal-afterPosition');
        const handle = beforeAfterContainer.querySelector('.bal-handle');
        var widthChange = 0;

        beforeAfterContainer.querySelector('.bal-before-inset').setAttribute("style", "width: " + beforeAfterContainer.offsetWidth + "px;")
        window.onresize = function () {
            beforeAfterContainer.querySelector('.bal-before-inset').setAttribute("style", "width: " + beforeAfterContainer.offsetWidth + "px;")
        }
        before.setAttribute('style', "width: 50%;");
        handle.setAttribute('style', "left: 50%;");

        //touch screen event listener
        beforeAfterContainer.addEventListener("touchstart", (e) => {

            beforeAfterContainer.addEventListener("touchmove", (e2) => {
                let containerWidth = beforeAfterContainer.offsetWidth;
                let currentPoint = e2.changedTouches[0].clientX;

                let startOfDiv = beforeAfterContainer.offsetLeft;

                let modifiedCurrentPoint = currentPoint - startOfDiv;

                if (modifiedCurrentPoint > 10 && modifiedCurrentPoint < beforeAfterContainer.offsetWidth - 10) {
                    let newWidth = modifiedCurrentPoint * 100 / containerWidth;

                    before.setAttribute('style', "width:" + newWidth + "%;");
                    afterText.setAttribute('style', "z-index: 1;");
                    handle.setAttribute('style', "left:" + newWidth + "%;");
                }
            });
        });

        //mouse move event listener
        beforeAfterContainer.addEventListener('mousemove', (e) => {
            let containerWidth = beforeAfterContainer.offsetWidth;
            widthChange = e.offsetX;
            let newWidth = widthChange * 100 / containerWidth;

            if (e.offsetX > 10 && e.offsetX < beforeAfterContainer.offsetWidth - 10) {
                before.setAttribute('style', "width:" + newWidth + "%;");
                afterText.setAttribute('style', "z-index:" + "1;");
                handle.setAttribute('style', "left:" + newWidth + "%;");
            }
        })

    }
}

// js/script.js

class BeforeAfter {
  constructor(container) {
    this.container   = container;
    this.before      = container.querySelector('.bal-before');
    this.beforeInset = container.querySelector('.bal-before-inset');
    this.handle      = container.querySelector('.bal-handle');
    this.afterText   = container.querySelector('.bal-afterPosition');

    // Set up initial inset and handle position
    this.updateInsetWidth();
    window.addEventListener('resize', () => this.updateInsetWidth());
    this.before.style.width = '50%';
    this.handle.style.left  = '50%';

    this.dragging = false;

    // Bind start events on the handle
    this.handle.addEventListener('mousedown', e => this.startDrag(e));
    this.handle.addEventListener('touchstart', e => this.startDrag(e), { passive: false });

    // Bind move and end events on window
    window.addEventListener('mousemove', e => this.onDrag(e));
    window.addEventListener('touchmove', e => this.onDrag(e), { passive: false });
    window.addEventListener('mouseup',   () => this.endDrag());
    window.addEventListener('touchend',  () => this.endDrag());
  }

  updateInsetWidth() {
    const w = this.container.clientWidth;
    this.beforeInset.style.width = `${w}px`;
  }

  startDrag(e) {
    e.preventDefault();
    this.dragging = true;
  }

  onDrag(e) {
    if (!this.dragging) return;
    e.preventDefault();
    const rect = this.container.getBoundingClientRect();
    let clientX = e.clientX;
    if (e.touches) clientX = e.touches[0].clientX;
    let offsetX = clientX - rect.left;
    offsetX = Math.max(10, Math.min(offsetX, rect.width - 10));
    const pct = (offsetX / rect.width) * 100;

    this.before.style.width     = pct + '%';
    this.handle.style.left      = pct + '%';
    this.afterText.style.zIndex = '1';
  }

  endDrag() {
    this.dragging = false;
  }
}

// Initialize all sliders on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.bal-container').forEach(container => new BeforeAfter(container));
});
