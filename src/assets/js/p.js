window.canvas = new fabric.Canvas('c', { preserveObjectStacking:true });
window.onload = function () {
    $('#canvas').removeClass('d-none')
    var canvas = new fabric.Canvas("canvas");

    
    var rectangle = new fabric.Rect({
        width: 150,
        height: 150,
        fill: '',
        stroke: 'green',
        strokeWidth: 3
    });

    // Render the Rect in canvas
    canvas.add(rectangle);
    
}

$(document).ready(function() {
    var canvas = new fabric.Canvas("canvas");
    $("#create_map_area").click(function() {
        $('#canvas').removeClass('d-none')
        // Initiate a Rect instance
        console.log('sdfghj');
    var rectangle = new fabric.Rect({
        width: 150,
        height: 150,
        fill: '',
        stroke: 'deepgreen',
        strokeWidth: 3
    });

    // Render the Rect in canvas
    canvas.add(rectangle);
    // var img = new Image();
    // img.onload = function () {
    //     var img_ = new fabric.Image(img, {
    //         left: 0,
    //         top: 0,
    //         height: 1060,
    //         width: 690,
    //         selectable: true,
    //         hasControls: false,
    //         hasBorders: false
    //     });
    //     canvas.add(img_);
    //     img_.sendToBack();
    // };
    // img.src = 'https://api-dev.prameyanews.com/prameya/document/pdf/3_97_1670506538147_0.jpg';
    })
})