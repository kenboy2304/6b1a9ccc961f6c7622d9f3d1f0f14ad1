
$(function () {

    $("#parallax-controller .sortable").scroll(function(e) {
        e.stopPropagation();
    });

    $('[data-toggle="tooltip"]').tooltip();
    $("#layer-tools .btn-showname").on("click", function () {
        if ($(this).find("i").hasClass('glyphicon-eye-open')) {
            $(this).find("i").removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close");
            $('.layer-name').hide();
        } else {
            $(this).find("i").removeClass("glyphicon-eye-close").addClass("glyphicon-eye-open");
            $('.layer-name').show();
        }
        return false;
    });
    $("#animation-tools .btn-showname").on("click", function () {
        if ($(this).find("i").hasClass('glyphicon-eye-open')) {
            $(this).find("i").removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close");
            $('.trigger').parent().addClass("hide-animation");
        } else {
            $(this).find("i").removeClass("glyphicon-eye-close").addClass("glyphicon-eye-open");
            $('.trigger').parent().removeClass("hide-animation");
        }
        return false;
    });

    //SET DRAGABLE CONTROLLER, TOOLS
    $('.tabs').tabs();
    $('.sortable').sortable({ axis: "y", cursor: "move" });
    //$('#parallax-controller').resizable({ handles: "s", alsoResize: '.sortable' });

    $('#parallax-controller,#parallax-controller2, #parallax-tools').draggable({ handle: ".move" });

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
            $(this).animate({ left: "-160px", opacity: 0.4 }, 500)
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
            $('#parallax-gridviews').css({ position: "absolute", top: top + 50 });
        } else {
            $('#parallax-gridviews').css({ position: "fixed", top: 50 });;
        }
    });


});
