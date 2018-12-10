'use strict';

/** external styles */
// flatpickr
import 'flatpickr/dist/themes/dark.css';

/** functionality classes */
import CookieModal from './components/cookieModal';
import ScrollIndicator from './components/scrollIndicator';
import ResponsiveBackgroundImage from './components/responsiveBackgroundImage';
import DateRange from './components/dateRange';

const Page = (window.__m2s = window.__m2s || {});

Page.helpers = Page.helpers || {};
Page.helpers.getUrlParam = function(param) {
    const filter = new RegExp('(?:^\\?|&)' + param + '=([^&#]*)', 'i');
    const match = window.location.search.match(filter);

    return match ? decodeURIComponent(match[1]) : null;
};
Page.helpers.loadScript = function(url, callback = null) {
    const scriptTag = document.createElement('script'),
        firstScriptTag = document.getElementsByTagName('script')[0];

    scriptTag.src = url;
    scriptTag.onload = callback;
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
};

Page.scrollIndicator = new ScrollIndicator('#scroll', {
    offset: -14,
    firstLoadDelay: 500
});

Page.cookieModal = new CookieModal('#cookie-modal');

Page.responsiveBgImages = [];
document
    .querySelectorAll('[data-responsive-bg]')
    .forEach(element =>
        Page.responsiveBgImages.push(new ResponsiveBackgroundImage(element))
    );

document.querySelector('#header-form .request').addEventListener('click', e => {
    const form = e.currentTarget.closest('#header-form');
    form.setAttribute('action', form.getAttribute('data-request-url'));
    form.submit();
});

const initializedContainers = [];
Page.dateRangeContainers = [];
document.querySelectorAll('.flatpickr').forEach(element => {
    const container = element.closest('.date-range-container');
    if (initializedContainers.indexOf(container) < 0) {
        Page.dateRangeContainers.push(new DateRange(container));
        initializedContainers.push(container);
    }
});

Page.helpers.loadScript(
    '/typo3conf/ext/powermail/Resources/Public/JavaScripts/Powermail/Marketing.min.js'
);

Page.loaded = true;
document.dispatchEvent(new Event('m2s_loaded'));
