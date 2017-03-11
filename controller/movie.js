'use strict';
const MovieModel = require('../model/movie');


var MovieController = (function(){
	function MovieController(){
		// this.Model = new MovieModel();
		this.status = 500;
		this.response = {
			error: true,
			count:0,
			data:[],
			message:''
		};
	}

	MovieController.prototype.Model = new MovieModel();

	MovieController.prototype.setRes = function(data,msg){
		let res = this.response;
		
		// for this.response.data if is array match else if object push
		if( data && ( data.constructor === Array && data instanceof Array ) ){
			this.response.data 	= data;
		} else if( data && ( data.constructor === Object && data instanceof Object ) ){
			this.response.data.push( data );
		}
		this.response.error		= false;
		this.response.count		= this.response.data.length;
		this.response.message	= ( msg ) ? msg.toString() : 'no additional data';

		return this;
	};	

	MovieController.prototype.insert = function(movie){
		let tryInsert = this.Model.create( movie );
		if( !tryInsert ){
			this.status = 403;
			this.setRes( tryInsert,'Cannot insert with provided data');
		} else {
			this.status = 201;
			this.setRes(tryInsert, 'Movie created');
		}
		return this;
	};

	MovieController.prototype.get =	function(id){
		let tryGet;

		tryGet = ( id ) ? this.Model.readOne(id) : this.Model.readAll();
		this.status = 200;
		this.setRes(tryGet, 'Movie found');

		return this;
	};

	MovieController.prototype.update = function(id,movie){
		let tryUpdate = this.Model.edit(id,movie);

		if( !tryUpdate ){
			this.status = 403;
			this.setRes(tryUpdate, 'Cannot update with provided data');
		} else {
			this.status = 200;
			this.setRes(tryUpdate, 'Movie Updated');
		}

		return this;
	};

	MovieController.prototype.delete = function(id){
		let tryDelete = this.Model.delete(id);

		if( !tryDelete ){
			this.status = 403;
			this.setRes(tryDelete , 'Cannot delete with provided data');
		} else {
			this.status = 400;
			this.setRes(tryDelete , 'Movie Deleted');
		}
		return this;
	};

	return MovieController;
})();

module.exports = MovieController;