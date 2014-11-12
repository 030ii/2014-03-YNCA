var items = {
	1 : {name: 'macbook', price: 100},
	2 : {name: 'hachang', price: 1000000000000},
	3 : {name: 'woorimi', price: 500},
	4 : {name: 'yeslkoh', price: 1000}
};

exports.home = function(req, res) {
	if (typeof req.session.username == 'undefined') {
		res.render('home', {title:'Ninja Store'});
	} else res.redirect('/items');
};

exports.homePostHandler = function(req, res) {
	var username = req.body.username || 'Anonymous';
	req.session.username = username;
	res.redirect('/');
};

exports.items = function (req, res) {
	if (typeof req.session.username == 'undefined') res.redirect('/');
	else res.render('items', {title: 'woogenius store - items', username : req.session.username, items : items});
};

exports.item = function (req, res) {
	if (typeof req.session.username == 'undefined') res.redirect('/');
	else {
		var name = items[req.params.id].name;
		var price = items[req.params.id].price;
		res.render('item', {title: 'woogenius store - '+name, username : req.session.username, name: name, price: price});
	}
}