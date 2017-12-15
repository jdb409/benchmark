const router = require('express').Router();
const { Candidate } = require('../db');

router.get('/:candidateId', (req, res, next) => {
    Candidate.getPercentiles(req.params.candidateId)
        .then(can => {
            res.send(can)
        })
        .catch(err => {
            res.send(err)
        });
})

router.use((err, req, res, next) => {
    console.log(err);
})

module.exports = router;