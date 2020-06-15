$(document).ready(function () {

    $('#zero-config').on('search.dt.DT', function () { ApplyStatus()}).DataTable();

    $.fn.dataTable.ext.order['dom-checkbox'] = function  ( settings, col )
    {
        return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
            return $('input', td).prop('checked') ? '1' : '0';
        });
    };
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
            $(this).find('input[type="checkbox"]').removeAttr('disabled');
            $(this).find('span').removeClass('disabled');
            if(!isChecked){
                $(this).find('input[type="checkbox"]:first').prop('checked', true);
                var selectedBarcode = $(this).find('input[type="checkbox"]:first').val();
                if(!isTagExist(selectedBarcode)){
                    appendTag(selectedBarcode);
                }
                isChecked = true;
            }
        });

    }
    else{
        var selecteRow = table.rows({ search: 'applied' }).nodes();
        $(selecteRow).each(function(){
            $(this).each(function (cell, i) {
                isChecked = false;
                $(this).find('input[type="checkbox"]').each(function(){
                    console.log('aaaa');
                    if($(this).is(':checked')){
                        isChecked = true;
                    }
                });
                if(!isChecked){
                    $(this).find('input[type="checkbox"]').attr('disabled', 'true');
                    if(!$(this).find('span').hasClass('disabled')){
                        $(this).find('span').addClass('disabled');
                    }
                }
            });
        });
    }
}

function appendTag(barcode){
    var barcodeLabel = `<div class="vr">
                            <span class="label-content" barcode="${barcode}">
                                <div class="vT">${barcode}</div>
                                <div class="vM"></div>
                            </span>
                        </div>`;
    $('#barcode-container').append(barcodeLabel);

}



function isTagExist(barcode){
    var returnVal = 'N';
    $('div.vr').each(function(){
        if( $(this).children().attr('barcode') === barcode){
            returnVal = 'E';
            return false;
        }
    });
    return returnVal === 'E';
}