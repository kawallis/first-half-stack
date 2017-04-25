const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../lib/app');
const connection = require('../lib/connect');

const request = chai.request(app);
describe('Unicorns REST API', () => {

  const foonicorn = { name: 'brownie', color: 'brown' };
  const DB_URI = 'mongodb://localhost:27017/unicorns-test';
  
  before(() => connection.connect(DB_URI));
  before(() => connection.db.dropDatabase());
  after(() => connection.close());

  describe('GET /', () => {


    it('says Checkout These Unicorns Foolio', () => {
      return request
        .get('/')
        .then(res => (res.text))
        .then(text => assert.equal(text, 'Checkout These Unicorns Foolio'));
    });
  });

  describe('POST /unicorns', () => {

    it('saves the unicorn to the db', () => {
      return request
        .post('/unicorns')
        .send(foonicorn)
        .then(response => {
          return response.body;
        })
        .then(savedUnicorn => {
          assert.isOk(savedUnicorn._id);
          foonicorn._id = savedUnicorn._id;
          assert.deepEqual(savedUnicorn, foonicorn);
        });
    });
  });

  describe('GET /unicorns/:id', () => {

    it('returns unicorn by id', () => {
      return request
        .get(`/unicorns/${foonicorn._id}`)
        .then(res => {
          return res.text;
        })
        .then(savedUnicorn => {
          var onicorn = JSON.stringify(foonicorn);
          assert.deepEqual(savedUnicorn, onicorn);
        });
    });
  });

});





