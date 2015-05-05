var fs = require( "fs" );


var args = process.argv;
if (arg.length<3){
	console.log("Please indicate a file.");
	return;
}
else if(args.length>3){
	console.log ("Please only indicate one file.");
	return;
}

try{
	var lines = fs.readFileSync( args[2] ).toString().split( "\n" );
}
catch(e){
	console.log("File can't be opened");
}

var targets = {};

for( var i = 0; i < lines.length; i++ )
{
    var target = {};
    var line = lines[ i ];
    console.log( line );
    /* What about format errors in the input file? */

    var reg=/:/; 
    var colon = line.search( reg );
    if( colon.length != 2 )
    {
        continue;
    }
    target.name = colon[ 0 ];
    target.depend_names = colon[ 1 ].split( " " );
    /* What if there's no target for a dependency? */
    target.visited = false;
    targets[ target.name ] = target;
}

console.log( targets );

function trace_dependencies( prev, target )
{
    if(  typeof prev  != "string"  )
    {
        console.log("File contains wrong type of objects.");
        return;
    }
    if( visited in target )
    {
        /* ... */
    }
    /* ... */

    if( target.visited )
    {
        console.log( "Already visited "+target.name );
        return;
    }
    /* "else" */

    target.visited = true;
    console.log( "> " + prev + " depends on " + target.name );
    for( var i = 0; i < target.depend_names.length; i++ )
    {
        var dep_name = target.depend_names[ i ];
        if( !( dep_name in targets ) )
            continue;
        var dep = targets[ dep_name ];
        // if( date( dep ) older than date( target ) )
        //    continue;
        trace_dependencies( target.name, dep );
        // trace_dependencies( {l:12, m:34}, "hello" );
    }
}

try{
trace_dependencies( "[ Start ]", targets[ args[3] ] );
}
catch(e){
	console.log("The dependent does not exist.");
}
