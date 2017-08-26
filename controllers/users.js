"use strict";
const Users = require('../models/users');

module.exports._get = async function(ctx) {
	try {
		ctx.body = await Users.find();
	}
	catch (err) {
		ctx.throw(500, err);
		throw err;
	}
};

module.exports._post = async function(ctx) {
	try {
		ctx.body = await Users.create(ctx.request.body);
	}
	catch (err) {
		ctx.throw(500, err);
		throw err;
	}

};

module.exports._put = async function(ctx, id) {
	try {
		const data = await Users.update({ _id: id }, { $set: ctx.request.body });
		if(data.ok === 1){
			ctx.status = 200;
		}else{
			ctx.status = 500;
		}
	}
	catch (err) {
		ctx.throw(500, err);
		throw err;
	}
};

module.exports.getOne = async function(ctx, id) {
	try {
		const data = await Users.findOne({ _id: id });
		if (data) {
			ctx.body = data;
		}
		else {
			ctx.status = 404;
		}
	}
	catch (err) {
		ctx.throw(500, err);
		throw err;
	}
};


module.exports._delete = async function(ctx, id) {
	try {
		await Users.remove({ _id: id });
		ctx.status = 200;
	}
	catch (err) {
		ctx.throw(500, err);
		throw err;
	}
};
