var id = location.search.substring(4);

function drawMenu() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			menuList= JSON.parse(this.responseText);
			modifica(id);
					
		}
	}

	xhttp.open("GET", "https://meniu-f9ccf.firebaseio.com/.json", true);
	xhttp.send();
}

function modifica(id){
	var x = menuList[id];
	document.querySelector("form [name=nume]").value=x.nume;
	document.querySelector("form [name=url]").value=x.imagine;
	document.querySelector("form [name=ingrediente]").value=x.ingrediente;
	document.querySelector("form [name=preparare]").value=x.reteta;
}

function modificaReteta(form, event){
	event.preventDefault();	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			window.location = "meniuAdmin.html";
		}
	};
	xhttp.open("PUT", "https://meniu-f9ccf.firebaseio.com/"+id+".json", true);
	xhttp.send(JSON.stringify({
		nume: form.querySelector("[name=nume]").value,
		imagine: form.querySelector("[name=url]").value,
		ingrediente: form.querySelector("[name=ingrediente]").value,
		reteta: form.querySelector("[name=preparare]").value
	}));
}	