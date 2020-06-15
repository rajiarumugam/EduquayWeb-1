// Flatpickr



var f9 = flatpickr(document.getElementById('rdToShippedTime'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});
var fs = flatpickr(document.getElementById('rdToShippedOutTime'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});
var fd = flatpickr(document.getElementById('rdToShippeddate'), {
    enableTime: true,
    dateFormat: "d/m/y H:i",
    defaultDate: "today"
});

var fd = flatpickr(document.getElementById('rdReceivedDate'), {
    enableTime: true,
    dateFormat: "d/m/y H:i",
    defaultDate: "today"
});


var f2 = flatpickr(document.getElementById('centralrdSamTime'), {
    enableTime: true,
    dateFormat: "d/m/y H:i",
    defaultDate: "today"
});

var f9 = flatpickr(document.getElementById('centralRdTim'), {
    dateFormat: "d/m/y",
    defaultDate: "today"
});




