var f1 = flatpickr(document.getElementById('popupDate'), {
    dateFormat: "d/m/Y",
    defaultDate: "today",
   
    
    
  });
  
  var f2 = flatpickr(document.getElementById('popupTime'), {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    defaultDate: new Date().getTime(),
    ClassName: "value",
    Disabled: false
    //defaultHour:new Date().getHours(),
    //defaultMinute:new Date().getMinutes(),
    //useCurrent: ('hour', 'minute')
  
  });