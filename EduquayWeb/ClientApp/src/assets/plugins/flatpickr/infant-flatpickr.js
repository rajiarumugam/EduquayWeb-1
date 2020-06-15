// Flatpickr



var f1 = flatpickr(document.getElementById('dateOfDelivery'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var fz = flatpickr(document.getElementById('birthRegchc'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var f3 = flatpickr(document.getElementById('dateOfColl'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var f2 = flatpickr(document.getElementById('timeofDelivery'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});

var f4 = flatpickr(document.getElementById('timeofColl'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});
