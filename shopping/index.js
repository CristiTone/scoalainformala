function enterKey(e) {
		if(e.keyCode == 13) {
			e.preventDefault();
			addItem();
		}
	}

	function addItem() {
		var li = document.createElement("li");
		var inputValue = document.getElementById("field").value;
		var t = document.createTextNode(inputValue);
		li.appendChild(t);
		if(inputValue === '') {
			alert("Adauga numele itemului");
		} else {
			document.getElementById("list").appendChild(li);
		}
		document.getElementById("field").value = "";

		var button = document.createElement("button");
		var txt = document.createTextNode("Mark as buyed");
		button.className = "marked";
		button.appendChild(txt);
		li.appendChild(button);

		var marked = document.getElementsByClassName("marked");

		for(var i=0; i<marked.length; i++) {
			marked[i].onclick = function() {
				var div = this.parentElement;
				div.style.textDecoration= "line-through";
			}
		}
	}

	function sortAsc() {
		var list = document.getElementById("list");
		var switching = true;
		while(switching) {
			switching = false;
			b = list.getElementsByTagName("li");
			for(var i=0; i<=b.length; i++) {
				if(b[i].innerHTML.toLowerCase() > b[i+1].innerHTML.toLowerCase()) {
					var shouldSwitch = true;
					break;
				}
			}
			if(shouldSwitch) {
				b[i].parentNode.insertBefore(b[i+1], b[i]);
				switching = true;
			}
		}
	}

	function sortDesc() {
		var list = document.getElementById("list");
		var switching = true;
		while(switching) {
			switching = false;
			b = list.getElementsByTagName("li");
			for(var i=0; i<=b.length; i++) {
				if(b[i].innerHTML.toLowerCase() < b[i+1].innerHTML.toLowerCase()) {
					var shouldSwitch = true;
					break;
				}
			}
			if(shouldSwitch) {
				b[i].parentNode.insertBefore(b[i+1], b[i]);
				switching = true;
			}
		}
	}