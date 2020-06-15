// Flatpickr



var fd = flatpickr(document.getElementById('molerdDate'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});


// var td = flatpickr(document.getElementById('scToDate'), {
//     dateFormat: "d/m/Y",
//     defaultDate: "today"
// });

// var dr = flatpickr(document.getElementById('centralrevdatecolone'), {
//     enableTime: true,
//     dateFormat: "Y-m-d H:i",
//     defaultDate: "today"
// });
// var dr = flatpickr(document.getElementById('centralrevdatecoltwo'), {
//     enableTime: true,
//     dateFormat: "Y-m-d H:i",
//     defaultDate: "today"
// });
// var dr = flatpickr(document.getElementById('centralrevdatecolthree'), {
//     enableTime: true,
//     dateFormat: "Y-m-d H:i",
//     defaultDate: "today"
// });


// var db = flatpickr(document.getElementById('spouseDOB'), {
//     dateFormat: "d/m/Y",
//     defaultDate: "today"
// });

// var f1 = flatpickr(document.getElementById('dateOfSample'), {
//     dateFormat: "d/m/Y",
//     defaultDate: "today"
// });

var f2 = flatpickr(document.getElementById('moleprocessingTime'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});
