"use strict";

const Koa = require('koa');
const logger = require('koa-logger');
const compress = require('koa-compress');
const route = require('koa-route');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const app = new Koa();

const users = require('./controllers/users');

require('./connect');

app.on('error', err => {
	console.error(err.stack);
	console.log(err.message);
});

app.use(logger());
app.use(compress());
app.use(bodyParser());
app.use(json({ pretty: false, param: 'pretty' }));

app.use(route.get('/users', users._get));
app.use(route.post('/users', users._post));
app.use(route.get('/users/:id', users.getOne));
app.use(route.delete('/users/:id', users._delete));
app.use(route.put('/users/:id', users._put));

app.listen(8080, () => {
	console.log(`App started at 8080`);
});
