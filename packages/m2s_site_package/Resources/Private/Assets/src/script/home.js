'use strict';

import HeroContent from './components/heroContent';
import Waypoints from './components/waypoints';

let Page = (window.__m2s = window.__m2s || {});

Page.heroContent = new HeroContent('#typing', '#slogans');

function initWaypoints() {
    Page.waypoints = Page.waypoints || [];
    Page.waypoints.push(
        new Waypoints(document.querySelector('.content-menu'), {
            once: true,
            className: 'scroll-animation',
            offsetRatio: 0.75
        })
    );
}

if (Page.loaded) {
    window.setTimeout(initWaypoints, 0);
} else {
    document.addEventListener('m2s_loaded', initWaypoints);
}
