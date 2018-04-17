var menuList = {};
function drawMenu() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			menuList= JSON.parse(this.responseText);
			draw();
			hideLoading();		
		}
	}

	xhttp.open("GET", "https://meniu-f9ccf.firebaseio.com/.json", true);
	xhttp.send();
	showLoading();

}
function draw() {
	var tabel = document.querySelector(".tableMenu tbody");
	var str = "";
	for(var i in menuList){
		if(menuList[i] === null) {
			continue;
		}
		var rand = `<tr>
					<td><img src="${menuList[i].imagine}" class="imagin"/></td>
					<td class="ingredientsData">
						<strong>${menuList[i].nume}</strong><br /><br />
						${menuList[i].ingrediente}
					</td>
					<td><a id="modificaBtn" href="edit.html?id=${i}">Modifica</a><a id="stergeBtn" href="sterge.html?id=${i}&nume=${menuList[i].nume}">Sterge</a></td>
				</tr>`;
		str += rand;
	} 
tabel.innerHTML = str;
}

function showLoading() {
	document.getElementById("loading").style.display = "block";
}

function hideLoading() {
	document.getElementById("loading").style.display = "none";
}	