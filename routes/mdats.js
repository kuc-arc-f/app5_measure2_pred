var express = require('express');
var router = express.Router();
var mdl_util = require('../include/mdl_util');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var utl = new mdl_util( )
    var month= utl.get_nowMonth()
//console.log(month );
    res.redirect('/mdats/index/'+ month)
//    res.render('mdats/index', {"month": month } );
});
/******************************** 
* 
*********************************/
router.get('/index/:month', function(req, res, next) {
//console.log(req.params.month );
    var utl = new mdl_util( )
    var month= req.params.month
    var bef_month= utl.get_beforeMonth(month)
    var aft_month= utl.get_afterMonth(month)
//console.log(month );
//console.log(bef_month );
//console.log(aft_month );
    res.render('mdats/index',
    {
         "month": month ,
         "bef_month" : bef_month,
         "aft_month" : aft_month,
    } );
});
/******************************** 
* 
*********************************/
router.get('/new', function(req, res, next) {
    res.render('mdats/new', {});
});
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
	console.log(req.params.id  );
	res.render('mdats/show', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/
router.get('/edit/:id', function(req, res) {
console.log(req.params.id  );
	res.render('mdats/edit', {"params_id": req.params.id });
});
/******************************** 
* 
*********************************/ 
// router.get('/chart', function(req, res, next) {
router.get('/chart/:month', function(req, res, next) {
console.log(req.params.month );
    var utl = new mdl_util( )
    var month= req.params.month
//
    res.render('mdats/chart_pred', {"month": month } );
	//res.render('mdats/chart', {"month": month } );
});

module.exports = router;
