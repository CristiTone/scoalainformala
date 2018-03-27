var Student = {
	name: null,
	hud: null,
	grades: null,
	average: function() {
		var summ = 0;
		for(var i=0; i<this.grades.length; i++) {
			summ += this.grades[i];
		}
		return (summ/this.grades.length).toFixed(1);
	}
};

var students = [];
var currentHud = "";

function ID() {
	return "_" + Math.random().toString(36).substr(2, 9);
}

function showStudents() {
	var html = "";
	for(var i=0; i<students.length; i++) {
		var rand = `<tr>
						<td>${students[i].name}</td>
						<td>${students[i].average()}</td>
						<td><input type="button" value="Vezi notele" onclick="showGradesContainer(${i})" /></td>
					</tr>`;
		html += rand;
	}
	document.querySelector("#tableStudents tbody").innerHTML = html;
}

function addStudent(form, event) {
	event.preventDefault();
	var n = form.querySelector("input[name=nume]").value;
	var s = Object.create(Student);
	s.name = n;
	s.hud = ID();
	s.grades = [];
	students.push(s);
	showStudents();
	document.getElementById("textField").value = "";
}

function showGrades() {
	var tableGrades = document.querySelector("#tableGrades tbody");
	var html = "";
	var currentStudent = students.filter(x=>{return x.hud === currentHud})[0];
	for(var i=0; i<currentStudent.grades.length; i++) {
		var rand = `<tr>
						<td>${currentStudent.grades[i]}</td>
					</tr>`;
		html += rand;
	}
	tableGrades.innerHTML = html;
}

function addGrade(form, event) {
	event.preventDefault();
	var g = document.getElementById("gradeField").value;
	if(Number.parseInt(g) <=0 || Number.parseInt(g) > 10) {
		return;
	}
	var currentStudent = students.filter(x=>{return x.hud === currentHud})[0];
	currentStudent.grades.push(Number.parseInt(g));
	showGrades();
	showStudents();
	document.getElementById("gradeField").value = "";
}

function showGradesContainer(i) {
	document.getElementById("gradeContainer").style.display="block";
	currentHud = students[i].hud;
	refreshGrades();
	showGrades();
}

function hideGradesContainer() {
	document.getElementById("gradeContainer").style.display = "none";
}

function refreshGrades() {
	var currentStudent = students.filter(x=>{return x.hud === currentHud})[0];
	document.getElementById("numeElev").innerHTML = currentStudent.name;
}

function sortAscStudents(){
    students.sort((a,b)=>{return a.average() >= b.average()});
    showStudents();
}


function sortDescStudents(){
    students.sort((a,b)=>{return a.average() < b.average()});
    showStudents();
}

function sortAscGrades(){
    students.filter(x=> {return x.hud === currentHud})[0].grades.sort((a,b)=>{return a >= b});
    showGrades();
}


function sortDescGrades(){
    students.filter(x=> {return x.hud === currentHud})[0].grades.sort((a,b)=>{return a < b});
    showGrades();
}
