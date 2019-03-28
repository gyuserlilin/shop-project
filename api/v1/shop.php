<?php
	include("util.php");
	$name = $_GET["name"];
	$price = $_GET["price"];
	$database = $_GET["database"];
	
	//插入数据库
	$sql = "insert into shop (name, price, num) values ('$name', $price, $database)";
	//$res = mysql_query($sql);
	if(mysql_query($sql)){
		echo json_encode(array('res_code' => 1, 'res_message' => '录入成功'));
	}else{
		echo json_encode(array('res_code' => 0, 'res_message' => '网络错误', 'name' => $name));
	}
?>