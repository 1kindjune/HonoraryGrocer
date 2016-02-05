var mongoose = require('mongoose');
 URLSlugs = require('mongoose-url-slugs');

//my schema goes here!
var List = new mongoose.Schema({
	name: String,
	createdBy: String,
	items: [Item],
});

var Item = new mongoose.Schema({
	itemName: String,
	quantity: String,
	checked: Boolean,
	slug: String //stringed slug
});

List.plugin(URLSlugs('name')); //to automatically generate slug property
//Schema name.plugin(URLSlugs('[what properties your slug should consist of]'))


mongoose.model('List', List);
mongoose.model('Item', Item);

mongoose.connect('mongodb://localhost/grocerydb');
