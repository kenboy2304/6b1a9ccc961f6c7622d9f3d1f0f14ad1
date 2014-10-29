//Valirable Init()


//LAYER JS
var objPSlide =
{
    Id: 0,
    Text: "slide",
    Full: function() { return this.Text + this.Id; },
    ControllerId: "#slide-wrapper",
    Controller: function () { return $(this.ControllerId); },
    CurentId: "",
    ActiveId: function () { return $('.slide.active').attr("id"); },
    Actives: function () { return $('.slide.active'); }
    
};
setCurrentSlide();

function identifySlide() {
    objPSlide.Id++;
    setCurrentSlide();
}
function setCurrentSlide(value) {
    objPSlide.CurentId = value != undefined ? value : objPSlide.Full();
}

function initSlideObj(id,controllerId) {
    objPLayer.Id = id,
    objPLayer.ControllerId = elementID(controllerId);
    setCurrentSlide();
}


//ACTIVE SLIDE

//FN ACTIVE SLIDE
function fnSlideActive(element) {
        //  CHECK ELEMENT EXIST
    if (element == undefined) element = objPSlide.CurentId;
    element = elementID(element);
   //REMOVE ACTIVE SLIDE
    //remove active slide
    $(elementClass(objPSlide.Text)).removeClass('active');
    //remove active slide controll
    $(elementID(objPSlide.ControllerId)).find('.active').removeClass('active');

    //REMOVE ACTIVE LAYER
    //remove active layer controll
    $(elementClass(objPLayer.Text)).find('.active').removeClass('active');
    $(elementClass(objPLayer.Text)).removeClass('active');
    //active elemnet
    $(element).addClass("active");
    //active item in control slide
    $(elementID(objPSlide.ControllerId)).find('[data-slide="' + element + '"]').parent().addClass("active");
    fnSliceActiveChangeLayer(element);

}
function fnSliceActiveChangeLayer(element) {
    element = elementID(element);
    $(elementID(objPLayer.ControllerId)).find(".sortable-item").remove();
    $(element).find(elementClass(objPLayer.Text)).each(function() {
        var $name = $(this).find('.layer-name');
        fnInsertSortableItem("layer", $(this).attr("id"), $name.text(), $name.data("lock"),true);
    });
}

//FUNCTION SCROLL TO SLIDEf
function fnSlideGoTo(element) {
    if (element == undefined) element = objPSlide.CurentId;
    element = elementID(element);
    var p = $(element).offset().top-52 ;
    $("html, body").animate({ scrollTop: p  });
}

//INSERT SLIDE
function fnSlideInsert() {
    identifySlide();
    //INSERT SLIDE TO CONTAINER
    var html = "<div class=\"slide\" id=\"" + objPSlide.CurentId + "\"></div>";
    $('#slide-container').append(html);
    //INSERT SLIDE TO SLIDE CONTROLLER
    fnInsertSortableItem("slide", objPSlide.CurentId, objPSlide.CurentId);
    fnSlideActive(objPSlide.CurentId);
    fnSlideGoTo(objPSlide.CurentId);

}
function fnSlideDelete() {
    var slideId = elementID(objPSlide.ActiveId());
    var del = confirm("Bạn chắc chắn muốn xóa slide?");
    if (del) {
        //if prev exist select prev item
        if ($(slideId).prev().index() >= 0) {
            fnSlideActive($(slideId).prev().attr("id"));
        }
        if ($(slideId).prev().index() < 0 && $(slideId).next().index() >= 0) {
            fnSlideActive($(slideId).next().attr("id"));
        }
        $(slideId).remove();
        $(objPSlide.Controller).find('[data-slide=' + slideId + ']').parent().remove();
    }

}


//JQUERY ACTIVE
$('body').delegate(".slide", "click", function () {
    var strSlideId = $(this).attr("id");
    fnSlideActive(strSlideId);
});

$('body').delegate(objPSlide.ControllerId + " .sortable-item a", "click", function () {
    fnSlideActive($(this).data("slide"));
    fnSlideGoTo($(this).data("slide"));
});


//ITEMS JS
var objPLayer = {
    Text: "layer",
    Id: 0,
    Full: function() { return objPLayer.Text + objPLayer.Id; },
    CurentId: "",
    ActiveId: function () { return $('.layer.active').attr("id"); },
    ControllerId: "#layer-wrapper",
    Type: { Header: "header", Text: "text", Image: "image", Iframe: "iframe" },
    Default: { header: "<h1>Your Header Edit</h1>", text: "Your Text Edit", image: "/Content/Images/default.png", iframe: "IFrame" }
};
setCurentLayer();
function setCurentLayer(id) {
    if (id == undefined) objPLayer.CurentId = unelementID(objPLayer.Full());
    else {
        objPLayer.CurentId = unelementID(id);
    }
}

function identifyLayer() {
    objPLayer.Id++;
    setCurentLayer();
}

//c

var strUrl = {
    LayerEditor: "/Home/LayerEditor",
    Properties: "/Home/Properties"
};
function ctorUrl(layerUrl, slideUrl) {
    strUrl.LayerEditor = layerUrl;
    strUrl.Properties = slideUrl;
}

//jquery ui api

//SET INDEX LAYER
function  fnLayerSetIndex() {
    var zindex = $(elementID(objPLayer.ControllerId) + ' .sortable-item').length;
    $(elementID(objPLayer.ControllerId) + ' .sortable-item').each(function () {
        var eIndex = $(this).find('a').data("layer");
        $(eIndex).css({ "z-index": zindex });
        zindex--;
    });
}

function fnLayerActive(element) {
    $('.slide,' + elementID(objPLayer.ControllerId)).find('.active').removeClass('active');
    var elmSlideParent = elementID($(element).parent().attr("id"));
    if (!$(elmSlideParent).hasClass('active')) fnSlideActive(elmSlideParent);
    $(element).addClass("active");
    $(elementID(objPLayer.ControllerId)).find('[data-layer="' + element + '"]').parent().addClass("active");
}

//Layer Editor Window
function fnLayerEditor(type, value) {
    var newWindow = window.open(strUrl.LayerEditor + '?type=' + type, "Insert Layer", "top=100, left=300, width=500, height=380,toolbar=no,menubar=no,scrollbars=yes");
    newWindow.objValue = value;
}
//slide Editor Window
function fnProperties(element) {
    element = encodeURIComponent(element);
    var propertiesWindow = window.open(strUrl.Properties+"?element="+element, "Properties", "top=100, left=300, width=600, height=350,toolbar=no,menubar=no,scrollbars=yes");
}


function fnLayerInsert(strType) {
    var strSlideActive = $(elementID(objPSlide.ActiveId()));
    if (strSlideActive.length==0) alert("Vui lòng chọn/tạo slide để thêm layer!");
    else {
        identifyLayer();
        var html = "";
        //INSERT LAYER IN SLIDER ELEMENT
        if (strType == objPLayer.Type.Text || strType == objPLayer.Type.Header || strType == objPLayer.Type.Iframe) {
            html = '<div class="layer" id="' + unelementID(objPLayer.CurentId) + '" data-type="' + strType + '"><span class="layer-name">' + objPLayer.Default[strType].strip_tags() + '</span><div class="layer-content" style="width:100%;height:100%;">' + objPLayer.Default[strType] + '</div></div>';
            $(strSlideActive).prepend(html);
            
        //image
        } else {
            html = '<div class="layer" id="' + unelementID(objPLayer.CurentId) + '" data-type="' + strType + '"><span class="layer-name">' + objPLayer.Default[strType].strip_tags() + '</span><div class="layer-content" style="width:100%;height:100%;"><img src="' + objPLayer.Default[strType] + '" style="width:100%; height:100%;" /></div></div>';
            $(strSlideActive).prepend(html);
            $(elementID(objPLayer.CurentId)).css({ width: 100, height: 100 });
        }

        //INSERT LAYER TO CONTROL
        fnInsertSortableItem("layer", objPLayer.CurentId, strType);
        //call func Active
        fnLayerActive(elementID(objPLayer.CurentId));
        //set layer value
        fnLayerSetIndex();
        //drag and reiset
        $(elementID(objPLayer.CurentId)).draggable().resizable();
        //call windows wrapper
        fnLayerEditor(strType, objPLayer.Default[strType]);
    }
}

//set value layer
function setLayerValue(type, value, objCss) {
    var elmLayer = elementID(objPLayer.CurentId);
    if (value == "") value = objPLayer.Default[type];
    $(elmLayer).find('.layer-content').html(value);
    if(objCss!=undefined)
        $(elmLayer).css(objCss);
    $(elmLayer).draggable().resizable();
    var name = "";
    if (type == objPLayer.Type.Text || type == objPLayer.Type.Header)
        name = value.strip_tags();
    if (type == objPLayer.Type.Image) {
        name = $(value).attr("src").replace(/^.*[\\\/]/, '');
    }
    if (type == objPLayer.Type.Iframe) {
        name = $(value).attr("src");
        $(elmLayer).prepend("<div style='width:100%; height:100%; position: absolute; z-index:80;'></div>");
    }
    if (name == "") name = objPLayer.Default[type];
    setLayerName(elementID(objPLayer.CurentId), name);

}

//set name layer |lock | not lock |
function setLayerName(strLayerId, strName, lock) {
    strLayerId = elementID(strLayerId);
    //if hasLock
    //
    if (lock != undefined) {
        $(elementID(objPLayer.ControllerId)).find('[data-layer="' + strLayerId + '"]').attr('data-lock', true).html(strName);
        $(strLayerId).find('.layer-name').attr('data-lock', true).html(strName);
    //if not
    } else {
     
        var $elm = $(elementID(objPLayer.ControllerId)).find('[data-layer="' + elementID(strLayerId) + '"]');
        //check lock set value
        if ($elm.data("lock")==undefined) {
            $(strLayerId).find('.layer-name').html(strName);
            $elm.html(strName);
        }
    }
}

//JS LAYER 

//JS RENAMELAYER
$(objPLayer.ControllerId).delegate(".sortable-item a", "dblclick", function () {
    var name = prompt("Please enter your name", $(this).text());

    if (name != null) {
        setLayerName($(this).data("layer"), name, true);
    }
    return false;
});

//JS SELECT LAYER
//click layer
$("body").delegate(".slide .layer", "click", function () {
    objPLayer.CurentId = $(this).attr("id");
    fnLayerActive(elementID(objPLayer.CurentId));
    return false;
});

//JS drag layer
$('body').delegate(".layer", "dragstart", function () {
    fnLayerActive(elementID($(this).attr("id")));
});

//JS select layer controller
$(objPLayer.ControllerId).delegate(".sortable-item a", "click", function () {
    fnLayerActive($(this).data("layer"));
    return false;
});

//JS CRUP
//JS EDIT LAYER
$("body").delegate(".layer", "dblclick", function () {
    var type = $(this).data("type");
    objPLayer.CurentId = $(this).attr("id");
    var value = "";
    if (type == objPLayer.Type.Text || type == objPLayer.Type.Header) {
        value = $(this).find(".layer-content").html();
    } else if (type == objPLayer.Type.Image) {
        value = $(this).find('img').attr("src");
    }
    fnLayerEditor($(this).data("type"), value);
    return false;
});

//JS CREATE LAYER
$('.btn-create').on("click", function () {
    var type = $(this).data("type");
    fnLayerInsert(type);
    return false;
});

//JS DELETE LAYER
$('.btn-del').on("click", function () {
    var del = confirm("Bạn chắc chắn muốn xóa layer?");
    if (del) {
        $('.slide').find('.active').remove();
        $(elementID(objPLayer.ControllerId)).find('.active').remove();
        
    }
    return false;
    
});

//GENARAL

$('.btn-slide-properties').on("click", function () {
    var objActives = objPSlide.Actives();
    if ($(objActives).length <= 0) alert("Vui lòng chọn/tạo slide");
    else {
        fnProperties(".slide.active");
    }
    return false;
});

$('.btn-layer-properties').on("click", function () {
    var objActives = elementID(objPLayer.ActiveId());
    if ($(objActives).length <= 0) alert("Vui lòng chọn/tạo layer");
    else {
        fnProperties(".layer.active");
    }
    return false;
});

//Set CSS slide
function setProperties(elm, objCss, all) {
    elm = decodeURIComponent(elm);
    $(elm).css(objCss);
    return false;
}

// add before '#' of ID
function elementID(str) {
    if (str == "" || str == undefined || str[0] == '#') return str;
    return '#' + str;
}

// remove '#' of ID
function unelementID(str) {
    if (str == "" || str == undefined || str[0] != '#') return str;
    return str.substr(1, str.length);
}
// add before '#' of Class
function elementClass(str) {
    if (str == "" || str == undefined || str[0] == '.') return str;
    return '.' + str;
}

// remove '#' of Class
function unelementClass(str) {
    if (str == "" || str == undefined || str[0] != '.') return str;
    return str.substr(1, str.length);
}


//remove HTML tags
String.prototype.strip_tags = function () {
    return this.replace(/(<([^>]+)>)/ig, "");
};

//string Format
if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match;
        });
    };
}

//CONTROLLER ITEM

function fnInsertSortableItem(type, id, value, lock, append) {
    if (type == "layer") {
        var strLock = "";
        if (lock != undefined) strLock = " data-lock='true' ";

        if (append != undefined)
            $(objPLayer.ControllerId).append('<li class="sortable-item"><a href="#" ' + strLock + ' data-' + type + '="' + elementID(id) + '" >' + value + '</a> </li>');
        else
            $(objPLayer.ControllerId).prepend('<li class="sortable-item"><a href="#" ' + strLock + ' data-' + type + '="' + elementID(id) + '" >' + value + '</a> </li>');

    }
    if (type == "slide") {
        $(elementID(objPSlide.ControllerId)).append('<li class="sortable-item"><a href="#"  data-' + type + '="' + elementID(id) + '" >' + value + '</a> </li>');
    }
}


//FN Open

function fnOpen(slides) {
    slides = decodeURIComponent(slides);
    slides = JSON.parse(slides);
    var html = "";
    var htmlControl = "";
    var maxSlideId = 0;
    var maxLayerId = 0;
    //Insert Slide
    for (var i = 0; i < slides.length; i++) {
        //get max slideId
        var intSlideId = parseInt(slides[i]["id"].replace(/^\D+/g, ''));
        maxSlideId = intSlideId > maxSlideId ? intSlideId : maxSlideId;

        //HTML Control
        htmlControl += String.format("<li class='sortable-item'><a href='#' data-slide='#{0}'>{0}</a></li>", slides[i]["id"]);

        //HTML Data Slide
        html += String.format("<div class='slide' id='{0}' style='{1}'>", slides[i]["id"], slides[i]["style"]);
        var layers = slides[i]["layers"];
        //insert Layer
        for (var j = 0; j < layers.length; j++) {
            //get max layerId
            var intLayerId = parseInt(layers[j]["id"].replace(/^\D+/g, ''));
            maxLayerId = intLayerId > maxLayerId ? intLayerId : maxLayerId;
            
            //HTML data Layer
            
            html += String.format("<div class='layer' id='{0}' data-type='{1}' style='{2}'  >", layers[j]["id"], layers[j]["type"], layers[j]["style"]);
            if (layers[j]["type"] == objPLayer.Type.Iframe)
                html += "<div style='width:100%; height:100%; position: absolute; z-index:80;'></div>";
            html += String.format("<span class='layer-name'>{0}</span>", layers[j]["name"]);
            html += "<div class='layer-content' style='width:100%;height:100%;'>" + layers[j]["content"] + "</div>";
            html += "</div>";
        }
        //close slide
        html += "</div>";
    }
    //JQ HTML Controller
    $(objPSlide.ControllerId).html(htmlControl);
    //Update layerID and slideID
    objPLayer.Id = maxLayerId;
    objPSlide.Id = maxSlideId;
    //JQ HTML Data
    $('#slide-container').html(html);
    $('.layer').draggable().resizable();
    //Call Active First
    fnSlideActive(slides[0]["id"]);
}

//FN SAVE


function fnSave() {
    var slides = [];
    $('.slide').each(function(index, value) {
        var slide = {
            id: $(this).attr("id"),
            style: $(this).attr("style")
        };
        var layers = [];
        $(this).find('.layer').each(function() {
            var layer = {
                id: $(this).attr("id"),
                name: $(this).find('.layer-name').text(),
                type: $(this).data("type"),
                style: $(this).attr("style"),
                content: $(this).find('.layer-content').html()
            };
            layers[layers.length] = layer;
        });
        slide.layers = layers;
        slides[slides.length]=slide;
    });
    var json = encodeURIComponent(JSON.stringify(slides));
    $.ajax({
        url: pUrl,
        type: 'POST',
        data: { id: pId, jsonString:json},
        success: function (result) {
            alert(result.Message);
            // you could use the result.values dictionary here
        }
    });
    //saveAsFile(this, json, "slide");
}
function saveAsFile(link, content) {
    var blob = new Blob([content], { type: "text/text" });
    var url = URL.createObjectURL(blob);
    window.open(url, "_blank");
}
