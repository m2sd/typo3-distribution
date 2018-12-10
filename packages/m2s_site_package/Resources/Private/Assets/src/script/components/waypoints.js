'use strict';

import throttle from 'just-throttle';

const defaults = {
    className: 'waypoint',
    trigger: document.querySelector('html'),
    offsetRatio: 0.5,
    throttleInterval: 100,
    once: false
};

class Waypoints {
    constructor(container, options) {
        this.options = Object.assign({}, defaults, options);

        this.container = container;
        this.elements = this.container.querySelectorAll(
            '.' + this.options.className
        );

        this.scrollListener = throttle(() => {
            this.updateClasses();
        }, this.options.throttleInterval);

        this.updateClasses();
        window.addEventListener('scroll', this.scrollListener);
    }

    updateClasses() {
        const scrollOffset =
            this.options.trigger.scrollTop +
            this.options.trigger.clientHeight * this.options.offsetRatio;

        this.elements.forEach(element => {
            const offset = element.offsetTop;
            if (scrollOffset > offset) {
                element.classList.remove(this.options.className);
            } else if (!this.options.once) {
                element.classList.add(this.options.className);
            }
        });
    }
}

export default Waypoints;
