// Flatpickr



// var fd = flatpickr(document.getElementById('sccollectDate'), {
//     dateFormat: "d/m/Y",
//     defaultDate: "today"
// });


// var td = flatpickr(document.getElementById('scToDate'), {
//     dateFormat: "d/m/Y",
//     defaultDate: "today"
// });

var dr = flatpickr(document.getElementById('shipmentdate'), {
    dateFormat: "d/m/Y",
    defaultDate: "today",
    maxDate: "today"
});

// var db = flatpickr(document.getElementById('spouseDOB'), {
//     dateFormat: "d/m/Y",
//     defaultDate: "today"
// });

// var f1 = flatpickr(document.getElementById('dateOfSample'), {
//     dateFormat: "d/m/Y",
//     defaultDate: "today"
// });

var f2 = flatpickr(document.getElementById('shipmenttime'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: new Date().getTime(),
    maxDate: new Date().getTime()
});
