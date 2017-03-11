"use strict";
let request = require('supertest-as-promised');
const api = require('../app');
const host = api;
const expect = require('chai').expect;

request = request(host);

describe('Ruta indice, Hola Mundo',()=>{
	describe('GET /',()=>{
		it('deberia regresar un hola mundo',(done)=>{
			request
				.get('/')
				.set('Accept', 'application/json')
				.expect(200)
				.expect('content-type',/application\/json/)
				.end((err,res)=>{
					let body = res.body;
					expect(body).to.have.property('message','hola mundo');
					done(err);
				});
		});
	});
});