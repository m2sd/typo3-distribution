'use strict';

import Waypoints from './components/waypoints';

const Page = (window.__m2s = window.__m2s || {});

function initWaypoints() {
    Page.waypoints = Page.waypoints || [];
    document.querySelectorAll('.item-list').forEach(element => {
        Page.waypoints.push(
            new Waypoints(element, {
                once: true,
                className: 'scroll-animation'
            })
        );
    });
}

if (Page.loaded) {
    window.setTimeout(initWaypoints, 0);
} else {
    document.addEventListener('m2s_loaded', initWaypoints);
}
