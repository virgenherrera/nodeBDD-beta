'use strict';
const express = require('express');
const lodash = require('lodash');
const router = express.Router();

var Movie = {};

/* GET users listing. */
router
	.post('/', (req, res, next) => {
		console.log("post: ", req.body);

		if (!req.body) {
			res.status(403).json({
				error: true,
				messaje: 'Body empty'
			});
		}

		let _movie = req.body;
		_movie._id = Date.now();

		Movie[_movie._id] = _movie;

		res.status(201).json({
			movie: Movie[_movie._id]
		});

	})
	.get('/',(req,res,next)=>{
		console.log("GET :",req.body);

		res
			.status(200)
			.json({movies:lodash.values(Movie)});
	})
	.get('/:id',function(req,res,next){
		console.log('GET/:id', req.params.id);

		if( !req.params.id ){
			return res
				.status(403)
				.json({error:true,messaje:"Params empty"});
		}

		let movie = Movie[ req.params.id ];
		return res
			.status(200)
			.json({movie:movie});
	})
	.put('/:id',function(req,res,next){
		console.log('PUT/:id', req.params.id);
		
		if( !req.params.id && !req.body ){
			return res
				.status(403)
				.json({error:true,messaje:"Params empty"});
		}

		let new_movie = req.body;
		new_movie._id = parseInt(req.params.id,10);


		Movie[ new_movie._id ] = new_movie;
		new_movie = Movie[ req.params.id ];

		return res
			.status(200)
			.json({movie:req.body});

	})
	.delete('/:id',function(req,res,next){
		console.log('Delete/:id', req.params.id);

		if( !req.params.id && !req.body ){
			return res
				.status(403)
				.json({error:true,messaje:"Params empty"});
		}

		let id = parseInt( req.params.id , 10 );
		delete Movie[ id ];

		return res
			.status(400)
			.json({});
	});

module.exports = router;