'use strict';

/*eslint-disable */
const GrowCss = GrowCss || {};
/*eslint-enable */

const PARALLAX_RESIZE_DELAY = 20;

const GcParallaxStage = {
  properties: {
    'parallax-tick': {
      type: Boolean,
      value: false,
    },
    'parallax-resize-timer ': {
      type: Number,
      value: false,
    },
  },

  /*eslint-disable */
  requestAnimationFrame(cb) {
    const callback = cb;

    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function (callback) {
        setTimeout(callback, 1000 / 60);
      }
    );
  },
  /*eslint-enable */

  ready() {
    window.addEventListener('scroll', () => this.scroll(), true);
    window.addEventListener('mousewheel', () => this.scroll(), true);
    window.addEventListener('touchmove', () => this.scroll(), true);
    window.addEventListener('resize', () => this.resize(), true);
    window.addEventListener('orientationchange', () => this.resize(), true);
    window.onload = () => this.scroll(); // force an update event
  },

  /**
   * Handle a smooth scroll event dispatching the scrolling event outside
   */
  scroll() {
    if (this.tick) {
      return;
    }

    this.tick = !this.tick;

    this.requestAnimationFrame(() => this.update());
  },

  /**
   * Update function that is called anytime we need to trigger an update
   */
  update() {
    this.fire('scroll', this.scrollTop);

    this.tick = !this.tick;
  },

  /**
   * Handle the resize event debouncing it
   */
  resize() {
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }

    this.resizeTimer = setTimeout(() => this.fire('resize', this.size), PARALLAX_RESIZE_DELAY);
  },

    /**
   * It returns the window scroll top position
   * @returns { Number } - window offset top
   */
  get scrollTop() {
    const top = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);

    return window.isNaN(top) ? 0 : top;
  },

  /**
   * It returns the window height
   *
   * @returns {Number} - height of the viewport
   */
  get height() {
    return window.innerHeight;
  },

  /**
   * It returns the window width
   *
   * @returns {Number} - width of the viewport
   */
  get width() {
    return window.innerWidth;
  },

  /**
   * It returns the window size
   *
   * @returns {Object} - width and height of the viewport
   */
  get size() {
    return {
      width: this.width,
      height: this.height,
    };
  },
};

GrowCss.ParallaxStage = GcParallaxStage;
