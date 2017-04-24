const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const app = require('../lib/app');
const connect = require('../lib/helpers/connect');

const request = chai.request(app);

describe('GET', () => {
  
  it('find poms db', () => {
    return request
    .get('/puppies')
    .then(res => {
      console.log(res.body);
      return res.body;
    })
    .then(pom => assert.deepEqual(pom, 'Ginger'));
  });

});