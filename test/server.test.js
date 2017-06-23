const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('Actor api', () => {
  before(db.drop);

  let foonicorn = {
    name: 'James Franco', 
    color: 'black',
    age: 33
  };

  let id;

  it('initial /GET returns empty list', () => {
    return request.get('/unicorns')
            .then(req => {
              const unicorns = req.body;
              assert.deepEqual(unicorns, []);
            });
  });

  it('initial /post returns the posted object', () => {
    return request.post('/unicorns')
            .send(foonicorn)
            .then(req => {
              let unicorns = req.body;
              id = req.body._id;
              assert.deepEqual(unicorns.name, foonicorn.name);
              assert.deepEqual(unicorns.age, foonicorn.age);
              assert.deepEqual(unicorns.color, foonicorn.color);
            });
  });

  it('initial /get/id get unicorn by id', () => {
    return request.get(`/unicorns/${id}`)
            .then(req => {
              let unicorns = req.body;
              
              assert.deepEqual(unicorns.name, foonicorn.name);
              assert.deepEqual(unicorns.age, foonicorn.age);
              assert.deepEqual(unicorns.color, foonicorn.color);
            });
  });
});