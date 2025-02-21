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
        // 텝메뉴 시작
        var $tempTab = $('.temp_tab');
        
        $tempTab.each(function (){
            var $this = $(this),
                $tabList = $this.find('.temp_tab_list'),
                $tabItem = $tabList.find('.temp_tab_item'),
                $tabBtn = $tabItem.find('button.temp_tab_btn');
            
            $tabBtn.on('click', function (){
                var $myBtn = $(this),
                    $myItem = $myBtn.closest('.temp_tab_item'),
                    IsActive = $myItem.is('.active'),
                    $myList = $myItem.closest('.temp_tab_list'),
                    $otherItem = $myItem.siblings('.temp_tab_item'),
                    $otherBtn = $otherItem.find('button.temp_tab_btn'),
                    $conList = $myList.siblings('.temp_con_list'),
                    $myConItem = $conList.find('.temp_con_item').eq($myItem.index()),
                    $otherConItem = $conList.find('.temp_con_item');
                
                if (!IsActive) {
                    $otherItem.removeClass('active');
                    $otherBtn.removeAttr('title');
                    $otherConItem.removeClass('active');
                    $myItem.addClass('active');
                    $myBtn.attr('title', '선택됨');
                    $myConItem.addClass('active');
                }
            });
        });
        // 텝메뉴 끝


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
            };
        });
        //반응형 테이블 끝



        //fake_slect 시작
        $('button.temp_select').on('click', function (){
            var $this = $(this),
                $Layer = $this.siblings('.temp_select_layer'),
                $thisActive = $this.is('.active');

            if (!$thisActive){
                $this.attr('title', '하위메뉴닫기');
                $this.addClass('active');
                $Layer.slideDown(500);
            }else {
                $this.attr('title', '하위메뉴열기');
                $this.removeClass('active');
                $Layer.slideUp(500);
            }
        });
        $('.select_btn').on('click', function (){
            var $this = $(this),
                $Layer = $this.parents('.temp_select_layer'),
                $Select = $Layer.siblings('button.temp_select');

            $Select.attr('title', '하위메뉴열기');
            $Select.removeClass('active');
            $Layer.slideUp(500);

            $Select.text($this.text());
        })
    });
})(jQuery);