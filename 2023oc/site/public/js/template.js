(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {

        var $container = $('#container');
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

        // 스텝박스 자동높이조절 시작
        var $stepBoxes = $container.find('.step_box.auto_type');

        $window.on('load resize', function (){
            $stepBoxes.each(function(){
                stepBoxAutoHeight($(this));
            });
        })
        function stepBoxAutoHeight(stepbox) {
            if($window.width() > 640) {
                var $stepInner = stepbox.find('.step_item_inner'),
                    $titleBox = $stepInner.find('.title_box'),
                    $onlyTitleBox = $stepInner.find('.title_box:only-child'),
                    $descBox = $stepInner.find('.desc_box'),
                    $onlyDescBox = $stepInner.find('.desc_box:only-child'),
                    $descStepInner = $descBox.closest('.step_item_inner');

                var tabs = stepbox.closest('.oc_cts .oc_cts_item');
                var tabCheck1 = tabCheck(tabs);

                $descBox.add($onlyTitleBox).removeAttr('style');

                // 1-1) titleBox의 높이값
                var $titleHeight = $titleBox.map(function () {
                    return $(this).height();
                }).get();
                
                // 1-2) titleBox의 최대 높이값
                var $titleMaxHeight = Math.max.apply(null, $titleHeight);
                $titleBox.height($titleMaxHeight);
                
                // 2-1) descBox의 높이값
                var $descHeight = $descBox.map(function () {
                    return $(this).height();
                }).get();

                // 2-2) descBox의 최대 높이값
                var $descMaxHeight = Math.max.apply(null, $descHeight);
                $descBox.height($descMaxHeight);

                // 3-1) stepInner 높이값
                var $innerHeight = $stepInner.map(function (){
                    return $(this).height();
                }).get();

                // 3-2)titleBox만 자식으로 둔 stepInner에 최대높이값 부여
                var $innerMaxHeight = Math.max.apply(null, $innerHeight);
                $onlyTitleBox.height($innerMaxHeight);

                if (tabCheck1) tabs.removeAttr('style');
            }
        }
        function tabCheck(tabs) {
            if (tabs && tabs.css('display') == 'none') {
                tabs.css('display', 'block');
                return true;
            }
        }
        // 스텝박스 자동높이조절 끝
        
        //아코디언 박스 시작
        var $OcAco = $('.oc_aco');
        $OcAco.each(function(){
            var $this = $(this),
                IsNonAcoType = $this.is('.non_aco_type'),
                $OcAcoList = $this.find('.oc_aco_list'),
                $OcAcoItem = $OcAcoList.find('.oc_aco_item');
            if(!IsNonAcoType){
                $OcAcoItem.each(function(){
                var $EachItem = $(this),
                    $OcAcoItemInner = $EachItem.find('.oc_aco_item_inner'),
                    $OcAcoBtn = $OcAcoItemInner.find('button.oc_aco_btn'),
                    $OcAcoAnswer = $OcAcoItemInner.find('.oc_aco_answer');
                $OcAcoAnswer.css({'display': 'none'});
                $OcAcoBtn.on('click', function(){
                    var $MyBtn = $(this),
                        $MyItemInner = $MyBtn.parent('.oc_aco_item_inner'),
                        $MyItem = $MyItemInner.parent('.oc_aco_item'),
                        IsActive = $MyItem.is('.active'),
                        $MyAnswer = $MyItemInner.find('.oc_aco_answer'),

                        $OtherItem = $MyItem.siblings('.oc_aco_item'),
                        $OtherItemInner = $OtherItem.find('.oc_aco_item_inner'),
                        $OtherAnswer = $OtherItemInner.find('.oc_aco_answer'),
                        $OtherBtn = $OtherItemInner.find('button.oc_aco_btn');
                    if(!IsActive){
                        $OtherItem.removeClass('active');
                        $OtherBtn.attr('title', '질문 대답 레이어 열기');
                        $OtherAnswer.slideUp('400', 'linear');

                        $MyItem.addClass('active');
                        $MyBtn.attr('title', '질문 대답 레이어 닫기');
                        $MyAnswer.slideDown('400', 'linear');
                    }
                    else{
                        $MyItem.removeClass('active');
                        $MyBtn.attr('title', '질문 대답 레이어 열기');
                        $MyAnswer.slideUp('400', 'linear');
                    }
                });
            });
            }

            var $OcAcoTopBox = $this.find('.oc_aco_top_box'),
                $OcAllOpen = $OcAcoTopBox.find('button.oc_aco_all_open'),
                $OcAllClose = $OcAcoTopBox.find('button.oc_aco_all_close');
            $OcAllOpen.on('click', function(){
                var $this = $(this),
                    $MyOcAcoTopBox = $this.parent('.oc_aco_top_box'),
                    $SiblingsOcAcoList = $MyOcAcoTopBox.siblings('.oc_aco_list'),
                    $SiblingsOcAcoItem = $SiblingsOcAcoList.find('.oc_aco_item'),
                    $SiblingsOcAcoBtn = $SiblingsOcAcoItem.find('button.oc_aco_btn'),
                    $SiblingsOcAcoAnswer = $SiblingsOcAcoItem.find('.oc_aco_answer');
                $SiblingsOcAcoItem.addClass('active');
                $SiblingsOcAcoBtn.attr('title', '질문 대답 레이어 닫기');
                $SiblingsOcAcoAnswer.slideDown('400', 'linear');
            });
            $OcAllClose.on('click', function(){
                var $this = $(this),
                    $MyOcAcoTopBox = $this.parent('.oc_aco_top_box'),
                    $SiblingsOcAcoList = $MyOcAcoTopBox.siblings('.oc_aco_list'),
                    $SiblingsOcAcoItem = $SiblingsOcAcoList.find('.oc_aco_item'),
                    $SiblingsOcAcoBtn = $SiblingsOcAcoItem.find('button.oc_aco_btn'),
                    $SiblingsOcAcoAnswer = $SiblingsOcAcoItem.find('.oc_aco_answer');
                $SiblingsOcAcoItem.removeClass('active');
                $SiblingsOcAcoBtn.attr('title', '질문 대답 레이어 열기');
                $SiblingsOcAcoAnswer.slideUp('400', 'linear');
            });
        });
        //아코디언 박스 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);