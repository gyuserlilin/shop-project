var cart = tools.cookie("cart");
var arr = JSON.parse(cart);
var tbody = document.querySelector("tbody"),
	table = document.querySelector("table"),
	html = "";
arr.forEach(function(ele){
	html +=`
		<tr>
			<td><input type="checkbox"></td>
			<td>${ele.carName}</td>
			<td>${ele.carPrice}</td>
			<td>
				<a class="btn btn-default minus" href="javascript:;" role="button">-</a>
				<span id = "num">${ele.num}</span>
				<a class="btn btn-default plus" href="javaacript:;" role="button">+</a>
			</td>
			<td><button class="btn btn-info" type="submit">取消订单</button></td>
		</tr>
	`
})
tbody.innerHTML = html;

//事件委托
table.onclick = function(e){
	e = e || window.event;
	var target = e.terget || e.srcElement;
	var tr = target.parentNode.parentNode;
	if(target.className.includes("btn-info")){
		tr.remove();
		//tools.cookie("cart", "", {"path" : "/", "expires" : -1})
	}else
	if(target.className.includes("plus")){
		var span = tr.querySelector("#num");
		span.innerHTML++;
	}else
	if(target.className.includes("minus")){
		var span = tr.querySelector("#num");
		if(span.innerHTML<= 0){
			span.innerHTML === 0;
		}else{
			span.innerHTML--;
		}
	}
} 