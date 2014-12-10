
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
            Delay1: "Pulse Delay 1s",
            Delay2: "Pulse Delay 2s",
            Delay5: "Pulse Delay 5s",
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
        FadeOut: {
            Default: "Fade Out",
            Rotation: "Fade Out & Rotation"
        },
    };
    if (parallaxScroller != undefined)
        this.ParallaxScroller = parallaxScroller;
    this.StringFormat = "<div class='trigger {2}' data-animation='{0}' data-auto='{4}' data-repeat='{5}' data-trigger-name='{1}' style='{3}' ><span>Start {1}</span> <span class='auto'>Auto: <span>{4}</span></span><span class='repeat'>Repeat: <span>{5}</span></span><span>End {1}</span></div>";
}

ParallaxAnimation.prototype.SetUrl = function (url) {
    this.PopupUrl = url;
};
ParallaxAnimation.prototype.GetUrl = function (url) {
    return this.PopupUrl;
};
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
ParallaxAnimation.prototype.Set = function (elm, animation) {
    var stringFormat = this.StringFormat;
    var str0 = animation.value;
    var str1 = animation.name;
    var str2 = str0.substr(0, str0.indexOf('.'));
    var style = animation.style;
    var str4 = animation.auto == undefined ? false : animation.auto;
    var str5 = animation.repeat == undefined ? 0 : animation.repeat;
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
                $(elm).find('.' + str2).remove();
            } else {
                var $last = $(elm).find(".trigger-" + type + ":last-of-type");
                style = "top:" + parseInt($last.height() + $last.position().top + 1) + "px; " + style;
            }
        }
    }
    str2 += " trigger-" + type;

    $(elm).append(String.format(stringFormat, str0, str1, str2, style, str4, str5));
    $(elm).find('.trigger').resizable({ handles: "n,s" }).draggable({ axis: "y", cursor: "move" });
    return false;
};
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
            auto: $(this).data("auto")
        };
        animations[animations.length] = a;
    });
    return animations;
};
ParallaxAnimation.prototype.Buttons = function (elmHeight, elmTop, elmRepeat, elmAuto, elmDelete) {
    var p = this.ParallaxScroller;

    $(elmHeight + ", " + elmTop).on("change keyup", function () {
        var css = { height: $(elmHeight).val(), top: $(elmTop).val() };
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
        $(elmHeight).val($(this).outerHeight());
        $(elmTop).val($(this).position().top);
        $(elmRepeat).val($(this).data("repeat"));
        $(elmAuto).prop("checked", $(this).data("auto"));
        event.stopPropagation();
    });

    $(elmRepeat).on("change keyup", function () {
        $('.trigger.trigger-active').data("repeat", $(this).val().toString());
        $('.trigger.trigger-active').find('.repeat > span').text($(this).val());
    });
    $(elmAuto).on("change", function () {
        $('.trigger.trigger-active').data("auto", $(this).is(":checked"));
        $('.trigger.trigger-active').find('.auto > span').text($(this).is(":checked"));
    });

    $(elmDelete).on("click", function () {
        var del = confirm("Bạn chắc chắn muốn xóa animation?");
        if (del) {
            $('.trigger-active').remove();
        }
        return false;
    });
};

ParallaxAnimation.prototype.InitScroll = function () {
    this.Controller = new ScrollMagic();
};


ParallaxAnimation.prototype.Animation = function (animationElement, animation, duration, start, repeat, auto) {
    if (duration == undefined) duration = $(window).height() / 2;
    var triggerElement = createTrigger(animationElement, animation, duration, start);
    var slideId = getSlideId(animationElement);
    var triggerHook = "onEnter";
    var top = $(animationElement).offset().top - $(slideId).offset().top;

    if (animation == this.Emphasis.Parallax.Pin) {
        var triggerHook = "onLeave";
        return new ScrollScene({ triggerElement: triggerElement, duration: duration, offset: 0 })
        .setPin(animationElement)
        .triggerHook(triggerHook)
        .addTo(this.Controller);
    }

    repeat = (repeat == undefined || !auto) ? 0 : repeat;
    auto = auto == undefined ? false : auto;

    duration = auto ? (duration / 100).toFixed(1) : duration;


    var tween = false;
    var ease = Linear.easeNone;
    var offset = 0;
    //var top = $(animationElement).parent().hasClass("scrollmagic-pin-spacer") ? $(animationElement).parent().position().top : $(animationElement).position().top;
   
    switch (animation) {
        /******************************FLY In DEFAULT ****************************/
        case this.Entrance.FlyIn.Left:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { left: 0 - $(animationElement).width(), ease: ease });
                break;
            }
        case this.Entrance.FlyIn.Right:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { left: $(triggerElement).width() + $(animationElement).width(), ease: ease });

                break;
            }
        case this.Entrance.FlyIn.Top:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { top: 0 - $(animationElement).height(), ease: ease });
                break;
            }
        case this.Entrance.FlyIn.Bottom:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { top: $(slideId).height(), ease: ease });
                break;
            }
            /******************************FLY In Rotation ****************************/
        case this.Entrance.FlyIn.RotationLeft:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { left: 0 - $(animationElement).width(), rotation: 180, ease: ease });
                break;
            }
        case this.Entrance.FlyIn.RotationRight:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { left: $(triggerElement).width() + $(animationElement).width(), rotation: 180, ease: ease });
                break;
            }
        case this.Entrance.FlyIn.RotationTop:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { top: 0 - $(animationElement).height(), rotation: 180, ease: ease });
                break;
            }
        case this.Entrance.FlyIn.RotationBottom:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .from(animationElement, 0.1, { opacity: 0 })
                    .from(animationElement, duration, { top: $(triggerElement).height() + $(animationElement).height(), rotation: 180, ease: ease });
                break;
            }

            /******************************FLOAT In ****************************/
        case this.Entrance.FloatIn.Left:
            {
                tween = TweenMax.from(animationElement, duration, { left: $(animationElement).offset().left - 50, "opacity": 0, repeat: repeat, ease: ease });
                break;
            }
        case this.Entrance.FloatIn.Right:
            {
                tween = TweenMax.from(animationElement, duration, { left: $(animationElement).offset().left + 50, "opacity": 0, repeat: repeat, ease: ease });
                break;
            }
        case this.Entrance.FloatIn.Top:
            {
                top = $(animationElement).position().top == top ? top : $(animationElement).position().top;
                top -= 300;
                tween = TweenMax.from(animationElement, duration, { top: top, "opacity": 0, repeat: repeat, ease: ease });
                break;
            }
        case this.Entrance.FloatIn.Bottom:
            {
                tween = TweenMax.from(animationElement, duration, { top: top + 50 + $(triggerElement).offset().top, "opacity": 0, repeat: repeat, ease: ease });
                break;
            }
            /******************************ZOOM In ****************************/
        case this.Entrance.ZoomIn.Default:
            {
                tween = TweenMax.from(animationElement, duration, { scale: 0, "opacity": 0, repeat: repeat, ease: ease });
                break;
            }
        case this.Entrance.ZoomIn.Rotation:
            {
                tween = TweenMax.from(animationElement, duration, { rotation: 360, scale: 0, "opacity": 0, repeat: repeat, ease: ease });
                break;
            }
            /******************************FADE In ****************************/
        case this.Entrance.FadeIn.Default:
            {
                tween = TweenMax.from(animationElement, duration, { "opacity": 0, repeat: repeat, ease: ease });
                break;
            }
        case this.Entrance.FadeIn.Rotation:
            {
                tween = TweenMax.from(animationElement, duration, { rotation: 360, "opacity": 0, repeat: repeat, ease: ease });
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
                tween = TweenMax.to(animationElement, duration, { rotation: 360, repeat: repeat, ease: ease });
                break;
            }
            /******************************Pulse ****************************/
        case this.Emphasis.Pulse.Default:
            {
                tween = TweenMax.to(animationElement, duration, { opacity: 0.3, yoyo: true, repeat: repeat, ease: ease });
                break;
            }
        case this.Emphasis.Pulse.Delay1:
            {
                tween = TweenMax.to(animationElement, duration, { opacity: 0.3, yoyo: true, repeat: repeat, repeatDelay: 10, ease: ease });
                break;
            }
        case this.Emphasis.Pulse.Delay2:
            {
                tween = TweenMax.to(animationElement, duration, { opacity: 0.3, yoyo: true, repeat: repeat, delay: 2, repeatDelay: 2, ease: ease });
                break;
            }
        case this.Emphasis.Pulse.Delay5:
            {
                tween = TweenMax.to(animationElement, duration, { opacity: 0.3, yoyo: true, repeat: repeat, delay: 5, repeatDelay: 5, ease: ease });
                break;
            }
            /******************************move  ****************************/
        case this.Emphasis.Move.LeftRight:
            {
                var from = 0 - $(animationElement).width();
                var to = $(slideId).width() + $(animationElement).width();
                tween = TweenMax.fromTo(animationElement, duration, { left: from }, { left: to, repeat: repeat, ease: ease });
                break;
            }
        case this.Emphasis.Move.RightLeft:
            {
                var to = 0 - $(animationElement).width();
                var from = $(slideId).width() + $(animationElement).width();
                tween = TweenMax.fromTo(animationElement, duration, { left: from }, { left: to, repeat: repeat, ease: ease });
                break;
            }
        case this.Emphasis.Move.TopBottom:
            {
                alert($(slideId).height());
                var to = $(slideId).height();
                var from = 0 - $(animationElement).height();
                tween = new TimelineMax({ repeat: repeat })
                    .from(animationElement, 0.1, { opacity: 0, ease: ease })
                    .fromTo(animationElement, duration, { top: from }, { top: to, ease: ease })
                    .to(animationElement, 0.1, { opacity: 0, ease: ease });
                break;
            }
        case this.Emphasis.Move.BottomTop:
            {

                var from = $(slideId).height() + $(animationElement).height();
                var to = 0 - $(animationElement).height();
                tween = new TimelineMax({ repeat: repeat })
                    .from(animationElement, 0.1, { opacity: 0, ease: ease })
                    .fromTo(animationElement, duration, { top: from }, { top: to, ease: ease })
                    .to(animationElement, 0.1, { opacity: 0, ease: ease });
                break;
            }
        case this.Emphasis.Move.LeftRight100:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left - 100, ease: ease })
                    .to(animationElement, duration, { left: $(animationElement).position().left + 100, ease: ease })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left, ease: ease });
                break;
            }
        case this.Emphasis.Move.LeftRight200:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left - 200, ease: ease })
                    .to(animationElement, duration, { left: $(animationElement).position().left + 200, ease: ease })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left, ease: ease });
                break;
            }
        case this.Emphasis.Move.LeftRight500:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left - 500, ease: ease })
                    .to(animationElement, duration, { left: $(animationElement).position().left + 500, ease: ease })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left, ease: ease });
                break;
            }
        case this.Emphasis.Move.RightLeft100:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left + 100, ease: ease })
                    .to(animationElement, duration, { left: $(animationElement).position().left - 100, ease: ease })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left, ease: ease });
                break;
            }
        case this.Emphasis.Move.RightLeft200:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left + 200, ease: ease })
                    .to(animationElement, duration, { left: $(animationElement).position().left - 200, ease: ease })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left, ease: ease });
                break;
            }
        case this.Emphasis.Move.RightLeft500:
            {
                tween = new TimelineMax({ repeat: repeat })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left + 500, ease: ease })
                    .to(animationElement, duration, { left: $(animationElement).position().left - 500, ease: ease })
                    .to(animationElement, duration / 2, { left: $(animationElement).position().left, ease: ease });
                break;
            }
    }


    /***************ANIMATION EXIT*************************/
    switch (animation) {
        case this.Exit.FadeOut.Default:
            {

                tween = TweenMax.to(animationElement, duration, { "opacity": 0, repeat: repeat, ease: ease });
                break;
            }
        case this.Exit.FadeOut.Rotation:
            {
                tween = TweenMax.to(animationElement, duration, { rotation: 360, "opacity": 0, repeat: repeat, ease: ease });
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
ParallaxAnimation.prototype.Pin = function (animationElement, offset, heightPin) {
    //var tween;
    //if (heightPin == undefined) heightPin = 100;
    //if (offset == undefined) offset = 0;

    //var ease = Linear.easeNone;
    //var duration = heightPin;
    //var triggerHook = "onLeave";
    //var top = $(animationElement).position().top;
    //offset = -top;
    //return new ScrollScene({ triggerElement: animationElement, duration: duration, offset: offset })
    //    .setPin(animationElement)
    //    .triggerHook(triggerHook)
    //    .addTo(this.Controller);
};
ParallaxAnimation.prototype.Parallax = function (slideElement, panorama) {
    var triggerHook = "onEnter";
    var ease = Linear.easeNone;
    var duration = $(slideElement).height() * 2;
    var offset = 0;
    if (panorama) {
        ease = Circ.easeInOut;
        triggerHook = "onLeave";
        duration = $(slideElement).height() - $(window).height();
    }
    var tween = TweenMax.to(slideElement, 5, { backgroundPosition: "0% 100%", ease: ease });

    return new ScrollScene({ triggerElement: slideElement, duration: duration, offset: offset })
                     .setTween(tween)
                     .triggerHook(triggerHook)
                     .addTo(this.Controller);
};



function getSlideId(elm) {
    var $slide = $(elm);
    while (!$slide.hasClass('slide')) {
        $slide = $slide.parent();
    }
    return '#' + $slide.attr("id");
}

function createTrigger(elm, animation, duration, start) {
    if (start == undefined) start = 0;
    //name trigger
    var name = $(elm).attr("id") + animation;
    name = name.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '');;

    //position trigger
    var css = {
        width: $(elm).width(),
        height: duration,
        top: $(elm).position().top + start,
        left: $(elm).position().left,
    };
    if ($(elm).parent().hasClass("scrollmagic-pin-spacer")) {
        css.top += $(elm).parent().position().top;
    }

    // alert(name);
    var slide = getSlideId(elm);
    var html = "<div class='trigger " + name + "'></div>";
    $(slide).prepend(html);
    $('.' + name).css(css);

    return "." + name;
}