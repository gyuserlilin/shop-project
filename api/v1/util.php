<?php
	//封装查询数据库方法
	//数据库配置
	$config = array(
		"host" => "localhost",
		"user" => "root",
		"password" => "",
		"dbname" => "1901"
		
	);
	//链接数据库服务器
	mysql_connect($config["host"], $config["user"], $config["password"]);
	//选择数据库
	mysql_select_db($config["dbname"]);
	// 设置php和mysql之间连接的编码方式
	mysql_query("set charset 'utf8'");
	mysql_query("set character set 'utf8'");
	
?>