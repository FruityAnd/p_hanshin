(function ($) {
    'use strict';
    
    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    
    $(function () {
        
        var $body = $('body'),
            $htmlAndBody = $html.add($body),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $container = $('#container'),
            $footer = $('#footer');
        
        // 가짜 셀렉트박스 시작
        var $tempSelBox = $container.find('.fake_select_box');
        
        $tempSelBox.each(function () {
            var $tempSelBox = $(this),
                $realSel = $tempSelBox.find('select.real_select'),
                $realSelOpt = $realSel.find('option'),
                $fakeSelOpenBtn = $tempSelBox.find('button.fake_btn_open'),
                $fakeSelOpenText = $fakeSelOpenBtn.find('.text'),
                $fakeSelList = $tempSelBox.find('.fake_list'),
                $fakeSelItem = $fakeSelList.find('.fake_item'),
                $fakeSelBtn = $fakeSelItem.find('button.fake_btn');
            
            // 초기 선택된 옵션 설정
            function setSelection() {
                var $activeItem = $fakeSelItem.siblings('.fake_item.active'),
                    activeIndex = $activeItem.index(),
                    activeText = $activeItem.find('button.fake_btn').text();
                
                $realSel.find('option').eq(activeIndex).attr('selected', true);
                $fakeSelOpenText.text(activeText);
            }
            
            setSelection();
            
            // 옵션 텍스트 매칭
            function matchOption() {
                $fakeSelItem.each(function () {
                    var index = $(this).index(),
                        fakeText = $(this).find('button.fake_btn').text();
                    
                    $realSelOpt.eq(index).text(fakeText);
                });
            }
            
            matchOption();
            
            // 셀렉트박스 열기/닫기
            $fakeSelOpenBtn.on('click', function () {
                $tempSelBox.toggleClass('active');
                var isActive = $tempSelBox.hasClass('active');
                $(this).attr('title', isActive ? '셀렉트박스 닫기' : '셀렉트박스 열기');
            });
            
            // 항목 선택 시 처리
            function selectItem() {
                var index = $(this).closest('.fake_item').index(),
                    text = $(this).text();
                
                $fakeSelItem.removeClass('active').children().removeAttr('title');
                $(this).closest('.fake_item').addClass('active').find('button').attr('title', '선택됨');
                
                $realSelOpt.eq(index).attr('selected', true).siblings().attr('selected', false);
                $fakeSelOpenText.text(text);
                $tempSelBox.removeClass('active');
                $fakeSelOpenBtn.focus();
            }
            
            $fakeSelBtn.on('click', selectItem);
        });
        // 가짜 셀렉트박스 끝

        // 사전예약 - 인원 및 좌석 선택 시작
        var $adultNum = $('.count_box .count_item.adult .count_value'),  //성인 인원수
            $adultVal = parseInt($adultNum.val()),
            $otherNum = $('.count_box .count_item.other .count_value'),  //기타 인원수
            $otherVal = parseInt($otherNum.val()),
            $adultplusBtn = $('.count_box .count_item.adult .count_btn.plus'),  //인원수 증가 버튼
            $otherplusBtn = $('.count_box .count_item.other .count_btn.plus'),  //인원수 증가 버튼
            $adultminusBtn = $('.count_box .count_item.adult .count_btn.minus'), //인원수 감소 버튼
            $otherminusBtn = $('.count_box .count_item.other .count_btn.minus'), //인원수 감소 버튼
            $totalPrice = $('.count_box .pay_item .total .price'), // 최종 결제금액
            $checkSeats = $('.chair_box .seat_list .seat_item .seat_check'), // 선택한 좌석 체크박스

            currentPeople = 0; // 현재 인원 수

        var adultmaxSeats = 0; // 최대 선택가능 인원 및 좌석 수
        var othermaxSeats = 0; // 최대 선택가능 인원 및 좌석 수
        var totalmaxSeats = 0;


        // 1. 인원수 증가 및 감소 (성인)
        $adultplusBtn.on('click', function() {

            if (adultmaxSeats < 1 && $adultVal < 4 && othermaxSeats < 1){
                adultmaxSeats ++;
                $adultVal ++;
                $adultNum.attr('value',$adultVal);

                var totalmaxSeats = adultmaxSeats + othermaxSeats;
                console.log(totalmaxSeats);
            }else if($adultVal > 3){
                alert('최대 4명까지 예약 가능합니다.');
            } else{
                alert('좌석을 먼저 선택해주세요.');
            }
        });

        $adultminusBtn.on('click', function() {
            var $checkLength = $('.seat_check:checked').length;

            if ($adultVal > 0 && $checkLength < $adultVal){
                adultmaxSeats --;
                $adultVal --;
                $adultNum.attr('value',$adultVal);

                var totalmaxSeats = adultmaxSeats + othermaxSeats;
                console.log(totalmaxSeats);
            }else if ($checkLength == $adultVal){
                alert('좌석 해제 요청');
            }
        });

        $checkSeats.on('click', function() {

            var totalmaxSeats = adultmaxSeats + othermaxSeats;

            if (totalmaxSeats > 0){

                if (adultmaxSeats > 0) {
                    $(this).attr('checked', true);
                }
            }else {
                alert('인원을 먼저 선택해주세요.');
                $(this).attr('checked', false);
            }
        });

        /*
        $minusBtn.on('click', function() {  // 1-2. 인원수 감소 버튼 클릭 시
            let $input = $(this).siblings('.count_value');  // 감소 버튼의 형제인 .count_value 찾음
            let count = parseInt($input.val()); // 현재 인원수 값을 문자열에서 숫자열로 변환 후 count 함수에 넣음
            
            $input.val(Math.max(count - 1, 0)); // 1명씩 감소시키고(count - 1), 감소시킨 값이 0 이하로 줄지않도록 막음(Math.max / 0)
        });
        
        // 2. 좌석 선택 및 인원수 연동
        $checkSeats.on('change', function() {
            if (getTotalPeople() === 0) { // 2-1. 만약 총 인원수가 0명인 경우
                alert("인원수를 선택해주세요."); // 인원수를 선택하라는 알림창 띄우고
                $(this).prop('checked', false); // 좌석 선택한 것을 취소시킴
            } else if (getCheckSeatCount() > getTotalPeople()) { // 2-2. 만약 선택한 좌석 수가 총 인원수를 넘을경우
                alert(`최대 ${getTotalPeople()}명까지 좌석을 선택할 수 있습니다.`); // 선택 불가능하다는 알림창 띄우고
                $(this).prop('checked', false); // 좌석 선택한 것을 취소시킴
            }
            
            // 좌석 선택 및 해제할때 금액 업데이트
            updateTotalPrice();
        });
        
        // 3. 총 인원수 계산
        function getTotalPeople() {
            return parseInt($adultNum.val()) + parseInt($otherNum.val());  // 성인 인원수와 기타 인원수를 숫자로 변환하여 합한 후 반환
        }
        
        // 4. 선택된 좌석 수 계산
        function getCheckSeatCount() {
            return $checkSeats.filter(':checked').length; // 선택된 좌석의 개수를 측정
        }
        
        // 5. 총 결제금액 업데이트
        function updateTotalPrice() {
            const total = (parseInt($adultNum.val()) * 5000) + (parseInt($otherNum.val()) * 3000);
            $totalPrice.text(total.toLocaleString());
        }
        // 사전예약 - 인원 및 좌석 선택 끝

         */
    });
})(jQuery);