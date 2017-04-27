const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../lib/app');
const connection = require('../lib/connect');
const request = chai.request(app);

const testBike = { make: 'Trek', type: 'road' };
const falseId = '58f9184cbf2107d41aba7679';

describe('POST', () => {
  
  const DB_URI = 'mongodb://localhost:27017/bicycles-test';

  before(() => connection.connect(DB_URI));
  before(() => connection.db.dropDatabase());
  after(() => connection.close());

  it('saves a bicycle', () => {
    return request
      .post('/bicycles')
      .send(testBike)
      .then(res => res.body)
      .then(res => {
        testBike._id = res._id;
        assert.ok(res._id);
      })
      .catch(err => console.log(err)); // eslint-disable-line
  });

  describe('GET', () => {

    it('GET /bicycles returns an array of resources in the database', () => {
      return request
        .get('/bicycles')
        .then(res => res.body)
        .then(res => assert.ok(res[0]._id))
        .catch(err => console.log(err)); // eslint-disable-line
    });
  });

  it('GET /bicycles/:id returns that document', () => {
    return request
      .get(`/bicycles/${testBike._id}`)
      .then(res => res.body)
      .then(res => assert.deepEqual(res, testBike));
  });

  it('GET /bicycles/:id returns 404 if document does not exist', () => {
    return request
      .get(`/bicycles/${falseId}`)
      .then(() => {
        throw new Error('successful status code not expected');
      },
      res => res.status, 404);
  });
  
});
