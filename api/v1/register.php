<?php
	include("util.php");
	$username = $_POST["inputname"];
	$password = $_POST["inputpwd"];
	//判断数据库是否已经有传入的数据,不允许出现重复
	//方法:先查询再判断
	//查询
	$selSql = "select * from login where username = '$username'";
	$selRes = mysql_query($selSql);
	//判断
	if(mysql_num_rows($selRes) == 1){
		//已经存在此用户
		echo json_encode(array('res_code' => 0, 'res_message' => "用户名已存在"/* 调试代码,'username'=>$username,'pwd'=>$password) */));
	}else{
		//存用户
		$insSql = "insert into login (username, password) values ('$username', '$password')";
		$insRes = mysql_query($insSql);
		if($insRes){
			echo json_encode(array('res_code' => 1, 'res_message' => "注册成功"));
		}else{
			echo json_encode(array('res_code' => 0, 'res_message' => "网络错误"));
		}
	}
		
?>