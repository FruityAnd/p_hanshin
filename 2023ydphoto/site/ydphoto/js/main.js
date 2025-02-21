(function ($) {
    'use strict';

    function splittingTextDelay(object, speed, delay_speed) {
        var splitLength = $(object).find('.char').length;
        for (var i = 0; i < splitLength; i++) {
            if ($(object).data('css-property') == 'animation') {
                $(object).find('.char').eq(i).css('animation-delay', delay_speed + (i * speed) + 's');
            } else if ($(object).data('css-property') == 'transition') {
                $(object).find('.char').eq(i).css('transition-delay', delay_speed + (i * speed) + 's');
            }
        }
    }

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    $(function () {

        var $row = $('.rowgroup');
        setTimeout(function(){
            $row.addClass('ready_on');
        }, 1);

        //스크롤 애니메이션 시작
        function eachAniOn(){
            var $AniOn = $('.ani_on');
            $AniOn.each(function () {
                var $this = $(this),
                    WinTop = $window.scrollTop(),
                    WinBottom = WinTop + $window.height(),
                    WinMiddle = (WinTop + WinBottom) / 2,
                    ThisOffset = $this.offset(),
                    ThisOffsetTop = ThisOffset.top;
                if (ThisOffsetTop < WinMiddle + 300) {
                    $this.addClass('active');
                }
                else {
                    $this.removeClass('active');
                }
            });
        }
        eachAniOn();
        $window.on('scroll', function(){
            eachAniOn();
        });
        //스크롤 애니메이션 끝

        //비쥬얼 스플리팅 플러그인 시작
        Splitting({
            target: "[data-splitting]",
            by: "chars",
            key: null
        });
        var $splittingTxt = $('.word-split');
        $($splittingTxt).each(function () {
            splittingTextDelay($(this), $(this).data('speed'), $(this).data('speed-delay'));
        });
        //비쥬얼 스플리팅 플러그인 끝

        //비쥬얼 슬라이드 시작
        var $Visual = $('.visual_wrap'),
            $VisualSlide = $Visual.find('.visual_slide_list'),
            $VisualSlidePrev = $Visual.find('.visual_slide_control .visual_btn_box .prev'),
            $VisualSlideNext = $Visual.find('.visual_slide_control .visual_btn_box .next'),
            $VisualSlideAuto = $Visual.find('.visual_slide_control .visual_btn_box .auto'),
            $VisualSlideCurrent = $Visual.find('.visual_slide_control .visual_count_box .current'),
            $VisualSlideTotal = $Visual.find('.visual_slide_control .visual_count_box .total');
        $VisualSlide.on('init', function(event, slick, currentSlide) {
            setTimeout(function(){
                $('.rowgroup1 .visual_wrap .content_box').addClass('type_on');
            }, 1000);
        });
        $VisualSlide.slick({
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 4000,
            infinite: true,
            dots: false,
            draggable: true,
            swipe: true,
            swipeToSlide: true,
            slidesToShow: 1,
            slidesToScroll : 1,
            variableWidth: false,
            arrows: true,
            prevArrow: $VisualSlidePrev,
            nextArrow: $VisualSlideNext,
            autoArrow: $VisualSlideAuto,
            pauseText: '정지',
            playText: '재생',
            current: $VisualSlideCurrent,
            total: $VisualSlideTotal,
            pauseOnHover: true,
            pauseOnArrowClick: true,
            pauseOnSwipe : true,
            fade: true,
            zIndex: 1
        });
        //비쥬얼 슬라이드 끝

        //살펴보는 관광여행 슬라이드 시작
        var $travel = $('.travel_wrap'),
            $travelSlide = $travel.find('.travel_slide_list'),
            $travelSlideItem = $travelSlide.find('.travel_slide_item'),
            $travelSlidePrev = $travel.find('.travel_slide_control .prev'),
            $travelSlideNext = $travel.find('.travel_slide_control .next'),
            $travelSlideAuto = $travel.find('.travel_slide_control .auto');
        $travelSlideItem.each(function(){
            var $this = $(this),
                $thisImgWrap = $this.find('.travel_img_wrap'),
                $travelBg = $this.find('.travel_bg'),
                BackgroundImage = $travelBg.attr('style');
            $thisImgWrap.prepend('<div class="hover_span"><i class="hover_bg" style="'+BackgroundImage+'"></i></div>');
        });
        $travelSlide.slick({
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 1500,
            infinite: true,
            dots: false,
            draggable: true,
            swipe: true,
            swipeToSlide: true,
            slidesToShow: 4,
            slidesToScroll : 1,
            variableWidth: false,
            arrows: true,
            prevArrow: $travelSlidePrev,
            nextArrow: $travelSlideNext,
            autoArrow: $travelSlideAuto,
            pauseText: '정지',
            playText: '재생',
            pauseOnHover: true,
            pauseOnArrowClick: true,
            pauseOnSwipe : true,
            responsive:[{
                breakpoint: 1001,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 641,
                settings: {
                    slidesToShow: 2
                }
            }
            ]
        });
        //살펴보는 관광여행 슬라이드 끝

        //맛있는 영덕 특산물 슬라이드 시작
        var $special = $('.specialty_wrap'),
            $specialSlide = $special.find('.special_slide_list'),
            $specialSlidePrev = $special.find('.special_slide_control .prev'),
            $specialSlideNext = $special.find('.special_slide_control .next'),
            $specialSlideAuto = $special.find('.special_slide_control .auto');
        $specialSlide.slick({
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 1500,
            infinite: true,
            dots: false,
            draggable: true,
            swipe: true,
            swipeToSlide: true,
            slidesToShow: 3,
            slidesToScroll : 1,
            variableWidth: false,
            arrows: true,
            prevArrow: $specialSlidePrev,
            nextArrow: $specialSlideNext,
            autoArrow: $specialSlideAuto,
            pauseText: '정지',
            playText: '재생',
            pauseOnHover: true,
            pauseOnArrowClick: true,
            pauseOnSwipe : true,
            responsive: [{
                breakpoint: 1001,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 641,
                settings: {
                    slidesToShow: 2
                }
            }]
        });
        //맛있는 영덕 특산물 슬라이드 끝

        //옛사진 슬라이드 시작
        var $old = $('.old_wrap'),
            $oldSlide = $old.find('.old_slide_list'),
            $oldSlidePrev = $old.find('.old_slide_control .old_btn_box .prev'),
            $oldSlideNext = $old.find('.old_slide_control .old_btn_box .next'),
            $oldSlideAuto = $old.find('.old_slide_control .old_btn_box .auto'),
            $oldSlideCurrent = $old.find('.old_slide_control .old_count_box .current'),
            $oldSlideTotal = $old.find('.old_slide_control .old_count_box .total');
        $oldSlideTotal.text($oldSlide.find('.old_slide_item').length);

        var $thisControl = $oldSlide.siblings('.old_slide_control'),
            $thisSlideBar = $thisControl.find('.old_progress_box'),
            $currentBar = $thisSlideBar.find('.total_bar .current_bar'),
            percent;

        $oldSlide.on('init', function (event, slick, currentSlide, nextSlide) {
            percent = ((slick.currentSlide + 1) / (slick.slideCount)) * 100;
            $currentBar.css('width', percent + '%');
        });
        $oldSlide.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            percent = ((nextSlide + 1) / (slick.slideCount)) * 100;
            $currentBar.css('width', percent + '%');
        });
        $oldSlide.slick({
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 1500,
            infinite: true,
            dots: false,
            draggable: true,
            swipe: true,
            swipeToSlide: true,
            slidesToShow: 4,
            slidesToScroll : 1,
            variableWidth: false,
            arrows: true,
            prevArrow: $oldSlidePrev,
            nextArrow: $oldSlideNext,
            autoArrow: $oldSlideAuto,
            pauseText: '정지',
            playText: '재생',
            current: $oldSlideCurrent,
            pauseOnHover: true,
            pauseOnArrowClick: true,
            pauseOnSwipe : true,
            responsive: [{
                breakpoint: 1001,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 641,
                settings: {
                    slidesToShow: 2
                }
            }]
        });

        /*
        $oldSlide.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            setTimeout(function(){
                var $SlickCurrent = $oldSlide.find('.slick-current'),
                    Num = Number($SlickCurrent.attr('data-slick-index')) + 1;
                $oldSlideCurrent.text(Num);
            }, 1);
        });
        */

        //옛사진 슬라이드 끝
    });
})(jQuery);