(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    $(function () {

        //여기서부터 코드 작성해주세요

        //스크롤 애니메이션 시작
        var $scrollEvent = $('.scroll_event');
        $window.on('scroll', function(event) {
            if ($(window).width() > 640){
                $scrollEvent.each(function () {
                    var $this = $(this),
                        WindowTop = $window.scrollTop(),
                        WindowBottom = WindowTop + $window.height(),
                        WindowMiddle = (WindowTop + WindowBottom) / 2,
                        ThisOffSet = $this.offset(),
                        ThisOffSetTop = ThisOffSet.top;
                    if (ThisOffSetTop < WindowMiddle + 330) {
                        $this.addClass('move');
                    } else {
                        $this.removeClass('move');
                    }
                });
            }
        });
        // 스크롤 애니메이션 끝

        //비주얼 팝업 슬라이드 시작
        var $visualWrap = $('.visual_wrap'),
            $visualList = $visualWrap.find('.visual_slide_list');
        $visualList.slick({
            //기본
            autoplay: true, //자동재생 여부
            autoplaySpeed: 2500, //자동으로 넘기는 시간 조정(1000= 1s)
            speed: 1500, //모션 시간(1000= 1s)
            dots: false,
            draggable: true,
            swipe: true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth: false,
            arrows: true,
            prevArrow : $('.visual_wrap .visual_slide_control .prev'),
            nextArrow : $('.visual_wrap .visual_slide_control .next'),
            fade: true, // 페이드 효과 여부
            pauseOnHover: true, //마우스 오버시 자동 일시정지 유무
            pauseOnArrowClick : true, //
            zIndex: 1 //슬라이드 제트인덱스
        });
        //비주얼 팝업 슬라이드 끝

        //교육센터 바로가기 슬라이드 시작
        var $quickWrap = $('.quick_wrap'),
            $quickList = $quickWrap.find('.quick_slide_list');
        $quickList.slick({
            autoplay: true,
            dots: false,
            draggable: false,
            swipe: false,
            swipeToSlide: false,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll : 1,
            rows: 3,
            slidesPerRow: 3,
            variableWidth: false,
            arrows: false,
            responsive: [{
                breakpoint: 1001,
                settings: {
                    rows: 2,
                    slidesPerRow: 4
                }
            }, {
                breakpoint: 641,
                settings: {
                    draggable: true,
                    swipe: true,
                    swipeToSlide: true,
                    infinite: true,
                    slidesToShow: 4,
                    rows: 1,
                    slidesPerRow: 1
                }
            }, {
                breakpoint: 501,
                settings: {
                    draggable: true,
                    swipe: true,
                    swipeToSlide: true,
                    infinite: true,
                    slidesToShow: 3,
                    rows: 1,
                    slidesPerRow: 1
                }
            }, {
                breakpoint: 351,
                settings: {
                    draggable: true,
                    swipe: true,
                    swipeToSlide: true,
                    infinite: true,
                    slidesToShow: 2,
                    rows: 1,
                    slidesPerRow: 1
                }
            }]
        });
        //교육센터 바로가기 슬라이드 끝

        // 교육포털 강좌현황 시작
        // 슬라이드
        var $CourseWrap = $('.course .tab_slide_box .tab_slide_item');
        $CourseWrap.each(function(){
            var $this = $(this),
                $CourseSlideList = $this.find('.course_slide_list');
            $CourseSlideList.slick({
                autoplay: false,
                infinite: false,
                dots: false,
                draggable: false,
                swipe: false,
                swipeToSlide: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                rows: 1,
                slidesPerRow: 4,
                vertical: false, //세로모드 유무
                verticalSwiping: false, //세로모드일때 터치 유무
                variableWidth: false,
                arrows: false,
                responsive: [{
                    breakpoint: 641,
                    settings: {
                        draggable: true,
                        swipe: true,
                        swipeToSlide: true,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        rows: 1,
                        slidesPerRow: 1,
                        vertical: true, //세로모드 유무
                        verticalSwiping: true //세로모드일때 터치 유무
                    }
                }]
            });
        });
        //텝
        $('.course .tab_box .tab_list .tab_item button.tab_btn').on('click', function(){
            var $thisBtn = $(this),
                $thisItem = $thisBtn.parent('.tab_item'),
                $otherItem = $thisItem.siblings('.tab_item'),
                $otherBtn = $otherItem.find('button.tab_btn'),
                thisItemIndex = $thisItem.index(),
                thisItemActive = $thisItem.is('.active'),
                $thisList = $thisItem.parent('.tab_list'),
                $thisTabBox =  $thisList.parent('.tab_box'),
                $thisSlideBox = $thisTabBox.siblings('.tab_slide_box'),
                $thisSlideWrap = $thisSlideBox.find('.tab_slide_item').eq(thisItemIndex),
                $otherSlideWrap = $thisSlideWrap.siblings('.tab_slide_item'),
                $thisSlideList = $thisSlideWrap.find('.course_slide_list');

            if(!thisItemActive){
                $thisItem.addClass('active');
                $thisBtn.attr('title', '선택됨');
                $thisSlideWrap.addClass('active');
                $otherItem.removeClass('active');
                $otherBtn.removeAttr('title', '선택됨');
                $otherSlideWrap.removeClass('active');
                $thisSlideList.slick('setPosition');
            }
        });
        //교육포털 강좌현황 끝

        //평생학습 갤러리 슬라이드 시작
        var $galleryWrap = $('.gallery_wrap'),
            $galleryList = $galleryWrap.find('.gallery_slide_list');
        $galleryList.slick({
            autoplay: true,
            autoplaySpeed : 3000,
            speed : 1000,
            infinite: false,
            dots: false,
            draggable: false,  //pc 화면에서 마우스로 넘기기 허용 여부
            swipe: false, //반응형에서 손으로 밀어서 넘기기 허용 여부
            swipeToSlide: false,  //손으로 밀어서 넘길 때 자연스럽게 넘기기
            slidesToShow: 1, //화면에 보여질 slick-slide 수
            slidesToScroll : 1,  //슬라이드 넘길 때 slick-slide 가 몇개씩 넘어갈 것인지
            rows: 1, //행의 개수 생성
            slidesPerRow: 4, //내가 짠 마크업이 열로 들어감
            variableWidth: false,  // true 로 하면 slick-slide 의 width 값이 내부스타일로 안들어가고, css 로 지정해야함
            arrows : false,
            responsive: [{
                breakpoint: 1001,
                settings: {
                    infinite: true,
                    draggable: true,
                    swipe: true,
                    swipeToSlide: true,
                    slidesToShow: 3,
                    slidesPerRow: 1
                }
            }, {
                breakpoint: 641,
                settings: {
                    infinite: true,
                    draggable: true,
                    swipe: true,
                    swipeToSlide: true,
                    slidesToShow: 2,
                    slidesPerRow: 1
                }
            }, {
                breakpoint: 441,
                settings: {
                    infinite: true,
                    draggable: true,
                    swipe: true,
                    swipeToSlide: true,
                    slidesToShow: 1,
                    slidesPerRow: 1
                }
            }]
        });
        //평생학습 갤러리 슬라이드 끝
    });
})(jQuery);