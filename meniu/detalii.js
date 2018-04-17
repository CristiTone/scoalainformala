var id = location.search.substring(4);
function draw() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var menuList= JSON.parse(this.responseText);
			var reteta = document.querySelector("#details");
			document.getElementById("image").src=menuList.imagine;
			document.getElementById("head").innerHTML = menuList.nume;
			document.getElementById("ingrediente").innerHTML = menuList.ingrediente;
			document.getElementById("modPreparare").innerHTML = menuList.reteta;
						// <img src="${menuList.imagine}" />
						// <h3><strong>${menuList.nume}</strong></h3
						// <p>${menuList.ingrediente}</p>
						// <span>${menuList.reteta}</span>
		
		
	}
		
	}

	xhttp.open("GET", "https://meniu-f9ccf.firebaseio.com/"+id+".json", true);
	xhttp.send();
	
}
