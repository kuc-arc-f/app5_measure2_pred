var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
//
var mdl_util = require('../include/mdl_util');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource-1234');
});
/******************************** 
* 
*********************************/
router.get('/index/:month', function(req, res) {
    var utl = new mdl_util( )
//console.log(req.params.month );
    var start_date = utl.get_start_month(req.params.month)
    var end_date  = utl.get_end_month(req.params.month)
//console.log(end_date );
    var db = req.db;
    var collection = db.get('pred');
    var items = [];
//    collection.find({}, {sort: { mdate: 1}} ,function(e,docs){
    collection.find(
        {
            "mdate": {
                $gt: start_date ,
                $lt: end_date ,
            },
        }
        , {sort: { mdate: 1}} 
        ,function(e,docs){
        docs.forEach( function (item) {
            var dt = item.mdate
            var s = dt.toISOString()   
//console.log(s );
            s = s.replace("T", " ")
            item.date_str = s.substring(0, 19) 
            item.date = s.substring(0, 10 ) 
            items.push(item);
        });
        var param = {"docs": items };
        res.json(param);
    });
});
/******************************** 
* 
*********************************/
router.post('/new', (req, res) => {
    console.log(req.body )
    var db = req.db;
    var obj = req.body;
    obj.mdate = new Date();
    obj.up_date = new Date();
    var collection = db.get('mdats');
    collection.insert(obj , function(err, result ) {
        if (err) throw err;
        res.json(req.body);
        db.close();
    });        
}); 
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
    var db = req.db;
    console.log(req.params.id  );
    var collection = db.get('mdats');
    collection.find({"_id": new ObjectID(req.params.id)},{},function(e,docs){
        var param = {"docs": docs };
        res.json(param);
    });
});
/******************************** 
* 
*********************************/
router.post('/update', (req, res) => {
    var db = req.db;
    console.log(req.body )
    var obj = {
                "hnum": req.body.hnum ,
                "lnum": req.body.lnum,
                "up_date" : new Date()
            };
    var collection = db.get('mdats');
    collection.findOneAndUpdate(
    { _id: new ObjectID( req.body.id ) }, obj, {}, function(err, r){
        if (err) throw err;
        res.json(req.body);
        db.close();
    });        
});
/******************************** 
*  delete
*********************************/
router.get('/delete/:id', function(req, res) {
    var db = req.db;
    console.log(req.params.id  );
    var collection = db.get('mdats');
    collection.findOneAndDelete( { _id: new ObjectID( req.params.id ) }, {}, function(err, r){
        //console.log("#doc");
        res.json(r);
    });
});

module.exports = router;
