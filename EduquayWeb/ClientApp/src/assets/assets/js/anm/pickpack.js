var hasChanged = false;
$(document).ready(function () {

    $('#zero-config').on('search.dt.DT', function () { ApplyStatus()}).DataTable();

    $.fn.dataTable.ext.order['dom-checkbox'] = function  ( settings, col )
    {
        return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
            return $('input', td).prop('checked') ? '1' : '0';
        });
    };

    $(window).unload(function () {
        if (hasChanged)
            alert("Some changes happened...");
        else
            alert("Something else...");
    });
});


$('#zero-config1').on('click', 'input[type="checkbox"]', function() {
    var table = $('#zero-config').DataTable();
    var table2 = $('#zero-config1').DataTable();
var msg = 'Back to pack list';
 salert(msg);
    var row = table2.row( $(this).parents('tr') );
    var rowNode = row.node();
    row.remove();
    table.row.add( rowNode ).draw();
});

function ApplyStatus() {
    hasChanged = true;
    var isChecked = false;
    var table = $('#zero-config').DataTable();
    var table2 = $('#zero-config1').DataTable();
    var rowCount = table.rows({ search: 'applied' }).count();
    if (rowCount === 1) {
        console.log(table.rows({ search: 'applied' }).nodes());
        var selecteRow = table.rows({ search: 'applied' }).nodes();

        isChecked = false;

        

        $(selecteRow).each(function (cell, i) {
            $(this).find('input[type="checkbox"]').removeAttr('disabled');
            $(this).find('span').removeClass('disabled');
            if (!isChecked) {
                $(this).find('input[type="checkbox"]:first').prop('checked', true);
                var selectedBarcode = $(this).find('input[type="checkbox"]:first').val();
                // if(!isTagExist(selectedBarcode)){
                //     appendTag(selectedBarcode);
                // }
                /*
                var row = table.row($(this).parents('tr'));
                var rowNode = row.node();
                row.remove();
                table2.row.add(rowNode).draw();
                */
                isChecked = true;
            }
            
        });
        var msg =  'Ready to ship';
        salert(msg);

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
                        var row = table.row($(this).parents('tr'));
                        var rowNode = row.node();
                        row.remove();
                        table2.row.add(rowNode).draw();
                      
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

function salert(msg){
    const toast = swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        padding: '2em'
      });
      toast({
        type: 'success',
        title: msg,
        padding: '2em',
      })
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

window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    // Chrome requires returnValue to be set
    if(hasChanged)
        e.returnValue = '';
    return true;
  });

