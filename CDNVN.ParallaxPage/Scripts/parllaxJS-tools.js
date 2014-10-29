$(function () {
    
    //TOOLS CONTROLLER
    //dragable
    $('.p-controller').draggable();
    
    //
    $("dt span").on("click", function () {
    var $dl = $(this).parent().next();
        if ($dl.is(":hidden")) {
            $(this).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
            $dl.slideDown(300);
        } else {
            $(this).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
            $dl.slideUp(300);
            
    }
});

    //  item-eye
    $('.btn-showname').on("click", function () {
        if ($(this).find("[class$='open']").length > 0) {
            $('#slide-container').addClass("hide-name");
            $(this).find("i").removeAttr("class").attr("class", "glyphicon glyphicon-eye-close");
        }
        else if ($(this).find("[class$='close']").length > 0) {
            $(this).find("i").removeAttr("class").attr("class", "glyphicon glyphicon-eye-open");
            $('#slide-container').removeClass("hide-name");
        }
        return false;
    });
    $('.tabs').tabs();
    //VIEW CONTROLLER
    //sortable
    $(".sortable").sortable({
        start: function (event, ui) {
            ui.item.startPos = ui.item.index();
        },
        stop: function (event, ui) {
            var startPos = ui.item.startPos;
            var endPos = ui.item.index();
            if (startPos != endPos) {
                var pWrapper = "#slide-container";
                var pItem = ".slide";
                if (ui.item.find('[data-layer]').length > 0) {
                    pWrapper = objPSlide.ActiveId();
                    pItem = ".layer";
                }
                var startLayer = $(elementID(pWrapper) + ' ' + pItem).eq(startPos).attr("id");
                var endLayer = $(elementID(pWrapper) + ' ' + pItem).eq(endPos).attr("id");
                if (startPos > endPos)
                    $(elementID(startLayer)).insertBefore(elementID(endLayer));
                else
                    $(elementID(startLayer)).insertAfter(elementID(endLayer));

                //if item is layer change z-index layer
                if (ui.item.find('[data-layer]').length > 0)
                    fnLayerSetIndex();
            }
        }
    }).disableSelection();
    //JQUERY ACTION

})