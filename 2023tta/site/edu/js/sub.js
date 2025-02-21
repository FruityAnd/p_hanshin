(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {

        //사이드
        var $container = $('#container'),
            $side = $container.find('.side'),
            $sideDepthItem = $side.find('.depth_item'),
            $sideSpy = $side.find('.spy:last');

        $sideDepthItem.on('click.menu', function (event) {
            var $this = $(this),
                $depthText = $this.children('.depth_text'),
                eventTarget = event.target,
                IsActive = $this.is('.active');

            if ($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                if ($this.hasClass('depth1_item')) {
                    if ($this.hasClass('active')) {
                        $html.removeClass('side_open');
                    } else {
                        $html.addClass('side_open');
                    }
                }

                if ($this.children('.depth').length) {
                    var $Depth = $this.children('.depth'),
                        DepthDisplay = $Depth.css('display');
                    if (DepthDisplay !== 'none') {//하위메뉴가 display:none이 아니면 실행
                        if (!IsActive) {
                            $this.removeClass('active_prev active_next');
                            $this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
                            $this.prev('.depth_item').addClass('active_prev');
                            $this.next('.depth_item').addClass('active_next');
                        } else {
                            $this.removeClass('active');
                            $this.siblings('.depth_item').removeClass('active_prev active_next');
                        }
                        event.preventDefault();
                    }
                }
            }

            event.stopPropagation();
        }).each(function (index, element) {
            var $element = $(element);

            if ($element.children('.depth').length) {
                $element.addClass('has');
            } else {
                $element.addClass('solo');
            }
        });

        if ($sideSpy.length) {
            $html.addClass('side_open');
            $sideSpy.parents('.depth_item').addClass('active');
            $sideSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
            $sideSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
        }

        //여기서부터 코드 작성해주세요

        //공유하기 시작
        $('.add_box .add_item.share button.share_btn').on('click', function(){
            var $this = $(this),
                $MyItem = $this.parent('.add_item.share'),
                IsActive = $MyItem.is('.active'),
                $ShareList = $this.siblings('.share_list');
            if(!IsActive){
                $MyItem.addClass('active');
                $this.attr('공유리스트 닫기');
                $ShareList.slideDown(200, 'linear');
            }
            else{
                $MyItem.removeClass('active');
                $this.attr('공유리스트 열기');
                $ShareList.slideUp(200, 'linear');
            }
        });
        //공유하기 끝

        //링크복사 시작
        function UrlCopy(url){
            var $CopyTemp = $('<input>');
            $('body').append($CopyTemp);
            $CopyTemp.val(url).select();
            document.execCommand('copy');
            $CopyTemp.remove();
            alert('URL이 복사되었습니다.');
        }
        $(document).on('click', '.add_box .share_list .share_item.copy a.share_link', function(e){
            e.preventDefault();
            var link = location.href;
            UrlCopy(link);
        });
        //링크복사 끝

        //페이지 컨텐츠 영역 인쇄 시작
        $('.sub_visual .add_box .print button.share_btn').on('click', function(){
            
        });
        //페이지 컨텐츠 영역 인쇄 끝

        //CMS 3차 메뉴 개수 파악 시작
        var $CmsDepth3 = $('.cms_depth3');
        $CmsDepth3.each(function(){
            var $this = $(this),
                $CmsDepth3List = $this.find('.cms_depth3_list'),
                $CmsDepth3Item = $CmsDepth3List.find('.cms_depth3_item'),
                CmsDepth3ItemLength = $CmsDepth3Item.length;
            $this.addClass('cms_divide'+CmsDepth3ItemLength+'');
        });
        //CMS 3차 메뉴 개수 파악 끝

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

        //컨텐츠 탭메뉴 시작
        var $EduTabBox = $('#contents .edu_tab_box');
        $EduTabBox.each(function() {
            var $this = $(this),
                $EduTabList = $this.find('.edu_tab_list'),
                $EduTabItem = $EduTabList.find('.edu_tab_item'),
                $EduTabBtn = $EduTabItem.find('button.edu_tab_btn');

            $EduTabBtn.on('click', function() {
                var $MyBtn = $(this),
                    $MyItem = $MyBtn.parent('.edu_tab_item'),
                    $OtherItem = $MyItem.siblings('.edu_tab_item'),
                    $OtherBtn = $OtherItem.find('button.edu_tab_btn'),
                    MyItemIndex = $MyItem.index(),
                    IsActive = $MyItem.is('.active'),
                    $MyList = $MyItem.parent('.edu_tab_list'),
                    $CtsList = $MyList.siblings('.edu_tab_cts_list'),
                    $MyCtsItem = $CtsList.find('.edu_tab_cts_item').eq(MyItemIndex),
                    $OtherCtsItem = $MyCtsItem.siblings('.edu_tab_cts_item');
                if(!IsActive){
                    $OtherItem.removeClass('active');
                    $OtherBtn.removeAttr('title');
                    $MyItem.addClass('active');
                    $MyBtn.attr('title', '선택됨');
                    $OtherCtsItem.removeClass('active');
                    $MyCtsItem.addClass('active');
                }
            });
        });
        //컨텐츠 탭메뉴 끝

        //TTA 전용 셀렉트 시작

        var $EduFakeSelectBox = $('.edu_fake_select_box');
        $EduFakeSelectBox.each(function(){
            var $this = $(this),
                $EduFakeSelect = $this.find('.edu_fake_select'),
                $FakeSelectOpenBtn = $EduFakeSelect.find('button.fake_select_open_btn'),
                $FakeSelectList = $EduFakeSelect.find('.fake_select_list'),
                $FakeSelectItem = $FakeSelectList.find('.fake_select_item'),
                $FakeSelectBtn = $FakeSelectItem.find('button.fake_select_btn'),
                $FakeSelectItemActive = $FakeSelectItem.siblings('.fake_select_item.active'),
                $FakeSelectActiveBtn = $FakeSelectItemActive.find('button.fake_select_btn'),
                StartFakeSelectActiveBtnText = $FakeSelectActiveBtn.text(),
                $SelectedText = $FakeSelectOpenBtn.find('.text'),
                StartFakeSelectItemActiveIndex = $FakeSelectItemActive.index(),
                $StartRealSelect = $EduFakeSelect.siblings('select.real_select'),
                $StartRealSelectOption = $StartRealSelect.find('option').eq(StartFakeSelectItemActiveIndex);

            $StartRealSelectOption.attr('selected', 'selected');
            $SelectedText.empty().text(StartFakeSelectActiveBtnText);

            //option에 텍스트 매칭
            $FakeSelectItem.each(function(){
                var $this = $(this),
                    StartIndex = $this.index(),
                    $StartFakeBtn = $this.find('button.fake_select_btn'),
                    $StartFakeBtnText = $StartFakeBtn.text(),
                    $StartFakeSelectList = $this.parent('.fake_select_list'),
                    $StartFakeSelect = $StartFakeSelectList.parent('.edu_fake_select'),
                    $StartRealSelect = $StartFakeSelect.siblings('select.real_select'),
                    $StartRealOption = $StartRealSelect.find('option').eq(StartIndex).empty().text($StartFakeBtnText);
            });
            //가짜셀렉트 레이어 표출
            $FakeSelectOpenBtn.on('click', function(){
                var $this = $(this),
                    $thisFakeSelect = $this.parent('.edu_fake_select'),
                    $thisTempSelect = $thisFakeSelect.parent('.edu_fake_select_box'),
                    IsActive = $thisTempSelect.is('.active');
                if(!IsActive){
                    $FakeSelectList.slideDown(250, 'linear');
                    $thisTempSelect.addClass('active');
                    $this.attr('title', '하위메뉴닫기');
                }
                else{
                    $FakeSelectList.slideUp(250, 'linear');
                    $thisTempSelect.removeClass('active');
                    $this.attr('title', '하위메뉴열기');
                }
            });
            //가짜셀렉트의 버튼과 진짜셀렉트의 option값 매칭 및 selected
            $FakeSelectBtn.on('click', function(){
                var $this = $(this),
                    thisText = $this.text(),
                    $thisFakeSelectItem = $this.parent('.fake_select_item'),
                    thisFakeSelectItemIndex = $thisFakeSelectItem.index(),
                    $otherFakeSelectItem = $thisFakeSelectItem.siblings('.fake_select_item'),
                    $otehrFakeSelectBtn = $otherFakeSelectItem.find('button.fake_select_btn'),
                    $thisFakeSelectList = $thisFakeSelectItem.parent('.fake_select_list'),
                    $thisFakeSelect = $thisFakeSelectList.parent('.edu_fake_select'),
                    $thisTempSelect = $thisFakeSelect.parent('.edu_fake_select_box'),
                    IsActive = $thisTempSelect.is('.active'),
                    $FakeSelectOpenBtn = $thisFakeSelectList.siblings('button.fake_select_open_btn'),
                    $SelectedText = $FakeSelectOpenBtn.find('.text'),
                    $RealSelect = $thisFakeSelect.siblings('select.real_select'),
                    $RealSelectOption = $RealSelect.find('option').eq(thisFakeSelectItemIndex),
                    $OtherRealSelectOption = $RealSelectOption.siblings('option');
                if(IsActive){
                    $otherFakeSelectItem.removeClass('active');
                    $otehrFakeSelectBtn.removeAttr('title');
                    $thisFakeSelectItem.addClass('active');
                    $this.attr('title', '선택됨');
                    $OtherRealSelectOption.removeAttr('selected');
                    $RealSelectOption.attr('selected', 'selected');
                    $FakeSelectOpenBtn.attr('title', '하위메뉴열기');
                    $SelectedText.text(thisText);
                    $thisFakeSelectList.slideUp(250, 'linear');
                    $thisTempSelect.removeClass('active');
                    $FakeSelectOpenBtn.focus();
                }
            });
        });
        //TTA 전용 셀렉트 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);