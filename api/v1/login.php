<?php
	include("util.php");
	$username = $_POST["inputName"];
	$password = $_POST["inputPwd"];
	
	//判断传过来的值是否存在
	//查询数据库
	$selSql = "select * from login where username ='$username' and password = '$password'";
	
	$queSql = mysql_query($selSql);
	//判断是否有数据
	if(mysql_num_rows($queSql) >= 1){
		echo json_encode(array('res_code' => 1, 'res_message' => "登录成功"));
	}else{
		echo json_encode(array('res_code' => 0, 'res_message' => "用户名或密码错误"));
	}
?>