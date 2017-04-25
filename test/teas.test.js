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

    const badTea = {
        name: 'shitty tea'
    };

    describe('POST', () => {

        before(() => {
            return request
            .post('/teas')
            .send(badTea)
            .then(res => res.body)
            .then(savedTea => badTea._id = savedTea._id);
        });

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
                .then(teas => {
                    assert.equal(teas[1].name, bombTea.name);
                    assert.equal(teas.length, 2);
                });

        });

        it('gets a tea by id', () => {
            return request
                .get(`/teas/${badTea._id}`)
                .then(res => res.body)
                .then(tea => {
                    assert.equal(tea.name, badTea.name);
                });
        });

    });

    describe('UPDATE', () => {

        it('updates an item in db with put', () => {
            badTea.name = 'lipton';
            return request 
                .put(`/teas/${badTea._id}`)
                .send(badTea)
                .then(res => res.body)
                .then(updatedTea => {
                    assert.equal(updatedTea.name, 'lipton');
                });
        });
    });
});
