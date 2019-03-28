<?php
	include("util.php");
	$namer = $_GET["namer"];
	$prices = $_GET["prices"];
	$nums = $_GET["nums"];
	$aId = $_GET["aId"] - 0;
	
	$sql = "update shop set name='".$namer."', price=".$prices.", num=".$nums." where Id = ".$aId."";
	
	$res = mysql_query($sql);
	
	if($res){
		echo json_encode(array('res_code' => 1, 'res_message' => "修改成功"));
	}else{
		echo json_encode(array('res_code' => 1, 'res_message' => "网络错误", 'aId' => $aId));
	}
?>