window.onload = function(){
	var username = document.querySelector("#inputUsername"),
		password = document.querySelector("#inputPassword"), 
		btn =  document.querySelector("#btn");
	//注册按钮绑定事件
	btn.onclick = function(){
		var inputname = username.value,
			inputpwd = password.value;
			//console.log(inputname,inputpwd) 调试代码
		//提交服务器
		 tools.ajaxPost("http://localhost/shop-project/api/v1/register.php", {inputname,inputpwd}, function(res){
			//console.log(res);		调试代码
			if(res.res_code === 1){
				if(confirm(res.res_message + ",即将跳转登录页面")){
						location.href = "login.html"
				}
			}
				
		}); 
		return false
	}
}