// Flatpickr

var f1 = flatpickr(document.getElementById('dateOfRegistration'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var f1 = flatpickr(document.getElementById('dateOfBirth'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var f1 = flatpickr(document.getElementById('dateOfSample'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
    
});

var f1 = flatpickr(document.getElementById('timeofSample'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});

var f1 = flatpickr(document.getElementById('basicFlatpickr'));
var f2 = flatpickr(document.getElementById('dateTimeFlatpickr'), {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
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

