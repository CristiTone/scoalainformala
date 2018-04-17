// var indexModificat = -1;
// var reteta = [];
function adaugaReteta(form, event) {
	event.preventDefault();	
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			window.location = "meniuAdmin.html";
		}
	};
	xhttp.open("POST", "https://meniu-f9ccf.firebaseio.com/.json", true);
	xhttp.send(JSON.stringify({
		nume: form.querySelector("[name=nume]").value,
		imagine: form.querySelector("[name=url]").value,
		ingrediente: form.querySelector("[name=ingrediente]").value,
		reteta: form.querySelector("[name=preparare]").value
	}));
}	
