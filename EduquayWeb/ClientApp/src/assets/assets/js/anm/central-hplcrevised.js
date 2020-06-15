// Code goes here
$(document).ready(function() {
    rowcount(z=0);
    $('#txtScanBarcode').on('keyup paste', function(e){
        //timer_response = setTimeout(`searchBarcodeInSource(${$('#txtScanBarcode').val()})`, 10);
        if($(this).val().length >=6 && ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57) ||  (e.keyCode >= 96 && e.keyCode <= 105) || e.type === "paste")){            
            searchBarcodeInSource($(this).val());
        }
    });

    $('#txtScanBarcode1').on('paste', function(e){
        //e.preventDefault();
        var text = (e.originalEvent || e).clipboardData.getData('text/plain');
        console.log('barcode: ' + text);
    });

    $(document).on('click','input[type="checkbox"]', function(){
        console.log('barcode: ' + $(this).val());
        searchBarcodeInTarget($(this).val());
    });

    function rowcount(z) {
        var sourceTable = $('#zero-config').DataTable();
        var targetTable = $('#zero-config-picked').DataTable();
        var sourceRowCount = sourceTable.rows().count();
        var targetRowCount = targetTable.rows().count();
        $('#fbadge').text(sourceRowCount);
        if (z===0)
        {
            $('#sbadge').text('0');
        }else{
            $('#sbadge').text(targetRowCount);
        }
        
    }


    $('#show').on('click', function () {
        var x = document.getElementById("myTable");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        var sourceTable = $('#zero-config').DataTable();
        var targetTable = $('#zero-config-picked').DataTable();
        var sourceTableData = sourceTable.rows().nodes();
        var targetTableData = targetTable.rows().nodes();
        $.each(targetTableData, function(index, value){
            var barcode =  $(this).find('td:eq(3)').text();
           // console.log(barcode);
           $.each(sourceTableData, function(index, value){
            var sbarcode =  $(this).find('td:eq(3)').text();
            if(sbarcode === barcode)
            {
                var $row = $(this);
                var addRow = sourceTable.row($row);
                addRow.remove().draw();
            }

           });    
        });
        rowcount(z=1);
    });

});

function searchBarcodeInSource(barcode){
    console.log('barcode: ' + barcode);
    var sourceTable = $('#zero-config').DataTable();
    var targetTable = $('#zero-config-picked').DataTable();
    var sourceTableData = sourceTable.rows().nodes();
    $.each(sourceTableData, function(index, value){
        if($(this).find('input[type=checkbox]').val() === barcode){
            $(this).find('input[type=checkbox]').removeAttr('disabled');
            $(this).find('input[type=checkbox]').prop('checked', true);
            $(this).find('span').removeClass('disabled');
            //console.log($(this));
            //targetTable.row.add($(this)).draw();
            moveToTargetTable($(this), barcode, sourceTable, targetTable);
            return false;
        }
    });

}

function searchBarcodeInTarget(barcode){
    var sourceTable = $('#zero-config').DataTable();
    var targetTable = $('#zero-config-picked').DataTable();
    var targetTableData = targetTable.rows().nodes();
    $.each(targetTableData, function(index, value){
        if($(this).find('input[type=checkbox]').val() === barcode){
            //console.log($(this) + ' - ' + targetTableData.data().count());
            //sourceTable.row.add($(this)).draw();
            if($(this).find('input[type=checkbox]').is(':not(:checked)')){
                moveToTSourceTable($(this), barcode, targetTable, sourceTable);
                return false;
            }
        }
    });
}

function moveToTargetTable(row, barcode, sourceTable, targetTable){
    var rowExist = false;
    var targetTableData = targetTable.rows().nodes();
    if(targetTableData.length > 0){
        $.each(targetTableData, function(index, value){
            if($(this).find('input[type=checkbox]').val() === barcode){
                console.log('exist:' + barcode);
                rowExist = true;
                return false;
            }
        });
    }

    if(!rowExist){
        var $row = row;
        var addRow = sourceTable.row($row);
        targetTable.row.add(addRow.data()).draw();
        addRow.remove().draw();
        selectSubjectInTarget(barcode);
    }
}

function moveToTSourceTable(row, barcode, sourceTable, targetTable){
    var $row = row;
    var addRow = sourceTable.row($row);
    targetTable.row.add(addRow.data()).draw();
    addRow.remove().draw();
    unSelectSubjectInTarget(barcode);
}

function selectSubjectInTarget(barcode){
    var targetTable = $('#zero-config-picked').DataTable();
    var targetTableData = targetTable.rows().nodes();
    $.each(targetTableData, function(index, value){
        if($(this).find('input[type=checkbox]').val() === barcode){
            $(this).find('input[type=checkbox]').removeAttr('disabled');
            $(this).find('input[type=checkbox]').prop('checked', true);
            $(this).find('span').removeClass('disabled');
            $(this).find('td:eq(0)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(1)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(2)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(3)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(4)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(5)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(6)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(7)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(8)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(9)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(10)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(11)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(12)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(13)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(14)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(15)').removeClass().addClass('sno text-center');
        }
    });
}

function unSelectSubjectInTarget(barcode){
    var sourceTable = $('#zero-config').DataTable();
    var sourceTableData = sourceTable.rows().nodes();
    $.each(sourceTableData, function(index, value){
        if($(this).find('input[type=checkbox]').val() === barcode){
            $(this).find('input[type=checkbox]').attr('disabled');
            $(this).find('input[type=checkbox]').prop('checked', false);
            $(this).find('span').addClass('disabled');
            $(this).find('td:eq(0)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(1)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(2)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(3)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(4)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(5)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(6)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(7)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(8)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(9)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(10)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(11)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(12)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(13)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(14)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(15)').removeClass().addClass('sno text-center');

        }
    });
}
/*$("table#rBuscarPerfil input[type=checkbox]").change(function() {
    if ($(this).is(":checked")) {
        $(this).closest("tr").find("td").each(function() {
    }else{
        $(this).closest("tr").find("td").each(function() {
            $(this).removeClass("green");
            $(this).addClass("red");
        });     
    }
});
*/