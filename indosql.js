var sqlite = require( 'sqlite3' );
var row,row2;
var db = new sqlite.Database( "telluride.sqlite" );
db.each( "SELECT STAGE,PERFORMER, TIME FROM PERFORMANCE",function( err, row ) {
db.each( "SELECT NAME FROM PERFORMER WHERE ID = " + row.Name,function( err2, row2 ) {
console.log( "Performer: "+row.Name + " " +row2.Name );
});
console.log( row );
});

function createTable(){
	var body=document.body;
	var tbl =document.creatElement('table');
	tbl.style.border("1px black");
	tbl.style.width="150px";

	for (var i=0;i<3;i++){
		var tr=tbl.insertRow();
		tr.value=row[i];
		for (var j=0;j<5;j++){
			var td= tr.insertCell();
			td.value=row2[j]
			td.appendChild(document.createTextNode('Cell'));
		}
	}
	body.appendChild(tbl);
}
createTable();
