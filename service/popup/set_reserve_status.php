<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

define('DB_SERVER','ksyongjs.synology.me:3307');
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
$stat = $_REQUEST['stat'];


$row = mysqli_query($con, "
                            INSERT INTO
                            reservation_date (DATE, RESERVATION_STATUS)
                            VALUES('$search_date', '$stat')
                            ");

// while ($row = mysqli_fetch_array($res)){
//     array_push($result); 
// }


// 배열형식의 결과를 json으로 변환
// echo json_encode($result,JSON_UNESCAPED_UNICODE);

// DB 접속 종료 
mysqli_close($con);
?>
