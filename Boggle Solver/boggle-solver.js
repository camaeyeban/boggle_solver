function printOpts(cl, options, nopts, move){

	var out = "Options Matrix\n";

	for(var i = 0; i < options.length; i++){

		for (var j = 0; j < options[i].length; j++) {
			

			if(cl[options[i][j]-1]==undefined)
				out += " 0  ";

			else{
				if (move > 0 && j == nopts[i])
					out += "[" + cl[options[i][j]-1] + "] ";
				else
					out += " " + cl[options[i][j]-1] + "  ";
			}
		}
		move--;
		out += "\n";

	}

	console.log(out);

}

function clearRows(matrix, fromRow){

	for (var i = fromRow; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {
			matrix[i][j] = 0;
		}
	}

	return matrix;

}

function collectAnswers(tray){

	var start;
	var move;
	var i;
	var candidate;
	var N = tray.clist.length;

	var nopts = newArr(N+2); //array top of stacks
	var option = new2DA(N+2); //array stacks of options
	var cl = tray.clist.join("").toLowerCase().split("");
	console.log(cl);
	
	move = start = 0; 
	nopts[start]= 1;
	
	var goprint = false;
	var wordlist = [];
	var curtrie = dictionary;
	var currentmove = 1;

	while (nopts[start] >0)
	{
		if(nopts[move]>0)
		{
			move++;
			nopts[move]=0; //initialize new move

		    if(move != 1 && currentmove < move){
		    	curtrie = curtrie.c[cl[option[move-1][nopts[move-1]]-1]];
		    	currentmove = move;
		    	// console.log("[next row]");
		    }

		    //if candidate ends
			if(curtrie.isEnd() && move > 3){
				//goprint = true;
			
				var string = [];
				for(i=1;i<move;i++){
				    string.push(cl[option[i][nopts[i]]-1]);
			    }

			    var out = string.join("");
			    if(!wordlist.includes(out))
			    	wordlist.push(out);
			    goprint = false;

			}
		    	
		    //Search for next moves' candidates
		    for(candidate = N; candidate > 0; candidate--) 
		    {

		    	if(curtrie.char == "\0")
		    		break;

			    for (i = move; i > 0; i--)
				    if(candidate == option[i][nopts[i]])
					    break;

			    if(i == 0){

				    // console.log(cl[candidate-1]);

			    	//check if not adjacent
			    	if((move != 1) && !tray.adjmat[option[move-1][nopts[move-1]]-1][candidate-1])
				    	continue;

				    // console.log("move: "+move);
				    // console.log("current trie: ",curtrie);
				    // console.log(curtrie.c[cl[candidate-1]]);

				    //if candidate is not child of current trie node
					if(!(cl[candidate-1] in curtrie.c))
						continue;

					nopts[move]++;
				    option[move][nopts[move]] = candidate;

				 // 	console.log("Nopts, move;" + nopts[move] + ", " +move);
					// printOpts(cl, option, nopts, move);

			    }
		    } 
		}
		else 
		{
			//backtrack
			option = clearRows(option, move);
			move--;
			nopts[move]--;
			currentmove = move;
			if(curtrie.parent != null)
				curtrie = curtrie.parent;
			// console.log("Backtrack", move);
		}
	}

	console.log("==Finished Solving This Tray==");
	return wordlist.join(" ").toUpperCase().split(" ");

}

var dictionary = new Trie();