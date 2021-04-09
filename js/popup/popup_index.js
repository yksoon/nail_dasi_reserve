function pi_get_unable_list(day) {
    var loginChk = sessionStorage.getItem("loginChk");
    var pi_year = String(today.getFullYear());
    var pi_month = $('#index_month_select').val();
    var pi_day = day;

    if (pi_month.length === 1) {
        pi_month = "0" + pi_month
    }

    var search_date = pi_year + "-" + pi_month + "-" + pi_day;

    // console.log(pi_year + " " + typeof (pi_year));
    // console.log(pi_month + " " + typeof (pi_month));
    // console.log(pi_day + " " + typeof (pi_day));
    // console.log(search_date);

    $.ajax({
        type: "GET",
        cache: false,
        url: '../../service/popup/get_unable_list.php',
        data: {
            search_date: search_date
        },
        dataType: "json",
        timeout: 30000,
        success: function (data) {
            // console.log(data);
            // console.log(data.length);
            if (data.length != 0) {
                $(data).each(function (i) {
                    var $RESERVE_DATE = data[i].RESERVE_DATE;
                    var $RESERVE_START_TIME = data[i].RESERVE_START_TIME;
                    var $RESERVE_END_TIME = data[i].RESERVE_END_TIME;

                    var startHour = $RESERVE_START_TIME.split(":")[0];
                    var startMin = $RESERVE_START_TIME.split(":")[1];
                    var endHour = $RESERVE_END_TIME.split(":")[0];
                    var endMin = $RESERVE_END_TIME.split(":")[1];

                    startHour = parseInt(startHour);
                    endHour = parseInt(endHour);

                    var startHourString;
                    var endHourString;

                    if (startHour <= 12) {
                        startHourString = String(startHour);
                        var finStartHour = "오전" + startHourString;
                    } else {
                        if (startHour === 12) {
                            startHourString = String(startHour);
                        } else {
                            startHour = startHour - 12;
                            startHourString = String(startHour);
                            if (startHourString.length === 1) {
                                startHourString = "0" + startHourString
                            }
                        }
                        var finStartHour = "오후" + startHourString;
                    }

                    if (endHour <= 12) {
                        endHourString = String(endHour);
                        var finEndHour = "오전" + endHourString;
                    } else {
                        if (endHour === 12) {
                            endHourString = String(endHour);
                        } else {
                            endHour = endHour - 12;
                            endHourString = String(endHour);
                            if (endHourString.length === 1) {
                                endHourString = "0" + endHourString
                            }

                        }
                        var finEndHour = "오후" + endHourString;
                    }

                    var reserve_time = finStartHour + ":" + startMin + " ~ " + finEndHour + ":" + endMin

                    var card;
                    if (loginChk === "Y") {
                        card = '<div class="pi_card_container" id="' + $RESERVE_DATE + '_' + $RESERVE_START_TIME + '_' + $RESERVE_END_TIME + '">' +
                            '<div class="pi_unable_card">' +
                            // '<p>' + $RESERVE_START_TIME + ' ~ ' + $RESERVE_END_TIME + ' 예약 불가</p>' +
                            '<p>' + reserve_time + ' 예약 가능</p>' +
                            '</div>' +
                            '<div class="pi_anable_img_div" id="pi-cancel-btn_' + $RESERVE_DATE + '_' + $RESERVE_START_TIME + '_' + $RESERVE_END_TIME + '" onclick="pi_cancel_btn(\'' + $RESERVE_DATE + '_' + $RESERVE_START_TIME + '_' + $RESERVE_END_TIME + '\')">' +
                            '<img class="pi_anable_img" src="../../img/popup/close_btn.svg" />' +
                            '</div>' +
                            '</div>';
                    } else {
                        card =
                            '<div class="pi_unable_card">' +
                            // '<p>' + $RESERVE_START_TIME + ' ~ ' + $RESERVE_END_TIME + ' 예약 불가</p>' +
                            '<p>' + reserve_time + ' 예약 가능</p>' +
                            '</div>';
                    }
                    $('.pi_mid_content').append(card);
                });
                if (loginChk === "Y") {
                    $('.pi_mid_content').css("height", "138px");
                    var admin_append =
                        '<div class="pi_admin_append_container">' +
                        '<div class="pi_admin_time_con">' +
                        '<div class="pi_admin_time_left">' +
                        '<span>시간추가 :</span>' +
                        '<select class="pi_admin_startTime" id="pi_admin_startTime">' +
                        '</select>' +
                        '<span>&nbsp~&nbsp</span>' +
                        '<select class="pi_admin_endTime" id="pi_admin_endTime">' +
                        '</select>' +
                        '</div>' +
                        '<div class="pi_admin_time_right">' +
                        '<div class="pi_admin_append_btn" id="pi_admin_append_btn">' +
                        '추가' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="pi_admin_reserve_container">' +
                        '<div class="pi_admin_reserve_left">' +
                        '<span>마감처리 :</span>' +
                        '<select class="pi_admin_reserve" id="pi_admin_reserve">' +
                        '<option value="N">마감</option>' +
                        '<option value="Y">예약가능</option>' +
                        '</select>' +
                        '</div>' +
                        '<div class="pi_admin_reserve_right">' +
                        '<div class="pi_admin_reserve_btn" id="pi_admin_reserve_btn">' +
                        '저장' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    $('.pi_admin_container').append(admin_append);

                    for (var i = 21; i < 42; i++) {
                        var hour = '';
                        var min = ':00';
                        if ((Math.ceil(i / 2)) < 13) {
                            hour = (Math.floor(i / 2));
                        } else {
                            hour = (Math.floor(i / 2));
                        }
                        hour = (Math.floor(i / 2));
                        if (hour < 10) {
                            hour = '0' + hour;
                        }
                        if (i % 2 != 0) {
                            min = ':30';
                        }
                        var option = '<option value=' + hour + min + '>'
                            + hour
                            + min
                            + '</option>';
                        $('#pi_admin_startTime').append(option);
                        $('#pi_admin_endTime').append(option);
                    }

                    $.ajax({
                        type: "GET",
                        cache: false,
                        url: '../../service/popup/get_reserve_status.php',
                        data: {
                            search_date: search_date
                        },
                        dataType: "json",
                        timeout: 30000,
                        success: function (data) {
                            if (data.length != 0) {
                                $(data).each(function (i) {
                                    var $RESERVATION_STATUS = data[i].RESERVATION_STATUS;
                                    console.log($RESERVATION_STATUS);

                                    if ($RESERVATION_STATUS === "N") {
                                        $("#pi_admin_reserve").val("N").prop("selected", true);
                                    }
                                    else if ($RESERVATION_STATUS === "Y") {
                                        $("#pi_admin_reserve").val("Y").prop("selected", true);
                                    }
                                })
                                sessionStorage.setItem("reserve_date", search_date);;
                                sessionStorage.setItem("reserve_status", $("#pi_admin_reserve option:selected").val());
                                sessionStorage.setItem("reserve_db_isin", "Y");
                            } else {
                                $("#pi_admin_reserve").val("Y").prop("selected", true);

                                sessionStorage.setItem("reserve_date", search_date);;
                                sessionStorage.setItem("reserve_status", $("#pi_admin_reserve option:selected").val());
                                sessionStorage.setItem("reserve_db_isin", "N");
                            }
                        }
                    });

                } else {
                    var reserve = '<div class="pi_able">' +
                        '<p>예약은 카톡으로 문의해주세용 :)</p>' +
                        '</div>';
                    $('.pi_mid_content').append(reserve);
                }

            } else {
                if (loginChk === "Y") {
                    $('.pi_mid_content').css("height", "138px");

                    var card = '<div class="pi_able">' +
                        '<p>현재 예약 없음</p>' +
                        '</div>';
                    $('.pi_mid_content').append(card);

                    var admin_append =
                        '<div class="pi_admin_append_container">' +
                        '<div class="pi_admin_time_con">' +
                        '<div class="pi_admin_time_left">' +
                        '<span>시간추가 :</span>' +
                        '<select class="pi_admin_startTime" id="pi_admin_startTime">' +
                        '</select>' +
                        '<span>&nbsp~&nbsp</span>' +
                        '<select class="pi_admin_endTime" id="pi_admin_endTime">' +
                        '</select>' +
                        '</div>' +
                        '<div class="pi_admin_time_right">' +
                        '<div class="pi_admin_append_btn" id="pi_admin_append_btn">' +
                        '추가' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="pi_admin_reserve_container">' +
                        '<div class="pi_admin_reserve_left">' +
                        '<span>마감처리 :</span>' +
                        '<select class="pi_admin_reserve" id="pi_admin_reserve">' +
                        '<option value="N">마감</option>' +
                        '<option value="Y">예약가능</option>' +
                        '</select>' +
                        '</div>' +
                        '<div class="pi_admin_reserve_right">' +
                        '<div class="pi_admin_reserve_btn" id="pi_admin_reserve_btn">' +
                        '저장' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    $('.pi_admin_container').append(admin_append);

                    for (var i = 21; i < 42; i++) {
                        var hour = '';
                        var min = ':00';
                        if ((Math.ceil(i / 2)) < 13) {
                            hour = (Math.floor(i / 2));
                        } else {
                            hour = (Math.floor(i / 2));
                        }
                        hour = (Math.floor(i / 2));
                        if (hour < 10) {
                            hour = '0' + hour;
                        }
                        if (i % 2 != 0) {
                            min = ':30';
                        }
                        var option = '<option value=' + hour + min + '>'
                            + hour
                            + min
                            + '</option>';
                        $('#pi_admin_startTime').append(option);
                        $('#pi_admin_endTime').append(option);
                    }

                    $.ajax({
                        type: "GET",
                        cache: false,
                        url: '../../service/popup/get_reserve_status.php',
                        data: {
                            search_date: search_date
                        },
                        dataType: "json",
                        timeout: 30000,
                        success: function (data) {
                            if (data.length != 0) {
                                $(data).each(function (i) {
                                    var $RESERVATION_STATUS = data[i].RESERVATION_STATUS;
                                    console.log($RESERVATION_STATUS);

                                    if ($RESERVATION_STATUS === "N") {
                                        $("#pi_admin_reserve").val("N").prop("selected", true);
                                    }
                                    else if ($RESERVATION_STATUS === "Y") {
                                        $("#pi_admin_reserve").val("Y").prop("selected", true);
                                    }
                                })
                                sessionStorage.setItem("reserve_date", search_date);;
                                sessionStorage.setItem("reserve_status", $("#pi_admin_reserve option:selected").val());
                                sessionStorage.setItem("reserve_db_isin", "Y");
                            } else {
                                $("#pi_admin_reserve").val("Y").prop("selected", true);

                                sessionStorage.setItem("reserve_date", search_date);;
                                sessionStorage.setItem("reserve_status", $("#pi_admin_reserve option:selected").val());
                                sessionStorage.setItem("reserve_db_isin", "N");
                            }
                        }
                    });

                } else {
                    var reserve = '<div class="pi_able">' +
                        '<p>예약 가능 여부는 문의해주세요 :)</p>' +
                        '</div>';
                    $('.pi_mid_content').append(reserve);
                }

            }


            sessionStorage.setItem("reserve_startTime", $("#pi_admin_startTime option:selected").val());
            sessionStorage.setItem("reserve_endTime", $("#pi_admin_endTime option:selected").val());
        },
        error: function (request, status, error) {
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    });
}

// 마감 셀렉트박스 변경시 세션 변경
$(document).on('change', '#pi_admin_reserve', function () {
    sessionStorage.removeItem("reserve_status");
    sessionStorage.setItem("reserve_status", $(this).val());
})

// 마감 저장 버튼
$(document).on('click', '#pi_admin_reserve_btn', function () {
    // var stat = $("#pi_admin_reserve option:selected").val();
    // // console.log(stat);
    // // console.log(search_date);
    // pi_update_status(stat, search_date);
    var reserve_date = sessionStorage.getItem("reserve_date");
    var reserve_status = sessionStorage.getItem("reserve_status");
    var reserve_db_isin = sessionStorage.getItem("reserve_db_isin");

    console.log("있어 없어 " + reserve_db_isin);

    if (reserve_db_isin === "Y") {
        pi_update_status(reserve_status, reserve_date);
    } else {
        pi_set_status(reserve_status, reserve_date);
    }
});

// 마감 상태 변경
function pi_update_status(stat, search_date) {
    // console.log(search_date);
    $.ajax({
        type: "POST",
        cache: false,
        url: '../../service/popup/update_reserve_status.php',
        data: {
            search_date: search_date,
            stat: stat
        },
        timeout: 30000,
        success: function () {
            var search_month = $('#index_month_select').val();

            today = new Date();
            year = today.getFullYear();

            var searchYear = year;
            month = search_month;

            getNewInfo();

            $("html, body").css({ "overflow": "auto", "height": "auto" });
            $('#custom_popup_index').unbind('touchmove');

            $('#custom_popup_index').hide();
        },
        error: function (request, status, error) {
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    });
}

// 마감상태가 등록 안되어있어 새로 추가
function pi_set_status(stat, search_date) {
    $.ajax({
        type: "POST",
        cache: false,
        url: '../../service/popup/set_reserve_status.php',
        data: {
            search_date: search_date,
            stat: stat
        },
        timeout: 30000,
        success: function () {
            var search_month = $('#index_month_select').val();

            today = new Date();
            year = today.getFullYear();

            var searchYear = year;
            month = search_month;

            getNewInfo();

            $("html, body").css({ "overflow": "auto", "height": "auto" });
            $('#custom_popup_index').unbind('touchmove');

            $('#custom_popup_index').hide();
        },
        error: function (request, status, error) {
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    });
}

// 예약시간 추가 세션 변경 - 시작시간
$(document).on('change', '#pi_admin_startTime', function () {
    sessionStorage.removeItem("reserve_startTime");
    sessionStorage.setItem("reserve_startTime", $(this).val());
});

// 예약시간 추가 세션 변경 - 끝나는시간
$(document).on('change', '#pi_admin_endTime', function () {
    sessionStorage.removeItem("reserve_endTime");
    sessionStorage.setItem("reserve_endTime", $(this).val());
});

// 예약시간 추가 버튼
$(document).on('click', '#pi_admin_append_btn', function () {
    var reserve_startTime = sessionStorage.getItem("reserve_startTime");
    var reserve_endTime = sessionStorage.getItem("reserve_endTime");
    var reserve_date = sessionStorage.getItem("reserve_date");

    // console.log(reserve_date + ' - ' + reserve_startTime + ' ~ ' + reserve_endTime);
    pi_admin_set_reserve_time(reserve_date, reserve_startTime, reserve_endTime);
});

// 예약시간 추가 함수
function pi_admin_set_reserve_time(reserve_date, reserve_startTime, reserve_endTime) {
    var loginChk = sessionStorage.getItem("loginChk");

    $.ajax({
        type: "POST",
        cache: false,
        url: '../../service/popup/set_reserve_time.php',
        data: {
            reserve_date: reserve_date,
            reserve_startTime: reserve_startTime,
            reserve_endTime: reserve_endTime
        },
        timeout: 30000,
        success: function () {
            $('.pi_mid_content').empty();
            $.ajax({
                type: "GET",
                cache: false,
                url: '../../service/popup/get_unable_list.php',
                data: {
                    search_date: reserve_date
                },
                dataType: "json",
                timeout: 30000,
                success: function (data) {
                    // console.log(data);
                    // console.log(data.length);
                    if (data.length != 0) {
                        $(data).each(function (i) {
                            var $RESERVE_DATE = data[i].RESERVE_DATE;
                            var $RESERVE_START_TIME = data[i].RESERVE_START_TIME;
                            var $RESERVE_END_TIME = data[i].RESERVE_END_TIME;

                            var startHour = $RESERVE_START_TIME.split(":")[0];
                            var startMin = $RESERVE_START_TIME.split(":")[1];
                            var endHour = $RESERVE_END_TIME.split(":")[0];
                            var endMin = $RESERVE_END_TIME.split(":")[1];

                            startHour = parseInt(startHour);
                            endHour = parseInt(endHour);

                            var startHourString;
                            var endHourString;

                            if (startHour <= 12) {
                                startHourString = String(startHour);
                                var finStartHour = "오전" + startHourString;
                            } else {
                                if (startHour === 12) {
                                    startHourString = String(startHour);
                                } else {
                                    startHour = startHour - 12;
                                    startHourString = String(startHour);
                                    if (startHourString.length === 1) {
                                        startHourString = "0" + startHourString
                                    }
                                }
                                var finStartHour = "오후" + startHourString;
                            }

                            if (endHour <= 12) {
                                endHourString = String(endHour);
                                var finEndHour = "오전" + endHourString;
                            } else {
                                if (endHour === 12) {
                                    endHourString = String(endHour);
                                } else {
                                    endHour = endHour - 12;
                                    endHourString = String(endHour);
                                    if (endHourString.length === 1) {
                                        endHourString = "0" + endHourString
                                    }

                                }
                                var finEndHour = "오후" + endHourString;
                            }

                            var reserve_time = finStartHour + ":" + startMin + " ~ " + finEndHour + ":" + endMin

                            var card;
                            if (loginChk === "Y") {
                                card = '<div class="pi_card_container" id="' + $RESERVE_DATE + '_' + $RESERVE_START_TIME + '_' + $RESERVE_END_TIME + '">' +
                                    '<div class="pi_unable_card">' +
                                    // '<p>' + $RESERVE_START_TIME + ' ~ ' + $RESERVE_END_TIME + ' 예약 불가</p>' +
                                    '<p>' + reserve_time + ' 예약 가능</p>' +
                                    '</div>' +
                                    '<div class="pi_anable_img_div" id="pi-cancel-btn_' + $RESERVE_DATE + '_' + $RESERVE_START_TIME + '_' + $RESERVE_END_TIME + '" onclick="pi_cancel_btn(\'' + $RESERVE_DATE + '_' + $RESERVE_START_TIME + '_' + $RESERVE_END_TIME + '\')">' +
                                    '<img class="pi_anable_img" src="../../img/popup/close_btn.svg" />' +
                                    '</div>' +
                                    '</div>';
                            } else {
                                card =
                                    '<div class="pi_unable_card">' +
                                    // '<p>' + $RESERVE_START_TIME + ' ~ ' + $RESERVE_END_TIME + ' 예약 불가</p>' +
                                    '<p>' + reserve_time + ' 예약 가능</p>' +
                                    '</div>';
                            }
                            $('.pi_mid_content').append(card);
                        });
                        if (loginChk === "Y") {
                            $('.pi_mid_content').css("height", "138px");

                            var admin_append =
                                '<div class="pi_admin_append_container">' +
                                '<div class="pi_admin_time_con">' +
                                '<div class="pi_admin_time_left">' +
                                '<span>시간추가 :</span>' +
                                '<select class="pi_admin_startTime" id="pi_admin_startTime">' +
                                '</select>' +
                                '<span>&nbsp~&nbsp</span>' +
                                '<select class="pi_admin_endTime" id="pi_admin_endTime">' +
                                '</select>' +
                                '</div>' +
                                '<div class="pi_admin_time_right">' +
                                '<div class="pi_admin_append_btn" id="pi_admin_append_btn">' +
                                '추가' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="pi_admin_reserve_container">' +
                                '<div class="pi_admin_reserve_left">' +
                                '<span>마감처리 :</span>' +
                                '<select class="pi_admin_reserve" id="pi_admin_reserve">' +
                                '<option value="N">마감</option>' +
                                '<option value="Y">예약가능</option>' +
                                '</select>' +
                                '</div>' +
                                '<div class="pi_admin_reserve_right">' +
                                '<div class="pi_admin_reserve_btn" id="pi_admin_reserve_btn">' +
                                '저장' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                            $('.pi_admin_container').append(admin_append);

                            for (var i = 21; i < 42; i++) {
                                var hour = '';
                                var min = ':00';
                                if ((Math.ceil(i / 2)) < 13) {
                                    hour = (Math.floor(i / 2));
                                } else {
                                    hour = (Math.floor(i / 2));
                                }
                                hour = (Math.floor(i / 2));
                                if (hour < 10) {
                                    hour = '0' + hour;
                                }
                                if (i % 2 != 0) {
                                    min = ':30';
                                }
                                var option = '<option value=' + hour + min + '>'
                                    + hour
                                    + min
                                    + '</option>';
                                $('#pi_admin_startTime').append(option);
                                $('#pi_admin_endTime').append(option);
                            }

                            $.ajax({
                                type: "GET",
                                cache: false,
                                url: '../../service/popup/get_reserve_status.php',
                                data: {
                                    search_date: reserve_date
                                },
                                dataType: "json",
                                timeout: 30000,
                                success: function (data) {
                                    if (data.length != 0) {
                                        $(data).each(function (i) {
                                            var $RESERVATION_STATUS = data[i].RESERVATION_STATUS;
                                            console.log($RESERVATION_STATUS);

                                            if ($RESERVATION_STATUS === "N") {
                                                $("#pi_admin_reserve").val("N").prop("selected", true);
                                            }
                                            else if ($RESERVATION_STATUS === "Y") {
                                                $("#pi_admin_reserve").val("Y").prop("selected", true);
                                            }
                                        })
                                        sessionStorage.setItem("reserve_date", search_date);;
                                        sessionStorage.setItem("reserve_status", $("#pi_admin_reserve option:selected").val());
                                        sessionStorage.setItem("reserve_db_isin", "Y");
                                    } else {
                                        $("#pi_admin_reserve").val("Y").prop("selected", true);

                                        sessionStorage.setItem("reserve_date", search_date);;
                                        sessionStorage.setItem("reserve_status", $("#pi_admin_reserve option:selected").val());
                                        sessionStorage.setItem("reserve_db_isin", "N");
                                    }
                                }
                            });

                        } else {
                            var reserve = '<div class="pi_able">' +
                                '<p>예약은 카톡으로 문의해주세용 :)</p>' +
                                '</div>';
                            $('.pi_mid_content').append(reserve);
                        }

                    }
                }
            })

        },
        error: function (request, status, error) {
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    });
}

function pi_cancel_btn(date_time) {
    var dateTime = date_time;

    dateTime = dateTime.split('_');
    var date = dateTime[0];
    var startTime = dateTime[1];
    var endTime = dateTime[2];
    // console.log(date);
    // console.log(startTime);
    // console.log(endTime);

    // console.log(date_time);
    var conf = confirm(date + "\n" + startTime + " ~ " + endTime + "\n해당 예약을 삭제 하시겠습니까?")
    if (conf) {


        $.ajax({
            type: "POST",
            cache: false,
            url: '../../service/popup/del_reserve_time.php',
            data: {
                reserve_date: date,
                reserve_startTime: startTime,
                reserve_endTime: endTime
            },
            timeout: 30000,
            success: function () {
                alert(date + "\n" + startTime + " ~ " + endTime + "\n삭제 되었습니다.")
                $(window[date_time]).remove();
            }

        });

    } else {
        return false;
    }

}