<?php
	include("util.php");
	//前端传过来的处于第几页
	$pageIndex = $_GET["pageIndex"];
	//还需要考虑如果前端传的pageIndex大于后端提供的总页数totalpage,如果大于,那么pageIndex = totalpage
	//得totalpage
	$selsql = "select * from shop";
	$totalpage = ceil(mysql_num_rows(mysql_query($selsql)) / 4);
	if($pageIndex > $totalpage) $pageIndex = $totalpage;
	$start = ($pageIndex - 1) * 4;
	/* 查询数据库  思路:首先确认查几条,然后进行分页
	 1  0-4  4   跳过0条查4条
	 2  4-4  4   跳过4条查4条
	 3  8-4  4   跳过8条查4条
	 规律：(pageIndex -1)*4
	 
	 
	 */
	
	$sql = "select * from shop limit $start, 4";
	
	$res = mysql_query($sql);
	
	$arr = array();
	
	while($row = mysql_fetch_assoc($res)){
		array_push($arr, $row);
	};
	$resArr = array(
		'res_code' => 1,
		'res_message' => '查询成功',
		//还需要返回pageIndex（修改后的） 和 totalpage
		'res_body' => array(
		'data' => $arr,
		"pageIndex" => $pageIndex - 0,
		"totalpage" => $totalpage
		)
	);
	echo json_encode($resArr);
?>