window.onload = function(){
	var sign = document.querySelector(".before-sign"),
		signin = document.querySelector("#signin"),
		welcome = document.querySelector("#welcome"),
		signout = document.querySelector("#signout");
	//判断是否登录，通过cookie判断是否登录
	var username = tools.cookie("username");
	if(username){
		sign.style.display = "none";
		signin.style.display = "block"
		welcome.innerHTML = username;
	}
	
	//退出登录
	signout.onclick = function(){
		if(confirm("确认退出登录")){
			tools.cookie("username","", {"expires": -1, "path": "/"});
			sign.style.display = "block";
			signin.style.display = "none"
		}
	}
}