(function ($) {
    'use strict';
    
    $(function () {
        /* 캘린더 영역 */
        var $DayTd = $('.movie_table tbody .schedule'),
            $DayBtnData = $('.movie_table .schedule .day_item .day_btn'),
            $DayBtn = $('.movie_table .day_item .day_btn'),
            $MovieList = $DayBtn.find('.movie_list');
        
        //페이지 로드시에 일정 개수 체크
        $(document).ready(function () {
            $MovieList.each(function(){
                var $this = $(this),
                    $MovieItem = $this.find('.movie_item'),
                    $ItemLength = $MovieItem.length;
                
                if($ItemLength > 2){
                    $MovieItem.parent().before('<span class="item_count">+<span class="text_count"></span></span>');
                    $MovieItem.parent().prev().find('.text_count').text($ItemLength - 2);
                    $MovieItem.parent().parent().parent().attr('tabeindex','0');
                }
                
            });
        });
        
        //일정 클릭시 클래스 부여
        $DayTd.on('click',function(){
            var $DayThis = $(this);
            
            $DayThis.siblings('td').removeClass('select').removeAttr('title','');
            $DayThis.addClass('select');
            if(!$DayThis.hasClass('today')){
                $DayThis.attr('title','선택됨').parent().parent('.schedule').addClass('select');
                console.log('11');
            }
        });
        /* $(document).ready(function () {
            $DayBtnData.hover(function(){
                var $this = $(this);
                $this.parent().parent().addClass('ahover');
                console.log('11');
            
            },function(){
                var $this = $(this);
                $this.parent().parent().removeClass('ahover');
                console.log('22');
            });
        }); */
        
    });
})(jQuery);