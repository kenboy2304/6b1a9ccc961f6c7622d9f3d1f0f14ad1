//OBJECT SLIDE
function ParallaxScroller(properties) {
    this.Slide = {
        Name: "slide",
        ActiveClass: '.slide.active',
        ControllerFormat: '<li class="sortable-item"><a  data-slide="#{0}" >{0}</a> </li>',
        StringFormat: "<div style='height:500px' class=\"slide\" id=\"{0}\"><div class='slide-content'></div>",
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

ParallaxScroller.prototype.InitProperties = function (script, url) {
    var p = this;
    $.getScript(script, function (data, textStatus, jqxhr) {
        console.log(data); // Data returned
        console.log(textStatus); // Success
        console.log(jqxhr.status); // 200
        console.log("Load was performed.");
        p.Properties = new ParallaxProperties(url != undefined ? url : "");
    });

};
ParallaxScroller.prototype.InitAnimation = function (script) {
    var p = this;
    $.getScript(script, function (data, textStatus, jqxhr) {
        console.log(data); // Data returned
        console.log(textStatus); // Success
        console.log(jqxhr.status); // 200
        console.log("Load was performed.");
        p.Animation = new ParallaxAnimation();
    });

};

ParallaxScroller.prototype.InitSlide = function (controllerId, wrapperId, startId) {

    this.Slide.WrapperId = wrapperId;
    this.Slide.ControllerId = controllerId,
    this.Slide.Id = startId != undefined ? startId : 0;
};

ParallaxScroller.prototype.SetProperties = function (url) {
    this.Properties.SetUrl(url);
};
ParallaxScroller.prototype.OpenSlideProperties = function () {
    this.Properties.OpenPopup(this.Slide.ActiveClass);
};

ParallaxScroller.prototype.ControlSlide = function () {
    var p = this;
    $('body').delegate(".slide,[data-slide]", "click resizestart", function () {
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

    $('body').delegate(".slide,[data-slide]", "click resize", function () {
        var slideId = $(this).attr("id") ? $(this).attr("id") : $(this).data("slide");
        var height = $(slideId.JqueryId()).height();
        var width = $(slideId.JqueryId()).width();
        $(p.Slide.Buttons.Height).val(height);
        $(p.Slide.Buttons.Width).val(width);
    });

    $(this.Slide.Buttons.Height).on("keyup keydown keypress blur", function () {
        var slide = p.GetActiveSlide();
        var height = parseInt($(this).val()) + parseInt($(slide).outerHeight()) - parseInt($(slide).height());
        if (height != "")
            $(slide).stop().animate({ height: height }, 500);
    });

};

ParallaxScroller.prototype.IdentifySlide = function () {
    this.Slide.Id++;
};
ParallaxScroller.prototype.GetSlideId = function (elmId) {
    if (elmId == undefined)
        return String(this.Slide.Name + this.Slide.Id);
    var $elm = $(elmId);
    while (!$elm.hasClass("slide")) {
        $elm = $elm.parent();
    }
    return $elm.attr("id");
};

//GET SET CONTROLLER
ParallaxScroller.prototype.GetSlideController = function () {
    return $(this.Slide.ControllerId);
};
ParallaxScroller.prototype.SetSlideController = function (controllerId) {
    this.Slide.ControllerId = controllerId;
};


//GET SET ACTIVE SLIDE
//get active slide
ParallaxScroller.prototype.GetActiveSlide = function () {
    return $(String('.' + this.Slide.Name + '.active'));
};
ParallaxScroller.prototype.GetActiveSlideId = function () {
    return this.GetActiveSlide().attr("id");
};
//set active slide
ParallaxScroller.prototype.SetActiveSlide = function (slideId) {
    if (slideId == undefined) slideId = '#' + this.Slide.Name + this.Slide.Id;
    this.RemoveAllSlideActive();
    this.RemoveAllLayerActive();
    $(slideId.JqueryId()).addClass('active');
    $(this.GetSlideController()).find('[data-slide="' + slideId.JqueryId() + '"]').parent().addClass("active");
    this.SetLayersForSlideController(slideId.JqueryId());
};
//remove all active slide
ParallaxScroller.prototype.RemoveAllSlideActive = function () {
    $('.' + this.Slide.Name + ".active").removeClass('active');
    $(this.GetSlideController()).find('.active').removeClass('active');
};

//GOTO SLIDE ID
ParallaxScroller.prototype.GotoSlide = function (slideId) {
    if (slideId == undefined || slideId == "") slideId = '#' + this.Slide.Name + this.Slide.Id;
    slideId = slideId.JqueryId();
    var pos = $(slideId).offset().top - 50;
    $("html, body").animate({ scrollTop: pos });
};

ParallaxScroller.prototype.SlideButtons = function (elmInsert, elmDelele, elmProperties, elmWidth, elmHeight) {
    var p = this;
    this.Slide.Buttons = {
        Insert: elmInsert,
        Delete: elmDelele,
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

    $(elmDelele).on("click", function () {
        p.DeleteSlide();
        return false;
    });
    $(elmProperties).on("click", function () {
        p.Properties.OpenPopup(p.Slide.ActiveClass);
        return false;
    });
};


//CRUD
//Create slide
ParallaxScroller.prototype.CreateSlide = function () {
    this.IdentifySlide();
    var item = String.format(this.Slide.StringFormat, this.GetSlideId());
    var wrapper = this.Slide.WrapperId.JqueryId();
    $(wrapper).append(item);
    $(this.GetSlideController()).append(String.format(this.Slide.ControllerFormat, this.GetSlideId()));
    $(this.GetSlideId().JqueryId()).resizable({ handles: "s" });
};
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


//LAYER OBJECT
ParallaxScroller.prototype.InitLayer = function (controllerId, urlEditor, startId) {
    this.Layer.Id = startId != undefined ? startId : 0;
    this.Layer.ControllerId = controllerId != undefined ? controllerId : "#layer-wrapper";
    this.Layer.UrlEditor = urlEditor != undefined ? urlEditor : "/home/";
};

ParallaxScroller.prototype.ControlLayer = function () {
    var p = this;
    $('body').delegate(".layer", "click resizestart dragstart", function (event) {
        var layerId = $(this).attr("id") ? $(this).attr("id") : $(this).data("layer");
        p.SetActiveLayer(layerId);
        event.stopPropagation();
    });
    this.SortableLayer();

    $('body').delegate('.layer', "dragstart", function () {
        $(this).find('.overlay').css("cursor", "move");
    });
    $('body').delegate('.layer', "dragstop", function () {
        $(this).find('.overlay').css("cursor", "default");
    });


    $('body').delegate('.layer', "dblclick", function (event) {
        var type = $(this).data("type");
        p.OpenEditor(type);
    });
    $('body').delegate('[data-layer]', "dblclick", function (event) {
        alert("okie");
    });
};

//ACTIVE
ParallaxScroller.prototype.GetActiveLayer = function () {
    return $(String('.' + this.Layer.Name + '.active'));
};
//get 
ParallaxScroller.prototype.GetActiveLayerId = function () {
    return $(this.GetActiveLayer()).attr("id");
};
//set
ParallaxScroller.prototype.SetActiveLayer = function (layerId) {
    if (layerId == undefined) layerId = '#' + this.Layer.Name + this.Layer.Id;
    var slideId = this.GetSlideId(layerId.JqueryId());
    this.SetActiveSlide(slideId);
    $(layerId.JqueryId()).addClass('active');
    $(this.GetLayerController()).find('[data-layer="' + layerId.JqueryId() + '"]').parent().addClass("active");
};
//remove
ParallaxScroller.prototype.RemoveAllLayerActive = function () {
    $(this.GetActiveLayer()).removeClass('active');
    $(this.GetLayerController()).find('[data-layer]').parent().removeClass('active');
};





ParallaxScroller.prototype.IdentifyLayer = function () {
    this.Layer.Id++;
};
ParallaxScroller.prototype.GetLayerId = function () {
    return this.Layer.Name + this.Layer.Id;
};
ParallaxScroller.prototype.SetLayersForSlideController = function (slideId) {
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

ParallaxScroller.prototype.LayerButtons = function (elmInsert, elmDelete, elmProperties, elmAnimation) {
    var p = this;
    var layer = this.Layer.ActiveClass;
    if (isObject(elmInsert)) {
        for (x in elmInsert) {
            $(elmInsert[x]).attr("data-layer", x);
            $(elmInsert[x]).on("click", function () {
                p.InsertLayer($(this).data("layer"));
                return false;
            });
        }
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
        var html = p.AnimationHTML(p.Animation);
        alert(html);
        $(elmAnimation).after(html);
        $.colorbox({
            html: String.format("<div style='width:500px; height:200px;'>{0}</div>", html)
        });
    });
};


ParallaxScroller.prototype.AnimationHTML = function (obj, name, root) {
    var animation = obj;
    var html = "<ul>";
    if (name == undefined) name = "";
    if (root == undefined) root = true;
    for (x in animation) {
        if(!isFunction(animation[x]))
        {
            if (isObject(animation[x])) {
                html += "<li><a>" + x + "</a>";
                html += this.AnimationHTML(animation[x], (name == "") ? x : name + "." + x, false);
                html += "</li>";
            } else {
                if (isString(animation[x])) {
                    html += "<li><a href='" + name + "." + x + "'>" + animation[x] + "</a></li>";
                }
            }
        }
    }
        html += "</ul>";
    return html;
};

//GET SET CONTROLLER
ParallaxScroller.prototype.GetLayerController = function () {
    return $(this.Layer.ControllerId);
};
ParallaxScroller.prototype.SetLayerController = function (controllerId) {
    this.Layer.ControllerId = controllerId;
};


ParallaxScroller.prototype.SortableLayer = function () {
    var p = this;

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

ParallaxScroller.prototype.SetIndexLayer = function () {
    var zindex = $(this.Layer.ControllerId.JqueryId() + ' .sortable-item').length;
    $(this.Layer.ControllerId.JqueryId() + ' .sortable-item').each(function () {
        var eIndex = $(this).find('a').data("layer");
        $(eIndex).css({ "z-index": zindex });
        zindex--;
    });
};

ParallaxScroller.prototype.InsertLayer = function (type) {

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
    $(this.GetLayerId().JqueryId()).draggable().resizable({ handles: "n, e, s, w, se" });
    this.SetActiveLayer();
    this.SetIndexLayer();
    this.OpenEditor(type);
    return false;
};


ParallaxScroller.prototype.DeleteLayer = function () {
    var del = confirm("Bạn chắc chắn muốn xóa layer?");
    if (del) {
        $(this.Layer.ActiveClass).remove();
        $(this.GetLayerController()).find('.active').remove();

    }
};


ParallaxScroller.prototype.SetUrlEditor = function (url) {
    if (url != "" && url != undefined)
        this.Layer.UrlEditor = url;
};

ParallaxScroller.prototype.OpenEditor = function (type) {

    var layerEditorWindow = window.open(this.Layer.UrlEditor + '?type=' + type, "Insert Layer", "top=100, left=300, width=500, height=380,toolbar=no,menubar=no,scrollbars=yes");
    layerEditorWindow.LayerValue = this.GetActiveLayer().find('.layer-content').html();
};
ParallaxScroller.prototype.SetValueLayer = function (name, value, css) {
    this.GetActiveLayer().find('.layer-content').html(value);
    this.GetActiveLayer().find('.layer-name').html(name);
    if (css != undefined)
        this.GetActiveLayer().css(css);
};

ParallaxScroller.prototype.RenameLayer = function (name, lock) {
    var layer = $('[data-layer=#"' + this.GetActiveLayerId().JqueryId() + '"]');
    alert($(layer).data("layer"));
};



