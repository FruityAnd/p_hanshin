

(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    $(function() {

		//사이드
		var $container = $('#container'),
			$side = $container.find('.side'),
			$sideDepthItem = $side.find('.depth_item'),
			$sideSpy = $side.find('.spy:last');

		$sideDepthItem.on('click.menu', function(event) {
			var $this = $(this),
				$depthText = $this.children('.depth_text'),
				eventTarget = event.target,
				IsActive = $this.is('.active');

			if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
				if($this.hasClass('depth1_item')) {
					if($this.hasClass('active')) {
						$html.removeClass('side_open');
					}else{
						$html.addClass('side_open');
					}
				}

				if($this.children('.depth').length) {
					var $Depth = $this.children('.depth'),
						DepthDisplay = $Depth.css('display');
					if(DepthDisplay!=='none'){//하위메뉴가 display:none이 아니면 실행
						if(!IsActive){
							$this.removeClass('active_prev active_next');
							$this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
							$this.prev('.depth_item').addClass('active_prev');
							$this.next('.depth_item').addClass('active_next');
						} else{
							$this.removeClass('active');
							$this.siblings('.depth_item').removeClass('active_prev active_next');
						}
						event.preventDefault();
					}
				}
			}

			event.stopPropagation();
		}).each(function(index, element) {
			var $element = $(element);

			if($element.children('.depth').length) {
				$element.addClass('has');
			}else{
				$element.addClass('solo');
			}
		});

		if($sideSpy.length) {
			$html.addClass('side_open');
			$sideSpy.parents('.depth_item').addClass('active');
			$sideSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
			$sideSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
		}

		//여기서부터 코드 작성해주세요

		$('.tab_menu').not($('.prettyprint').children()).each(function() {
			var li_length = $(this).children('ul').find('li').length;
			$(this).addClass('divide'+li_length);
		});

		$('table.table.responsive').not($('.prettyprint').children()).each(function() {
			var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
				TheadExist = $(this).find('thead').length;
			if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
				$(this).children('tbody').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
				$(this).children('tfoot').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
			};
		});

		// sharebox		
		$('.sharebox .share_btn.sns_share').on('click keydown', function (event) {
			if(event.type == 'keydown' && !(event.which == 13)){
				return;
			}else{
				event.preventDefault();
				if(event.type === 'click'){
					$(this).blur();
				// }else{
				// 	var $shareFst = $('.sharebox .share_list a').eq(0);
				// 	console.log($shareFst);
				// 	setTimeout(function(){$shareFst.focus()});
				};
			};
			
            var $this = $(this),
                $share = $this.parent('.share_wrap'),
                OnOff = $share.is('.active'),
                $list = $this.parent('.share_wrap').find('.share_list');

			if(!OnOff){
				$share.addClass('active');
				$this.attr('title', 'sns 공유 닫기').text('sns 공유 닫기');
				$list.show();

			} else{
				$share.removeClass('active');
				$this.attr('title', 'sns 공유 열기').text('sns 공유 열기');
				$list.hide();
			};
		});


		 //프린트
		$('.sharebox .share_btn.print').on('click', function () {
			var $contents = $('#contents'),
				ContentsClass = $contents.attr('class');
			var $head = $('head').clone();
			var $contentsClone = $('#contents').clone();    // 프린트 할 특정 영역 복사			 
			var headHtml = $head[0].innerHTML;
			var innerHtml = $contentsClone[0].innerHTML;
			var popupWindow = window.open("", "_blank", "width=1000,height=800");
			popupWindow.document.write('<!DOCTYPE html>'+
			'<html>'+
				'<head>'+headHtml+'</head>'+
				'<body><div id="wrapper"><div id="contents" class="'+ContentsClass+'">'+innerHtml+'</div></div></body>'+
			'</html>')			
			popupWindow.document.close();
			popupWindow.focus();		
			setTimeout(function(){
				popupWindow.print();         // 팝업의 프린트 도구 시작
				popupWindow.close();       // 프린트 도구 닫혔을 경우 팝업 닫기
			}, 1000);
			$(this).blur();
		});


		// template 
		
		$('.temp_selectbox:not(.disabled) .select_btn').on('click', function(){
			var $this = $(this),
				$MyParent = $this.parent('.temp_selectbox'),
				IsActive = $MyParent.is('.active'),
				$Layer = $this.siblings('.layer');
			if(!IsActive){
				$MyParent.addClass('active');
				$Layer.slideDown();
				$this.attr('title', '하위메뉴닫기');
			} else{
				$MyParent.removeClass('active');
				$Layer.slideUp();
				$this.attr('title', '하위메뉴열기');
			}
		});
		$('.temp_selectbox .layer ul li button.select_item').on('click', function(){
			var $this = $(this),
				$MyParent = $this.parent('li'),
				IsActive = $MyParent.is('.active'),
				ThisText = $this.text(),
				$OtherParents = $MyParent.siblings('li'),
				$SelectBox = $this.parents('.temp_selectbox'),
				$Layer = $this.parents('.layer'),
				$SelectBtn = $Layer.siblings('.select_btn');
			$SelectBox.removeClass('active');
			$SelectBtn.text(ThisText).attr('title', '하위메뉴열기');
			$Layer.slideUp();
		});

		$('.tab_menu.scripttab .tab_list .tab_item button.tab_anchor').on('click', function(){
			var $this = $(this),
				$MyParent = $this.parent('li'),
				IsActive = $MyParent.is('.active'),
				ThisIndex = $MyParent.index(),
				$tab_panel = $this.parents('.tab_panel'),
				$tab_select = $tab_panel.siblings('.tab_select').find('.tablebox').find('span'),
				ThisText = $this.find('.tablebox').find('span').text(),
				$OtherParents = $MyParent.siblings('li'),
				$OtherBtns = $OtherParents.find('.tab_anchor'),
				$tab_content = $tab_panel.siblings('.tab_content'),
				$MyItem = $tab_content.find('.tabcon').eq(ThisIndex),
				$OtherItems = $MyItem.siblings('.tabcon');
			if(!IsActive){
				$OtherParents.removeClass('active');
				$OtherBtns.removeAttr('title');
				$MyParent.addClass('active');
				$this.attr('title', '선택됨');
				$OtherItems.removeClass('active');
				$MyItem.addClass('active');
				$tab_select.text(ThisText);
			}
		});

		// 
        $window.on('screen:tablet screen:phone', function(event) {
            
        });
    });
})(jQuery);