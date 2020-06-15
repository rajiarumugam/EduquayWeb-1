$('.pthead').click(function(){
    //console.log($(this).closest('table').find('tbody').get(0).className);
    console.log($(this).find('i').get(0).className);
    var tbody = $(this).closest('table').find('tbody');
    var tbodyClass = $(this).closest('table').find('tbody').attr('class');
    if(tbody.get(0).className === 'd-none')
    {
        //$(this).removeClass().addClass('fa fa-caret-left');
        $(this).find('i').removeClass().addClass('fa fa-caret-left')
        tbody.removeClass();
    }else{
        //$(this).removeClass().addClass('fa fa-caret-down');
        $(this).find('i').removeClass().addClass('fa fa-caret-down')
        tbody.removeClass().addClass('d-none');
    }
    return false;
});