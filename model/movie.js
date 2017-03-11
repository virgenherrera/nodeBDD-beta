'use strict';

var MovieModel = (function(){
	function MovieModel(){
		this.moviesFakeTable = {};
		this.id = null;
		this.movie = null;
	}

	MovieModel.prototype.validId = function(id) {
		this.id = ( id && /^\d+$/.test( id ) ) ? parseInt( id ) : null;

		return this;
	};

	MovieModel.prototype.validMovie = function(movie) {
		if( movie &&  movie.title && movie.year ){
			this.movie = {};
			this.movie.title = movie.title;
			this.movie.year = movie.year;
			if( this.id ){
				this.movie.id = this.id;
			}
		} else {
			this.movie = null;
		}

		return this;
	};
	
	MovieModel.prototype.create = function(movie) {
		this.validId( new Date().valueOf() ).validMovie( movie );

		if( !this.id || !this.movie ){
			return null;
		}

		this.moviesFakeTable[ this.id ] = this.movie;
		return this.moviesFakeTable[ this.id ];
	};
	
	MovieModel.prototype.readOne = function(id) {
		this.validId(id);

		return ( this.id && this.moviesFakeTable[ this.id ] ) ? this.moviesFakeTable[ this.id ] : null;
	};

	MovieModel.prototype.readAll = function() {
		let movies = this.moviesFakeTable;

		return Object.keys( movies ).map(k=>movies[k]);
	};

	MovieModel.prototype.edit = function(id,movie) {
		this.validId( id ).validMovie( movie );

		if( !this.id || !this.movie || !this.moviesFakeTable[ this.id ]){
			return null;
		}

		this.moviesFakeTable[ this.id ] = this.movie;
		return this.moviesFakeTable[ this.id ];
	};

	MovieModel.prototype.delete = function(id) {
		this.validId(id);

		if( !this.id || !this.moviesFakeTable[ this.id ]  ){
			return null;
		}

		delete this.moviesFakeTable[ this.id ];
		return true;
	};

	return MovieModel;
})();

module.exports = MovieModel;