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

        //버튼 효과 스크립트 시작
        var $TempBtnIcon = $container.find('span.temp_btn.icon_type');
        var $TempBtnFile = $container.find('span.temp_btn.file_type');

        function eachTempBtn($tempBtn){
            $tempBtn.each(function(){
                var $this = $(this);

                addMoveText($this.find('a'));
                addMoveText($this.find('button'));
                addMoveText($this.find('input[type="submit"]'));

                function addMoveText($MoveBtn) {
                    var $parent = $MoveBtn.parent(),
                        text = $MoveBtn.is('input') ? $MoveBtn.val() : $MoveBtn.text(),
                        // ▶ ▶ ▶ $MoveBtn가 인풋 요소인지 아닌지를 확인함
                        // (1) text = $MoveBtn.is('input') ▶ $MoveBtn가 인풋인지 확인하는 조건문,
                        // 조건이 참일경우 ? 뒤의 $MoveBtn.val()이 실행되어 input 요소의 value 값을 가져옴
                        // 조건이 거짓일 경우 : 뒤의 $MoveBtn.text()가 실행되어 input 요소가 아닌 경우의 텍스트를 가져옴
                        // (2) 즉, input 요소인 경우 값(value)를 가져오고, input 요소가 아닌 경우 텍스트를 가져와 변수 text에 담음

                        sizeClass = $parent.hasClass('medium') ? 'medium' : ($parent.hasClass('small') ? 'small' : ''),
                        // ▶ ▶ ▶ $parent가 .medium 또는 .small 클레스를 가지고 있는지를 확인함
                        // (1) $parent.hasClass('medium') ▶ $parent가 .medium 클레스를 가지고있는지 여부를 확인하는 조건문
                        // 조건이 참일경우 ? 뒤의 'medium' 이 들어옴
                        // 조건이 거짓일경우 : 뒤의 ($parent.hasClass('small') ? 'small' : ''), 조건문이 실행
                        // (2) $parent.hasClass('small') ▶ $parent가 .small 클레스를 가지고있는지 여부를 확인하는 조건문
                        // 조건이 참일경우 ? 뒤의 'small'이 들어옴
                        // 조건이 거짓일경우 : 뒤의 ''(빈 문자열) 들어옴
                        // (3) 즉, $parent의 클레스명에 따라 'medium' , 'small', ''(빈 문자열)을 sizeClass에 담음

                        cssValue = sizeClass === 'medium' ? 25 : (sizeClass === 'small' ? 20 : 30);
                        // ▶ ▶ ▶ 변수 sizeClass에 따라 cssValue 값을 넣음.
                        // (1) sizeClass === 'medium' ▶ sizeClass가 'medium'인지 여부를 확인하는 조건문
                        // 조건이 참일경우 ? 뒤의 '25'가 들어옴
                        // 조건이 거짓일경우 : 뒤의[(sizeClass === 'small' ? 20 : 30);)] 조건문이 실행
                        // (2) (sizeClass === 'small' ? 20 : 30) ▶ sizeClass === 'small' 은 변수 sizeClass가 'small' 인지의 여부를 확인하는 조건문
                        // 조건이 참일경우 ? 뒤의 '20'이 들어옴
                        // 조건이 거짓일경우 : 뒤의 '30'이 들어옴
                        // (3) 즉, 변수 sizeClass에 따라 'medium' 이면 25, 'small'이면 20, 이 둘에 해당하지 않는 그외에는 30을, 변수 cssValue에 넣음

                        /*
                        삼항연산자 식
                        나람 = 조건문 ? 조건문(참) : 조건문(거짓)
                        - 참이면 ? 뒤에 조건을 실행
                        - 거짓이면 : 뒤에 조건을 실행

                        삼항연산자 처리 순서의 차이

                        1. 나람 = a ? b : c ? d : e

                        (1) a의 값이 true이면 b가 선택.
                        (2) a의 값이 false이면, 다음으로 c의 값이 평가
                        (3) c의 값이 true이면 d가 선택됩니다.
                        (4) c의 값이 false이면 e가 선택됩니다.

                        2. 나람 = a ? b : (c ? d : e)

                        괄호 안의 연산이 먼저 평가. 즉 먼저 c의 값이 평가됩니다.
                        (1) c의 값이 true이면 d가 선택
                        (2) c의 값이 false이면 e가 선택
                        (3) 괄호 안의 c값을 평가한 후 a의 값을 평가
                        (4) a의 값이 true이면 b가 선택
                        (5) a의 값이 false이면 이전에 괄호 안에서 선택된 값이 나타남
                        */

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

        //박스 자동 높이조절 시작
        $window.on('load resize', function () {
            $container.find('.temp_box.vt_type').each(function(){  //세로 아이콘박스
                vtAutoHeight($(this));
            });

            $container.find('.auto_step_box').each(function(){  //스텝박스
                stepAutoHeight($(this));
            });
        });

        //세로 아이콘박스
        function vtAutoHeight($vtBox) {
            if ($window.width() > 640) {
                let $vtItem = $vtBox.find('.vt_item'),
                    $titleBox = $vtItem.find('.title_box'),
                    $descBox = $vtItem.find('.desc_box');

                var tabs = $vtBox.closest('.cts_box .cts_item');
                var tabChk1 = tabChk(tabs);

                $titleBox.removeAttr('style');
                $descBox.removeAttr('style');

                // 1.titleBox 높이값, 최대높이값
                let $titleHeight = $titleBox.map(function () {
                    return $(this).height();
                }).get();

                let $titleMaxHeight = Math.max.apply(null, $titleHeight);
                $titleBox.height($titleMaxHeight);

                // 2.descBox 높이값, 최대높이값
                let $descHeight = $descBox.map(function () {
                    return $(this).height();
                }).get();

                let $descMaxHeight = Math.max.apply(null, $descHeight);
                $descBox.height($descMaxHeight);

                if(tabChk1)tabs.removeAttr('style');
            }
        }

        //스텝박스
        function stepAutoHeight($stepBox) {
            if ($window.width() > 640) {
                let $stepItem = $stepBox.find('.step_item'),
                    $titleBox = $stepItem.find('.title_box'),
                    $descBox = $stepItem.find('.desc_box');

                var tabs = $stepBox.closest('.cts_box .cts_item');
                var tabChk1 = tabChk(tabs);

                $titleBox.removeAttr('style');
                $descBox.removeAttr('style');

                // 1.titleBox 높이값, 최대높이값
                let $titleHeight = $titleBox.map(function () {
                    return $(this).height();
                }).get();

                let $titleMaxHeight = Math.max.apply(null, $titleHeight);
                $titleBox.height($titleMaxHeight);

                // 2.descBox 높이값, 최대높이값
                let $descHeight = $descBox.map(function () {
                    return $(this).height();
                }).get();

                let $descMaxHeight = Math.max.apply(null, $descHeight);
                $descBox.height($descMaxHeight);

                if(tabChk1)tabs.removeAttr('style');
            }
        }
        function tabChk(tabs) {
            if (tabs && tabs.css('display') == 'none') {
                tabs.css('display', 'block');
                return true;
            }
        }
        // 스텝박스 끝

        // QnA 시작
        var $acnBox = $container.find('.temp_acn_box');

        $acnBox.each(function(){
            var $acnBox = $(this),
                $acnItem = $acnBox.find('.temp_acn_item'),
                $acnBtn = $acnItem.find('button.temp_acn_btn');

            $acnBtn.on('click', function(){
                var $acnBtn = $(this),
                    $thisItem = $acnBtn.closest('.temp_acn_item'),
                    $thisCon = $thisItem.find('.temp_acn_con'),
                    IsActive = $thisItem.is('.active');

                if (!IsActive) {
                    $thisCon.stop().slideDown(250, 'linear');
                    $thisItem.addClass('active');
                    $acnBtn.attr('title', '닫기');
                } else {
                    $thisCon.stop().slideUp(250, 'linear');
                    $thisItem.removeClass('active');
                    $acnBtn.attr('title', '열기');
                }
            });
        });
        // QnA 끝

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
        
        // 팝업창 열기, 닫기 시작
        $('.popup_open').on('click', function (){
            var thisOepnBtn = $(this).attr('data-open');

            $('.donate_popup_wrap[data-popup="' + thisOepnBtn + '"]').fadeIn();
            $('.donate_popup_wrap[data-popup="' + thisOepnBtn + '"]').find('.close_curtain').focus();
        });

        $('.donate_popup_wrap .close_btn, .close_curtain').on('click', function (){
            var $PopupWrap = $(this).parents('.donate_popup_wrap');
            $PopupWrap.fadeOut();
            
            var $OriginPopupOpen = $('[data-open="' + $PopupWrap.data('popup') + '"].popup_open');
            $OriginPopupOpen.focus();
        });
        // 팝업창 열기, 닫기 끝

    });

})(jQuery);