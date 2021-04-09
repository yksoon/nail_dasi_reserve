<!DOCTYPE html>
<html>
<meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
<meta charset="UTF-8">

<head>

<title>네일,다시만나 예약현황</title>

<!-- jQuery 라이브러리 -->
<script src="../../js/jquery/jquery-3.6.0.min.js" ></script>

<!-- JS -->
<script type="text/javascript" src="../../js/index.js?ver=1.1.1" ></script>
<script type="text/javascript" src="../../js/index_func.js?ver=1.0.7" ></script>
<script type="text/javascript" src="../../js/popup/popup_index.js?ver=1.0.9" ></script>
<script type="text/javascript" src="../../js/popup/popup_login.js?ver=1.0.4" ></script>

<!-- CSS -->
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/earlyaccess/nanumpenscript.css" />
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200&display=swap" rel="stylesheet">
<link type="text/css" rel="stylesheet" href="../../css/index.css?ver=1.1.5" />
<link type="text/css" rel="stylesheet" href="../../css/popup/popup_index.css?ver=1.1.1" />
<link type="text/css" rel="stylesheet" href="../../css/popup/popup_login.css?ver=1.0.1" />

</head>
<body>
	<div id="index">

		<!-- 팝업 -->
        <div class="custom_popup_index" id="custom_popup_index">
		</div>

		<div class="custom_popup_login" id="custom_popup_login">
		</div>


		<div class="hidden_btn">
		</div>
		<div class="id_chk_admin" style="display: none;">
		관리자로 로그인 함
		</div>

		<div class="index_title">
			<p class="title_p">네일,다시만나</p>
			<p class="title_span">실시간 고객 예약현황</p>
		</div>

		<div class="index_openkakao_container">
			<div class="index_openkakao_btn" id="index_openkakao_btn">
				<div class="index_openkakao_img_div">
					<img src="../../img/index/kakao.png" class="index_openkakao_img" />
				</div>
				<div class="index_openkakao_text_div">
					<p>openKakao</p>
				</div>
			</div>
		</div>

		<div class="index_month_container">
			<div class="index_month_select_div">
				<select class="index_month_select" id="index_month_select">
					<!-- 월 option 들어갈 자리 -->
				</select>
				<span>&nbsp&nbsp월</span>
			</div>
			<div class="index_reserve_notice">
				<div class="reserve_can">
					<div class="index_notice_color reserve_can_color">
					</div>
					<span>예약 가능</span>
				</div>
				<div class="reserve_cannot">
					<div class="index_notice_color reserve_cannot_color">
					</div>
					<span>예약 불가능</span>
				</div>
			</div>
		</div>

		<div class="index_cal" id="index_cal">
			<!-- 달력 출력 부분 -->
		</div>

	</div>
</body>
</html>