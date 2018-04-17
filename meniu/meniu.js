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
	var ingredient = document.getElementById("ingredientsInput").value;
	var str = "";
	for(var i in menuList){
		if(menuList[i].ingrediente.indexOf(ingredient) !== -1 ) {
			var rand = `<tr>
						<td><img src="${menuList[i].imagine}" /></td>
						<td class="ingredientsData">
							<strong>${menuList[i].nume}</strong><br /><br />
							${menuList[i].ingrediente}
						</td>
						<td><a href="detalii.html?id=${i}">DETALII</a></td>
					</tr>`;
			str += rand;
		} 
	}
	tabel.innerHTML = str;
}

function enter() {
	document.getElementById("ingredientsInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("ingredientsBtn").click();
    }
});
}
    
function showLoading() {
	document.getElementById("loading").style.display = "block";
}

function hideLoading() {
	document.getElementById("loading").style.display = "none";
}
			
//window.location.search