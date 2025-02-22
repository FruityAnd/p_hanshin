(function ($) {
    'use strict';
    
    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    
    $(function () {
        
        var $body = $('body'),
            $htmlAndBody = $html.add($body),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $container = $('#container'),
            $footer = $('#footer');
        
        // 가짜 셀렉트박스 시작
        var $tempSelBox = $container.find('.fake_select_box');
        
        $tempSelBox.each(function () {
            var $tempSelBox = $(this),
                $realSel = $tempSelBox.find('select.real_select'),
                $realSelOpt = $realSel.find('option'),
                $fakeSelOpenBtn = $tempSelBox.find('button.fake_btn_open'),
                $fakeSelOpenText = $fakeSelOpenBtn.find('.text'),
                $fakeSelList = $tempSelBox.find('.fake_list'),
                $fakeSelItem = $fakeSelList.find('.fake_item'),
                $fakeSelBtn = $fakeSelItem.find('button.fake_btn');
            
            // 초기 선택된 옵션 설정
            function setSelection() {
                var $activeItem = $fakeSelItem.siblings('.fake_item.active'),
                    activeIndex = $activeItem.index(),
                    activeText = $activeItem.find('button.fake_btn').text();
                
                $realSel.find('option').eq(activeIndex).attr('selected', true);
                $fakeSelOpenText.text(activeText);
            }
            
            setSelection();
            
            // 옵션 텍스트 매칭
            function matchOption() {
                $fakeSelItem.each(function () {
                    var index = $(this).index(),
                        fakeText = $(this).find('button.fake_btn').text();
                    
                    $realSelOpt.eq(index).text(fakeText);
                });
            }
            
            matchOption();
            
            // 셀렉트박스 열기/닫기
            $fakeSelOpenBtn.on('click', function () {
                $tempSelBox.toggleClass('active');
                var isActive = $tempSelBox.hasClass('active');
                $(this).attr('title', isActive ? '셀렉트박스 닫기' : '셀렉트박스 열기');
            });
            
            // 항목 선택 시 처리
            function selectItem() {
                var index = $(this).closest('.fake_item').index(),
                    text = $(this).text();
                
                $fakeSelItem.removeClass('active').children().removeAttr('title');
                $(this).closest('.fake_item').addClass('active').find('button').attr('title', '선택됨');
                
                $realSelOpt.eq(index).attr('selected', true).siblings().attr('selected', false);
                $fakeSelOpenText.text(text);
                $tempSelBox.removeClass('active');
                $fakeSelOpenBtn.focus();
            }
            
            $fakeSelBtn.on('click', selectItem);
        });
        // 가짜 셀렉트박스 끝
    });
})(jQuery);