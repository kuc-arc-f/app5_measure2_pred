//
//
// import csv, to mongo
//
var fs = require('fs');
var logger = require('morgan');
var monk = require('monk');
var db_setting = '192.168.10.104:27017/app1db'
var mdl_util = require('./include/mdl_util');

/******************************** 
*
*********************************/
function insert_db(db ,item ){
//console.log( item.date );
    var obj = {
        "mdate" : item.date,
        "hnum" : item.hnum,
        "lnum" : item.lnum,
    }
    obj.up_date = new Date();
console.log( obj );
//
    var collection = db.get('dats');
    collection.insert(obj , function(err, result ) {
        if (err) throw err;
        db.close();
    });
}
/******************************** 
*
*********************************/
function proc_arr_check(items){
    var utl = new mdl_util( )
    items.forEach(function (item) {
        var date = item[0]
//console.log( date.length );
        if(date.length > 0){
            date = utl.convert_str2date( date )
console.log( date );
            var hnum = item[1]
            var lnum = item[2]
            var arr ={
                "date" : date,
                "hnum" : hnum,
                "lnum" : lnum,
            }
            var db_app1 = monk(db_setting);
            insert_db(db_app1, arr)
        }
    });
}
/******************************** 
*
*********************************/
function read_csvFile(input_file ){
    var rs = fs.createReadStream( input_file );
    var readline = require('readline');   
    var rl = readline.createInterface(rs, {});
   
    var items = []
    var i = 0;
    rl.on('line', function(line) {
        if(i > 0){
            if(line.length > 0){
               col = line.split(",")
//console.log( col.length );
                if(col.length >= 3){
                    items.push( col )
                }
            }
        }
        i += 1;
    })    
    .on('close', function() {
//        console.log( items );
        proc_arr_check(items)
    });            
}
/******************************** 
* main
*********************************/
var items = read_csvFile("dat/import.csv");
//console.log( "#end" )
return;
