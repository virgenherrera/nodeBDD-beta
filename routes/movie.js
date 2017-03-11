'use strict';
const express = require('express');
const router = express.Router();
const MovieController = require('../controller/movie');

router
	.post('/', function(req, res, next){
		console.log("post: ", req.body);
		let movieCtrlr = new MovieController();
		let _res = movieCtrlr.insert( req.body );

		return res
			.status( _res.status )
			.json( _res.response );
	})
	.get('/',function(req,res,next){
		console.log("GET :",req.body);
		let movieCtrlr = new MovieController();
		let _res = movieCtrlr.get();

		return res.status( _res.status ).json( _res.response );
	})
	.get('/:id',function(req,res,next){
		console.log('GET/:id', req.params.id);
		let movieCtrlr = new MovieController();
		let _res = movieCtrlr.get( req.params.id );

		return res.status( _res.status ).json( _res.response );
	})
	.put('/:id',function(req,res,next){
		console.log('PUT/:id', req.params.id);
		let movieCtrlr = new MovieController();
		let _res = movieCtrlr.update( req.params.id , req.body );

		return res.status( _res.status ).json( _res.response );
	})
	.delete('/:id',function(req,res,next){
		console.log('Delete/:id', req.params.id);
		let movieCtrlr = new MovieController();
		let _res = movieCtrlr.delete( req.params.id );

		return res.status( _res.status ).json( _res.response );
	});

module.exports = router;