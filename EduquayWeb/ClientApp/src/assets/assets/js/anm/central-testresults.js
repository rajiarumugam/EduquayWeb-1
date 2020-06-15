// Code goes here
$(document).ready(function() {
     rowcount();
    $('#txtScanBarcode').on('keyup paste', function(e){
        //timer_response = setTimeout(`searchBarcodeInSource(${$('#txtScanBarcode').val()})`, 10);
        if($(this).val().length >=6 && ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57) ||  (e.keyCode >= 96 && e.keyCode <= 105) || e.type === "paste")){            
            searchBarcodeInSource($(this).val());
        }
    });

    $('#txtScanBarcodeNeg').on('keyup paste', function(e){
        //timer_response = setTimeout(`searchBarcodeInSource(${$('#txtScanBarcode').val()})`, 10);
        if($(this).val().length >=6 && ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57) ||  (e.keyCode >= 96 && e.keyCode <= 105) || e.type === "paste")){            
            searchBarcodeInSource1($(this).val());
        }
    });

    $('#txtScanBarcode1').on('paste', function(e){
        //e.preventDefault();
        var text = (e.originalEvent || e).clipboardData.getData('text/plain');
        console.log('barcode: ' + text);
    });

    $(document).on('click','button[type="button"]', function(){
        console.log('barcode: ' + $(this).val());
        searchBarcodeInTarget($(this).val());
        searchBarcodeInTarget1($(this).val());
        rowcount();
    });
});


function rowcount()
{
    var sourceTable = $('#zero-config').DataTable();
    var targetTable = $('#zero-config-picked').DataTable();
    var targetTable1 = $('#zero-config-negt').DataTable();
    var sourceRowCount = sourceTable.rows().count();
    var targetRowCount = targetTable.rows().count();
    var targetRowCount1 = targetTable1.rows().count();
    $('#fbadge').text(sourceRowCount);
    $('#sbadge').text(targetRowCount);
    $('#tbadge').text(targetRowCount1);
}

function searchBarcodeInSource(barcode){
    console.log('barcode: ' + barcode);
    var sourceTable = $('#zero-config').DataTable();
    var targetTable = $('#zero-config-picked').DataTable();
    var sourceTableData = sourceTable.rows().nodes();
    $.each(sourceTableData, function(index, value){
        if($(this).find('button[type=button]').val() === barcode){
            // $(this).find('input[type=checkbox]').removeAttr('disabled');
            // $(this).find('input[type=checkbox]').prop('checked', true);
            // $(this).find('span').removeClass('disabled');
            //console.log($(this));
            //targetTable.row.add($(this)).draw();
            moveToTargetTable($(this), barcode, sourceTable, targetTable, x=0);
            return false;
        }
    });
}

function searchBarcodeInSource1(barcode){
    console.log('barcode: ' + barcode);
    var sourceTable = $('#zero-config').DataTable();
    var targetTable = $('#zero-config-negt').DataTable();
    var sourceTableData = sourceTable.rows().nodes();
    $.each(sourceTableData, function(index, value){
        if($(this).find('button[type=button]').val() === barcode){
            // $(this).find('input[type=checkbox]').removeAttr('disabled');
            // $(this).find('input[type=checkbox]').prop('checked', true);
            // $(this).find('span').removeClass('disabled');
            //console.log($(this));
            //targetTable.row.add($(this)).draw();
            moveToTargetTable($(this), barcode, sourceTable, targetTable, x=1);
            return false;
        }
    });
}

function searchBarcodeInTarget(barcode){
    var sourceTable = $('#zero-config').DataTable();
    var targetTable = $('#zero-config-picked').DataTable();
    var targetTableData = targetTable.rows().nodes();
    $.each(targetTableData, function(index, value){
        if($(this).find('button[type=button]').val() === barcode){
            //console.log($(this) + ' - ' + targetTableData.data().count());
            //sourceTable.row.add($(this)).draw();
            // if($(this).find('input[type=checkbox]').is(':not(:checked)')){
                moveToTSourceTable($(this), barcode, targetTable, sourceTable);
                return false;
            //}
        }
    });
    var msg =  'Deleted';
        salert(msg);
}

function searchBarcodeInTarget1(barcode){
    var sourceTable = $('#zero-config').DataTable();
    var targetTable = $('#zero-config-negt').DataTable();
    var targetTableData = targetTable.rows().nodes();
    $.each(targetTableData, function(index, value){
        if($(this).find('button[type=button]').val() === barcode){
            //console.log($(this) + ' - ' + targetTableData.data().count());
            //sourceTable.row.add($(this)).draw();
            // if($(this).find('input[type=checkbox]').is(':not(:checked)')){
                moveToTSourceTable($(this), barcode, targetTable, sourceTable);
                return false;
            //}
        }
    });
    var msg =  'Sample moved to Received Samples';
        salert(msg);
}

function moveToTargetTable(row, barcode, sourceTable, targetTable, x){
    var rowExist = false;
    var targetTableData = targetTable.rows().nodes();
    if(targetTableData.length > 0){
        $.each(targetTableData, function(index, value){
            if($(this).find('button[type=button]').val() === barcode){
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
        if(x===0)
        {
            selectSubjectInTarget(barcode);
            rowcount();
        }
        else if(x===1){
            selectSubjectInTarget1(barcode);
            rowcount();
        }
    }
}

function moveToTSourceTable(row, barcode, sourceTable, targetTable){
    var $row = row;
    var addRow = sourceTable.row($row);
    targetTable.row.add(addRow.data()).draw();
    addRow.remove().draw();
    unSelectSubjectInTarget(barcode);
    rowcount();
}

function salert(msg){
    const toast = swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 5000,
        padding: '2em'
      });
      toast({
        type: 'success',
        title: msg,
        padding: '2em',
      })
}

function selectSubjectInTarget(barcode){
    var isChecked = false;
    var targetTable = $('#zero-config-picked').DataTable();
    var targetTableData = targetTable.rows().nodes();
    $.each(targetTableData, function(index, value){
        if($(this).find('button[type=button]').val() === barcode){
            
            $(this).find('input[type="radio"]:first').removeAttr('disabled');
            $(this).find('span').removeClass('disabled');
            if(!isChecked){
                $(this).find('input[type="radio"]:first').attr('checked', true);
                isChecked = true;
             //   $(this).find('input[type="radio"]').attr('disabled');
              //  $(this).find('span').addClass('disabled');
            }
            // $(this).find('input[type=button]').removeAttr('disabled');
            // $(this).find('input[type=checkbox]').prop('checked', true);
            // $(this).find('span').removeClass('disabled');
            $(this).find('td:eq(0)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(1)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(2)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(3)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(4)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(5)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(6)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(7)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(8)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(9)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(10)').removeClass().addClass('sno text-center');
        }
    });
}

function selectSubjectInTarget1(barcode){
    var isChecked = false;
    var targetTable = $('#zero-config-negt').DataTable();
    var targetTableData = targetTable.rows().nodes();
    $.each(targetTableData, function(index, value){
        if($(this).find('button[type=button]').val() === barcode){
            
            $(this).find('input[type="radio"]:last').removeAttr('disabled');
            $(this).find('span').removeClass('disabled');
            if(!isChecked){
                $(this).find('input[type="radio"]:last').attr('checked', true);
                isChecked = true;
              //  $(this).find('input[type="radio"]').attr('disabled');
              //  $(this).find('span').addClass('disabled');
            }
            // $(this).find('input[type=button]').removeAttr('disabled');
            // $(this).find('input[type=checkbox]').prop('checked', true);
            // $(this).find('span').removeClass('disabled');
            $(this).find('td:eq(0)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(1)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(2)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(3)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(4)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(5)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(6)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(7)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(8)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(9)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(10)').removeClass().addClass('sno  text-center');
        }
    });
}


function unSelectSubjectInTarget(barcode){
    var sourceTable = $('#zero-config').DataTable();
    var sourceTableData = sourceTable.rows().nodes();
    $.each(sourceTableData, function(index, value){
        if($(this).find('button[type=button]').val() === barcode){
            // $(this).find('input[type=checkbox]').attr('disabled');
            // $(this).find('input[type=checkbox]').prop('checked', false);
            // $(this).find('span').addClass('disabled');
            $(this).find('td:eq(0)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(1)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(2)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(3)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(4)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(5)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(6)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(7)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(8)').removeClass().addClass('sid text-center');
            $(this).find('td:eq(9)').removeClass().addClass('sno text-center');
            $(this).find('td:eq(10)').removeClass().addClass('sno vis text-center');

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