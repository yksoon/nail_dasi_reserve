var today = null;
var year = null;
var month = null;
var firstDay = null;
var lastDay = null;
var $tdDay = null;
var $tdSche = null;


//calendar 그리기
function drawCalendar() {
    var setTableHTML = "";
    setTableHTML += '<table class="calendar">';
    setTableHTML += '<tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr>';
    for (var i = 0; i < 6; i++) {
        setTableHTML += '<tr height="60">';
        for (var j = 0; j < 7; j++) {
            setTableHTML += '<td style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap; border-radius:5px;" class="cal-day-div">';
            setTableHTML += '    <div class="cal-day"></div>';
            setTableHTML += '    <div class="cal-schedule"></div>';
            setTableHTML += '</td>';
        }
        setTableHTML += '</tr>';
    }
    setTableHTML += '</table>';
    $("#index_cal").html(setTableHTML);
}

//날짜 초기화
function initDate() {
    $tdDay = $("td div.cal-day")
    $tdSche = $("td div.cal-schedule")
    $tdDayDiv = $(".cal-day-div")
    dayCount = 0;
    today = new Date();
    year = today.getFullYear();
    month = today.getMonth() + 1;
    firstDay = new Date(year, month - 1, 1);
    lastDay = new Date(year, month, 0);
}

//calendar 날짜표시
function drawDays() {
    for (var i = firstDay.getDay(); i < firstDay.getDay() + lastDay.getDate(); i++) {
        $tdDay.eq(i).text(++dayCount);

        var stringDayCount = String(dayCount);
        if (stringDayCount.length == 1) {
            stringDayCount = "0" + stringDayCount
        }
        $tdDayDiv.eq(i).attr("id", stringDayCount);
    }
    for (var i = 0; i < 42; i += 7) {
        $tdDay.eq(i).css("color", "red");
    }
    for (var i = 6; i < 42; i += 7) {
        $tdDay.eq(i).css("color", "blue");
    }

    cantReservation(year, month);
}

function getNewInfo() {
    for (var i = 0; i < 42; i++) {
        $tdDay.eq(i).text("");
        $tdDayDiv.eq(i).attr("id", "");
    }
    dayCount = 0;
    firstDay = new Date(year, month - 1, 1);
    lastDay = new Date(year, month, 0);
    drawDays();
}

// 예약 가능 여부 확인해서 색칠해줌
function cantReservation(year, month) {
    $('.cal-day-div').css("background", "none");
    $('.cal-day-div').attr("class", "cal-day-div");

    var month = String(month);
    if (month.length === 1) {
        month = 0 + month;
    }
    var searchMonth = year + "-" + month;

    console.log(searchMonth);
    $.ajax({
        type: "GET",
        cache: false,
        url: '../../service/index.php',
        data: {
            searchMonth: searchMonth
        },
        dataType: "json",
        timeout: 30000,
        success: function (data) {
            // console.log(data);
            $(data).each(function (i) {
                var $DATE = data[i].DATE;
                var $RESERVATION_STATUS = data[i].RESERVATION_STATUS;

                // console.log($DATE + " : " + $RESERVATION_STATUS)

                // console.log(month + "월???");
                if ($RESERVATION_STATUS === "N") {
                    var day = $DATE.split("-")[2];
                    $('#' + day).css("background", "#D5C9DD");
                    // $('#' + day).css("background", "#FBCBC9");
                    $('#' + day).attr("class", "cal-day-div reserve_cant");
                }
            });
        },
        error: function (request, status, error) {
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    });
}



// 팝업 닫기 버튼
function close_pi_popup() {
    $("html, body").css({ "overflow": "auto", "height": "auto" });
    $('#custom_popup_index').unbind('touchmove');

    $('#custom_popup_index').hide();

    // location.href = 'index.jsp';
}

// 팝업 닫기 버튼
function close_pl_popup() {
    $("html, body").css({ "overflow": "auto", "height": "auto" });
    $('#custom_popup_login').unbind('touchmove');

    $('#custom_popup_login').hide();

    location.href = 'index.jsp';
}
