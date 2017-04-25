const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const app = require('../lib/app');
const connect = require('../lib/helpers/connect');

const request = chai.request(app);

describe('Puppies DB /', () => {

  function savePom(pom) {
    return request
      .post('/puppies')
      .send(pom);
  }

  const gibbs = {
    name: 'Gibbs',
    color: 'white'
  };

  describe('POST /', () => {

    it('saves a pom', () => {
      return savePom(gibbs)
        .then(res => res.body)
        .then(savedPom => {
          assert.isOk(savedPom._id);
          gibbs._id = savedPom._id;
          assert.deepEqual(savedPom, gibbs);
        });
    });

  });

  describe('GET /', () => {
    it('find poms db', () => {
      connect.db.collection('poms');
      return request
        .get('/puppies')
        .then(res => {
          console.log(res.body);
          return res.body;
        })
        .then(pom => assert.deepEqual(pom, null));
    });

    it('finds a pom by id', () => {
      connect.db.collection('poms');
      return request.get(`/puppies/:${gibbs._id}`)
        .then(res => res.body)
        .then(pom => assert.deepEqual(pom, gibbs));
    });
  });

});