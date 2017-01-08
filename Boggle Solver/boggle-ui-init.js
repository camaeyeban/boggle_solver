var init = [
	new Tray(),
	new Tray()
];

init[0].adjmat = [
	
	[0, 1, 0, 1, 1, 0, 0, 0, 0], 
	[1, 0, 1, 1, 1, 1, 0, 0, 0], 
	[0, 1, 0, 0, 1, 1, 0, 0, 0], 
	[1, 1, 0, 0, 1, 0, 1, 1, 0], 
	[1, 1, 1, 1, 0, 1, 1, 1, 1], 
	[0, 1, 1, 0, 1, 0, 0, 1, 1], 
	[0, 0, 0, 1, 1, 0, 0, 1, 0], 
	[0, 0, 0, 1, 1, 1, 1, 0, 1], 
	[0, 0, 0, 0, 1, 1, 0, 1, 0] 

];

init[0].complete = [
"BOG",
"BOGLE",
"BOGLES",
"BOLE",
"BOLES",
"BLOG",
"OGLE",
"OGLES",
"OLE",
"OLES",
"OES",
"GOB",
"GOES",
"GLOB",
"GEL",
"GELS",
"GLEG",
"LOB",
"LOG",
"LOGE",
"LOGES",
"LEG",
"LES",
"EGO",
"ELS",
"SLOB",
"SLOG",
"SLOE",
"SEG",
"SEGO",
"SEL"
];

init[0].clist = ['B','O','G','G','L','E','.','J','S'];
init[0].totalAnswers = init[0].complete.length;


init[1].adjmat = [
	
	[0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	[1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	[0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 
	[0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 
	[1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0], 
	[1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0], 
	[0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0], 
	[0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0], 
	[0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0], 
	[0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0], 
	[0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1], 
	[0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1], 
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0], 
	[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0], 
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1], 
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0]

];

init[1].complete = [
	"ABED",
	"BAD",
	"BADE",
	"BADGE",
	"BEAD",
	"BED",
	"BEG",
	"DAB",
	"DEB",
	"DEF",
	"DEFI",
	"EDH",
	"FED",
	"FEH",
	"FIE",
	"GED",
	"GHI",
	"HEAD",
	"HIE",
	"HIED"
];

init[1].clist = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
init[1].totalAnswers = init[1].complete.length;

trays = init;

reset();
setBoggleButtons(trays[ctray].clist);
setTraySelection();
document.getElementById("total-answers").innerHTML = "Total Answers: "+trays[0].totalAnswers;