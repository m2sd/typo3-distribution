'use strict';

import flatpickr from 'flatpickr';
import { Italian } from 'flatpickr/dist/l10n/it';
import { German } from 'flatpickr/dist/l10n/de';

switch (document.querySelector('html').getAttribute('lang')) {
    case 'it':
        flatpickr.localize(Italian);
        break;
    case 'de':
        flatpickr.localize(German);
        break;
}

const minDate = new Date();
minDate.setHours(0, 0, 0, 0);

const defaults = {
    altInput: true,
    altFormat: 'd.m.Y',
    dateFormat: 'Y-m-d',
    onReady: (dates, dateStr, instance) => {
        const calendar = instance.calendarContainer;

        if (calendar && !calendar.querySelector('.flatpickr-clear')) {
            calendar.insertAdjacentHTML(
                'beforeend',
                '<i class="icon-back flatpickr-clear"></i>'
            );
            calendar
                .querySelector('.flatpickr-clear')
                .addEventListener('click', () => {
                    instance.clear();
                    instance.close();
                });
        }

        if (instance.altInput) {
            for (let attribute of instance.input.attributes) {
                if (attribute.name.indexOf('data-parsley-') === 0) {
                    instance.altInput.setAttribute(
                        attribute.name,
                        attribute.value
                    );
                }
            }
        }
    },
    minDate: minDate
};

class DateRange {
    constructor(container, options) {
        this.options = Object.assign({}, defaults, options);

        this.container = container || document;
        this.fromPickers = [];
        this.toPickers = [];

        this.container
            .querySelectorAll('.flatpickr')
            .forEach((element, index) => {
                let format;

                if (
                    (format = element.getAttribute('data-date-format-visual'))
                ) {
                    this.options.altFormat = format;
                }

                if (
                    (format = element.getAttribute('data-date-format-actual'))
                ) {
                    this.options.dateFormat = format;
                }

                if (index % 2 === 0) {
                    this.fromPickers.push(flatpickr(element, this.options));
                } else {
                    this.toPickers.push(flatpickr(element, this.options));
                }
            });

        this.fromPickers.forEach((fromPicker, i) => {
            const changeEvent = new Event('change');
            const inputEvent = new Event('input');

            const toPicker = this.toPickers[i];

            if (toPicker) {
                fromPicker.set('onClose', dates => {
                    DateRange.setBoundaries(toPicker, dates[0]);

                    if (fromPicker.altInput) {
                        fromPicker.altInput.dispatchEvent(changeEvent);
                        fromPicker.altInput.dispatchEvent(inputEvent);
                    }
                });
                toPicker.set('onClose', dates => {
                    DateRange.setBoundaries(fromPicker, dates[0], true);

                    if (toPicker.altInput) {
                        toPicker.altInput.dispatchEvent(changeEvent);
                        toPicker.altInput.dispatchEvent(inputEvent);
                    }
                });
            }
        });
    }

    refreshBoundaries() {
        this.fromPickers.forEach((fromPicker, i) => {
            const toPicker = this.toPickers[i];
            if (toPicker) {
                DateRange.setBoundaries(
                    toPicker,
                    fromPicker.selectedDates[0],
                    false,
                    false
                );
                DateRange.setBoundaries(
                    fromPicker,
                    toPicker.selectedDates[1],
                    true,
                    false
                );
            }
        });
    }

    setDate(date, endDate = false) {
        const pickers = endDate ? this.toPickers : this.fromPickers;

        pickers.forEach(picker => {
            picker.setDate(new Date(date));
            picker.close();
        });
    }

    static setBoundaries(picker, date, upper = false, open = true) {
        if (date) {
            picker.set(upper ? 'maxDate' : 'minDate', date);
            if (!picker.selectedDates.length && open) {
                picker.open();
            }
        } else {
            picker.set(upper ? 'maxDate' : 'minDate', upper ? false : minDate);
        }
    }
}

export default DateRange;
