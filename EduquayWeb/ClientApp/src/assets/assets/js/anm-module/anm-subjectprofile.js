function myFunctionSearch() {
    var x = document.getElementById("mySearch");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function myDefinition() {
    var x = document.getElementById("myTable");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

$("selector").steps({
    cssClass: 'circle wizard'
});
function submitSubject() {
    console.log('calling submit Subject function');
    $('#fadeinModal1').modal('show');
    return true;
}

function submitSubject(tabId) {
    console.log(tabId);
    if (tabId === 2) {
        subjectRegistration();
    }
    else if (tabId === 1) {
        SpouseRegistration();
    }
}

function SpouseRegistration() {
    console.log('calling submit Subject function');
    //$('#fadeinModal').modal('show');
    swal({

        title: '<p><i class="fa fa-check-circle"></i></p>Subject Profile Updated Successfully',
        padding: '2em',
    })
}
