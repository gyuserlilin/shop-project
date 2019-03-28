//商品录入
var shopname = document.querySelector("#shop-name"),
	shopprice = document.querySelector("#shop-price"),
	shopdatabase = document.querySelector("#shop-database"),
	shopbtn = document.querySelector("#shop-btn"),
	tbody = document.querySelector("#tbody"),
	pagination = document.querySelector("#pagination"),
	nextpage = document.querySelector("#nextpage");
var pageIndex = 1, //记录当前第几页，默认是第一页 
	totalpage;
shopbtn.onclick = function() {
	var name = shopname.value,
		price = shopprice.value,
		database = shopdatabase.value;
	//console.log(name, price, database)
	//发送请求
	tools.ajaxGet("api/v1/shop.php", {
		name,
		price,
		database
	}, function(res) {
		//录入成功需要做的事
		if (res.res_code === 1) {
			alert(res.res_message)
			//录入框清空
			shopname.value = shopprice.value = shopdatabase.value = "";
			//关闭模态框
			$('#myModal').modal('hide')
			//请求当前页面数据
			getshop();
		}
	})
}


//商品查询
getshop();

function getshop() {
	//在传参是需要把当前处于第几页传给后端
	tools.ajaxGet("api/v1/shopquery.php", {
		pageIndex
	}, function(res) {
		if (res.res_code === 1) {
			var {
				data
			} = res.res_body;
			//修改全局变量pageIndex
			pageIndex = res.res_body.pageIndex;
			totalpage = res.res_body.totalpage;
			var html = "";
			data.forEach(function(shop, i) {
				html +=
					`
				<tr data-id = ${shop.Id}>
					<td>${(pageIndex-1)*4+ i+1}</td>
					<td><span>${shop.name}</span><input type="text"></td>
					<td><span>${shop.price}</span><input type="text"></td>
					<td><span>${shop.num}</span><input type="text"></td>
					<td>
						<button class="btn btn-info btn-car">加入购物车</button>
						<button class="btn btn-primary btn-edit">编辑</button>
						<button class="btn btn-danger btn-del">删除</button>
						<button class="btn btn-success btn-ok">确认</button>
						<button class="btn btn-warning btn-cancel">取消</button>
					</td>
				</tr>`
			})
			tbody.innerHTML = html;
			//渲染之前先把上一次的li删除
			var pageLi = Array.from(pagination.querySelectorAll(".pageLi"));
			pageLi.forEach(function(li) {
				li.remove();
			})
			//渲染分页
			for (var i = 1; i <= totalpage; i++) {
				var li = document.createElement("li");
				li.innerHTML = '<a class="page" href="javascript:;">' + i + '</a>'
				li.className = i === pageIndex ? "active pageLi" : "pageLi";
				pagination.insertBefore(li, nextpage);
			}
		}
	})
}

//页码数分页  使用事件委托
pagination.onclick = function(e) {
	e = e || window.event;
	var target = e.target || e.srcElement;
	switch (target.className) {
		case "page":
			//点击了页码数
			pageIndex = Number(target.innerHTML);
			getshop();
			break;
		case "prev":
			if (--pageIndex < 1) {
				pageIndex = 1;
				return;
			}
			getshop();
			break;
		case "next":
			if (++pageIndex > totalpage) {
				pageIndex = totalpage;
				return;
			}
			getshop();
			break;
	}
}
//表格编辑	使用事件委托
tbody.onclick = function(e) {
	e = e || window.event;
	var target = e.target || e.srcElement;
	var tr = target.parentNode.parentNode;
	if (target.className.includes("btn-edit")) {
		tr.classList.add("edit");
		var aSpan = Array.from(tr.querySelectorAll("span"));
		aSpan.forEach(function(span){
			span.nextElementSibling.value = span.innerHTML;
		})
	}else 
	//取消按钮
	if(target.className.includes("btn-cancel")){
		tr.classList.remove("edit");
	}else
	//修改确认按钮
	if(target.className.includes("btn-ok")){
		var namer = tr.children[1].children[1].value;
		var prices = tr.children[2].children[1].value;
		var nums = tr.children[3].children[1].value;
		var aId = tr.dataset.id;
		//console.log(aId)
		tools.ajaxGet("api/v1/replace.php", {namer, prices, nums, aId}, function(res){
			if(res.res_code === 1){
				if(confirm("是否确认修改")){
					getshop();
				}
			}else{
				alert(res.res_message)
			}
		})
	}else
	//删除按钮
	if(target.className.includes("btn-del")){
		var aId = tr.dataset.id;
		tools.ajaxGet("api/v1/delete.php", {aId}, 
			function(res){
				if(res.res_code === 1){
					if(confirm("是否确定删除")){
						getshop();
					}
				}else{
					alert(res.res_message)
				}
			})
	}else
	//加入购物按钮
	if(target.className.includes("btn-car")){
		var carName = tr.children[1].children[0].innerHTML,
			carPrice = Number(tr.children[2].children[0].innerHTML),
			aId = tr.dataset.id;
			var obj = {
				"carName" : carName,
				"carPrice" : carPrice,
				"aId": aId,
				"num" : 1
			};
			
		/*思路：当加入购物车时需要判断是否是第一次加入购物车
		 *还需要判断是否第一次存cookie，如果cookie是空，那么
		 *就是第一次存cookie，如果有值，还需要判断值里有没有
		 *需要加入购物车的数据 */
		 //取cookie
		 var cart = tools.cookie("cart");
		 if(cart){
			 //如果cookie存在
			 
			 //先转换出来
			 cart = JSON.parse(cart);
			 console.log(cart)
			 //接下来判断这条cookie中有没有当前数据，如果有就在原来基础上++（num++）,
			 //如果没有就push
			 
			 //判断
			 //i用来存下标
			 var i = 0;
			 if(cart.some(function(item, index){
				i = index;
				return item.aId === aId; 
			 })){
				//代表数据存在，那么num需要++
				cart[i].num++; 
			 }else{
				 //当前数据第一次加入购物车
				 cart.push(obj);
			 }
		 }else{
			 //cookie为空，说明是第一次加入购物车 
			//考虑以后可能会继续往购物车添加商品，存成对象不好添加，所以cookie数据传成数组更方便存
			//var一个数组存obj
			cart= [obj];	 
		}
		
		tools.cookie("cart", JSON.stringify(cart), {"path": "/"});
	}
}
