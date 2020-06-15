$('.fa-print').click(function(e){
    e.preventDefault();
    e.stopPropagation();

    printJS({
        printable: 'print-area',
        type: 'html',
        targetStyles: ['*']
     });

});