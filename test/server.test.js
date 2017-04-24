const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../lib/app');
// const connection = require('../lib/connect');

const request = chai.request(app);

describe('GET /', () => {


  it('says Checkout These Unicorns Foolio', () => {
    return request
      .get('/')
      .then(res => (res.text))
      .then(text => assert.equal(text, 'Checkout These Unicorns Foolio'));
  });
});