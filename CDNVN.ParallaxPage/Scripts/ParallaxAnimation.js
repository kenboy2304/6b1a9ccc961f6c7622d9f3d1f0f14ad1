﻿
function ParallaxAnimation(parallaxScroller) {
    //DEFINE ANIMATION
    // Entrance
    this.Entrance =
    {
        FlyIn: {
            Left: "Fly In Left",
            RotationLeft: "Fly In Left & Rotation",
            Right: "Fly In Right",
            RotationRight: "Fly In Right & Rotation",
            Top: "Fly In Top",
            RotationTop: "Fly In Top & Rotation",
            Bottom: "Fly In Bottom",
            RotationBottom: "Fly In Bottom & Rotation",
        },
        FloatIn: {
            Left: "Float In left",
            Right: "Float In Right",
            Top: "Float In Top",
            Bottom: "Float In Bottom",
        },
        FadeIn: {
            Default: "Fade In",
            Rotation: "Fade In & Rotation"
        },
        ZoomIn: {
            Default: "Zoom In",
            Rotation: "Zoom In & Rotation"
        },
    };
    this.Emphasis = {
        Parallax: {
            Default: "Parallax",
            Pin: "Pin"
        },
        Spin: {
            Default: "Spin",
            Teeter: "Teeter",
        },
        Pulse: {
            Default: "Pulse",
        },
        Move: {
            LeftRight: "Left To Right",
            RightLeft: "Right To Left",
            TopBottom: "Top to Bottom",
            BottomTop: "Bottom To Top",
            LeftRight100: "Left: -100px & Right: 100px",
            LeftRight200: "Left: -200px & Right: 200px",
            LeftRight500: "Left: -500px & Right: 500px",
            RightLeft100: "Right: 100px & Left: -100px",
            RightLeft200: "Right: 100px & Left: -100px",
            RightLeft500: "Right: 100px & Left: -100px",
        }
    };
    this.Exit = {
        FlyOut: {
            Left: "Fly Out Left",
            RotationLeft: "Fly Out Left & Rotation",
            Right: "Fly Out Right",
            RotationRight: "Fly Out Right & Rotation",
            Top: "Fly Out Top",
            RotationTop: "Fly Out Top & Rotation",
            Bottom: "Fly Out Bottom",
            RotationBottom: "Fly Out Bottom & Rotation",
        },
        FadeOut: {
            Default: "Fade Out",
            Rotation: "Fade Out & Rotation"
        },
    };
    if (parallaxScroller != undefined)
        this.ParallaxScroller = parallaxScroller;
    this.StringFormat = "<div class='trigger {2}' data-animation='{0}' data-auto='{4}' data-repeat='{5}' data-delay='{6}' data-trigger-name='{1}' style='{3}' >" +
                        "<span>Start {1}</span> " +
                        "<span class='auto'>Auto: <span>{4}</span></span>" +
                        "<span class='repeat'>Repeat: <span>{5}</span></span>" +
                        "<span class='delay'>Delay: <span>{6}</span></span>" +
                        "<span>End {1}</span></div>";
    this.ControllerFormat = '<li class="sortable-item"><a data-element="{0}" >{1}</a></li>' ;
}


//SET GET URL POPUP ANIMATIONS
ParallaxAnimation.prototype.SetUrl = function (url) {
    this.PopupUrl = url;
};
ParallaxAnimation.prototype.GetUrl = function (url) {
    return this.PopupUrl;
};

//OPEN POPUP ANIMATIONS
ParallaxAnimation.prototype.Open = function (elm) {
    if ($(elm).attr("id") == undefined) {
        alert("Vui lòng tạo/chọn slide hoặc layer");
        return false;
    };
    var height = 500;
    var width = 400;
    var top = screen.height / 2 - height / 2 - 50;
    var left = screen.width / 2 - width / 2;
    var animationWindow = window.open(this.PopupUrl + "?element=" + elm, "Parallax Animation", "top=" + top + ", left=" + left + ", width=" + width + ", height=" + height + "'location=no,toolbar=no,menubar=no,resizable=no");
    return false;
};


//SET CONTROLLER MANGAGER
ParallaxAnimation.prototype.SetAnimationController = function(elmId) {
    elmId = elmId.JqueryId();
    var a = this;
    $("#animation-controller").empty();
    if ($(elmId + " > .trigger").length) $("#parallax-controller2").show(); else $("#parallax-controller2").hide();
    $(elmId + " > .trigger").each(function(index) {
        var name = $(this).data("animation");
        var item = String.format(a.ControllerFormat, elmId, name);
        $("#animation-controller").append(item);
    });
};

//SET ANIMATIONs FOR SLIDE/LAYER
ParallaxAnimation.prototype.Set = function (elm, animation) {
    var stringFormat = this.StringFormat;
    var str0 = animation.value;
    var str1 = animation.name;
    var str2 = str0.substr(0, str0.indexOf('.'));
    var style = animation.style;
    var str4 = animation.auto == undefined ? false : animation.auto;
    var str5 = animation.repeat == undefined ? 0 : animation.repeat;
    var str6 = animation.delay == undefined ? 0 : animation.delay;
    var type = "";
    type = (elm.indexOf("layer") >= 0) ? "layer" : type;
    type = (elm.indexOf("slide") >= 0) ? "slide" : type;
    if (style == undefined) {
        style = (elm.indexOf("layer") >= 0) ? 'left:-150px;' : style;
        style = (elm.indexOf("slide") >= 0) ? 'right:0; height:50%;' : style;
        if ($(elm).find('.trigger-' + type).length > 0) {
            var styleCheck = $(elm).find('.' + str2).attr("style");
            if (styleCheck != undefined) {
                style = styleCheck;
                str4 = $(elm).find('.' + str2).data("auto");
                str5 = $(elm).find('.' + str2).data("repeat");
                $(elm+' > .' + str2).remove();
                
            } else {
                var $last = $(elm).find(".trigger-" + type + ":last-of-type");
                style = "top:" + parseInt($last.height() + $last.position().top + 1) + "px; " + style;
            }
        }
    }
    str2 += " trigger-" + type;

    $(elm).append(String.format(stringFormat, str0, str1, str2, style, str4, str5, str6));
    $("#animation-controller").append(String.format(this.ControllerFormat, elm.JqueryId(), str0));
    var elmId = "#" + $(elm).attr("id");
    if ($(elmId).hasClass("layer")) {
        $("[data-layer='" + elmId + "']").parent().addClass("item-animation");
    }
    if ($(elmId).hasClass("slide")) {
        $("[data-slide='" + elmId + "']").parent().addClass("item-animation");
    }
    $(elm).find('.trigger').resizable({ handles: "n,s" }).draggable({ axis: "y", cursor: "move" });
    return false;
};

//GET ANIMATIONS OF SLIDE//LAYER
ParallaxAnimation.prototype.Get = function (elm) {
    elm = elm.JqueryId();
    var type = "";
    type = (elm.indexOf("layer") >= 0) ? "layer" : type;
    type = (elm.indexOf("slide") >= 0) ? "slide" : type;

    var animations = [];
    $(elm).find('.trigger-' + type).each(function () {
        var a = {
            name: $(this).attr("data-trigger-name"),
            value: $(this).attr("data-animation"),
            style: $(this).attr("style"),
            duration: $(this).outerHeight(),
            start: $(this).position().top,
            repeat: $(this).data("repeat"),
            auto: $(this).data("auto"),
            delay: $(this).data("delay")
        };

        animations[animations.length] = a;
    });
    return animations;
};

//ANIMATION CONTROL
ParallaxAnimation.prototype.Buttons = function (elmHeight, elmTop, elmRepeat, elmAuto, elmDelay) {
    var p = this.ParallaxScroller;

    $(elmHeight + ", " + elmTop).on("change keyup", function () {
        var css = { height: $(elmHeight).val() };
        if (p.GetActiveLayerId()) {
            css.top = parseInt($(elmTop).val()) - $(p.GetActiveLayer()).position().top;
        } else {
            css.top = parseInt($(elmTop).val());
        }
        $(".trigger-active").stop().animate(css, 500);
    });

    $('body').delegate('.trigger', "click drag resize", function (event) {
        var parent = "#" + $(this).parent().attr("id");
        if ($(parent).hasClass('slide')) {
            p.SetActiveSlide(parent);
        }
        if ($(parent).hasClass('layer')) {
            p.SetActiveLayer(parent);
        }
        $('.trigger.trigger-active').removeClass('trigger-active');
        $(this).addClass('trigger-active');
        var nameTrigger = $(this).data("animation");

        $("#animation-controller .sortable-item.active").removeClass("active");
        $("#animation-controller").find("[data-element='" + parent + "']").each(function() {
            if ($(this).text() == nameTrigger) {
                $(this).parent().addClass("active");
            }
        });

        setValueController(this);
        $('.control-input').hide();
        $('#animatiton-input').show();
        if ($(parent).hasClass("slide")) $('#slide-input').show();
        if ($(parent).hasClass("layer")) $('#layer-input').show();
        $('.context-menu-shadow').prev().hide();
        $('.context-menu-shadow').hide();
        event.stopPropagation();
    });

    $('#animation-controller').delegate(' .sortable-item a', "click", function() {
        $("#animation-controller").find(".sortable-item").removeClass("active");
        $(this).parent().addClass("active");
        var elm = $(this).data("element");

        $('.trigger.trigger-active').removeClass('trigger-active');
        var triggerName = $(this).text();
        $(elm + " > .trigger").each(function () {
            if ($(this).data("animation") == triggerName) {
                $(this).addClass('trigger-active');
                setValueController(this);
            }
        });
        $('.control-input').hide();
        $('#animatiton-input').show();
        if ($(elm).hasClass("slide")) $('#slide-input').show();
        if ($(elm).hasClass("layer")) $('#layer-input').show();


    });

    $(elmRepeat).on("change keyup", function () {
        $('.trigger.trigger-active').data("repeat", $(this).val().toString());
        $('.trigger.trigger-active').find('.repeat > span').text($(this).val());
    });
    $(elmDelay).on("change keyup", function () {
        $('.trigger.trigger-active').data("delay", $(this).val().toString());
        $('.trigger.trigger-active').find('.delay > span').text($(this).val());
    });
    $(elmAuto).on("change", function () {
        $('.trigger.trigger-active').data("auto", $(this).is(":checked"));
        $('.trigger.trigger-active').find('.auto > span').text($(this).is(":checked"));
    });

    function setValueController(elmAnimation) {
        $(elmHeight).val($(elmAnimation).outerHeight());
        if ($(elmAnimation).parent().hasClass("layer")) {
            $(elmTop).val($(elmAnimation).position().top + $(elmAnimation).parent().position().top);
        } else if ($(elmAnimation).parent().hasClass("slide")) {
            $(elmTop).val($(elmAnimation).position().top);
        }
        $(elmRepeat).val($(elmAnimation).data("repeat"));
        $(elmDelay).val($(elmAnimation).data("delay"));
        $(elmAuto).prop("checked", $(elmAnimation).data("auto"));
    }
};


//SETUP SCROLL MAGIC
ParallaxAnimation.prototype.InitScroll = function () {
    this.Controller = new ScrollMagic();
};

//RUN ANIMATION
ParallaxAnimation.prototype.Animation = function (animationElement, animation, duration, start, repeat, auto, delay) {
    duration = duration == undefined ? ($(window).height() / 2) : duration;
    var triggerElement = createTrigger(animationElement, animation, duration, start, auto);
    if (!auto || animation == "Pin") duration = $(triggerElement).height();
    var slideId = getSlideId(animationElement);
    var triggerHook = "onEnter";
    var top = $(animationElement).offset().top - $(slideId).offset().top;

    if (animation == this.Emphasis.Parallax.Pin) {
        triggerHook = "onLeave";
        return new ScrollScene({ triggerElement: triggerElement, duration: duration, offset: 0 })
        .setPin(animationElement)
        .triggerHook(triggerHook)
        .addTo(this.Controller);
    }


    auto = auto == undefined ? false : auto;

    duration = auto ? (duration / 100).toFixed(1) : duration;

    delay = delay == undefined ? 0 : delay;
    repeat = (repeat == undefined || !auto) ? 0 : repeat;
    var repeatDelay = { repeat: repeat, delay: delay };

    var tween = false;
    var ease = Linear.easeNone;
    var offset = 0;
    //var top = $(animationElement).parent().hasClass("scrollmagic-pin-spacer") ? $(animationElement).parent().position().top : $(animationElement).position().top;

    switch (animation) {
        /******************************FLY In DEFAULT ****************************/
        case this.Entrance.FlyIn.Left:
            {
                tween = new TimelineMax(repeatDelay)
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { left: 0 - $(animationElement).width(), ease: ease });
                break;
            }
        case this.Entrance.FlyIn.Right:
            {
                tween = new TimelineMax(repeatDelay)
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { left: $(slideId).width() + $(animationElement).width(), ease: ease });

                break;
            }
        case this.Entrance.FlyIn.Top:
            {
                tween = new TimelineMax(repeatDelay)
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { top: 0 - $(animationElement).height(), ease: ease });
                break;
            }
        case this.Entrance.FlyIn.Bottom:
            {
                tween = new TimelineMax(repeatDelay)
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { top: $(slideId).height(), ease: ease });
                break;
            }
            /******************************FLY In Rotation ****************************/
        case this.Entrance.FlyIn.RotationLeft:
            {
                tween = new TimelineMax(repeatDelay)
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { left: 0 - $(animationElement).width(), rotation: 180, ease: ease });
                break;
            }
        case this.Entrance.FlyIn.RotationRight:
            {
                tween = new TimelineMax(repeatDelay)
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { left: $(slideId).width() + $(animationElement).width(), rotation: 180, ease: ease });
                break;
            }
        case this.Entrance.FlyIn.RotationTop:
            {
                tween = new TimelineMax(repeatDelay)
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { top: 0 - $(animationElement).height(), rotation: 180, ease: ease });
                break;
            }
        case this.Entrance.FlyIn.RotationBottom:
            {
                tween = new TimelineMax(repeatDelay)
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { top: $(triggerElement).height() + $(animationElement).height(), rotation: 180, ease: ease });
                break;
            }

            /******************************FLOAT In ****************************/
        case this.Entrance.FloatIn.Left:
            {
                tween = TweenMax.from(animationElement, duration, { left: $(animationElement).offset().left - 50, "opacity": 0, repeat: repeat, delay: delay, ease: ease });
                break;
            }
        case this.Entrance.FloatIn.Right:
            {
                tween = TweenMax.from(animationElement, duration, { left: $(animationElement).offset().left + 50, "opacity": 0, repeat: repeat, delay: delay, ease: ease });
                break;
            }
        case this.Entrance.FloatIn.Top:
            {
                tween = TweenMax.from(animationElement, duration, { top: top - 50, "opacity": 0, repeat: repeat, delay: delay, ease: ease });
                break;
            }
        case this.Entrance.FloatIn.Bottom:
            {
                tween = TweenMax.from(animationElement, duration, { top: top + 50, "opacity": 0, repeat: repeat, delay: delay, ease: ease });
                break;
            }
            /******************************ZOOM In ****************************/
        case this.Entrance.ZoomIn.Default:
            {
                tween = TweenMax.from(animationElement, duration, { scale: 0, "opacity": 0, repeat: repeat, delay: delay, ease: ease });
                break;
            }
        case this.Entrance.ZoomIn.Rotation:
            {
                tween = TweenMax.from(animationElement, duration, { rotation: 360, scale: 0, "opacity": 0, repeat: repeat, delay: delay, ease: ease });
                break;
            }
            /******************************FADE In ****************************/
        case this.Entrance.FadeIn.Default:
            {
                tween = TweenMax.from(animationElement, duration, { "opacity": 0, repeat: repeat, delay: delay, ease: ease });
                break;
            }
        case this.Entrance.FadeIn.Rotation:
            {
                tween = TweenMax.from(animationElement, duration, { rotation: 360, "opacity": 0, repeat: repeat, delay: delay, ease: ease });
                break;
            }
    }


    //AMINATION EMPHASIS
    switch (animation) {

        /******************************Paralax ****************************/
        case this.Emphasis.Parallax.Default:
            {
                auto = false;
                triggerElement = slideId;
                if (animationElement.indexOf("layer") >= 0) {
                    tween = TweenMax.fromTo(animationElement, duration, { top: top + duration }, { top: top - duration, ease: ease });
                }
                if (animationElement.indexOf("slide") >= 0) {
                    tween = TweenMax.to(animationElement, duration, { backgroundPosition: "0% 100%", ease: ease });
                }
                duration = $(slideId).height() * 2;
                break;
            }
            /******************************Spin teeter ****************************/
        case this.Emphasis.Spin.Teeter:
            {
                var aDuration = auto ? duration : 1.2;
                tween = new TimelineMax({ repeat: -1 })
                    .to(animationElement, (aDuration / 4).toFixed(1), { rotation: "-=5", ease: ease })
                    .to(animationElement, (aDuration / 2).toFixed(1), { rotation: "+=10", ease: ease })
                    .to(animationElement, (aDuration / 4).toFixed(1), { rotation: "-=5", ease: ease });
                break;
            }
        case this.Emphasis.Spin.Default:
            {
                tween = TweenMax.to(animationElement, duration, { rotation: 360, repeat: repeat, delay: delay, ease: ease });
                break;
            }
            /******************************Pulse ****************************/
        case this.Emphasis.Pulse.Default:
            {
                tween = TweenMax.to(animationElement, duration, { opacity: 0.3, yoyo: true, repeat: repeat, delay: delay, ease: ease });
                break;
            }
            /******************************move  ****************************/
        case this.Emphasis.Move.LeftRight:
            {
                var from = 0 - $(animationElement).width();
                var to = $(slideId).width() + $(animationElement).width();
                tween = TweenMax.fromTo(animationElement, duration, { left: from }, { left: to, repeat: repeat, delay: delay, ease: ease });
                break;
            }
        case this.Emphasis.Move.RightLeft:
            {
                var to = 0 - $(animationElement).width();
                var from = $(slideId).width() + $(animationElement).width();
                tween = TweenMax.fromTo(animationElement, duration, { left: from }, { left: to, repeat: repeat, delay: delay, ease: ease });
                break;
            }
        case this.Emphasis.Move.TopBottom:
            {
                var to = $(slideId).height();
                var from = 0 - $(animationElement).height();
                tween = new TimelineMax(repeatDelay)
                    .from(animationElement, 0.1, { opacity: 0, ease: ease })
                    .fromTo(animationElement, duration, { top: from }, { top: to, ease: ease })
                    .to(animationElement, 0.1, { opacity: 0, ease: ease });
                break;
            }
        case this.Emphasis.Move.BottomTop:
            {

                var from = $(slideId).height() + $(animationElement).height();
                var to = 0 - $(animationElement).height();
                tween = new TimelineMax(repeatDelay)
                    .from(animationElement, 0.1, { opacity: 0, ease: ease })
                    .fromTo(animationElement, duration, { top: from }, { top: to, ease: ease })
                    .to(animationElement, 0.1, { opacity: 0, ease: ease });
                break;
            }
        case this.Emphasis.Move.LeftRight100:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left - 100, ease: ease })
                    .to(animationElement, duration, { left: $(animationElement).position().left + 100, ease: ease })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left, ease: ease });
                break;
            }
        case this.Emphasis.Move.LeftRight200:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left - 200, ease: ease })
                    .to(animationElement, duration, { left: $(animationElement).position().left + 200, ease: ease })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left, ease: ease });
                break;
            }
        case this.Emphasis.Move.LeftRight500:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left - 500, ease: ease })
                    .to(animationElement, duration, { left: $(animationElement).position().left + 500, ease: ease })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left, ease: ease });
                break;
            }
        case this.Emphasis.Move.RightLeft100:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left + 100, ease: ease })
                    .to(animationElement, duration, { left: $(animationElement).position().left - 100, ease: ease })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left, ease: ease });
                break;
            }
        case this.Emphasis.Move.RightLeft200:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left + 200, ease: ease })
                    .to(animationElement, duration, { left: $(animationElement).position().left - 200, ease: ease })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left, ease: ease });
                break;
            }
        case this.Emphasis.Move.RightLeft500:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left + 500, ease: ease })
                    .to(animationElement, duration, { left: $(animationElement).position().left - 500, ease: ease })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left, ease: ease });
                break;
            }
    }


    /***************ANIMATION EXIT*************************/
    switch (animation) {

        /******************************FLY OUT ****************************/
        case this.Exit.FlyOut.Left:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration, { left: 0 - $(animationElement).width(), ease: ease })
                    .to(animationElement, 0.1, { opacity: 0 });
                break;
            }
        case this.Exit.FlyOut.Right:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration, { left: $(slideId).width() + $(animationElement).width(), ease: ease })
                    .to(animationElement, 0.1, { opacity: 0 });

                break;
            }
        case this.Exit.FlyOut.Top:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration, { top: 0 - $(animationElement).height(), ease: ease })
                    .to(animationElement, 0.1, { opacity: 0 });
                break;
            }
        case this.Exit.FlyOut.Bottom:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration, { top: $(slideId).height(), ease: ease })
                    .to(animationElement, 0.1, { opacity: 0 });
                break;
            }
            /******************************FLY OUR & ROTATION****************************/
        case this.Exit.FlyOut.RotationLeft:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration, { left: 0 - $(animationElement).width(), rotation: 180, ease: ease })
                    .to(animationElement, 0.1, { opacity: 0 });
                break;
            }
        case this.Exit.FlyOut.RotationRight:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration, { left: $(slideId).width() + $(animationElement).width(), rotation: 180, ease: ease })
                    .to(animationElement, 0.1, { opacity: 0 });
                break;
            }
        case this.Exit.FlyOut.RotationTop:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration, { top: 0 - $(animationElement).height(), rotation: 180, ease: ease })
                    .to(animationElement, 0.1, { opacity: 0 });
                break;
            }
        case this.Exit.FlyOut.RotationBottom:
            {
                tween = new TimelineMax(repeatDelay)
                    .to(animationElement, duration, { top: $(triggerElement).height() + $(animationElement).height(), rotation: 180, ease: ease })
                    .to(animationElement, 0.1, { opacity: 0 });
                break;
            }


        case this.Exit.FadeOut.Default:
            {

                tween = TweenMax.to(animationElement, duration, { "opacity": 0, repeat: repeat, delay: delay, ease: ease });
                break;
            }
        case this.Exit.FadeOut.Rotation:
            {
                tween = TweenMax.to(animationElement, duration, { rotation: 360, "opacity": 0, repeat: repeat, delay: delay, ease: ease });
                break;
            }
    }
    var scene = auto ?
    new ScrollScene({ triggerElement: triggerElement })
                             .setTween(tween)
                             .triggerHook(triggerHook)
                             .addTo(this.Controller)
    :
    new ScrollScene({ triggerElement: triggerElement, duration: duration, offset: offset })
                             .setTween(tween)
                             .triggerHook(triggerHook)
                             .addTo(this.Controller);
    return scene;
};


//FUNCITON GET SLIDE ID
function getSlideId(elm) {
    var $slide = $(elm);
    while (!$slide.hasClass('slide')) {
        $slide = $slide.parent();
    }
    return '#' + $slide.attr("id");
}

//FUNCTION CREATE TRIGGER FOR DETAIL PAGE
function createTrigger(elm, animation, duration, start) {
    if (start == undefined) start = 0;
    //name trigger
    var name = $(elm).attr("id") + animation;
    name = name.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '');
    //position trigger
    var css = {
        width: $(elm).width(),
        height: duration * zoomPercent(),
        top: ($(elm).offset().top + start * zoomPercent()),
        left: ($(elm).offset().left),
    };
    if ($(elm).parent().hasClass("scrollmagic-pin-spacer")) {
        css.top += $(elm).parent().position().top;
    }
    if (!$('#trigger-container').length) {
        $('body').prepend("<div id='trigger-container'></div>");
    }
    var html = "<div class='trigger " + name + "' data-element='" + elm + "'>" + name + "</div>";
    $("#trigger-container").append(html);

    //$(slide).prepend(html);
    $('.' + name).css(css);

    return "." + name;
}

//FUNCTION CREATE TRIGGER FOR DETAIL PAGE
function zoomPercent(w) {
    w = w == undefined ? 1349 : w;
    var zoom = ($(window).width() / w).toFixed(10);
    return zoom;
}