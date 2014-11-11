
$(function () {

    //SET DRAGABLE CONTROLLER, TOOLS
    $('.tabs').tabs();
    $('.sortable').sortable({ axis: "y", cursor: "move"});
    //$('#parallax-controller').resizable({ handles: "s", alsoResize: '.sortable' });

    $('#parallax-controller, #parallax-tools').draggable({ handle: ".move" });

    //HIDE ITEMS TOOLS
    $("#parallax-tools dt span").on("click", function () {
        var $dl = $(this).parent().next();
        if ($dl.is(":hidden")) {
            $(this).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');

        } else {
            $(this).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        }
        $dl.slideToggle(300);
    });
    
    //NAVBAR

    $('.logo').on("click", function () {
        if (!$('#parallax-navbar').is(":hidden")) {
            $(this).animate({ left: "-188px", opacity: 0.4 }, 500)
                .find('.glyphicon-chevron-left')
                .removeClass('glyphicon-chevron-left')
                .addClass('glyphicon-chevron-right');
            $('body').animate({ "padding-top": 0 }, 500);

            var top = $('#parallax-gridviews').position().top;
            $('#parallax-gridviews').animate({ top: top - 50 }, 500);

        } else {
            $(this).animate({ left: "0", opacity: 1 }, 500)
                .find('.glyphicon-chevron-right')
                .removeClass('glyphicon-chevron-right')
                .addClass('glyphicon-chevron-left');
            $('body').animate({ "padding-top": 50 }, 500);

            var top = $('#parallax-gridviews').position().top;
            $('#parallax-gridviews').animate({ top: top + 50 }, 500);

        }

        $("#parallax-navbar, #parallax-tools, #parallax-controller").fadeToggle(500);


    });

    //GRID
    $('.grid-color').colpick({
        colorScheme: 'dark',
        layout: 'hex',
        color: '7FFFD4',
        submit: 0,
        onChange: function (hsb, hex, rgb, el, bySetColor) {
            $(el).css('background-color', '#' + hex);
            $('#parallax-gridviews table td').css('border-color', '#' + hex);
            if (!bySetColor) $(el).val(hex);
        }
    }).keyup(function () {
        $(this).colpickSetColor(this.value);
    });

    $('.grid-btn').on("click", function () {
        $('#parallax-gridviews').fadeToggle();
    });

    $('.grid-cols, .grid-rows').on("change", function () {
        var cols = $('.grid-cols').val();
        var rows = $('.grid-rows').val();
        if (cols == "") {
            cols = 5;
            $('.grid-cols').val(cols);
        }
        if (rows == "") {
            rows = 5;
            $('.grid-rows').val(rows);
        }

        var height = ($(window).width() / cols) * rows;

        var html = "<table>";
        for (var i = 0; i < rows; i++) {
            html += "<tr>";
            for (var j = 0; j < cols; j++) {
                html += String.format("<td style='border-color:{0}'></td>", '#' + $('.grid-color').val());
            }
            html += "</tr>";
        }
        html += "</table>";
        $('#parallax-gridviews').html(html);
        $('#parallax-gridviews').css("height", height);
    });

    //FIXED GRID
    $('.grid-fixed').on("click", function () {
        var top = document.body.scrollTop;
        if ($(this).is(":checked")) {
            $('#parallax-gridviews').css({ position: "absolute", top: top + 50});
        } else {
            $('#parallax-gridviews').css({ position: "fixed", top :50});;
        }
    });
    

    //SLIDE
    
    //JS active slide;
    //$('body').delegate(".slide,[data-slide]", "click resizestart resize resizestop", function () {
    //    var goto = $(this).data("slide");
    //    var slideId = $(this).attr("id") ? $(this).attr("id") : $(this).data("slide");
    //    var s = new ParallaxSlide();
    //    s.SetActive(slideId);
    //    if (goto != undefined) s.Goto(slideId);
    //    var height = $(slideId.JqueryId()).height();
    //    var width = $(slideId.JqueryId()).width();

    //    $('.slide-height').val(height);
    //    $('.slide-width').val(width);
    //});

    //$('.slide-height,.slide-width').on("keyup keydown blur", function () {

    //    var slide = new ParallaxSlide().GetActive();
    //    var height = $('.slide-height').val();
    //    height++;
    //    if (height != "")
    //        $(slide).stop().animate({ height: height }, 500);

    //});

});



////JS SELECT LAYER
////click layer
//$("body").delegate(".slide .layer", "click", function () {
//    objPLayer.CurentId = $(this).attr("id");
//    fnLayerActive(elementID(objPLayer.CurentId));
//    return false;
//});

////JS drag layer
//$('body').delegate(".layer", "dragstart", function () {
//    fnLayerActive(elementID($(this).attr("id")));
//});
//$('body').delegate(".layer", "resizestart", function () {
//    fnLayerActive(elementID($(this).attr("id")));
//});

////JS select layer controller
//$(objPLayer.ControllerId).delegate(".sortable-item a", "click", function () {
//    fnLayerActive($(this).data("layer"));
//    return false;
//});

////JS CRUP
////JS EDIT LAYER
//$("body").delegate(".layer", "dblclick", function () {
//    var type = $(this).data("type");
//    objPLayer.CurentId = $(this).attr("id");
//    var value = "";
//    if (type == objPLayer.Type.Text || type == objPLayer.Type.Header) {
//        value = $(this).find(".layer-content").html();
//    } else if (type == objPLayer.Type.Image) {
//        value = $(this).find('img').attr("src");
//    }
//    fnLayerEditor($(this).data("type"), value);
//    return false;
//});

////JS CREATE LAYER
//$('.btn-create').on("click", function () {
//    var type = $(this).data("type");
//    fnLayerInsert(type);
//    return false;
//});

////JS DELETE LAYER
//$('.btn-del').on("click", function () {
//    var del = confirm("Bạn chắc chắn muốn xóa layer?");
//    if (del) {
//        $('.slide').find('.active').remove();
//        $(elementID(objPLayer.ControllerId)).find('.active').remove();

//    }
//    return false;

//});

////GENARAL

//$('.btn-slide-properties').on("click", function () {
//    var objActives = objPSlide.Actives();
//    if ($(objActives).length <= 0) alert("Vui lòng chọn/tạo slide");
//    else {
//        fnProperties(".slide.active");
//    }
//    return false;
//});

//$('.btn-layer-properties').on("click", function () {
//    var objActives = elementID(objPLayer.ActiveId());
//    if ($(objActives).length <= 0) alert("Vui lòng chọn/tạo layer");
//    else {
//        fnProperties(".layer.active");
//    }
//    return false;
//});

////JQUERY ACTIVE
//$('body').delegate(".slide", "click", function () {
//    var strSlideId = $(this).attr("id");
//    fnSlideActive(strSlideId);
//});

//$('body').delegate(objPSlide.ControllerId + " .sortable-item a", "click", function () {
//    fnSlideActive($(this).data("slide"));
//    fnSlideGoTo($(this).data("slide"));
//});

////JS LAYER 

////JS RENAMELAYER
//$(objPLayer.ControllerId).delegate(".sortable-item a", "dblclick", function () {
//    var name = prompt("Please enter your name", $(this).text());

//    if (name != null) {
//        setLayerName($(this).data("layer"), name, true);
//    }
//    return false;
//});
