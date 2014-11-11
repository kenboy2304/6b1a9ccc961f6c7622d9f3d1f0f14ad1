
function ParallaxAnimation() {
    //DEFINE ANIMATION
    // Entrance
    this.Entrance =
    {
        FlyIn: {
            Left: "Fly In Left",
            RotationLeft: "Fly In Left & Rotation",
            Right: "Fly In Right",
            RotationRight: "Fly In Right & Rotation",
            Top: "Fly In top",
            RotationTop: "Fly In top & Rotation",
            Bottom: "Fly In Bottom",
            RotationBottom: "Fly In Bottom & Rotation",
        },
        FloatIn: {
            Left: "Float In left",
            Right: "Float In Right",
            Top: "Float In top",
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
            Top: "Parallax Top",
            Bottom: "Parallax Bottom"
        },
    };
    this.Exit = {        
        FadeOut: {
            Default: "Fade Out",
            Rotation: "Fade Out & Rotation"
        },
    };
}
ParallaxAnimation.prototype.Init = function () {
    this.Controller = new ScrollMagic();
};


ParallaxAnimation.prototype.Animation = function (animationElement, animation, duration, delay) {
    if (duration == undefined) duration = $(window).height() / 2;
    var triggerElement = createTrigger(animationElement, animation, duration, delay);
    
    var slideId = getSlideId(animationElement);
    var tween = false;
    var ease = Linear.easeNone;
    
    var offset = 0;
  
  
    var top = $(animationElement).offset().top - $(slideId).offset().top;
    var triggerHook = "onEnter";
    

    switch (animation) {
        /******************************FLY In DEFAULT ****************************/
        case this.Entrance.FlyIn.Left:
            {
                tween = TweenMax.from(animationElement, 1, { left: 0 - $(animationElement).width(), "opacity": 0, ease: ease });
                break;
            }
        case this.Entrance.FlyIn.Right:
            {
                tween = TweenMax.from(animationElement, 1, { left: $(triggerElement).width() + $(animationElement).width(), "opacity": 0, ease: ease });
                break;
            }
        case this.Entrance.FlyIn.Top:
            {
                tween = TweenMax.from(animationElement, 1, { top: 0 - $(animationElement).height(), "opacity": 0, ease: ease });
                break;
            }
        case this.Entrance.FlyIn.Bottom:
            {
                tween = TweenMax.from(animationElement, 1, { top: $(triggerElement).height() + $(animationElement).height(), "opacity": 0, ease: ease });
                break;
            }
            /******************************FLY In Rotation ****************************/
        case this.Entrance.FlyIn.RotationLeft:
            {
                tween = TweenMax.from(animationElement, 1, { left: 0 - $(animationElement).width(), Rotation: 180, "opacity": 0, ease: ease });
                break;
            }
        case this.Entrance.FlyIn.RotationRight:
            {
                tween = TweenMax.from(animationElement, 1, { left: $(triggerElement).width() + $(animationElement).width(), Rotation: 180, "opacity": 0, ease: ease });
                break;
            }
        case this.Entrance.FlyIn.RotationTop:
            {
                tween = TweenMax.from(animationElement, 1, { top: 0 - $(animationElement).height(), Rotation: 180, "opacity": 0, ease: ease });
                break;
            }
        case this.Entrance.FlyIn.RotationBottom:
            {
                tween = TweenMax.from(animationElement, 1, { top: $(triggerElement).height() + $(animationElement).height(), Rotation: 180, "opacity": 0, ease: ease });
                break;
            }

            /******************************FLOAT In ****************************/
        case this.Entrance.FloatIn.Left:
            {
                tween = TweenMax.from(animationElement, 1, { left: $(animationElement).offset().left - 50, "opacity": 0, ease: ease });
                break;
            }
        case this.Entrance.FloatIn.Right:
            {
                tween = TweenMax.from(animationElement, 1, { left: $(animationElement).offset().left + 50, "opacity": 0, ease: ease });
                break;
            }
        case this.Entrance.FloatIn.Top:
            {
                
                tween = TweenMax.from(animationElement, 1, { top: top - 50, "opacity": 0, ease: ease });
                break;
            }
        case this.Entrance.FloatIn.Bottom:
            {
                tween = TweenMax.from(animationElement, 1, { top: top + 50 + $(triggerElement).offset().top, "opacity": 0, ease: ease });
                break;
            }
        /******************************ZOOM In ****************************/
        case this.Entrance.ZoomIn.Default:
            {
                tween = TweenMax.from(animationElement, 1, { scale: 0, "opacity": 0, ease: ease });
                break;
            }
        case this.Entrance.ZoomIn.Rotation:
            {
                tween = TweenMax.from(animationElement, 1, { Rotation: 360, scale: 0, "opacity": 0, ease: ease });
                break;
            }
            /******************************FADE In ****************************/
        case this.Entrance.FadeIn.Default:
            {
                tween = TweenMax.from(animationElement, 1, { "opacity": 0, ease: ease });
                break;
            }
        case this.Entrance.FadeIn.Rotation:
            {
                tween = TweenMax.from(animationElement, 1, { Rotation: 360, "opacity": 0, ease: ease });
                break;
            }
    }


    //AMINATION EMPHASIS
    switch (animation) {
        case this.Emphasis.Parallax.Top:
            {
                triggerElement = slideId;
                duration = $(slideId).height();
                offset =duration / 2;
                tween = TweenMax.fromTo(animationElement, 1, { top: top - 100 }, { top: top + 100, ease: ease });
                
                break;
            }
        case this.Emphasis.Parallax.Bottom:
            {
                triggerElement = slideId;
                duration = $(slideId).height() * 2;
                triggerHook = "onEnter";
                offset = 0;
                tween = TweenMax.fromTo(animationElement, 1, { top: top + 100 }, { top: top - 100, ease: ease });
                break;
            }
    //    //emphasis
    //    case "Rotationempasis":
    //        {
    //            tween = TweenMax.from(animationElement, 1, { Rotation: 360, repeat: -1, ease: ease });
    //            break;
    //        }
    //    case "teeterempasis":
    //        {
    //            TweenMax.set(animationElement, { Rotation: 5 });
    //            tween = TweenMax.from(animationElement, 1, { Rotation: -5, repeat: -1, yoyo: true });
    //            break;
    //        }
    }


    /***************ANIMATION EXIT*************************/
   
    switch (animation) {
        case this.Exit.FadeOut.Default:
            {
                
                tween = TweenMax.to(animationElement, 1, { "opacity": 0, ease: ease });
                break;
            }
        case this.Exit.FadeOut.Rotation:
            {
                tween = TweenMax.to(animationElement, 1, { Rotation: 360, "opacity": 0, ease: ease });
                break;
            }
    }
    var scene = new ScrollScene({ triggerElement: triggerElement, duration: duration, offset: offset })
                             .setTween(tween)
                             .triggerHook(triggerHook)
                             .addTo(this.Controller);
    return scene;
};
ParallaxAnimation.prototype.Pin = function (animationElement, offset, heightPin) {
    var tween;
    if (heightPin == undefined) heightPin = 100;
    if (offset == undefined) offset = 0;
    
    var ease = Linear.easeNone;
    var duration = heightPin;
    var triggerHook = "onLeave";
    var top = $(animationElement).position().top;
    offset = -top;
    return new ScrollScene({ triggerElement: animationElement, duration: duration, offset: offset })
                             .setPin(animationElement)
                             .triggerHook(triggerHook)
                             .addTo(this.Controller);
}
ParallaxAnimation.prototype.Parallax = function (slideElement,panorama) {
    var triggerHook = "onEnter";
    var ease = Linear.easeNone;
    var duration = $(slideElement).height() * 2;
    var offset = 0;
    if (panorama) {
        ease = Circ.easeInOut;
        triggerHook = "onLeave";
        duration = $(slideElement).height()-$(window).height();
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

function createTrigger(elm, animation, duration, delay) {
    if (delay == undefined) delay = 0;
    //name trigger
    var name = $(elm).attr("id") + animation;
    name = name.replace(/\s/g, '');

    //position trigger
    var css = {
        width: $(elm).width(),
        height: duration,
        top: $(elm).position().top + $(elm).height() / 2 + delay,
        left: $(elm).position().left,
        position: "absolute",
        "border-top": "3px green solid",
        "border-bottom": "3px red solid",
        "z-index": 1000
    };

    // alert(name);
    var slide = getSlideId(elm);
    var html = "<div class='" + name + "'></div>";
    $(slide).prepend(html);
    $('.' + name).css(css);

    return "." + name;
}