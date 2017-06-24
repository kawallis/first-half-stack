const Router = require('express').Router;
const router = Router();
const Unicorn = require('../models/unicorn');

router
    .get('/', (req, res, next) => {
        Unicorn.find()
            .then(unicorns => res.send(unicorns))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        Unicorn.findById(req.params.id)
            .then(unicorn => {
                if (!unicorn) return res.status(404).send(`${id} is not a unicorn`);
                else res.send(unicorn);
            })
            .catch(next);
    })

    .post('/', (req, res, next) => {
        new Unicorn(req.body).save()
            .then(user => res.send(user))
            .catch(next);
    });


module.exports = router;