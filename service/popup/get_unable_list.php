<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

define('DB_SERVER','ksyong1990.synology.me:3307');
define('DB_USER','ksyong1234');
define('DB_PASS' ,'Fhrhkd1490!');
define('DB_NAME','nail_dasi');

$con = mysqli_connect(DB_SERVER,DB_USER,DB_PASS,DB_NAME);
mysqli_set_charset($con,"utf8");
// Check connection
if (mysqli_connect_errno())
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

// 기본 클라이언트 문자 집합 설정하기 
mysqli_set_charset($con,"utf8");

$search_date = $_REQUEST['search_date'];

$res  = mysqli_query($con, 
"SELECT * 
FROM able_reservation_time
WHERE RESERVE_DATE = '$search_date'
ORDER BY RESERVE_START_TIME ASC");

// 결과를 배열로 변환하기 위한 변수 정의
$result = array();

// 쿼리문의 결과(res)를 배열형식으로 변환(result)
while ($row = mysqli_fetch_array($res)){ 
    array_push($result, array('RESERVE_DATE'=>$row[0],'RESERVE_START_TIME'=>$row[1], 'RESERVE_END_TIME'=>$row[2])); 
}

// 배열형식의 결과를 json으로 변환
echo json_encode($result,JSON_UNESCAPED_UNICODE);

// DB 접속 종료 
mysqli_close($con);
?>
