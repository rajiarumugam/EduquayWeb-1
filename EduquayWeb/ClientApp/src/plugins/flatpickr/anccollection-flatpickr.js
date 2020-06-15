var f1 = flatpickr(document.getElementById('dateOfSample'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var f2 = flatpickr(document.getElementById('timeofSample'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});
