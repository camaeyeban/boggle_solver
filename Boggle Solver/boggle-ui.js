//http://www.html5rocks.com/en/tutorials/file/dndfiles/

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

var Tray = function(clist, adjmat){

	this.input = "";
	this.sequence = [];
	this.answers = [];
	this.complete = [];
	this.clist = clist;
	this.adjmat = adjmat;
	this.totalAnswers = 0;

}

Tray.prototype.solve = function() {

	return collectAnswers(this);

};

Tray.prototype.showAdjmat = function(){

	var out = "";
	for (var i = 0; i < this.adjmat.length; i++) {
		for (var j = 0; j < this.adjmat[i].length; j++) {
			out += this.adjmat[i][j] +" ";
		}
		out += "\n";
	}
	console.log(out);

}

var adjmat;		//must be 2D-array. note: use new2DA(n) function
var mapdata;
var trays = [];			//contains all data from all trays
var ctray = 0;			//current tray in use. (index)

//Initializes a variable of array with size N full of zeroes
function newArr(N){

	var a = [];
	for (var i = 0; i < N; i++) {
		a.push(0);
	}

	return a;

}

//Initializes a variable of 2D array sized N*N; all zeroes
function new2DA(N){
	var a = [];
	for (var i = 0; i < N; i++) {
		var b = [];
		for (var j = 0; j < N; j++) {
			b.push(0);
		}
		a.push(b);
	}

	return a;

}

//Changes input textfield to larger font
function shiftButtons(){

	document.getElementById("input").style.fontSize = "32px";
	document.getElementById("input-ok").style.height = "43px";
	document.getElementById("input-ok").style.paddingTop = "12px";
	document.getElementById("input-ok").style.fontSize = "18px";

}

//Changes input textfield to normal font
function shiftKeys(){

	document.getElementById("input").style.fontSize = "13px";
	document.getElementById("input-ok").style.height = "21px";
	document.getElementById("input-ok").style.paddingTop = "1px";
	document.getElementById("input-ok").style.fontSize = "13px";


}

//Function called when a dictionary file is loaded / changed
function changeDict(evt){

	var file = evt.target.files[0];

	var reader = new FileReader();
	// Closure to capture the file information.
	reader.onload = (function(file) {
		return function(e) {

			dictionary = new Trie("\n");

			var lines = e.target.result.split("\n");
			lines.forEach(function(e){
				dictionary.insert(e.trim().toLowerCase().split(""));
			});

			console.log("Finished Loading Dictionary");

			document.getElementById("map").disabled=false;
			document.getElementById("dictionary").disabled=true;

		};
	})(file);

	reader.readAsText(file);

}

//Function called when a map (boggle) file is loaded / changed
function changeMap(evt) {

	var file = evt.target.files[0];

	var reader = new FileReader();

  	var line = 0, noOfTrays, dimension, i, j, k;

	// Closure to capture the file information.
	reader.onload = (function(file) {
		return function(e) {

	      	mapdata = e.target.result.split("\n");
	      	noOfTrays = mapdata[line++];
	      	trays = [];
	      	for(i=0; i<noOfTrays; i++) {
		        clist = [];
		        dimension = mapdata[line++];
	          	for(j=0; j<dimension; j++) {
	            	data = mapdata[line++].trim().split(" ");
	            	for(k=0; k<dimension; k++) {
	              		clist.push(data[k]);
	            	}
	          	}
	          	adjmat = setUpAdjmat(dimension);
	          	var tray = new Tray(clist, adjmat);
	          	trays.push(tray);
	        }

	        reset();
			ctray = 0
			setTraySelection();
			switchTray(1);
			
			document.getElementById("input-ok").disabled = true;
			document.getElementById("solve").disabled = true;
			document.getElementById("tray-select").disabled = true;

			for (var i = 0; i < trays.length; i++) {
				trays[i].complete = collectAnswers(trays[i]);
				trays[i].totalAnswers = trays[i].complete.length;
			}

			document.getElementById("input-ok").disabled = false;
			document.getElementById("solve").disabled = false;
			document.getElementById("tray-select").disabled = false;
			document.getElementById("total-answers").innerHTML = "Total Answers: "+trays[0].totalAnswers;
	
		};
	})(file);

	reader.readAsText(file);

}

function setUpAdjmat(dimension){
  
  	var i, j, n, N;

  	n = dimension;
  	N = n*n;
  	adjmat = new2DA(N);
  	for(i = 0; i < N; i++)
  	   	for(j = 0; j < N; j++)
 			adjmat[i][j] = -1;

  	for(i = 0; i < N; i++){
  	   	for(j = 0; j < i+1; j++){
  	        if((i+1) % n != 0 && i+1 == j){          // right
                adjmat[i][j] = 1;
                adjmat[j][i] = 1;
            }else if(i % n != 0 && i-1 == j){         // left
                adjmat[i][j] = 1;
                adjmat[j][i] = 1;
            }else if((i+1) % n != 0 && i-n+1 == j){   // top-right
                adjmat[i][j] = 1;
                adjmat[j][i] = 1;
            }else if(i % n != 0 && i-n-1 == j){       // top-left
                adjmat[i][j] = 1;
                adjmat[j][i] = 1;
            }else if(i-n == j){                       // top
                adjmat[i][j] = 1;
                adjmat[j][i] = 1;
            }else if(i+n == j){                       // bottom
                adjmat[i][j] = 1;
                adjmat[j][i] = 1;
            }else if((i+1) % n != 0 && i+n+1 == j){   // bottom-right
                adjmat[i][j] = 1;
                adjmat[j][i] = 1;
            }else if(i % n != 0 && i+n-1 == j){       // bottom-left
                adjmat[i][j] = 1;
                adjmat[j][i] = 1;
            }else{                                    // other positions
                adjmat[i][j] = 0;
                adjmat[j][i] = 0;
            }                                         // other positions
  	    }
  	}

    return adjmat;
}

//Sets the boggle buttons as the buttons in clist
function setBoggleButtons(arr){

	var N = arr.length;
	var n = Math.sqrt(N);
	if(N/n != n){
		alert("NOT VALID DIMENSIONS");
		return;
	}

	document.getElementById('buttons').innerHTML = "";

	for (var i = 0; i < N; i++) {

		if(i>0 && i%n == 0)
			document.getElementById('buttons').innerHTML += "<br>";

		var buttonform = "<button class='bglbtn' id='"+i+"' onclick='bglbtnclick("+i+")'>"+arr[i]+"</button>";
		document.getElementById('buttons').innerHTML += buttonform;

	}

	var side = n*44;
	var margins = (610-side)/2;
	document.getElementById('buttons').style.width = side+"px";
	document.getElementById('buttons').style.height = side+"px";
	document.getElementById('buttons').style.marginTop = margins+"px";
	document.getElementById('buttons').style.marginBottom = margins+"px";

}

//Occurs when button is clicked
function bglbtnclick(id){

	shiftButtons();

	console.log("Button clicked: "+id, "| Button character: "+document.getElementById(id).innerHTML);

	if(trays[ctray].sequence[trays[ctray].sequence.length-1] == id){
		trays[ctray].sequence.pop();
		document.getElementById('input').value = document.getElementById('input').value.split("").splice(0,document.getElementById('input').value.length-1).join("");
		input(8);
		return;
	}
	else if(trays[ctray].sequence.includes(id) || (trays[ctray].sequence.length>0 && trays[ctray].adjmat[trays[ctray].sequence[trays[ctray].sequence.length-1]][id] != 1)){return;}

	trays[ctray].sequence.push(id);
	document.getElementById('input').value += document.getElementById(id).innerHTML;
	input(document.getElementById(id).innerHTML.charCodeAt(0));

}

//Resets the game using the current map and dictionary
function reset(){

	console.log("Resetting game");
	document.getElementById('answers').value = "";
	document.getElementById('input').value = "";

	resetTrays();
	
}

//Doesn't really solve but shows all the solved text in the box
function showAnswers(){

	console.log("Displaying complete");

	for (var i = 0; i < trays[ctray].complete.length; i++) {
		if(!trays[ctray].answers.includes(trays[ctray].complete[i])){
			trays[ctray].answers.unshift(trays[ctray].complete[i]);
			document.getElementById('answers').value += trays[ctray].complete[i] + "\n";
		}
	}

}

//Actions done after input from keyboard/button
function input(code){
	var word = document.getElementById('input').value.toUpperCase();
	if(code==13){
		console.log("Input", word);
        document.getElementById('input').value = "";
        trays[ctray].sequence = [];
        if(!trays[ctray].answers.includes(word) && trays[ctray].complete.includes(word)){
	        trays[ctray].answers.unshift(word);
	        document.getElementById('answers').value = word + "\n" + document.getElementById('answers').value;
	    }
    }
    else if(code == 8 || (code >= 16 && code <= 18) || (code >= 37 && code <= 40) ){	//backspace and other keys
    	//Do Nothing
    	return;
    }
    else{
    	console.log(code);
    	document.getElementById('input').value=word;
    	if(!trays[ctray].clist.includes(String.fromCharCode(code).charAt(0))){
    		document.getElementById('input').value = word.split("").splice(0,word.length-1).join("");
    	}
    	trays[ctray].input = document.getElementById('input').value;

    }
}


function showAbout(){

	alert("Created for CMSC 142 Boggle Project\nDevelopers:\n    Christian Josh G. Cruz\n    Jenzhel Sanchez\n    RJ Capuno\n    Erica Mae Yeban");

}

function showHelp(){

	alert("Goal:\nFind as many valid words as you can in the grid.\n\nRules:\n1. Words must be build by chaining adjacent letters (horizontally, vertically, or diagonally).\n2. The letter at position 'x' cannot be used twice in the same word.\n3. Words must contain at least three letters.");

}

//Listeners
document.getElementById('dictionary').addEventListener('change', changeDict, false);
document.getElementById('map').addEventListener('change', changeMap, false);

for(var i=0; i<trays.length; i++) {
  var newOption = document.createElement("OPTION");
  newOption.setAttribute("value", i+1);
  var optionText = document.createTextNode("Tray '"+(i+1)+"'");
  x.appendChild(optionText);
  document.getElementById("tray-select").appendChild(newOption);
}

//When keyboard is used on input.
document.getElementById('input').onkeyup = function(e){
	shiftKeys();
	input(e.keyCode);
};
