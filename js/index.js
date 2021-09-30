$(document).ready(function () {
    drawCalendar();
    initDate();
    drawDays();

    var nextMonth = month + 1;
    var selectOption = '<option value="' + month + '">' + month + '</option>' +
        '<option value="' + nextMonth + '">' + nextMonth + '</option>';

    $("#index_month_select").append(selectOption);
    // console.log(month);
    $("#index_month_select").val(month).prop("selected", true);


    // cantReservation(year, month)

    var loginChk = sessionStorage.getItem("loginChk");
    if (loginChk === "Y") {
        $('.id_chk_admin').css('display', 'block');
    } else {
        $('.id_chk_admin').css('display', 'none');
    }
});

// 월 변경
$(document).on('change', '#index_month_select', function () {
    var search_month = $('#index_month_select').val();

    var searchYear = year;
    month = search_month;

    getNewInfo();
});

// 날짜 클릭
$(document).on('click', '.cal-day-div', function () {
    // 마감 관련 세션 초기화
    sessionStorage.removeItem("reserve_date");
    sessionStorage.removeItem("reserve_status");
    sessionStorage.removeItem("reserve_db_isin");

    // 예약시간 추가 관련 세션 초기화
    sessionStorage.removeItem("reserve_startTime");
    sessionStorage.removeItem("reserve_endTime");

    var loginChk = sessionStorage.getItem("loginChk");
    var value = $(this).attr("id")

    var classChk = $(this).attr("class");

    if (loginChk === "Y") {     // 관리자인 경우
        $('#custom_popup_index').load('../../app_root/jsp/popup/popup_index.jsp', function () {
            $("html, body").css({ "overflow": "hidden", "height": "100%" });

            $('#custom_popup_index').css("display", "block");
            $('#popup_index').show();

            ////////////// 아래부터 팝업 init
            var title_value;
            if (value[0] === "0") {
                title_value = value.charAt(value.length - 1);
            } else {
                title_value = value;
            }
            var title = title_value + "일 예약 현황";
            $('#pi_title').text(title);

            pi_get_unable_list(value);
        });
    } else {        // 손님인 경우
        if (classChk === "cal-day-div reserve_cant" || $(this).children(".cal-day").text() === '') {
            return false;
        } else {
            // console.log(value);
            // console.log("aaaa");
            $('#custom_popup_index').load('../../app_root/jsp/popup/popup_index.jsp', function () {
                $("html, body").css({ "overflow": "hidden", "height": "100%" });

                $('#custom_popup_index').css("display", "block");
                $('#popup_index').show();

                ////////////// 아래부터 팝업 init
                var title_value;
                if (value[0] === "0") {
                    title_value = value.charAt(value.length - 1);
                } else {
                    title_value = value;
                }
                var title = title_value + "일 예약 현황";
                $('#pi_title').text(title);

                pi_get_unable_list(value);
            });
        }
    }

});

// 로그인 창 클릭
$(document).on('click', '.hidden_btn', function () {
    $('#custom_popup_login').load('../../app_root/jsp/popup/popup_login.jsp', function () {
        $("html, body").css({ "overflow": "hidden", "height": "100%" });

        $('#custom_popup_login').css("display", "block");
        $('#popup_login').show();

        ////////////// 아래부터 팝업 init
        var loginChk = sessionStorage.getItem("loginChk");
        console.log(loginChk);
        if (loginChk === "Y") {
            $('.pl_mid_content').empty();

            var logout_btn =
                '<div class="pl_btn_container">' +
                '<div class="pl_login_btn" id="pl_logout_btn">' +
                '로그아웃' +
                '</div>' +
                '</div>';
            $('.pl_mid_content').append(logout_btn);
        }
    });
});

// 카카오 오픈카톡 버튼
$(document).on('click', '#index_openkakao_btn', function () {
    window.open("https://open.kakao.com/o/s0MiKxJc");
});


$(document).on("click", function (e) {
    if ($("#custom_popup_index").is(e.target)) {
        //  $("#custom_popup_index").css({ visibility:"hidden", 
        //                             opacity:0 });
        $("html, body").css({ "overflow": "auto", "height": "auto" });
        $('#custom_popup_index').unbind('touchmove');

        $('#custom_popup_index').hide();
    }
});

// 이전달
$(document).on('click', '#pre_month', function () {
    var now_month = $('#index_month_select').val();
    now_month = parseInt(now_month);

    var pre_month = now_month - 1;
    console.log(pre_month);

    var today = new Date();
    var now_month_date = today.getMonth() + 1;
    if (now_month_date != pre_month) {
        return false;
    }

    $("#index_month_select").val(pre_month).prop("selected", true);
    month = pre_month;

    getNewInfo();
})

// 다음달
$(document).on('click', '#next_month', function () {
    var now_month = $('#index_month_select').val();
    now_month = parseInt(now_month);

    var next_month = now_month + 1;
    console.log(next_month);

    var today = new Date();
    var now_month_date = today.getMonth() + 1;
    if (now_month_date + 1 != next_month) {
        return false;
    }

    $("#index_month_select").val(next_month).prop("selected", true);
    month = next_month;

    getNewInfo();
})

$(document).on('swipeleft', function () {
    $('#next_month').trigger("click");
});
$('#next_month').bind("click", function () {
    var now_month = $('#index_month_select').val();
    now_month = parseInt(now_month);

    var next_month = now_month + 1;
    console.log(next_month);

    var today = new Date();
    var now_month_date = today.getMonth() + 1;
    if (now_month_date + 1 != next_month) {
        return false;
    }

    $("#index_month_select").val(next_month).prop("selected", true);
    month = next_month;

    getNewInfo();
})


$(document).on('swiperight', function () {
    $('#pre_month').trigger("click");
});
$('#pre_month').bind("click", function () {
    var now_month = $('#index_month_select').val();
    now_month = parseInt(now_month);

    var pre_month = now_month - 1;
    console.log(pre_month);

    var today = new Date();
    var now_month_date = today.getMonth() + 1;
    if (now_month_date != pre_month) {
        return false;
    }

    $("#index_month_select").val(pre_month).prop("selected", true);
    month = pre_month;

    getNewInfo();
})