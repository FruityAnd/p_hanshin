(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    //브라우저
    var _browser = navigator.userAgent.toLowerCase();
    //ie7일 때
    if (_browser.indexOf('msie 7.0') > -1) {
        _browser = 'ie ie7';
        //ie8일 때
    } else if (_browser.indexOf('msie 8.0') > -1) {
        _browser = 'ie ie8';
        //ie9일 때
    } else if (_browser.indexOf('msie 9.0') > -1) {
        _browser = 'ie ie9';
        //ie10일 때
    } else if (_browser.indexOf('msie 10.0') > -1) {
        _browser = 'ie ie10';
        //ie11일 때
    } else if (_browser.indexOf('trident/7.0') > -1) {
        _browser = 'ie ie11';
        //edge일 때
    } else if (_browser.indexOf('edge') > -1) {
        _browser = 'edge MS';
    } else if (_browser.indexOf('edg/') > -1) {
        _browser = 'edge chromium_based';
        //opera일 때
    } else if (_browser.indexOf('opr') > -1) {
        _browser = 'opera';
        //chrome일 때
    } else if (_browser.indexOf('chrome') > -1) {
        _browser = 'chrome';
        //firefox일 때
    } else if (_browser.indexOf('firefox') > -1) {
        _browser = 'firefox';
        //safari일 때
    } else if (_browser.indexOf('safari') > -1) {
        _browser = 'safari';
    } else {
        _browser = 'unknown';
    }
    window.getBrowser = function () {
        return _browser;
    };

    //브라우저 클래스 추가
    $html.addClass(_browser);

    $(function () {
        var $wrapper = $('#wrapper'),
            $header = $('#header'),
            $container = $('#container');

        //상세검색창 - 슬라이드 시작
        var $headerWrap = $header.find('.header_wrap'),
            $detailWrap = $header.find('.detail_wrap');
        function toggleSlide() {    //상세검색창 슬라이드 토글 함수
            var $thisBtn = $(this),
                $BtnBox = $thisBtn.closest('.detail_btn'),
                $detailCheck = $detailWrap.find('.temp_check'),
                IsActive = $detailWrap.hasClass('active');

            if (!IsActive) {
                $detailWrap.stop().slideDown(400, 'linear').addClass('active');
                $BtnBox.addClass('open');
                $thisBtn.attr('title', '상세검색창 닫기');
                $detailCheck.first().focus();
            } else {
                $detailWrap.stop().slideUp(400, 'linear').removeClass('active');
                $BtnBox.removeClass('open');
                $thisBtn.attr('title', '상세검색창 열기');
            }
        }

        $headerWrap.find('.detail_btn button.btn').on('click', toggleSlide);    // 상세검색 버튼 클릭 이벤트

        //박남규 수정(2024. 05. 09.) 시작
        //상세검색 클릭시에만 탭 동작 변경
        $headerWrap.find('.detail_btn button.btn').keydown(function(key){
            if($('.detail_wrap').is('.active')){
                if(key.keyCode == 9){
                    if(key.shiftKey){
                        setTimeout(function(){
                            $detailWrap.find('.detail_result_box .temp_btn.reset > .btn ').focus();
                        }, 1);
                    }else{
                        setTimeout(function(){
                            $detailWrap.find('.detail_list .detail_item:first-child .detail_con > *:first-child .temp_check').focus();
                        }, 1);
                    }
                }
            }
        });

        //전체기간에서 shift + tab
        $detailWrap.find('.detail_list .detail_item:first-child .detail_con > *:first-child .temp_check').keydown(function(key){
            if(key.keyCode == 9){
                if(key.shiftKey){
                    setTimeout(function(){
                        $('.detail_box .detail_btn button.btn').focus();
                    }, 1);
                }
            }
        });

        //파일내용에서 tab
        $detailWrap.find('.detail_result_box .temp_btn.reset > .btn').keydown(function(key){
            if(key.keyCode == 9){
                if(key.shiftKey){
                    //
                }else{
                    setTimeout(function(){
                        console.log('test');
                        $('.detail_box .detail_btn button.btn').focus();
                    }, 1);
                }
            }
        });
        //박남규 수정 (2024. 05. 09.)
        //상세검색창 - 슬라이드 끝
        
        //상세검색창 - 조회버튼 시작
        var $resultBox = $detailWrap.find('.detail_result_box'),
            $resultSearch = $resultBox.find('.temp_btn.search'),
            $searchBtn = $resultSearch.find('button.btn');
        
        $searchBtn.on('click', function (){
            $detailWrap.stop().slideUp(400, 'linear').removeClass('active');
            $BtnBox.removeClass('open');
        });
        //상세검색창 - 조회버튼 끝

        //인기검색어 텝 시작
        var $sideRight = $container.find('.side_right'),
            $sideTabBox = $sideRight.find('.side_tab_box'),
            $sideTab = $sideTabBox.find('.tab_btn'),
            $sideTabBtn = $sideTab.find('button.btn');

        $sideTabBtn.on('click', function(){
            var $myBtn = $(this),
                $myTab = $myBtn.closest('.tab_btn'),
                MyTabIndex = $myTab.index(),
                $myTabBox = $myTab.closest('.side_tab_box'),
                $myConBox = $myTabBox.siblings('.side_con_box'),
                $myConItem = $myConBox.find('.con_item').eq(MyTabIndex),
                $otherConItem = $myConItem.siblings('.con_item'),
                $otherTab = $myTab.siblings('.tab_btn'),
                $otherBtn = $otherTab.find('button.btn'),
                IsActive = $myBtn.is('active');

            if(!IsActive) {
                $myBtn.addClass('active').attr('title', '선택됨');
                $otherBtn.removeClass('active').removeAttr('title');
                $myConItem.addClass('active');
                $otherConItem.removeClass('active');
            }
        });
        //인기검색어 텝 끝

        //반응형 테이블 시작
        $('table.table.responsive').not($('.prettyprint').children()).each(function () {
            var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                TheadExist = $(this).find('thead').length;
            if ((RowSpanExist == false) && (TheadExist != 0)) {//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                $(this).children('tbody').children('tr').find('th, td').each(function () {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function () {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
            }
        });
        //반응형 테이블 끝

        //버튼 효과 스크립트 시작
        var $TempBtnIcon = $wrapper.find('span.temp_btn.icon_type');
        var $TempBtnFile = $wrapper.find('span.temp_btn.file_type');

        function eachTempBtn($tempBtn){
            $tempBtn.each(function(){
                var $this = $(this);

                addMoveText($this.find('a'));
                addMoveText($this.find('button'));
                addMoveText($this.find('input[type="submit"]'));

                function addMoveText($MoveBtn) {
                    var $parent = $MoveBtn.parent(),
                        text = $MoveBtn.is('input') ? $MoveBtn.val() : $MoveBtn.text(),
                        sizeClass = $parent.hasClass('medium') ? 'medium' : ($parent.hasClass('small') ? 'small' : ''),
                        cssValue = sizeClass === 'medium' ? 25 : (sizeClass === 'small' ? 15 : 30);

                    $parent.append('<i class="move_text">'+text+'</i>');
                    var $moveText = $parent.find('.move_text');

                    $parent.on('mouseover', function(){
                        $moveText.css({'left' : 'calc(100% - '+$moveText.outerWidth()+'px - ' + cssValue + 'px)' });
                    }).on('mouseleave', function(){
                        $moveText.removeAttr('style');
                    });
                }
            });
        }
        eachTempBtn($TempBtnIcon);
        eachTempBtn($TempBtnFile);
        //버튼 효과 스크립트 끝

        // 다운로드 및 바로가기 박스 시작
        var $prevBoxItem = $container.find('.temp_box.prev_type .box_item');

        $prevBoxItem.each(function() {
            var $this = $(this),
                $prevBtnBox = $this.find('.button_box');

            // link_btn_box 안의 버튼 개수
            $prevBtnBox.each(function() {
                var $prevBtn = $(this).find('.temp_btn.medium'),
                    $prevItem = $(this).closest('.box_item'),
                    $prevBtnLength = $prevBtn.length;

                if ($prevBtnLength === 2) {
                    $prevItem.attr('data-btn', '2');
                }
            });
        });
        // 다운로드 및 바로가기 박스 끝

        // post_list 다운로드 박스 유무 구분 시작
        var $postList2 = $container.find('.post_list.type2');
        
        $postList2.each(function (){
            var $this = $(this),
                $postItem = $this.find('.post_item');
            
            $postItem.each(function (){
                var $postDesc = $(this).find('.post_desc');
                
                if ($postDesc.has('.post_file').length > 0) {
                    $(this).addClass('file');
                }
            });
        });
        // post_list 다운로드 박스 유무 구분 끝
        
        // 모바일 노이미지 높이값 측정 시작
        var $photoWrap = $container.find('.result_wrap.photo');
        
        $window.on('resize load',function(){
            photoMaxHeight($photoWrap);
        });
        
        function photoMaxHeight($photoWrap){
            $photoWrap.each(function(){
                var $photoImg = $(this).find('.post_img');
                $photoImg.removeAttr('style');
                
                if(window.innerWidth > 400) return;
                var $MaxPhotoImg = Math.max.apply(null, $photoImg.map(function(){return $(this).height()}));
                
                $photoImg.height($MaxPhotoImg);
            });
        }
        // 모바일 노이미지 높이값 측정 끝
        
        //푸터 상단 바로가기 시작
        var $body = $('body');
        $('.footer_go .go_btn').on('click', function() {
            $('html, body').animate({
                scrollTop : $body.offset().top
            }, 400);
        });
        //푸터 상단 바로가기 끝
        
        $document.on('ready', function (event) {
            //wrapper, wrap 사이즈에 따라 값 맞출 것
            $screen({
                state: [{
                    name: 'wide',
                    horizontal: {
                        from: 9999,
                        to: 1481
                    }
                }, {
                    name: 'web',
                    horizontal: {
                        from: 1480,
                        to: 1001
                    }
                }, {
                    name: 'tablet',
                    horizontal: {
                        from: 1000,
                        to: 641
                    }
                }, {
                    name: 'phone',
                    horizontal: {
                        from: 640,
                        to: 0
                    }
                }]
            });
        });
        $window.on('load', function (event) {
            $window.on('screen:resize', function (event) {

            }).triggerHandler('screen:resize');
        });
    });
})(jQuery);