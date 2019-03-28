<?php
	include("util.php");
	$aId = $_GET["aId"] - 0;
	
	$sql = "delete from shop where Id = ".$aId."";
	
	$res = mysql_query($sql);
	
	if(res){
		echo json_encode(array('res_code' => 1, 'res_message' => "删除成功"));
	}else{
		echo json_encode(array('res_code' => 1, 'res_message' => "删除失败"));
	}
?>