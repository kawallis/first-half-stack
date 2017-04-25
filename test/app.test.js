const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const app = require('../lib/app');
const connection = require('../lib/connect');

const request = chai.request(app);

describe('Puppies DB /', () => {

  const DB_URI = 'mongodb://localhost:27017/unicorns-test';
  before(() => connection.connect(DB_URI));
  before(() => connection.db.dropDatabase());
  after(() => connection.close());

  function savePom(pom) {
    return request
      .post('/puppies')
      .send(pom);
  }

  const gibbs = {
    name: 'Gibbs',
    color: 'white'
  };

  const ginger = {
    name: 'Ginger',
    color: 'red'
  };

  describe('POST /', () => {

    it('saves a pom (Gibbs)', () => {
      return savePom(gibbs)
        .then(res => res.body)
        .then(savedPom => {
          assert.isOk(savedPom._id);
          gibbs._id = savedPom._id;
          assert.deepEqual(savedPom, gibbs);
        });
    });

    it('saves a pom (Ginger)', () => {
      return savePom(ginger)
        .then(res => res.body)
        .then(savedPom => {
          assert.isOk(savedPom._id);
          ginger._id = savedPom._id;
          assert.deepEqual(savedPom, ginger);
        });
    });

  });

  describe('GET /', () => {
    it('find poms db', () => {
      connection.db.collection('poms');
      return request
        .get('/puppies')
        .then(res => {
          return res.body;
        })
        .then(poms => {
          assert.equal(poms[0].name, 'Gibbs');
          assert.equal(poms.length, 2);
        });
    });

    it('finds a pom by id', () => {
      connection.db.collection('poms');
      return request.get(`/puppies/${ginger._id}`)
        .then(res => res.body)
        .then(pom => assert.equal(pom.name, ginger.name));
    });
  });

  describe('UPDATE /', () => {
    it('updates an object', () => {
      connection.db.collection('poms');
      gibbs.color = 'rainbow';
      return request.put(`/puppies/${gibbs._id}`)
        .send(gibbs)
        .then(res => res.body)
        .then(pom => assert.equal(pom.color, gibbs.color));
    });

  });

});