$(document).ready(function () {
    $('#zero-config').on('search.dt.DT', function () { ApplyStatus() }).DataTable();
});

function ApplyStatus() {
    var isChecked = false;
    var table = $('#zero-config').DataTable();
    var rowCount = table.rows({ search: 'applied' }).count();
    if (rowCount === 1) {
        console.log(table.rows({ search: 'applied' }).nodes());
        var selecteRow = table.rows({ search: 'applied' }).nodes();

        isChecked = false;
        $(selecteRow).each(function (cell, i) {
            $(this).find('input[type="radio"]').removeAttr('disabled');
            $(this).find('span').removeClass('disabled');
            // if(!isChecked){
            //     $(this).find('input[type="radio"]:first').attr('checked', true);
            //     isChecked = true;
            // }
        });
    }
    else{
        var selecteRow = table.rows({ search: 'applied' }).nodes();
        $(selecteRow).each(function(){
            $(this).each(function (cell, i) {
                isChecked = false;
                // $(this).find('input[type="radio"]').each(function(){
                //     console.log('aaaa');
                //     if($(this).is(':checked')){
                //         isChecked = true;
                //     }
                // });
                if(!isChecked){
                    $(this).find('input[type="radio"]').attr('disabled', 'true');
                    if(!$(this).find('span').hasClass('disabled')){
                        $(this).find('span').addClass('disabled');
                    }
                }
            });
        });
    }
}
