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
        
        //컨텐츠 텝메뉴
        $('.course_tab_box .course_tab_item').each(function (){
            var $this = $(this);

            if ($this.is('.active')){
                var $thisText = $this.find('.item_btn').text();

                $('.course_tab_btn').text($thisText);
            }
        });


        $('.course_tab_box .course_tab_btn').on('click', function(){
            var $thisBtn = $(this),
                $Layer = $thisBtn.siblings('.course_tab_list'),
                IsActive = $Layer.is('.active');
            
            if(!IsActive) {
                $thisBtn.addClass('active');
                $thisBtn.attr('title', '메뉴 닫기');
                $Layer.addClass('active');
                setTimeout(function (){
                    $Layer.addClass('time_ani');
                },1);
            }else{
                $thisBtn.removeClass('active');
                $thisBtn.attr('title', '메뉴 열기');
                $Layer.removeClass('time_ani');
                setTimeout(function (){
                    $Layer.removeClass('active');
                },800);
            }
        });
        
        $('.course_tab_box .item_btn').on('click', function(){
            var $thisBtn = $(this),
                $thisText = $thisBtn.text(),
                $MyParent = $thisBtn.parent('.course_tab_item'),
                IsActive = $MyParent.is('.active'),
                $OtherParents = $MyParent.siblings('.course_tab_item'),
                $OtherBtns = $OtherParents.find('.item_btn'),
                ParentsIndex = $MyParent.index(),
                $CourseInner = $('.course_box .course_inner'),
                $CourseTabBtn = $('.course_tab_btn'),
                $Layer = $CourseTabBtn.siblings('.course_tab_list'),
                $TabBtnActive = $CourseTabBtn.is('.active');
            
            if(!IsActive){
                $MyParent.addClass('active');
                $OtherParents.removeClass('active');
                $thisBtn.attr('title', '선택됨');
                $OtherBtns.removeAttr('title');
                $CourseInner.eq(ParentsIndex).addClass('active').siblings().removeClass('active');
                $CourseTabBtn.text($thisText);
            }
            if ($TabBtnActive){
                $CourseTabBtn.removeClass('active');
                $CourseTabBtn.attr('title', '메뉴 열기');
                $Layer.removeClass('time_ani');
                setTimeout(function (){
                    $Layer.removeClass('active');
                },800);
            }
        });
        
        
        function tabChk(tabs) {
            if (tabs && tabs.css('display') == 'none') {
                tabs.css('display', 'block');
                return true;
            }
        }
        
        //높이 공통화
        function unifyHeight($vtBox) {
            let $vtItem = $vtBox.children();
            if ($window.width() > 640){
                var tabs = $vtBox.closest('.course_box .course_inner');
                var tabChk1 = tabChk(tabs);
                
                $vtItem.removeAttr('style');
                
                //vtItem 높이값, 최대높이값
                let $vtHeight = $vtItem.map(function () {
                    return $(this).height();
                }).get();
                
                let $vtMaxHeight = Math.max.apply(null, $vtHeight);
                $vtItem.height($vtMaxHeight);
                
                if(tabChk1)tabs.removeAttr('style');
            }else{
                $vtItem.removeAttr('style');
            }
        }
        //박스 자동 높이조절 시작
        $window.on('load resize', function () {
            $('#contents').find('.unify_height').each(function(){
                unifyHeight($(this));
            });
        });

    });
})(jQuery);