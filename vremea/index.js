var URL_CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&lang=ro&units=metric&q=";
var URL_FORECAST_WEATHER = "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&lang=ro&units=metric&q=";
var URL_WEATHER_ICON_PREFIX = "http://openweathermap.org/img/w/"; 
	
function afiseazaVremea(currentWeather) {
	var oras = document.getElementById("orasCautat").value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var currentWeather = JSON.parse(this.responseText);
			afisareVremeAcum(currentWeather);
		}
	}

	xhttp.open("GET", URL_CURRENT_WEATHER+oras.toLowerCase(), true);
	xhttp.send();
	function afisareVremeAcum(currentWeather){
		console.log(currentWeather);
		document.getElementById("vremeIcon").setAttribute("src", URL_WEATHER_ICON_PREFIX+currentWeather.weather[0].icon+".png");
		document.getElementById("descriere").innerHTML = currentWeather.weather[0].description;
		document.getElementById("umiditate").innerHTML = currentWeather.main.humidity;
		document.getElementById("presiune").innerHTML = currentWeather.main.pressure;
		document.getElementById("temperatura").innerHTML = currentWeather.main.temp;
		document.getElementById("minima").innerHTML = currentWeather.main.temp_min;
		document.getElementById("maxima").innerHTML = currentWeather.main.temp_max;
		document.getElementsByTagName("iframe")[0].setAttribute("src", "https://www.google.com/maps/embed/v1/place?key=AIzaSyBw8v460V8j_svnnEjvNPILkQFRgmyA6Hc&q="+oras);
	}
}

function afiseazaPrognoza(forecastWeather) {
	var oras = document.getElementById("orasCautat").value
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var forecastWeather = JSON.parse(this.responseText);
			afisarePrognozaZile(forecastWeather);
		}
	}

	xhttp.open("GET", URL_FORECAST_WEATHER+oras.toLowerCase(), true);
	xhttp.send();

	function afisarePrognozaZile(forecastWeather) {

		var Prognoza = {
		    dateDistincte:null,
		    prognoze:null
		}

		function raspuns(prog){
		    var interval = Object.create(Prognoza);
		    interval.dateDistincte = [];
			interval.prognoze = [];

			for(var i=0;i<prog.list.length;i++){
			       interval.prognoze.push({
			        content:prog.list[i],
			        zi:prog.list[i].dt_txt.substr(0,10),
			        ora:prog.list[i].dt_txt.substr(11,5)
			    });

			    if(interval.dateDistincte.indexOf(prog.list[i].dt_txt.substr(0,10)) == -1) {
			        interval.dateDistincte.push(prog.list[i].dt_txt.substr(0,10));
			    }
			}
	    	return interval;
		}
		var tabel = '';
       	var rezultatPrognoze = raspuns(forecastWeather);

	    for(var i in rezultatPrognoze.dateDistincte){
	        var zile = rezultatPrognoze.prognoze.filter(a => {return a.zi == rezultatPrognoze.dateDistincte[i] }); 
	        tabel += `<div class="progZile">`;
	        tabel += '<div class="dataZi">Ziua: '+rezultatPrognoze.dateDistincte[i].split("-").reverse().join("/")+'</div>';

	        for(var j in zile){
	            tabel += '<div class="hProg"><div><img src="'+ URL_WEATHER_ICON_PREFIX+zile[j].content.weather[0].icon +'.png"/></div>';
	            tabel += '<div>Ora: '+zile[j].ora+'</div>';
	            tabel += '<div>Temperatura: '+zile[j].content.main.temp+'</div>';
	            tabel += '<div>Descriere: '+zile[j].content.weather[0].description+'</div></div>';
	        }
	        tabel += `</div>`;
	    }
        document.getElementById("contentVreme").innerHTML = tabel;

	}
		xhttp.open("GET",URL_FORECAST_WEATHER+oras.toLowerCase());
    	xhttp.send();
}