function resetTrays(){

	trays.forEach(function(e){

		e.input = "";
		e.sequence = [];
		e.answers = [];

	});

}

function switchTray(tray){

	ctray = tray-1;

	document.getElementById('input').value = trays[ctray].input;
	switchAnswers();
	setBoggleButtons(trays[ctray].clist);
	document.getElementById("total-answers").innerHTML = "Total Answers: "+trays[ctray].totalAnswers;
	
}

function switchAnswers(){

	var ans = trays[ctray].answers;
	document.getElementById('answers').value = "";

	ans.forEach(function(e){
		document.getElementById('answers').value = e + "\n" + document.getElementById('answers').value;
	});

}

function setTraySelection(){

	document.getElementById('tray-select').innerHTML = "";
	var len = trays.length;
	for (var i = 1; i < len+1; i++) {
		document.getElementById('tray-select').innerHTML += "<option value='"+i+"'> Tray "+i+" </option>\n";
	}

}
