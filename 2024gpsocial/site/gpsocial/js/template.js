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
        // 반응형 테이블
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
        
        // 가짜 셀렉트 박스
        $('.temp_form .fake_select').each(function(){
            var $this = $(this),
                $fakeOptions = $this.next('.fake_options'),
                $fakeOption = $fakeOptions.find('.fake_option'),
                $fakeOptionBtn = $fakeOption.find('.btn');
            $this.outerWidth($fakeOptions.outerWidth());
            if($fakeOption.is('.selected')){
                var $fakeSelected = $fakeOptions.find('.fake_option.selected'),
                    $selectedText = $fakeSelected.find('.btn').text();
                $this.find('span').text($selectedText);
            }
            $this.removeClass('active').attr('title','하위 메뉴 열기').next().stop().slideUp();
            $this.not(':disabled').on('click',function(){
                if($this.is('.active') === true){
                    $this.removeClass('active').attr('title','하위 메뉴 열기').next().stop().slideUp();
                }else if($this.is('.active') === false){
                    $this.addClass('active').attr('title','하위 메뉴 닫기').next().stop().slideDown();
                }
            });
            $fakeOptionBtn.on('click',function(){
                var $thisBtn = $(this),
                    $selectedText = $thisBtn.text();
                $thisBtn.parent().addClass('selected').siblings().removeClass('selected');
                $this.removeClass('active').attr('title','하위 메뉴 열기').next().stop().slideUp();
                $this.find('span').text($selectedText);
            });
        });
        
        // 박스 자동 높이
        //박스 자동 높이조절 시작
        function tabChk(tabs) {
            if (tabs && tabs.css('display') == 'none') {
                tabs.css('display', 'block');
                return true;
            }
        }
        //스텝박스
        function stepAutoHeight($stepBox) {
            if ($window.width() > 640) {
                let $stepItem = $stepBox.find('.step_item'),
                    $titleBox = $stepItem.find('.title_box'),
                    $textBox = $stepItem.find('.text_box');
                
                var tabs = $stepBox.closest('.tab .tab_content');
                var tabChk1 = tabChk(tabs);
                
                $titleBox.removeAttr('style');
                $textBox.removeAttr('style');
                
                // 1.titleBox 높이값, 최대높이값
                let $titleHeight = $titleBox.map(function () {
                    return $(this).height();
                }).get();
                
                let $titleMaxHeight = Math.max.apply(null, $titleHeight);
                $titleBox.height($titleMaxHeight);
                
                // 2.textBox 높이값, 최대높이값
                let $textHeight = $textBox.map(function () {
                    return $(this).height();
                }).get();
                
                let $textMaxHeight = Math.max.apply(null, $textHeight);
                $textBox.height($textMaxHeight);
                
                if(tabChk1)tabs.removeAttr('style');
            }
        }
        $window.on('load resize', function () {
            $('#container').find('.step_list').each(function(){
                stepAutoHeight($(this));
            });
        });
        //카테고리 박스
        function categoryAutoHeight($categoryBox) {
            if ($window.width() > 640) {
                let $categoryItem = $categoryBox.find('.category_item'),
                    $titleBox = $categoryItem.find('.title_box'),
                    $textBox = $categoryItem.find('.desc_box');
                
                var tabs = $categoryBox.closest('.tab .tab_content');
                var tabChk1 = tabChk(tabs);
                
                $titleBox.removeAttr('style');
                $textBox.removeAttr('style');
                
                // 1.titleBox 높이값, 최대높이값
                let $titleHeight = $titleBox.map(function () {
                    return $(this).height();
                }).get();
                
                let $titleMaxHeight = Math.max.apply(null, $titleHeight);
                $titleBox.height($titleMaxHeight);
                
                // 2.textBox 높이값, 최대높이값
                let $textHeight = $textBox.map(function () {
                    return $(this).height();
                }).get();
                
                let $textMaxHeight = Math.max.apply(null, $textHeight);
                $textBox.height($textMaxHeight);
                
                if(tabChk1)tabs.removeAttr('style');
            }
        }
        $window.on('load resize', function () {
            $('#container').find('.temp_box.type_category').each(function(){
                categoryAutoHeight($(this));
            });
        });

    });
})(jQuery);