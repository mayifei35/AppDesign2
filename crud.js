var fs = require( "fs" );
var http = require( "http" );
var sqlite = require( "sqlite3" );//.verbose();
var util=require("util");
var db = new sqlite.Database("./thecrud");

function formInputParser( url )
{
var inputs = {};
var form_text = url.split( "?" )[1];
//console.log(form_text);
var form_inputs = form_text.split( "&" );
for( var i = 0; i < form_inputs.length; i++ ) {
var inp = form_inputs[i].split( "=" );
inputs[ inp[0] ] = inp[1];
}
console.log( inputs );
return inputs;
}

///home/yifei/App-Design/add_enrollment?student=Student+ID&class=Class+ID.
function addEnrollments( req, res )
{
	console.log( req.url );
	formInputParser( req.url );
	var form_text = req.url.split( "?" )[1];
	var form_inputs = form_text.split( "&" );
	var student = null, classes = null;
	for( var i = 0; i < form_inputs.length; i++ ) {
		var inp = form_inputs[i].split( "=" );
		if( inp[0] == 'student' ) {
			student = inp[1];
		}
		else if( inp[0] == 'class' ) {
			classes = inp[1];
		}
	}
	if( student == null || classes == null)
	{
		res.writeHead( 200 );
		res.end( "Can't add a null enrollment." );
		return;
	}

	var student_exists = false;
	var class_exists = false;
	db.all( "SELECT COUNT(NAME) FROM STUDENTSID  = "+student+ "JOIN SELECT COUNT(NAME) FROM CLASSID="+ classes,
		function( err, rows ) {
			student_exists = rows[0]['COUNT(NAME)'] == 1;
			class_exists = rows[1]['COUNT(NAME)'] == 1;
		});
	if( !student_exists & !class_exists )
	{
		console.log("The enrollment already exists.");
	return;
	}
        var sql_cmd = "INSERT INTO ENROLLMENTS ('STUDENTID', 'CLASSID') VALUES ("+student_input[1]+"', '"+class_input[1]"')'";
	db.run( sql_cmd );
	db.close();
	res.writeHead( 200 );
	res.end( "<html><body>You added a new enrollment.</body></html>" );
}

//home/yifei/App-Design/add_students?student=ame+hi.
function addStudents( req, res )
{

console.log( req.url );
var form_text = req.url.split( "?" )[1];
var form_input = form_text.split( "=" );
console.log(form_text);
console.log(form_input);
var studentadded = decodeURIComponent(  form_input[1] + '' );
console.log(studentadded);
var sql_cmd = "INSERT INTO STUDENT ('NAME') VALUES ('"+
studentadded+"')";
db.run( sql_cmd );
db.close();
res.writeHead( 200 );
res.end( "<html><body>Added a new student</body></html>" );
}

var student_exists = false;
 db.all( "SELECT COUNT(NAME) FROM STUDENTS WHERE STUDENTNAME = "+studentadded,
function ( err, rows ) {
student_exists = rows[0]['COUNT(NAME)'] == 1;
});
if( !student_exists )
{
alert("This student already exists");
}

db.close();
res.writeHead( 200 );
res.end( "<html><body>You added a new student.</body></html>" );


function listStudents( req, res )
{
//var db = new sqlite.Database( './thecrud' );
var resp_text = "<!DOCTYPE html>"+"<html>" +"<body>";
db.each( "SELECT * FROM STUDENTS", function( err, row ) {
resp_text+=row.StudentsName+" "+"- "+row.Year+ "<br> ";
});
db.close( function() {
resp_text +="</body>" + "</html>";
res.writeHead( 200 );
res.end(resp_text);
} );
}

function listTeachers( req, res )
{
var db = new sqlite.Database( './thecrud' );
var resp_text = "<!DOCTYPE html>"+"<html>" +"<body>";
db.each( "SELECT * FROM TEACHERS", function( err, row ) {
resp_text+=row.TeachersName+ " "+ "- "+row.Office+ "<br> ";
});
db.close( function() {
resp_text +="</body>" + "</html>";
res.writeHead( 200 );
res.end(resp_text);
} );
}

function listClasses( req, res )
{
var db = new sqlite.Database( './thecrud' );
var resp_text = "<!DOCTYPE html>"+"<html>" +"<body>";
db.each( "SELECT * FROM CLASSES", function( err, row ) {
resp_text+=row.ClassesName+" "+ "- "+row. Department+"<br> ";
});
db.close( function() {
resp_text +="</body>" + "</html>";
res.writeHead( 200 );
res.end(resp_text);
} );
}

function listEnrollments( req, res )
{
var db = new sqlite.Database( './thecrud' );
console.log("works");
var resp_text = "<!DOCTYPE html>"+"<html>" +"<body>";
db.each( "SELECT STUDENTID FROM ENROLLMENTS" +"JOIN CLASSES ON CLASSES.ID = ENROLLMENTS.CLASSID", function( err, row ) {
console.log( row );
resp_text +=row.STUDENTID +" "+ row.CLASSID  ;
});
db.close(
function() {
console.log( "Complete! "+resp_text );
resp_text += "</body>" + "</html>";
res.writeHead( 200 );
res.end( resp_text );
} );
}

function serveFile( filename, req, res )
{
var contents="";
  try
  {
  contents = fs.readFileSync( filename ).toString();

  }
  catch( e )
  {
    console.log("Error: Something bad happened trying to open "+filename );
    res.writeHead( 404 );
    res.end( "" );
    return;
  }
  res.writeHead( 200 );
  res.end( contents );
}


function serverFn( req, res )
{
console.log(req.url);
var filename = req.url.substring( 1, req.url.length );
if( filename === "" )
{
filename = "./School.html";
}
if( filename.substring( 0, 14 ) == "list_students" )
{
listStudents( req, res );

}
else if( filename.substring( 0, 12 ) == "list_teacher" )
{
listTeachers( req, res );
}
else if( filename.substring( 0, 10 ) == "list_class" )
{
listClasses( req, res );
}
else if( filename.substring( 0, 11 ) == "add_student" )
{
addStudents( req, res );
}
else if( filename.substring( 0, 15 ) == "add_enrollments" )
{
addEnrollments( req, res );
}
else
{
serveFile( filename, req, res );
}
}
var server = http.createServer( serverFn );
server.listen( 8082 );
