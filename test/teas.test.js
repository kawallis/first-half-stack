const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../lib/teas');
const connect = require('../lib/connect');

const request = chai.request(app);

describe('app', () => {

    const DB_TEST_URI = 'mongodb://localhost:27017/test-teas';

    before(() => connect.connect(DB_TEST_URI));
    before(() => connect.db.dropDatabase());
    after(() => connect.close());

    const bombTea = {
        name: 'amazing tea'
    };

    describe('POST', () => {

        it('saves a tea at /teas', () => {
            return request
                .post('/tea')
                .send(bombTea)
                .then(res => res.body)
                .then(savedTea => {
                    assert.isOK(savedTea._id);
                    bombTea._id = savedTea._id;
                    assert.deepEqual(savedTea, bombTea);
                });                
        });
    });

    describe('GET', () => {


        it('saves a tea at /teas', () => {
            return request
                .get('/teas')
                .then(res => res.text)
                .then(text => assert.equal(text, bombTea));
        });

    });

});
