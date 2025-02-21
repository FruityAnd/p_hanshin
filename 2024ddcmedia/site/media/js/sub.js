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
        var $body = $('body'),
            $subVisual = $('.sub_visual'),
            $container = $('#container');
        
        // SNS 공유리스트 시작
        var $shareItem = $subVisual.find('.etc_box .etc_list .etc_item.share'),
            $shareBtn = $shareItem.find('button.etc_btn');
        
        $shareBtn.on('click', function (){
            var $this = $(this),
                $thisItem = $this.closest('.etc_item'),
                IsActive = $thisItem.is('.active');
            
            if (!IsActive) {
                $thisItem.addClass('active');
                $this.attr('title', 'SNS 공유리스트 닫기');
            } else {
                $thisItem.removeClass('active');
                $this.attr('title', 'SNS 공유리스트 열기');
            }
        });
        // SNS 공유리스트 끝
        
        // 2차 텝메뉴 아이템 개수 측정 시작
        var $cmsDepth2 = $container.find('.cms_depth2');
        
        $cmsDepth2.each(function (){
            var $this = $(this),
                $cmsDepList = $this.find('.cms_depth2_list'),
                $cmsDepItem = $cmsDepList.find('.cms_depth2_item'),
                cmsDepItemLength = $cmsDepItem.length;
            if(cmsDepItemLength < 5){
                $this.addClass('tab' + cmsDepItemLength + '');
            }
            else{
                $this.addClass('tab5');
            }
        });
            
        // 2차 텝메뉴 아이템 개수 측정 끝
        
    });
})(jQuery);