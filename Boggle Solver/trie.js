
var Trie = function(char, parent){

	this.char = char;
	this.c = null;	//children
	this.parent = parent==undefined?null:parent;

}

Trie.prototype.isEnd = function(){

	if(this.c["\0"] == undefined)
		return false;

	return true;

}

Trie.prototype.insert = function(word){

	if(word.length == 0){
		var child = new Trie("\0", this);
		if(this.c == null)
			this.c = {};
		this.c["\0"] = child;
		return;
	}

	var char = word.shift();

	var child = null;
	if(this.c==undefined){
		this.c = {};
	}else{
		child = this.c[char];
	}

	if(child==undefined){
		child = new Trie(char, this);
		this.c[char] = child;
		child.insert(word);
	}else
		child.insert(word);
	
	
}

function test(){

	var head = new Trie("\n");

	head.insert("hello".split(""));
	head.insert("hi".split(""));
	head.insert("bog".split(""));
	head.insert("blog".split(""));

	// console.log(head.c['h'].c['e'].c['l'].c['l'])
	// console.log(head.c['h'].c['e'].c['l'].c['l'].c['o'])

	// var a = head.c['h'];
	// var b = a;
	// b = b.c['e'];
	// console.log("a", a)
	// console.log("b", b)

	// console.log("g", head.c["b"].c["o"].c["g"].isEnd());

}

test();