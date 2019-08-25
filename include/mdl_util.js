// mdl_util

/**
 * constructor
 */
var mdl_util = function()
{
    this.timezone_jp = 9
}
/******************************** 
*
*********************************/
mdl_util.prototype.convert_str2date = function(item)
{
    var ret = ""
    col = item.split(" ")
    var dt = col[0]
    row = dt.split("/")
    var month = row[1]
    ret =new Date(row[0], month -1 , row[2], this.timezone_jp ,0 , 0)
//console.log( ret );
    return ret
}
/******************************** 
*
*********************************/
mdl_util.prototype.convert_date2str = function(date){
    var ret = ""
    var yyyy = date.getFullYear()
    var mm = date.getMonth() + 1
    var dd  = date.getDate();
    var s = yyyy + "/" + mm + "/"+ dd
//console.log( s );
    return s
}
/******************************** 
* in: YYYY/MM/DD
* out: date
*********************************/
mdl_util.prototype.get_start_month = function(date){
    row = date.split("-")
    var year = row[0]
    var month = row[1]
    var ret =new Date(year, month -1 , 1, this.timezone_jp ,0 , 0)
//console.log( this.timezone_jp );
    return ret
}
/******************************** 
* in: YYYY/MM/DD
* out: date
*********************************/
mdl_util.prototype.get_end_month = function(date){
    row = date.split("-")
    var year = row[0]
    var month = row[1]
    if(month >=12){
        month = 1
        year = parseInt(year) + 1
    }else{
        month = parseInt(month) +1
    }
//console.log( month );
    var ret =new Date(year, month -1 , 1, this.timezone_jp ,0 , 0)
    return ret
}
/******************************** 
*
*********************************/
mdl_util.prototype.get_nowMonth = function( )
{
    var ret = ""
    var date = new Date()
    var yyyy = date.getFullYear()
    var mm = date.getMonth() + 1
    var dd  = date.getDate();
//    var ret = yyyy + "-" + mm + "-"+ dd 
    var ret = yyyy + "-" + mm
    return ret
}
/******************************** 
*
*********************************/
mdl_util.prototype.get_beforeMonth = function( month )
{
    var ret = ""
    row = month.split("-")
    var year = row[0]
    var month = row[1]
    month = parseInt(month) -1
    var date =new Date(year, month -1 , 1, this.timezone_jp ,0 , 0)
    var yyyy = date.getFullYear()
    var mm = date.getMonth() + 1
    var ret = yyyy + "-" + mm 
    return ret
}
/******************************** 
*
*********************************/
mdl_util.prototype.get_afterMonth = function( month )
{
    var ret = ""
    row = month.split("-")
    var year = row[0]
    var month = row[1]
    month = parseInt(month) +1
    var date =new Date(year, month -1 , 1, this.timezone_jp ,0 , 0)
    var yyyy = date.getFullYear()
    var mm = date.getMonth() + 1
    var ret = yyyy + "-" + mm 
    return ret
}
/******************************** 
*
*********************************/
mdl_util.prototype.test = function(param)
{
    return "Test:" + param
}

module.exports = mdl_util
