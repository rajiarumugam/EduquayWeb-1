
var f1 = flatpickr(document.getElementById('dateOfSample'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var f2 = flatpickr(document.getElementById('sampleTime'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});
