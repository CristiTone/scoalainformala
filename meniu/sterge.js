var id = getQueryVariable("id");

function sterge(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			revenire();
		}
	};
	xhttp.open("DELETE", "https://meniu-f9ccf.firebaseio.com/"+id+"/.json", true);
	xhttp.send();
}

function revenire() {
	window.location = "meniuAdmin.html";
}

function getNume() {
	document.getElementById("titlu").innerHTML = getQueryVariable("nume").replace("%20", " ");
}

function getQueryVariable(nume) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == nume) {
            	return pair[1];
           }
    }
    return(false);
}