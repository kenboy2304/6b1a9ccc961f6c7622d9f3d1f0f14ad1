//OBJECT SLIDE
//INIT PARALLAX OBJECT
function ParallaxScroller(properties) {
    this.Slide = {
        Name: "slide",
        ActiveClass: '.slide.active',
        ControllerFormat: '<li class="sortable-item"><a  data-slide="#{0}" >{0}</a> </li>',
        StringFormat: "<div style='height:500px' class=\"slide\" id=\"{0}\"><div class='slide-content'></div></div>",
    };

    this.Layer = {
        Name: "layer",
        ActiveClass: '.layer.active',
        StringFormat: '<div class="layer" id="{0}" data-type="{1}">' +
                            '<div class="overlay"></div>' +
                            '<span class="layer-name">{2}</span>' +
                            '<div class="layer-content" style="width:100%;height:100%;">{3}</div>' +
                        '</div>',
        ControllerFormat: '<li class="sortable-item"><a data-layer="#{0}" >{1}</a></li>',
        Type: {
            Text: "<h1>Your Header Edit</h1>",
            Image: "<img src='/Content/Images/default.png'>",
            IFrame: "<h1>Iframe</h1>"
        },
        Editor: {
            Text: '<p><textarea class="editor set" id="Text" name="Text"></textarea></p>',
            Image: '<p><input class="editor set img" type="text" id="Image" name="ImageUrl" placeholder="Image Url" /></p>',
            IFrame: '<p>Link</p>' +
                    '<p><input class="editor" type="text" id="IFrameUrl" name="IFrameUrl" placeholder="IFrame Url" /></p>' +
                    '<p>Embed</p>' +
                    '<p><textarea class="editor set" id="IFrameEmbed" style="margin: 2px; width: 460px; height: 180px;" name="">' +
                    '</textarea></p>'
        }
    };
}

//IN IT
//in it slide 
ParallaxScroller.prototype.InitSlide = function (controllerId, wrapperId, startId) {

    this.Slide.WrapperId = wrapperId;
    this.Slide.ControllerId = controllerId,
    this.Slide.Id = startId != undefined ? startId : 0;
};
//in it layer
ParallaxScroller.prototype.InitLayer = function (controllerId, urlEditor, startId) {
    this.Layer.Id = startId != undefined ? startId : 0;
    this.Layer.ControllerId = controllerId != undefined ? controllerId : "#layer-wrapper";
    this.Layer.UrlEditor = urlEditor != undefined ? urlEditor : "/home/";
};


//IDENTIFY
//identify slide
ParallaxScroller.prototype.IdentifySlide = function () {
    this.Slide.Id++;
};

//identify layer
ParallaxScroller.prototype.IdentifyLayer = function () {
    this.Layer.Id++;
};


//GET ID
//get slideId
ParallaxScroller.prototype.GetSlideId = function (elmId) {
    if (elmId == undefined)
        return String(this.Slide.Name + this.Slide.Id);
    var $elm = $(elmId);
    while (!$elm.hasClass("slide")) {
        $elm = $elm.parent();
    }
    return $elm.attr("id");
};

//get layerId

ParallaxScroller.prototype.GetLayerId = function () {
    return this.Layer.Name + this.Layer.Id;
};

//GET CONTROLLER
//get slide controller
ParallaxScroller.prototype.GetSlideController = function () {
    return $(this.Slide.ControllerId);
};

//get layer controller
ParallaxScroller.prototype.GetLayerController = function () {
    return $(this.Layer.ControllerId);
};

//SET CONTROLLER
//set slide controller
ParallaxScroller.prototype.SetSlideController = function (controllerId) {
    this.Slide.ControllerId = controllerId;
};

//set layer controller
ParallaxScroller.prototype.SetLayerController = function (controllerId) {
    this.Layer.ControllerId = controllerId;
};

//GET ACTIVE
//get active slide
ParallaxScroller.prototype.GetActiveSlide = function () {
    return $(String('.' + this.Slide.Name + '.active'));
};
//get active slideId
ParallaxScroller.prototype.GetActiveSlideId = function () {
    return this.GetActiveSlide().attr("id");
};

//get active layer
ParallaxScroller.prototype.GetActiveLayer = function () {
    return $(String('.' + this.Layer.Name + '.active'));
};
//get active layerId
ParallaxScroller.prototype.GetActiveLayerId = function () {
    return $(this.GetActiveLayer()).attr("id");
};

//SET ACTIVE
//set active slide
ParallaxScroller.prototype.SetActiveSlide = function (slideId) {
    if (slideId == undefined) slideId = '#' + this.Slide.Name + this.Slide.Id;
    if (!$(slideId).hasClass('active')) {
        this.RemoveAllSlideActive();
        this.RemoveAllLayerActive();
        $(slideId.JqueryId()).addClass('active');
        $(this.GetSlideController()).find('[data-slide="' + slideId.JqueryId() + '"]').parent().addClass("active");
        this.SetLayersForSlide(slideId.JqueryId());
    }
    this.SetInputWidthHeight(slideId);
};

//set active layer
ParallaxScroller.prototype.SetActiveLayer = function (layerId) {
    if (layerId == undefined) layerId = '#' + this.Layer.Name + this.Layer.Id;
    if (!$(layerId).hasClass('active')) {
        var slideId = this.GetSlideId(layerId.JqueryId());
        this.SetActiveSlide(slideId);
        $(layerId.JqueryId()).addClass('active');
        $(this.GetLayerController()).find('[data-layer="' + layerId.JqueryId() + '"]').parent().addClass("active");
    }
    this.SetInputWidthHeight(layerId);
};

//GET WIDTH HEIGHT BUTTONS
ParallaxScroller.prototype.SetInputWidthHeight = function (elm) {

    //if ($(elm).indexOf("slide")>0 && this.Layer.Buttons.Width != undefined && this.Layer.Buttons.Width != undefined) {
    //    alert("layer");
    //}
    var slide = this.Slide;
    if (elm.indexOf("slide") >= 0
        && slide.Buttons.Width != undefined
        && slide.Buttons.Height != undefined) {
        $('.parallax-size').val("");
        $('.parallax-checked').prop("checked", false);
        $(slide.Buttons.Width).val($(elm.JqueryId()).outerWidth());
        $(slide.Buttons.Height).val($(elm.JqueryId()).outerHeight());
    }

    var layer = this.Layer;
    if (elm.indexOf("layer") >= 0
            && layer.Buttons.Width != undefined
            && layer.Buttons.Height != undefined
            && layer.Buttons.Top != undefined
            && layer.Buttons.Left != undefined) {
        $(layer.Buttons.Width).val($(elm.JqueryId()).outerWidth());
        $(layer.Buttons.Height).val($(elm.JqueryId()).outerHeight());
        $(layer.Buttons.Top).val($(elm.JqueryId()).position().top);
        $(layer.Buttons.Left).val($(elm.JqueryId()).position().left);
    }


};

//REMOVE ALL ACTIVE
//remove all slide active
ParallaxScroller.prototype.RemoveAllSlideActive = function () {
    $(this.GetActiveLayer()).find('.trigger-active').removeClass('trigger-active');
    $('.' + this.Slide.Name + ".active").removeClass('active');
    $(this.GetSlideController()).find('.active').removeClass('active');
};

//remove all layer active
ParallaxScroller.prototype.RemoveAllLayerActive = function () {
    $(this.GetActiveLayer()).removeClass('active');
    $(this.GetLayerController()).find('[data-layer]').parent().removeClass('active');
};


//BUTTONS CONTROL
//slide buttons
ParallaxScroller.prototype.SlideButtons = function (elmInsert, elmDelete, elmProperties, elmAnimation, elmWidth, elmHeight) {
    var p = this;
    this.Slide.Buttons = {
        Insert: elmInsert,
        Delete: elmDelete,
        Properties: elmProperties,
        Width: elmWidth,
        Height: elmHeight
    };
    $(elmInsert).on("click", function () {
        p.CreateSlide();
        p.SetActiveSlide();
        p.GotoSlide();
        return false;
    });

    $(elmDelete).on("click", function () {
        p.DeleteSlide();
        return false;
    });
    $(elmProperties).on("click", function () {
        p.Properties.OpenPopup(p.Slide.ActiveClass);
        return false;
    });
    $(elmAnimation).on("click", function () {
        p.Animation.Open(p.Slide.ActiveClass);
    });

    $(this.Slide.Buttons.Height).on("keyup change", function () {
        var slide = p.GetActiveSlide();
        var height = parseInt($(this).val());
        if (height != "")
            $(slide).stop().animate({ height: height }, 500);
    });
};
//layer buttons
ParallaxScroller.prototype.LayerButtons = function (elmInsert, elmDelete, elmProperties, elmAnimation, elmSize) {
    var p = this;
    var layer = this.Layer.ActiveClass;

    this.Layer.Buttons = {
        Insert: elmInsert,
        Delete: elmDelete,
        Properties: elmProperties,
        Width: elmSize.Width,
        Height: elmSize.Height,
        Top: elmSize.Top,
        Left: elmSize.Left
    };

    if (isObject(elmInsert)) {
        for (x in elmInsert) {
            $(elmInsert[x]).attr("data-layer", x);
            $(elmInsert[x]).on("click", function () {
                p.CreateLayer($(this).data("layer"));
                return false;
            });
        }
    }
    if (isObject(elmSize)) {
        var sizeInput = "";
        for (x in elmSize) {
            sizeInput += elmSize[x] + ", ";
        }
        sizeInput = sizeInput.substr(0, sizeInput.length - 2);
        $(sizeInput).on("change keyup", function () {
            var css =
            {
                width: $(elmSize.Width).val(),
                height: $(elmSize.Height).val(),
                top: $(elmSize.Top).val(),
                left: $(elmSize.Left).val(),
            };
            $(layer).stop().animate(css, 500);
        });
    }

    $(elmDelete).on("click", function () {
        p.DeleteLayer();
        return false;
    });

    $(elmProperties).on("click", function () {
        p.Properties.OpenPopup(layer);
        return false;
    });

    $(elmAnimation).on("click", function () {
        p.Animation.Open(p.Layer.ActiveClass);
    });
};

//CONTROL JS
//slide control js
ParallaxScroller.prototype.ControlSlide = function () {
    var p = this;
    $('body').delegate(".slide,[data-slide]", "click resizestart resize", function () {
        var goto = $(this).data("slide");
        var slideId = $(this).attr("id") ? $(this).attr("id") : $(this).data("slide");

        p.SetActiveSlide(slideId);
        if (goto != undefined) p.GotoSlide(slideId);
    });

    // SORTABLE
    $(this.GetSlideController()).on("sortstart", function (event, ui) {
        ui.item.startPos = ui.item.index();
    });

    $(this.GetSlideController()).on("sortstop", function (event, ui) {
        var start = ui.item.startPos;
        var end = ui.item.index();
        if (start != end) {
            var $elmStart = $(p.Slide.WrapperId + " ." + p.Slide.Name).eq(start);
            var $elmEnd = $(p.Slide.WrapperId + " ." + p.Slide.Name).eq(end);
            if (end > start)
                $elmStart.insertAfter($elmEnd);
            else
                $elmStart.insertBefore($elmEnd);
        }
    });
};
//layer control js
ParallaxScroller.prototype.ControlLayer = function () {
    var p = this;
    $('body').delegate(".layer", "click resizestart dragstart resize drag", function (event) {
        var layerId = $(this).attr("id") ? $(this).attr("id") : $(this).data("layer");
        p.SetActiveLayer(layerId);
        event.stopPropagation();
    });

    $('body').delegate("[data-layer]", "click", function (event) {
        var layerId = $(this).data("layer");
        p.SetActiveLayer(layerId);
        event.stopPropagation();
    });

    $('body').delegate('.layer', "dragstart", function () {
        $(this).find('.overlay').css("cursor", "move");
    });
    $('body').delegate('.layer', "dragstop", function () {
        $(this).find('.overlay').css("cursor", "default");
    });

    $('body').delegate('.layer', "resizestart", function (event, ui) {
        ui.element.paddingTop = $(ui.element).css("padding-top").replace("px", "");
        ui.element.paddingBottom = $(ui.element).css("padding-bottom").replace("px", "");
        ui.element.paddingLeft = $(ui.element).css("padding-left").replace("px", "");
        ui.element.paddingRight = $(ui.element).css("padding-right").replace("px", "");
        ui.originalSize.width = ui.originalSize.width + parseInt(ui.element.paddingLeft) + parseInt(ui.element.paddingRight);
        ui.originalSize.height = ui.originalSize.height + parseInt(ui.element.paddingTop) + parseInt(ui.element.paddingBottom);
    });
    $('body').delegate('.layer', "resize", function (event, ui) {
        //ui.size.width = ui.size.width + parseInt(ui.element.paddingLeft) + parseInt(ui.element.paddingRight);
    });


    $('body').delegate('.layer', "dblclick", function (event) {
        var type = $(this).data("type");
        p.OpenLayerEditor(type);
    });
    $('body').delegate('[data-layer]', "dblclick", function (event) {
        var name = prompt("Đổi tên", $(this).text());
        if (name != null) {
            p.RenameLayer(name,"lock");
        }
    });

    //sortable
    $(this.GetLayerController()).on("sortstart", function (event, ui) {
        ui.item.startPos = ui.item.index();
    });

    $(this.GetLayerController()).on("sortstop", function (event, ui) {

        var start = ui.item.startPos;
        var end = ui.item.index();

        if (start != end) {
            var $elmStart = $(p.GetActiveSlideId().JqueryId() + " ." + p.Layer.Name).eq(start);
            var $elmEnd = $(p.GetActiveSlideId().JqueryId() + " ." + p.Layer.Name).eq(end);
            if (end > start)
                $elmStart.insertAfter($elmEnd);
            else
                $elmStart.insertBefore($elmEnd);
        }
        p.SetIndexLayer();
    });
};

/************************************CRUD******************************************/
//CREATE
//Create slide
ParallaxScroller.prototype.CreateSlide = function () {
    this.IdentifySlide();
    var item = String.format(this.Slide.StringFormat, this.GetSlideId());
    var wrapper = this.Slide.WrapperId.JqueryId();
    $(wrapper).append(item);
    $(this.GetSlideController()).append(String.format(this.Slide.ControllerFormat, this.GetSlideId()));
    $(this.GetSlideId().JqueryId()).resizable({ handles: "s" });
};

//create layer
ParallaxScroller.prototype.CreateLayer = function (type) {

    this.IdentifyLayer();
    var name = this.Layer.Type[type].strip_tags() + " " + this.Layer.Id;
    var html = String.format(this.Layer.StringFormat, this.GetLayerId(), type, name, this.Layer.Type[type]);
    var slideId = this.GetActiveSlideId();
    if (slideId == undefined) {
        alert("Vui lòng tạo/chọn slide.");
        return false;
    }
    $(slideId.JqueryId()).prepend(html);
    $(this.GetLayerController()).prepend(String.format(this.Layer.ControllerFormat, this.GetLayerId(), name));
    $(this.GetLayerId().JqueryId()).draggable().rotatable().resizable({ handles: "n, e, s, w, se" });
    this.SetActiveLayer();
    this.SetIndexLayer();
    this.OpenLayerEditor(type);
    return false;
};

//DELETE
//Delete slide
ParallaxScroller.prototype.DeleteSlide = function () {
    var slideId = this.GetActiveSlide().attr("id");
    if (slideId == undefined) {
        alert("Chưa có slide nào được chọn?");
        return false;
    };
    var del = confirm("Bạn chắc chắn muốn xóa slide?");
    if (del) {
        slideId = slideId.JqueryId();
        //if prev exist select prev item
        if ($(slideId).prev().index() >= 0) {
            this.SetActiveSlide($(slideId).prev().attr("id"));
        }
        if ($(slideId).prev().index() < 0 && $(slideId).next().index() >= 0) {
            this.SetActiveSlide($(slideId).next().attr("id"));
        }
        $(slideId).remove();
        $(this.GetSlideController()).find('[data-slide=' + slideId + ']').parent().remove();
    }
    return false;
};
//delete layer

ParallaxScroller.prototype.DeleteLayer = function () {
    var del = confirm("Bạn chắc chắn muốn xóa layer?");
    if (del) {
        $(this.Layer.ActiveClass).remove();
        $(this.GetLayerController()).find('.active').remove();

    }
};




/**************************ONLY SLIDE**************************************/

//go to slide
ParallaxScroller.prototype.GotoSlide = function (slideId) {
    if (slideId == undefined || slideId == "") slideId = '#' + this.Slide.Name + this.Slide.Id;
    slideId = slideId.JqueryId();
    var pos = $(slideId).offset().top - 50;
    $("html, body").animate({ scrollTop: pos });
};

/**************************ONLY LAYER**************************************/
ParallaxScroller.prototype.SetLayersForSlide = function (slideId) {
    if (slideId == undefined) return false;
    var p = this;
    var html = "";
    $(slideId.JqueryId()).find('.' + this.Layer.Name).each(function () {
        var layerName = $(this).find('.layer-name').html().strip_tags();
        var layerId = $(this).attr("id");
        html += String.format(p.Layer.ControllerFormat, layerId, layerName);
    });
    $(p.GetLayerController()).html(html);

    return false;
};

//ParallaxScroller.prototype.SortableLayer = function () {
//    var p = this;
//};

//set index layer
ParallaxScroller.prototype.SetIndexLayer = function () {
    var zindex = $(this.Layer.ControllerId.JqueryId() + ' .sortable-item').length;
    $(this.Layer.ControllerId.JqueryId() + ' .sortable-item').each(function () {
        var eIndex = $(this).find('a').data("layer");
        $(eIndex).css({ "z-index": zindex });
        zindex--;
    });
};

//EDITTOR
//set url layer editor
ParallaxScroller.prototype.SetUrlEditor = function (url) {
    if (url != "" && url != undefined)
        this.Layer.UrlEditor = url;
};

//open layer editor
ParallaxScroller.prototype.OpenLayerEditor = function (type) {

    var layerEditorWindow = window.open(this.Layer.UrlEditor + '?type=' + type, "Insert Layer", "top=100, left=300, width=500, height=380,toolbar=no,menubar=no,scrollbars=yes");
    layerEditorWindow.LayerValue = this.GetActiveLayer().find('.layer-content').html();
};

//set value layer edited
ParallaxScroller.prototype.SetValueLayer = function (name, value, css) {
    this.GetActiveLayer().find('.layer-content').html(value);
    this.RenameLayer(name);
    if (css != undefined)
        this.GetActiveLayer().css(css);
};

//rename editor
ParallaxScroller.prototype.RenameLayer = function (name, lock) {
    var layerId = this.GetActiveLayerId().JqueryId();
    if ($(layerId).hasClass("lock-name")) {
        if (!lock) {
            return false;
        } else {
            $(layerId).find('.layer-name').html(name);
            $("[data-layer='" + layerId + "']").html(name);
            $(layerId).addClass("lock-name");
        }
    } else {
        $(layerId).find('.layer-name').html(name);
        $("[data-layer='" + layerId + "']").html(name);
        if (lock) {
            $(layerId).addClass("lock-name");
        }
    }
    
};



//PROPERTIES

//in it properties
ParallaxScroller.prototype.LoadPropertyScript = function (script, url) {
    var p = this;
    $.getScript(script, function (data, textStatus, jqxhr) {
        p.InitProperties(url);
    });
};

ParallaxScroller.prototype.InitProperties = function (url) {
    this.Properties = new ParallaxProperties(url != undefined ? url : "");
};
//set popup properties url
ParallaxScroller.prototype.SetProperties = function (url) {
    this.Properties.SetUrl(url);
};
//Open popup slide properties
ParallaxScroller.prototype.OpenSlideProperties = function () {
    this.Properties.OpenPopup(this.Slide.ActiveClass);
};
//Open popup layer properties
ParallaxScroller.prototype.OpenLayerProperties = function () {
    this.Properties.OpenPopup(this.Layer.ActiveClass);
};

/********************************ANIMATION***************************************/
//in it animation
ParallaxScroller.prototype.LoadAnimationScript = function (script, url, elmDuration, elmStart, elmRepeat, elmAuto, elmDelete) {
    var p = this;
    $.getScript(script, function () {
        p.InitAnimation(url, elmDuration, elmStart, elmRepeat, elmAuto, elmDelete);
    });
};

//in it animation
ParallaxScroller.prototype.InitAnimation = function (url, elmDuration, elmStart, elmRepeat, elmAuto, elmDelete) {
    this.Animation = new ParallaxAnimation(this);
    this.SetAnimationUrl(url);
    this.Animation.Buttons(elmDuration, elmStart, elmRepeat, elmAuto, elmDelete);
};
//set url
ParallaxScroller.prototype.SetAnimationUrl = function (url) {
    this.Animation.SetUrl(url);
};
//SET ANIMATION
//set slide animation
ParallaxScroller.prototype.SetAnimationSlide = function (animation) {

};
//set layer animation
ParallaxScroller.prototype.SetAnimationLayer = function (animation) {

};


//OPEN POPUP
//open popup slide animation
ParallaxScroller.prototype.OpenLayerAnimation = function () {
    this.Animation.Open(this.Slide.ActiveClass);
};

//open popup layer animation
ParallaxScroller.prototype.OpenLayerAnimation = function () {
    this.Animation.Open(this.Layer.ActiveClass);
};

//SYSTEM
//save
ParallaxScroller.prototype.Save = function (pId, pUrl) {
    var slides = [];
    var p = this;
    $('.slide').each(function (index, value) {
        var slide = {
            id: $(this).attr("id"),
            style: $(this).attr("style")
        };
        slide.animations = p.Animation.Get(slide.id);

        var layers = [];
        $(this).find('.layer').each(function () {
            var layer = {
                id: $(this).attr("id"),
                name: $(this).find('.layer-name').text(),
                lockname: $(this).hasClass("lock-name"),
                type: $(this).data("type"),
                style: $(this).attr("style"),
                content: $(this).find('.layer-content').html()
            };
            layer.animations = p.Animation.Get(layer.id);
            layers[layers.length] = layer;
        });
        slide.layers = layers;
        slides[slides.length] = slide;
    });
    var json = encodeURIComponent(JSON.stringify(slides));
    $.ajax({
        url: pUrl,
        type: 'POST',
        data: { id: pId, jsonString: json },
        success: function (result) {
            alert(result.Message);
        }
    });
};

ParallaxScroller.prototype.Open = function (slides) {

    slides = decodeURIComponent(slides);
    if (slides == '') return false;

    slides = JSON.parse(slides);
    var a = new ParallaxAnimation();
    var maxSlideId = 0;
    var maxLayerId = 0;
    for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        maxSlideId = GetMaxId(maxSlideId, slide.id);
        $(this.Slide.WrapperId).append(String.format(this.Slide.StringFormat, slide.id, this.Slide.Name));
        $(this.GetSlideController()).append(String.format(this.Slide.ControllerFormat, slide.id));
        $(slide.id.JqueryId()).attr("style", slide.style);
        //resizable slide
        $(slide.id.JqueryId()).resizable({ handles: "s" });

        for (var x = 0; x < slide.animations.length; x++) {
            var animationSlide = slide.animations[x];
            a.Set(slide.id.JqueryId(), animationSlide);
        }


        for (var j = 0; j < slide.layers.length; j++) {
            var layer = slide.layers[j];
            maxLayerId = GetMaxId(maxLayerId, layer.id);
            $(slide.id.JqueryId()).append(String.format(this.Layer.StringFormat, layer.id, layer.type, layer.name, layer.content));
            $(layer.id.JqueryId()).attr("style", layer.style);
            if (layer.lockname) {
                $(layer.id.JqueryId()).addClass("lock");
            }
            $(layer.id.JqueryId()).draggable().rotatable().resizable({ handles: "n, e, s, w, se" });

            for (var k = 0; k < layer.animations.length; k++) {
                var animationLayer = layer.animations[k];
                a.Set(layer.id.JqueryId(), animationLayer);
            }
            //for (var y = 0; x < layer.animations.length; y++) {
            //    //alert(y);
            //    //var animationLayer = layer.animation[y];
            //    //this.Animation.Set(layer.id.JqueryId(), animationLayer);
            //}
        }
        if (slides.length > 0) {
            this.SetActiveSlide(slides[0].id);
        }
    }
    this.Slide.Id = maxSlideId;
    this.Layer.Id = maxLayerId;
    return false;
};

function GetMaxId(maxId, elmId) {
    var id = parseInt(elmId.replace(/^\D+/g, ''));
    return id > maxId ? id : maxId;
}

function getHeight(elm) {

    var height = $(elm).height();
    height += parseInt($(elm).css("padding-top")) + parseInt($(elm).css("padding-bottom"));
    height += parseInt($(elm).css("border-top-width")) + parseInt($(elm).css("border-bottom-width"));
    return height;
}
function getWidth(elm) {

    var width = $(elm).width();
    width += parseInt($(elm).css("padding-left")) + parseInt($(elm).css("padding-right"));
    width += parseInt($(elm).css("border-left-width")) + parseInt($(elm).css("border-right-width"));
    return width;
}

