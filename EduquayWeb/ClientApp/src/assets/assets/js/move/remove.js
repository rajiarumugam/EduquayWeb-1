$(document).ready(function(){
    $('input[type="checkbox"]').click(function(){
        if ($(this).prop('checked')) {
            var barcodeLabel = `<div class="vr">
                                    <span class="label-content" barcode="${$(this).val()}">
                                        <div class="vT">${$(this).val()}</div>
                                        <div class="vM"></div>
                                    </span>
                                </div>`;
            $('#barcode-container').append(barcodeLabel);
         }
         else {
            var bc = $(this).val();
            $('div.vr').each(function(){
                if( $(this).children().attr('barcode') === bc){
                    $(this).remove();
                    return false;
                }
            });
         }
    });

    $(document).on('click','.vM', function(){
        var bc = $(this).closest('span').attr('barcode');
        $(this).parent().closest('div').remove();
        $('input[type=checkbox]:checked').each(function () {
            if($(this).val() === bc){
                $(this).prop('checked', false);
                return false;
            }
        });
    });
  });