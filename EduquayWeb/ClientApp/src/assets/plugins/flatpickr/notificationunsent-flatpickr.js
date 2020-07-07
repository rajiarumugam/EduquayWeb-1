
var dr = flatpickr(document.getElementById('shipmentdate'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var f2 = flatpickr(document.getElementById('shipmenttime'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});
