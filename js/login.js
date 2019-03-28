window.onload = function(){
	var username = document.querySelector("#inputUsername"),
		password = document.querySelector("#inputPassword"),
		btn = document.querySelector("#btn"),
		ckbox = document.querySelector("#ckbox")
		
	btn.onclick = function(){
		var inputName = username.value,
			inputPwd = password.value;
		//提交服务器
		tools.ajaxPost("../api/v1/login.php", {inputName, inputPwd}, function(res){
			if(res.res_code === 1){
				//保存用户登录信息cookie
				//十天免登录
				var option = ckbox.checked ? {"path" : "/", "expires" : 10} : {"path" : "/"};
				tools.cookie("username", inputName, option);
				//跳转页面
				if(confirm(res.res_message + ",即将跳转主页")){
					location.href = "../index.html";
				}
			}else{
					alert(res.res_message);
				}
		});
	}
}