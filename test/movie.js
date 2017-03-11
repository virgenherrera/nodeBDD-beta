"use strict";
let request = require('supertest-as-promised');
const lodash = require('lodash');
const api = require('../app');
const host = api;
const expect = require('chai').expect;

request = request(host);

describe('Ruta de peliculas', () => {
	describe('una peticion a POST', () => {
		it('deberia crear un pelicula', (done) => {
			let movie = {
				title: "back to the future",
				year: "1985"
			};
			request
				.post('/movie')
				.set('Accept', 'application/json')
				.send(movie)
				.expect(201)
				.expect('content-type', /application\/json/)
				.end((err, res) => {
					let body = res.body;

					expect(body).to.have.property('movie');
					let movie = body.movie;

					expect(movie).to.have.property('title', 'back to the future');
					expect(movie).to.have.property('year', '1985');
					expect(movie).to.have.property('_id');

					done(err);
				});
		});
	});
});

/*--------- Test for /movie/ ---------*/
describe('una peticion Get', function() {
	describe('deberia obtener todas las peliculas', function() {
		it('deberia crear un pelicula', (done) => {
			let movie_id;
			let movie2_id;
			let movie = {
				title: "back to the future",
				year: "1985"
			};
			let movie2 = {
				title: 'back to the future 2',
				year: "1989"
			};


			request
				.post('/movie')
				.set('Accept', 'application/json')
				.send(movie)
				.expect(201)
				.expect('content-type', /application\/json/)
			.then((res) => {
					movie_id = res.body.movie._id;

					return request
						.post('/movie')
						.set('Accept', 'application/json')
						.send(movie2)
						.expect(201)
						.expect('content-type', /application\/json/);
				})
			.then(function(res) {
					movie2_id = res.body.movie._id;

					return request
						.get('/movie')
						.set('Accept', 'application/json')
						.expect(200)
						.expect('content-type', /application\/json/);
				}, done)
			.then(function(res) {
					let body = res.body;

					expect(body).to.have.property('movies');
					expect(body.movies).to.be.an('array')
						.and.to.have.length.above(2);

					let movies = body.movies;
					movie = lodash.find(movies,{_id: movie_id});
					movie2 = lodash.find(movies, {
						_id: movie2_id
					});

					expect(movie).to.have.property('_id', movie_id);
					expect(movie).to.have.property('title', 'back to the future');
					expect(movie).to.have.property('year', '1985');

					expect(movie2).to.have.property('_id', movie2_id);
					expect(movie2).to.have.property('title', 'back to the future 2');
					expect(movie2).to.have.property('year', '1989');

					done();
			}, done);
		});
	});

	/*--------- Test for Get: movie/:id ---------*/
	describe('Peticion Get  movie/:id',function(){
		it('deberia devolver una sola pelicula',function(getDone){
			var movie_id;
			var movie= {
				title: "Her",
				year: "2013",
			};

			request
				.post('/movie')
				.set('Accept','application/json')
				.send(movie)
				.expect(201)
				.expect('Content-type',/application\/json/)
			.then(function(res){
				movie_id = res.body.movie._id;

				return request
					.get('/movie/' + movie_id)
					.set('Accept','application/json')
					.expect(200)
					.expect('Content-type',/application\/json/);
			})
			.then((res)=>{
				let body = res.body;

				expect(body).to.have.property('movie');
				let movie = body.movie;


				expect(movie).to.have.property('_id',movie_id);
				expect(movie).to.have.property('title','Her');
				expect(movie).to.have.property('year','2013');

				return getDone();
			});
			return getDone();
		});
	});
	
	/*--------- Test for Put: movie/:id ---------*/
	describe('Peticion Put: movie/:id',function(){
		it('Deberia editar una pelicula',function(putDone){
			var movie_id;
			var movie= {
				title: "Pulp fiction",
				year: "1993",
			};

			request
				.post('/movie')
				.set('Accept','application/json')
				.send(movie)
				.expect(201)
				.expect('Content-type',/application\/json/)
			.then(function(res){
				movie_id = res.body.movie._id;

				return request
					.put('/movie/' + movie_id)
					.set('Accept','application/json')
					.send(movie)
					.expect(200)
					.expect('Content-type',/application\/json/);
			})
			.then((res)=>{
				let body = res.body;


				expect(body).to.have.property('movie');
				let movie = body.movie;


				expect(movie).to.have.property('_id',movie_id);
				expect(movie).to.have.property('title','Pulp fiction');
				expect(movie).to.have.property('year','1993');

				return putDone();
			});
			return putDone();
		});
	});

	/*--------- Test for Get: movie/:id ---------*/
	describe('Peticion Delete: movie/:id',function(){
		it('Deberia eliminar una pelicula',function(delDone){
			var movie_id;
			var movie= {
				title: "Pulp fiction",
				year: "1993",
			};

			request
				.post('/movie')
				.set('Accept','application/json')
				.send(movie)
				.expect(201)
				.expect('Content-type',/application\/json/)
			.then(function(res){
				movie_id = res.body.movie._id;

				return request
					.delete('/movie/' + movie_id)
					.set('Accept','application/json')
					.expect(400)
					.expect('Content-type',/application\/json/);
			})
			.then((res)=>{
				let body = res.body;


				expect(body).to.be.empty;
				let movie = body.movie;

				delDone();
			});
			return delDone();
		});
	});
});