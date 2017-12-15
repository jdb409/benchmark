const router = require('express').Router();
const { Candidate } = require('../db');

router.get('/:candidateId', (req, res, next) => {
    Candidate.getPerecentiles(req.params.candidateId)
        .then(can => {
            res.send(can)
        })
})

module.exports = router;