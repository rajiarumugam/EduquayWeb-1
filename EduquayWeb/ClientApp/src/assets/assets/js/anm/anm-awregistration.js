$(function () {
    $("selector").steps({
        cssClass: 'circle wizard'
    });
    
    $('input[name=post-format]').on('click init-post-format', function () {
        $('#gallery-box-yes').toggle($('#post-format-yes').prop('checked'));
    }).trigger('init-post-format');

    $('input[name=post-format]').on('click init-post-format', function () {
        $('#gallery-box-no').toggle($('#post-format-no').prop('checked'));
    }).trigger('init-post-format');

    $('input[name="intervaltype"]').click(function () {
        $('#antenatal-tab').toggleClass('active');
        $('#Types').toggleClass('active');
    });

    $('#inputGender').on('change', function() {
        if ( this.value == '1')
        {
          $("#business").show();
        }
        else
        {
          $("#business").hide();
        }
    });

    $('#inputChild').on('change', function() {
        if ( this.value == '1')
        {
          $("#businessnew").show();
        }
        else
        {
          $("#businessnew").hide();
        }
      });

      $('#zero-config').DataTable({
        "oLanguage": {
            "oPaginate": { "sPrevious": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>', "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' },
            "sInfo": "Showing page _PAGE_ of _PAGES_",
            "sSearch": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
            "sSearchPlaceholder": "Search...",
            "sLengthMenu": "Results :  _MENU_",
        },
        "stripeClasses": [],
        "lengthMenu": [7, 10, 20, 50],
        "pageLength": 7
    });

    $("select").change(function(){
        var str = "";
        str = $(this).get(0).options[$(this).get(0).selectedIndex].value;
        console.log(str);
        if(str == "0") {
            applyError($(this).get(0).id); return false;
        }
        else{
            applySuccess($(this).get(0).id); return false;
        }
    });

});


function myFunction() {
    var checkBox = document.getElementById("myCheck");
    var text = document.getElementById("text");
    if (checkBox.checked == true) {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

function isFormValid(tabId){
    var isError = false;
    var subject = {};

    var district = $('#inputDistrict option:selected').val();
    if(district <= 0) { applyError('inputDistrict'); isError = true; return false; }
    
    var chc = $('#inputCHC option:selected').val();
    if(chc <= 0) { applyError('inputCHC'); isError = true; return false; }

    var phc = $('#inputPHC option:selected').val();
    if(phc <= 0) { applyError('inputPHC'); isError = true; return false; }



    subject = {
        tabId: tabId,
        district: district,
        chc: chc,
        phc: phc
    };
    
    
    window.angularComponentReference.zone.run(() =>  {window.angularComponentReference.componentFn(tabId, JSON.stringify(subject));});

    //return true;
}

function submitSubject(){
    console.log('calling submit Subject function');
    $('#fadeinModal').modal('show');
    return true;
}

function submitSubject(tabId){
    console.log('tabId: ' + tabId);
    if (tabId === 2){
        subjectRegistration();
    }
    else if(tabId === 1){
        SpouseRegistration();
    }
}

function subjectRegistration(){
    console.log('calling submit Subject function');
    //$('#fadeinModal').modal('show');
    var titleText = '<p><i class="fa fa-exclamation-circle"></i></p>Shipment ID is THSIK2020321';
    swal({
      title: '<p><i class="fa fa-check-circle"></i></p>Subject ID is 1234567',
      padding: '2em',
      showCancelButton: true,
      confirmButtonText: 'Collect sample now',
    cancelButtonText: 'Collect sample later',
   }).then(function(result) {
        if(result.value){
          location.href="anccollection.html";
        }
   });
    return true;
} 

function Studentregistration(){
    console.log('calling submit Subject function');
    $('#fadeinModal2').modal('show');
    return true;
}

function applyError(ctrlId){
    var element = $('#' + ctrlId);
    element.addClass('in-error');
    var label = $("label[for='" + element.attr('id') + "']");
    label.addClass('in-error');
}

function  applySuccess(ctrlId){
    var element = $('#' + ctrlId);
    element.removeClass('in-error');
    var label = $("label[for='" + element.attr('id') + "']");
    label.removeClass('in-error');

}