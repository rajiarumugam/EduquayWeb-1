// Flatpickr

var f1 = flatpickr(document.getElementById('basicFlatpickr'));
var f6 = flatpickr(document.getElementById('basicFlatpickrtodate'));
var f7 = flatpickr(document.getElementById('basicFlatpickrtodate1'));
var f5 = flatpickr(document.getElementById('basicFlatpickr1'));
var f2 = flatpickr(document.getElementById('dateTimeFlatpickr'), {
    enableTime: true,
    dateFormat: "d-m-y H:i",
});
var f3 = flatpickr(document.getElementById('rangeCalendarFlatpickr'), {
    mode: "range",
});
var f4 = flatpickr(document.getElementById('timeFlatpickr'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "13:45"
});