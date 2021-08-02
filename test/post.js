process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');
const mysql = require("mysql");
const params = require('../dbconfig.js');
const app = require('../index.js');

describe('POST /registrar-compra', () => {
 
  it('OK, registrar compra', (done) => {
    request(app).post('/registrar-compra')
      .send({ idproducto: 1, cantidad: 1, fecha:'2021-08-01' })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('status');
        expect(body).to.contain.property('id');
        expect(body).to.contain.property('message');
        done();
      })
      .catch((err) => done(err));
  });

  it('Error, no se puede comprar mas de 30 items al mes', (done) => {
    request(app).post('/registrar-compra')
      .send({ idproducto: 1, cantidad: 31, fecha:'2021-08-01' })
      .then((res) => {
        const body = res.body;
        expect(body.status)
          .to.equal(false)
        done();
      })
      .catch((err) => done(err));
  });
})