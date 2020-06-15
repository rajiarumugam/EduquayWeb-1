// Flatpickr



var fd = flatpickr(document.getElementById('basicFlatpickr'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});



var f2 = flatpickr(document.getElementById('timeFlatpickr'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});
