"use strict";

try {
    //제이쿼리가 있으면
    this.jQuery = this.jQuery || undefined;

    //제이쿼리가 있으면
    if(jQuery) {
        //$ 중복방지
        (function($) {
            $(function() {
                var $window = $(window),
                    $html = $('html'),
                    $container = $('#container'),
                    $footer = $('#footer');

                //여기서부터 코드 작성해주세요.
                // 텝메뉴 시작
                var $TabType1 = $container.find('.tab_menu.type1');
                $TabType1.each( function() {
                    var $this = $(this),
                        $tabPanel = $this.find('.tab_panel'),
                        $tabList = $tabPanel.find('.tab_list'),
                        $tabItem = $tabList.find('.tab_item'),
                        ItemLength = $tabItem.length,
                        tabItemFirst;

                    $this.addClass('divide' + ItemLength);

                    if ($window.width() > 800) {
                        if (ItemLength > 0) {
                            if (ItemLength <= 5) {
                                tabItemFirst = 1;
                                $this.addClass('line_1');
                            } else if (ItemLength > 5 && ItemLength < 11) {
                                tabItemFirst = 6;
                                $this.addClass('line_2');
                            } else if (ItemLength > 10 && ItemLength < 16) {
                                tabItemFirst = 11;
                                $this.addClass('line_3');
                            } 
                        }
                    } else if ($window.width() <= 800) {
                        if (ItemLength > 0){
                            if (ItemLength <= 3) {
                                tabItemFirst = 1;
                                $this.addClass('line_1');
                            } else if(ItemLength > 3 && ItemLength < 7) {
                                tabItemFirst = 4;
                                $this.addClass('line_2');
                            } else if (ItemLength > 6 && ItemLength < 10) {
                                tabItemFirst = 7;
                                $this.addClass('line_3');
                            } else if (ItemLength > 9 && ItemLength < 13) {
                                tabItemFirst = 10;
                                $this.addClass('line_4');
                            } else if (ItemLength > 12 && ItemLength < 16) {
                                tabItemFirst = 13;
                                $this.addClass('line_5');
                            }
                        }
                    }
                    
                    $tabItem.eq(tabItemFirst - 1).addClass('first');
                });
                // 텝메뉴 끝
                

            });
        })(jQuery);
    }
}catch(e) {
    console.error(e);
}