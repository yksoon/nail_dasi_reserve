// 로그인 버튼 클릭
$(document).on('click', '#pl_login_btn', function () {
    var id = $('#pl_id_input').val();
    var pw = $('#pl_pw_input').val();

    if (!id) {
        alert("아이디를 입력해주세요");
        return false;
    }
    if (!pw) {
        alert("비밀번호를를 입력해주세요");
        return false;
    }
    $.ajax({
        type: "GET",
        cache: false,
        url: '../../service/popup/get_login.php',
        data: {
            id: id,
            pw: pw
        },
        dataType: "json",
        timeout: 30000,
        success: function (data) {
            // console.log(data);
            if (data.length != 0) {
                sessionStorage.setItem("loginChk", "Y");
                alert("로그인 완료");

                $("html, body").css({ "overflow": "auto", "height": "auto" });
                $('#custom_popup_login').unbind('touchmove');

                location.href = 'index.jsp';
            } else {
                alert("아이디나 비밀번호를 확인 해주세요");
                return false;
            }
        },
        error: function (request, status, error) {
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    });

})

// 엔터로도 로그인 버튼 클릭
$(document).on('keypress', function (e) {
    if (e.keyCode == '13') {
        $('#pl_login_btn').click();
    }
});

// 비밀번호 input박스 클릭시 초기화
$(document).on('click', '#pl_pw_input', function () {
    $(this).val('');
})

// 로그아웃 버튼
$(document).on('click', '#pl_logout_btn', function () {
    sessionStorage.removeItem("loginChk");

    alert("로그아웃 되었습니다");

    $("html, body").css({ "overflow": "auto", "height": "auto" });
    $('#custom_popup_login').unbind('touchmove');

    location.href = 'index.jsp';
})
