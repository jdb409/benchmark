const db = require('./conn');
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;
const Company = require('./Company')

const Candidate = db.define('candidate', {
    candidate_id: {
        type: Sequelize.INTEGER
    },
    communication_score: {
        type: Sequelize.INTEGER
    },
    coding_score: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING,
    },
    company_id: {
        type: Sequelize.INTEGER
    }
})

//Get count of similar candidates
Candidate.findSimilar = (candidate, similarCompanies) => {
    return Candidate.findAll({
        where: {
            title: candidate.title,
            company_id: {
                [Op.in]: similarCompanies
            }
        }
    })
}

Candidate.calculatePercentile = (candidate, similar, type) => {
    //get all with score less than candidates.  chose not to include equal scores
    const getSmaller = similar.filter(sim => {
        return candidate[type] > sim[type];
    })
    const percentile = Math.floor((getSmaller.length / similar.length) * 100);
    return percentile;
}


//Get candidates percentile
Candidate.getPerecentiles = (candidateId) => {
    let candidate;

    return Candidate.findOne({
        where: { candidate_id: candidateId }
    })
        .then(_candidate => {
            candidate = _candidate;
            //find similar companies
            return Company.findSimilar(candidate.company_id)
        })
        .then(similarCompanies => {
            //find similar candidates
            return Candidate.findSimilar(candidate, similarCompanies)
        })
        .then(similar => {
            //calculate percentiles    
            const codingPercentile = Candidate.calculatePercentile(candidate, similar, 'coding_score')
            const communicationPercentile = Candidate.calculatePercentile(candidate, similar, 'communication_score')
            console.log(codingPercentile, communicationPercentile)
            return {codingPercentile, communicationPercentile, candidate}
        })
}




module.exports = Candidate;