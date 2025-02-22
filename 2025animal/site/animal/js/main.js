(function ($) {
    'use strict';
    
    function textTransDelay(object) {
        var speed = parseFloat($(object).data('speed')) || 0.05; // 글자 간 딜레이
        var delaySpeed = parseFloat($(object).data('speed-delay')) || 0; // 시작 딜레이
        
        $(object).find('.char').each(function (index) {
            var delay = delaySpeed  + (index * speed); // 딜레이 계산
            $(this).css({
                'transition-delay': delay + 's',
            });
        });
    }
    
    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    
    $(function () {
        
        //여기서부터 코드 작성해주세요
        
        //스크롤 애니메이션 시작
        $(document).ready(function () {
            var offsetValue = ($(window).width() <= 1000) ? '85%' : '70%';
            $('.scroll').waypoint(function (direction) {
                var $element = $(this.element);
                
                if (direction === 'down') {
                    $element.addClass('on'); // .scroll 클레스명에 on 붙으면 실행
                    textTransDelay($element.find('.word-split')); // 딜레이 적용
                } else {
                    $element.removeClass('on'); // 클래스 제거
                }
            }, {
                offset: offsetValue // 조건에 따라 결정된 offset 값 적용
            });
            
            //텍스트 스플리팅 시작
            Splitting({    //[2]splitting.js 초기화
                target: "[data-splitting]",
                by: "chars",  //단어별로("words") 적용할지, 음절별로("chars") 적용할지 지정
                key: null
            });
        });
        //스크롤 애니메이션 끝
        
        //보호중인 동물 - 탭 탭 슬라이드 시작
        // [1]초기 데이터 저장
        var startArray = [];
        $('.pet_slide_item').each(function () {
            startArray.push({
                html: $(this),
                pet: $(this).attr('data-pet'),
                state: $(this).attr('data-state'),
            });
        });
        // [2]배열 필터링
        var slideArray = [];
        function arrayFilter() {
            var selectedPet = $('.pet_slide_list').attr('data-pet');
            var selectedState = $('.pet_slide_list').attr('data-state');
            
            slideArray = startArray.filter(function (item) {    //사용자가 선택한 조건에 맞는 데이터만 필터링해 배열에 담음
                var petMatch = selectedPet === 'all' || item.pet === selectedPet;
                var stateMatch = selectedState === '1' || item.state === selectedState;
                return petMatch && stateMatch;    //두 조건 모두 만족하는 경우에만 선택
            });
            
            if($('.pet_slide_list').hasClass('slick-initialized')) {
                $('.pet_slide_list').slick('unslick');
            }
            
            $('.pet_slide_list').empty();
            slideArray.forEach(function (item) {
                $('.pet_slide_list').append(item.html);
            });
            
            $('.pet_slide_list').slick({
                autoplay: false,
                infinite: false,
                dots: false,
                draggable: true,
                swipe: true,
                swipeToSlide: false,
                slidesToShow: 4,
                slidesToScroll : 1,
                variableWidth: false,
                arrows: true,
                prevArrow: $('.pet_control button.prev'),
                nextArrow: $('.pet_control button.next'),
                pauseOnHover: true,
                pauseOnArrowClick: true,
                pauseOnSwipe : true,
                responsive: [{
                    breakpoint: 1301,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 901,
                    settings: {
                        slidesToShow: 2
                    }
                }, {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: true
                    }
                }]
            });
        }
        arrayFilter();
        // [3]탭 클릭
        function tabBtnClick(btn){
            var item = btn.parent('li'),
                itemSibling = item.siblings('li'),
                btnSibling = itemSibling.find('button'),
                btnPet = btn.attr('data-pet'),
                btnState = btn.attr('data-state');
            if( !item.is('.active') ){
                itemSibling.removeClass('active');
                btnSibling.removeAttr('title');
                item.addClass('active');
                btn.attr('title', '선택됨');
            }
            if( btnPet ){
                var petValue = btn.attr('data-pet');
                $('.pet_slide_list').attr('data-pet', petValue);
                arrayFilter();
            }
            if( btnState ){
                var stateValue = btn.attr('data-state');
                $('.pet_slide_list').attr('data-state', stateValue);
                arrayFilter();
            }
        }
        $('.tab_btn1').on('click', function(){
            if($(this).parent().hasClass('active')) return;
            tabBtnClick($(this));
        });
        $('.tab_btn2').on('click', function(){
            if($(this).parent().hasClass('active')) return;
            tabBtnClick($(this));
        });
        //보호중인 동물 - 탭 탭 슬라이드 끝
        
        //입양가족 행복한 일상 - 슬라이드 시작
        var $lifeSlide = $('.life .life_wrap .life_slide'),
            $lifeSlideList = $lifeSlide.find('.life_slide_list'),
            $lifeControl = $lifeSlide.find('.life_control'),
            $lifePrevBtn = $lifeControl.find('button.prev'),
            $lifeNextBtn = $lifeControl.find('button.next');
        
        $lifeSlideList.slick({
            autoplay: false,
            infinite: false,
            dots: false,
            draggable: true,
            swipe: true,
            swipeToSlide: false,
            slidesToShow: 3,
            slidesToScroll : 1,
            variableWidth: false,
            arrows: true,
            prevArrow: $lifePrevBtn,
            nextArrow: $lifeNextBtn,
            pauseOnHover: true,
            pauseOnArrowClick: true,
            pauseOnSwipe : true,
            responsive: [{
                breakpoint: 1201,
                settings: {
                    slidesToShow: 2
                }
            }, {
                    breakpoint: 701,
                    settings: {
                        slidesToShow: 1
                    }
                }]
        });
        //입양가족 행복한 일상 - 슬라이드 끝
    });
})(jQuery);