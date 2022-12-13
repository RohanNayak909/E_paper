var desc = tinymce.init({
    height: 200,
    plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools'
    ],
    //   toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    //   toolbar2: 'print preview media | forecolor backcolor emoticons',
    selector: '#EpaperMapForm_description',
    setup: function (ed) {
        ed.on('keyup', function (e) {
            $("#EpaperMapForm_description").val(ed.getContent());
        });
        ed.on('change', function (e) {
            $("#EpaperMapForm_description").val(ed.getContent());
        });
    }

});

var originalSize = 123;
var canvasSize = parseInt($("#canvas").css("width"));
var ratio = 0;
// var ratio = formatNumber(originalSize / canvasSize, 4);

var canvasHeight = parseInt($("#canvas").css("height"));
var height = 0;
var newTop = 0;

var Helpers = {
    getUID: function () {
        var x = Math.floor((Math.random() * 1000) + 1);
        var y = Math.floor((Math.random() * 2000) + 1000);
        var z = Date.now();
        return "uid-" + (x * y * z).toString();
    }
}
var x = '';
var y = '';
var w = '';
var h = '';
var mapid = '';
var pg_id = '';
var id = '';
 
// function Map(x, y, w, h, mapid) {
//     x = x;
//     y = y;
//     w = w;
//     h = h;
//     ratio = ratio;
//     mapid = mapid;
//     pg_id = 1;
//     id = 1;
// }

var MapCollection = new function () {
    this.collection = [];

    this.add = function (map) {
        this.collection.push(map);
        MapCollectionCanvas.add(map);

        return map.id;
    };
    this.removeByIndex = function (index) {
        MapCollectionCanvas.remove(this.collection[index].id);
        this.collection.splice(index, 1);

    };
    this.removeById = function (id) {
        var index = this.getIndexById(id);
        this.removeByIndex(index);
    };
    this.getIndexById = function (id) {
        for (var k in this.collection) {
            if (this.collection[k].id === id) {
                return k;
            }
        }
    };
    this.getIndexByMapId = function (mapid) {
        for (var k in this.collection) {
            if (this.collection[k].mapid === mapid) {
                return k;
            }
        }
    };
};

// var MapCollectionCanvas = new function () {
//     var alive = function (id) {
//         var index = MapCollection.getIndexById(id);

//         MapCollection.collection[index].w = parseFloat($("#" + id).css("width")) + 12;
//         MapCollection.collection[index].h = parseFloat($("#" + id).css("height")) + 12;
//         MapCollection.collection[index].x = parseFloat($("#" + id).css("left"));
//         MapCollection.collection[index].y = parseFloat($("#" + id).css("top"));
//         $("#" + id).removeClass("area-saved").addClass("area-unsaved");
//     };
//     var alive2 = function (id) {
//         var index = MapCollection.getIndexById(id);

//         MapCollection.collection[index].w = parseFloat($("#" + id).css("width")) + 12;
//         MapCollection.collection[index].h = parseFloat($("#" + id).css("height")) + 12;
//         MapCollection.collection[index].x = parseFloat($("#" + id).css("left"));
//         MapCollection.collection[index].y = parseFloat($("#" + id).css("top"));

//     };
//     this.add = function (map) {
//         var activeclass = "";
//         if (map.mapid !== undefined) {
//             activeclass = "area-saved"
//         } else {
//             activeclass = "area-unsaved"
//         }
//         var string = '<div id="' + map.id + '" data-id="' + map.id + '" data-mapid="' + map.mapid + '" class="area ' + activeclass + ' " style="box-sizing: content-box; top: ' + (map.y / map.ratio) + 'px; left: ' + (map.x / map.ratio) + 'px; width: ' + ((map.w / map.ratio) - 12) + 'px; height: ' + ((map.h / map.ratio) - 12) + 'px;">';

//         string += '<a href="#" data-id="' + map.id + '" class="btnSave btn btn-primary btn-xs"><span class=" glyphicon glyphicon-floppy-disk"></span></a> ';
//         string += '<a href="#" data-id="' + map.id + '" class="btnEdit btn btn-success btn-xs"><span class="glyphicon glyphicon-pencil"></span></a> ';
//         string += '<a href="#" data-id="' + map.id + '" class="btnDelete btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span></a>  ';
//         string += "</div>";
//         $("#canvas").append(string);
//         alive2(map.id);
//         $(".area").resizable({
//             handles: "n, e, s, w, nw, ne, sw, se",
//             minHeight: 1,
//             minWidth: 1,
//             resize: function (e, ui) {
//                 var id = $(this).attr("id");
//                 //                    var w = parseFloat($("#" + id).css("width"));
//                 //                    var h = parseFloat($("#" + id).css("height"));
//                 //                     
//                 //                    $("#" + id).css("width", w + "px");
//                 //                    $("#" + id).css("height", h + "px");
//                 alive(id);
//                 height = parseInt($('#' + map.id).css("height"), 10);
//             }
//         }).draggable({
//             drag: function () {
//                 var id = $(this).attr("id");
//                 alive(id);
//                 height = parseInt($('#' + map.id).css("height"), 10);
//             }
//         });



//     };
//     this.remove = function (id) {
//         var mapid = $("#" + id).attr("data-mapid");

//         if (mapid === "undefined" || mapid === "") {
//             $("#" + id).remove();
//         } else {
//             if (confirm("Are you sure?")) {
//                 $.ajax({
//                     data: { mapid: mapid },
//                     url: "",
//                     success: function (response) {
//                         $("#" + id).remove();
//                     }
//                 });
//             }
//         }
//     };
//     this.save = function (id) {
//         var index = MapCollection.getIndexById(id);
//         $.ajax({
//             data: MapCollection.collection[index],
//             url: "",
//             success: function (response) {
//                 $("#" + id).attr("data-mapid", response.data.result.id).removeClass("area-unsaved").addClass("area-saved");
//                 MapCollection.collection[index].mapid = response.data.result.id;

//                 document.dispatchEvent(new CustomEvent("afterSavingMap"));
//             }
//         });
//     };
// };

$(".btn-toolbar #btnAdd").on("click", function () {
    alert("sagar")
    var id = MapCollection.add(new Map(0, 0, 150 * ratio, 150 * ratio));

    if (newTop >= (canvasHeight / 2)) {
        newTop = newTop / 2;
        //newTop = (height + 10) + newTop;
        $("#" + id).css("top", newTop);
    }
    else {
        if (height == 0) {
            newTop = (height) + newTop;
            $("#" + id).css("top", newTop);
        }
        else {
            newTop = (height + 10) + newTop;
            $("#" + id).css("top", newTop);
        }
    }
});
$(document).on("click", ".btnSave", function (e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    $(document).off("afterSavingMap");
    MapCollectionCanvas.save(id);
});
$(document).on("click", ".btnDelete", function (e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    MapCollection.removeById(id);
});