// Flatpickr

var f1 = flatpickr(document.getElementById('dateOfCounsel'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var f8 = flatpickr(document.getElementById('dateofCounseledit'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var f8 = flatpickr(document.getElementById('dateofCounseltime'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});

var f5 = flatpickr(document.getElementById('timeofSample'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});

/*
var f1 = flatpickr(document.getElementById('timeofSample'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});
*/
var f1 = flatpickr(document.getElementById('basicFlatpickr'));
var f2 = flatpickr(document.getElementById('dateTimeFlatpickr'), {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
});
var f3 = flatpickr(document.getElementById('rangeCalendarFlatpickr'), {
    mode: "range",
});

