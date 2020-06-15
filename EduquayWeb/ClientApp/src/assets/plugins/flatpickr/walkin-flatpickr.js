// Flatpickr

var fd = flatpickr(document.getElementById('scFromDate'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});


var td = flatpickr(document.getElementById('scToDate'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var dr = flatpickr(document.getElementById('dateofReg'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});


var ds = flatpickr(document.getElementById('dateofBirth'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var rd = flatpickr(document.getElementById('spouseReg'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var db = flatpickr(document.getElementById('spouseDOB'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var wr = flatpickr(document.getElementById('childReg'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var or = flatpickr(document.getElementById('childDOB'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var wr = flatpickr(document.getElementById('walkinReg'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

var wb = flatpickr(document.getElementById('walkinDOB'), {
    dateFormat: "d/m/Y",
    defaultDate: "today"
});

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
