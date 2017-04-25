const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../lib/teas');
const connect = require('../lib/connect');

const request = chai.request(app);

describe('app', () => {

    const DB_TEST_URI = 'mongodb://localhost:27017/testTeas';

    before(() => connect.connect(DB_TEST_URI));
    before(() => connect.db.dropDatabase());
    after(() => connect.close());

    const bombTea = {
        name: 'amazing tea'
    };

    describe('POST', () => {

        it('saves a tea at /testTeas', () => {
            return request
                .post('/teas')
                .send(bombTea)
                .then(res => res.body)
                .then(savedTea => {
                    assert.ok(savedTea._id);
                    bombTea._id = savedTea._id;
                    assert.deepEqual(savedTea, bombTea);
                });
        });
    });

    describe('GET', () => {

        it('gets all teas at /testTeas', () => {
            return request
                .get('/teas')
                .then(res => res.body)
                .then(teas => assert.equal(teas, bombTea));
        });

    });

});
