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
        $(document).ready(function () {
            var $menu = $('.menu_box .menu'),
                $menuList = $menu.find('.menu_list'),
                $menuItem = $menuList.find('.menu_item'),
                $visu = $('.visu_box'),
                $visuIcon = $visu.find('.icon_box');
            
            // (1) 처음 화면 로딩 시 .menu_item에 type 클래스명 추가
            $menuItem.each(function(index) {
                $(this).addClass('type' + (index + 1));
            });
            
            // (2) 페이지 로딩 시 .actived 클래스가 붙은 메뉴 항목의 type 클래스명을 .icon_box에 반영
            $(window).on('load', function() {
                var $activedItem = $menuItem.filter('.actived');
                if ($activedItem.length > 0) {
                    var typeClass = $activedItem.attr('class').match(/type\d+/)[0];
                    $visuIcon.addClass(typeClass);
                }
            });
            
            // (3) .menu_item 클릭 시 actived 변경 및 visu_icon 클래스 변경
            $menuItem.on('click', function() {
                // 기존 .actived에서 클래스 제거
                var $prevActived = $menuItem.filter('.actived');
                var prevTypeClass = $prevActived.attr('class').match(/type\d+/)[0];
                $visuIcon.removeClass(prevTypeClass);
                $prevActived.removeClass('actived');
                
                // 새로 클릭된 .menu_item에 .actived 추가하고 visu_icon 클래스 변경
                $(this).addClass('actived');
                var newTypeClass = $(this).attr('class').match(/type\d+/)[0];
                $visuIcon.addClass(newTypeClass);
            });
            
            // (4) .menu_item에 마우스 호버 시 .active 클래스 처리 및 .visu_box .icon_box에 type 클래스 반영
            $menuItem.hover(
                function() {
                    // 호버된 메뉴에 .active가 붙었을 때
                    var hoverTypeClass = $(this).attr('class').match(/type\d+/)[0];
                    
                    // 만약 .actived가 아닌 아이템을 호버 중이라면 기존 .actived와 관련된 type 클래스를 지움
                    if (!$(this).hasClass('actived')) {
                        var $activedItem = $menuItem.filter('.actived');
                        if ($activedItem.length > 0) {
                            var activedTypeClass = $activedItem.attr('class').match(/type\d+/)[0];
                            $visuIcon.removeClass(activedTypeClass);
                        }
                    }
                    
                    // 현재 호버된 아이템의 type 클래스 추가
                    $visuIcon.addClass(hoverTypeClass);
                },
                function() {
                    // 마우스가 나갔을 때
                    var hoverTypeClass = $(this).attr('class').match(/type\d+/)[0];
                    $visuIcon.removeClass(hoverTypeClass);
                    
                    // 다시 .actived 아이템의 클래스 복원
                    var $activedItem = $menuItem.filter('.actived');
                    if ($activedItem.length > 0) {
                        var activedTypeClass = $activedItem.attr('class').match(/type\d+/)[0];
                        $visuIcon.addClass(activedTypeClass);
                    }
                }
            );
        });
    });
})(jQuery);