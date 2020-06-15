// Flatpickr



var fd = flatpickr(document.getElementById('sccollectDate'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

$('#linktobuttonupdates').on('click', function () {
    swal({
        title: '<p><i class="far fa-check-circle"></i></p>Subject Notification Status Updated Successfully',
        padding: '2em',
    });
})

$('#damage-sample-update').on('click', function () {
    swal({
        title: '<p><i class="far fa-check-circle"></i></p>Subject Notification Status Updated Successfully',
        padding: '2em',
    });
})

// var td = flatpickr(document.getElementById('scToDate'), {
//     dateFormat: "d/m/Y",
//     defaultDate: "today"
// });

// var dr = flatpickr(document.getElementById('shipmentdate'), {
//     dateFormat: "d/m/Y",
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

var f2 = flatpickr(document.getElementById('timeofSample'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: "today"
});
