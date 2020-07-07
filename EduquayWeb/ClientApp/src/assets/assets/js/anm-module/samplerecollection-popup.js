

var fd = flatpickr(document.getElementById('sccollectDate'), {
    dateFormat: "d/m/Y",
    defaultDate: "today",
    maxDate: "today"
});


var f2 = flatpickr(document.getElementById('timeofSample'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: new Date().getTime(),
    maxDate: new Date().getTime()
});
