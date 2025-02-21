function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
(function($) {
    'use strict';
    
    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    
    $(function() {
        
        var $container = $('#container');
        
        //스크롤 애니메이션 시작
        function eachAniOn(){
            var $AniOn = $('.motion');
            $AniOn.each(function () {
                var $this = $(this),
                    WinTop = $window.scrollTop(),
                    WinBottom = WinTop + $window.height(),
                    WinMiddle = (WinTop + WinBottom) / 2,
                    ThisOffset = $this.offset(),
                    ThisOffsetTop = ThisOffset.top;
                if (ThisOffsetTop < WinMiddle + 300) {
                    $this.addClass('on');
                }
                else {
                    $this.removeClass('on');
                }
            });
        }
        eachAniOn();
        $window.on('scroll', function(){
            eachAniOn();
        });
        //스크롤 애니메이션 끝
        
        //비주얼팝업 슬라이드 시작
        var $vizList = $('.viz_wrap .viz_slide_list'),
            $vizItem = $vizList.find('.viz_slide_item'),
            $vizItemClone = $vizItem.clone(),
            $backList = $('.viz_wrap .back_slide_list'),
            $vizPrev = $('.viz_wrap .viz_control .viz_btn.prev'),
            $vizNext = $('.viz_wrap .viz_control .viz_btn.next');
        if($vizItem.length >= 1 && $vizItem.length < 3){ //팝업 이미지 배너 2개일때 움직임 오류 해결
            $vizItem.each(function (){
                $vizList.append($(this).clone());
            });
            $vizItemClone = $vizList.find('.viz_slide_item').clone();
        }
        $backList.append($vizItemClone);
        $vizList.slick({
            autoplay: true,
            autoplaySpeed : 1800,
            speed : 1400,
            fade: true,
            dots: false,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll : 1,
            variableWidth: false,
            infinite: true,
            centerMode: false,
            arrows: true,
            prevArrow: $vizPrev,
            nextArrow: $vizNext,
            pauseOnHover: true,
            pauseOnFocus: true,
            pauseOnArrowClick: true,
            asNavFor: $backList,
            responsive: [{
                breakpoint: 451,
                settings: {
                    fade: true,
                    autoplaySpeed : 2000,
                    speed : 2000,
                    swipe: true,
                    swipeToSlide: true,
                }
            }]
            // backList와 동기화
        });
        $backList.on('beforeChange',function(event, slick, currentSlide, nextSlide){    // backSlide-1. 슬라이드 넘기기 전 실행
            var chk,
                slideWidth = parseInt($backList.find('.slick-slide:not(.slick-active)').css('width').replace('px','')),    // 해당 슬라이드의 width 값 가져온 후, 'px' 단위(문자) 제거 후 width 값을 숫자(정수)로 변환
                activeWidth = parseInt($backList.find('.slick-slide.slick-active').css('width').replace('px','')),
                activeHeight = parseInt($backList.find('.slick-slide.slick-active').css('height').replace('px',''));
            
            $backList.find('.slick-slide').css('transition','all 0.5s ease-out');    // 슬라이드 전환 시 트렌지션 적용
            if (currentSlide === 0 && nextSlide === slick.slideCount - 1){    // IF 1.첫번째 슬라이드에서 마지막 슬라이드로 이동하는 경우
                chk = false;    // 뒤로 이동
                $backList.find('.slick-active').prev().width(activeWidth).height(activeHeight);    // .slick-active 의 '이전' 슬라이드의 너비와 높이를 .slick-active 된 슬라이드와 동일하게 맞춤
            } else if (nextSlide === 0 && currentSlide === slick.slideCount - 1){    // IF 2.마지막 슬라이드에서 첫번째 슬라이드로 이동하는 경우
                chk = false;    // 뒤로 이동
                $backList.find('.slick-active').next().width(activeWidth).height(activeHeight);    // .slick-active 의 '다음' 슬라이드의 너비와 높이를 .slick-active 된 슬라이드와 동일하게 맞춤
            } else {    // IF 3.위 2가지 요소해 해당하는 슬라이드가 아닌 경우
                chk = nextSlide > currentSlide;    // [1]다음슬라이드가 현재슬라이드보다 크면 true(정방향, 앞) [2]다음슬라이드가 현재슬라이드보다 작으면 false(역방향, 뒤)
            }
            
            // 슬라이드 전환 시 위치조정
            var setPos = (activeWidth - slideWidth) / 2;
            setPos = chk ? setPos : -setPos;    // [1]chk이 true(슬라이드 앞으로 이동)인 경우, setPos는 양수(+) [2]chk이 false(슬라이드 뒤로 이동)인 경우, setPos는 음수(-)
            slick.$list.css({
                'transition':'all 0.5s ease-out',
                'transform':'translateX('+setPos+'px)',    // [1]setPos가 양수면 슬릭리스트는 오른쪽으로 이동 [2]setPos가 음수면 슬릭리스트는 왼쪽으로 이동
            });
        }).on('init reInit afterChange',function(event, slick, currentSlide, nextSlide){    // backSlide-2. 슬라이드 초기화, 재초기화, 넘긴 후 실행
            slick.$list.removeAttr('style');
            $backList.find('.slick-slide').removeAttr('style');
            $backList.find('.slick-cloned[style]').removeAttr('style');
        }).slick({
            autoplay: false,
            speed : 1400,
            fade: false,
            dots: false,
            draggable: true,
            slidesToShow: 1,
            slidesToScroll : 1,
            variableWidth: true, // 센터모드 사용시 적용
            infinite: true,
            centerMode: true, // backList만 센터모드 사용
            centerPadding: '0px',
            arrows: true,
            prevArrow: $vizPrev,
            nextArrow: $vizNext,
            pauseOnHover: true,
            pauseOnFocus: true,
            pauseOnArrowClick: true,
            asNavFor: $vizList // visList와 동기화
        });
        
        $backList.add($vizPrev, $vizNext).on('mouseenter', function (){
            $vizList.slick('slickPause');
        }).on('mouseleave', function(){
            $vizList.slick('slickPlay');
        });
        
        $vizPrev.add($vizNext).on('click', function(){
            $vizList.slick('slickPause');
            $backList.slick('slickPause');
        });
        
        //비주얼팝업 슬라이드 끝
        
        //영상미디어센터 소식 슬라이드 시작
        var $notice = $container.find('.notice_wrap'),
            $noticeSlide = $notice.find('.notice_slide_list');
        $noticeSlide.slick({
            autoplay: false,
            infinite: false,
            dots: false,
            draggable: true,
            swipe: true,
            swipeToSlide: true,
            slidesToShow: 3,
            slidesToScroll : 1,
            variableWidth: false,
            arrows: false,
            pauseOnHover: true,
            pauseOnArrowClick: true,
            pauseOnSwipe : true,
            responsive: [{
                breakpoint: 1301,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 1001,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 801,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 501,
                settings: {
                    slidesToShow: 1,
                    variableWidth: true
                }
            }, {
                breakpoint: 401,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false
                }
            }]
        });
        //영상미디어센터 소식 슬라이드 끝
        
        //영상미디어센터 주간일정 슬라이드 시작
        var paramMonth = getParameterByName('month');
        
        var $sch = $container.find('.sch_wrap'),
            $schInner = $sch.find('.sch_inner'),
            $schSlide = $schInner.find('.sch_slide_list'),
            schSlideItemToday = $schSlide.find('.sch_slide_item.today').attr('data-day'),
            $schSlidePrev = $sch.find('.sch_control button.sch_btn.prev'),
            $schSlideNext = $sch.find('.sch_control button.sch_btn.next');
        
        // 주간일정 슬라이드 작동 전에 실행되는 이벤트
        $schSlide.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $lastGroup = slick.slideCount - 6;
            
            $schSlidePrev.attr('aria-disabled', nextSlide === 0);
            $schSlideNext.attr('aria-disabled', nextSlide === $lastGroup);
        });
        
        $schSlide.slick({
            autoplay: false,
            infinite: false,
            dots: false,
            draggable: true,
            swipe: true,
            swipeToSlide: false,
            slidesToShow: 6,
            slidesToScroll : 1,
            variableWidth: true,
            arrows: false,
            // prevArrow: $schSlidePrev,
            // nextArrow: $schSlideNext,
            pauseOnHover: true,
            pauseOnArrowClick: true,
            pauseOnSwipe : true,
            initialSlide : schSlideItemToday - 1, //초기 스타트 하는 슬라이드 번호
            responsive: [{
                breakpoint: 1001,
                settings: {
                    vertical: true, //세로모드 유무
                    verticalSwiping: true,
                    variableWidth: false,
                    initialSlide : schSlideItemToday - 1, //초기 스타트 하는 슬라이드 번호
                }
            }]
        });
        
        // 이전 버튼 클릭 이벤트
        $schSlidePrev.on('click',function(){
            var current = $schSlide[0].slick.currentSlide,
                prev = current - 6;
            if (prev > 0) {
                $schSlide.slick('slickGoTo', prev);
            } else {
                $schSlide.slick('slickGoTo', 0);
            }
        });
        
        // 다음 버튼 클릭 이벤트
        $schSlideNext.on('click',function(){
            var $thisSlick = $schSlide[0].slick,
                current = $thisSlick.currentSlide,
                next = current + 6,
                total = $thisSlick.$slides.length,
                last = total - 6;
            
            if (next < last) {
                $schSlide.slick('slickGoTo', next);
            } else {
                $schSlide.slick('slickGoTo', last);
            }
        });
        //영상미디어센터 주간일정 슬라이드 끝
        
        $window.on('screen:tablet screen:phone', function(event) {
        
        });
    });
})(jQuery);