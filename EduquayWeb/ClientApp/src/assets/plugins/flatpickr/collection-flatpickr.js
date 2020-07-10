// Flatpickr


var fd = flatpickr(document.getElementById('scFromDate'), {
    dateFormat: "d/m/Y",
    maxDate: "today",
    onClose: function(selectedDates, dateStr, instance) {
        td.set('minDate', dateStr);
      },
});


var td = flatpickr(document.getElementById('scToDate'), {
    dateFormat: "d/m/Y",
    defaultDate: "today",
    maxDate: "today",
});
