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

        //에디터로 글 등록된 기존 게시글들 커스텀 시작
        // $('.p-wrap.bbs.bbs__view .p-table__content').each(function(){
        //     var $childP = $(this).find('p'),
        //         $childDIV = $(this).find('div');
        //     function textNullRemove() {
        //         function eachTag(tag){
        //             tag.each(function() {
        //                 var innerText = $(this).html().trim();
        //                 if(innerText === '&nbsp;') {
        //                     $(this).remove();
        //                 }
        //             });
        //         }
        //         eachTag($childP);
        //         eachTag($childDIV);
        //     }
        //     textNullRemove();
        //
        //     $(this).find('*').removeAttr('style');
        // });
        //에디터로 글 등록된 기존 게시글들 커스텀 끝
        
        //사진DB 슬릭 슬라이드
        var $photoSlideBox = $('.photo_left_box'),
            $photoSlide = $photoSlideBox.find('.photo_list'),
            $photoBtnPrev = $photoSlideBox.find('.button_wrap .button_box.prev .btn'),
            $photoBtnNext = $photoSlideBox.find('.button_wrap .button_box.next .btn');
        $photoSlide.slick({
            accessibility: true,
            adaptiveHeight: true,
            rows: 1,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1000,
            fade: false,
            infinite: false,
            autoplay: false,
            arrows: true,
            prevArrow: $photoBtnPrev,
            nextArrow: $photoBtnNext,
        });
        //사진DB 체크박스 전체선택 토글
        var $tempRadio = $('.photo_bottom_wrap .radio_wrap .temp_form .temp_radio'),
            $allCheck = $('.photo_bottom_wrap .photo_list .photo_item .temp_form .temp_check');
        $tempRadio.on('click',function(){
            if($('#test_radio01').prop('checked')){
                $allCheck.prop('checked',true);
            }else{
                $allCheck.prop('checked',false);
            }
        });


        //일반 게시판 목록 ( 파일 , 조회수 ) 반응형 에서 삭제 시작
        function eqIndex(th, td){
            th.each(function() {
                var $thisTh = $(this),
                    thisThText = $thisTh.html().trim(),
                    thIndex = $thisTh.index();
                if(thisThText === '파일') {
                    td.eq(thIndex).addClass('file_mobile_remove');
                }
                if(thisThText === '조회수') {
                    td.eq(thIndex).addClass('searching_mobile_remove');
                }
            });
        }
        var $bbsListTable = $('.bbs__list .p-table');
        $bbsListTable.each(function(){
            var $this = $(this),
                $thisTr = $this.find('tr'),
                $thisTh = $this.find('th');
            $thisTr.each(function(){
                var $thisTR = $(this),
                    $thisTd = $thisTR.find('td');
                eqIndex($thisTh, $thisTd);
            });
        });
        //일반 게시판 목록 ( 파일 , 조회수 ) 반응형 에서 삭제 끝
        

    });
})(jQuery);