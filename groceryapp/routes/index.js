var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var List = mongoose.model('List');
var Item = mongoose.model('Item');



//THE HOMEPAGE/LIST
router.get('/', function(req, res) {
  res.redirect('/list'); //go to the list page for groceries
});

router.get('/list', function(req, res){
	List.find(function(err, list, count){
		res.render('list', {
			list: list
		});
	});
});

//LIST CREATE
router.get('/list/create', function(req, res){
	res.render('create');
});

router.post('/list/create', function(req, res){
	console.log(req.body.list);//from slides
	//create a new list
	new List({
		name: req.body.list,
		createdBy: req.body.creator,
		items: [],
	}).save(function(err, list, count){
		res.redirect('/list'); //from slides
	});
});

//SLUGS
router.get('/list/:slug', function(req, res){
	var curr = req.params.slug;
	List.findOne({slug : curr}, function(err, list, count){
		res.render('item',{
			title: list.name,
			items: list.items
		});
	});
});

router.post('/list/:slug', function(req, res){
	req.body.slug = req.params.slug;

	var newItem = new Item ({
							itemName: req.body.itemName,
							quantity: req.body.quantity,
							checked: false,
							});

	List.findOneAndUpdate ({slug: req.body.slug}, {$push: {items: newItem}},
						function(err, list, count){
						res.redirect('/list/' + req.body.slug); //slug string
	});
});

router.post('/item/', function(req, res){
	var slug = req.body.slug[0];
	slug = req.body.slug;

	var checkArr = ("" + req.body.itemCheck).split(",");
	List.findOne({slug: slug}, function(err, list, count){
		for (var x = 0; x < list.items.length; x++){
			for (var y = 0; y < checkArr.length; y ++){
				if (list.items[x].itemName == checkArr[y]){
					list.items[x].checked = true;
				}
			}
		}
		res.redirect('/list/' + slug);
	});
});



module.exports = router;
