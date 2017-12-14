const db = require('./conn');
const Sequelize = db.Sequelize;
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

//takes a candidates_id and returns precentile for their coding and comm skills
//compares to others at the SAME TITLE and SIMILAR COMPANIES

//similar companies found = 
//Math.abs(company_1.fractal_index - company_2.fractal_index) < .15

//First we get candidate
//we get cand's company and use it to find other similar companies

//we create a sep function, and pass in their company
//find all other companies, loop through them and filter using formula.
//return filtered list

//get all candidates that work at those companies have the same title. 

//then calculate percentile in another function
//get all with scores lower than candidate/total * 100;


Candidate.getPerecentiles = (candidateId) => {
    return Candidate.findOne({
        where: {
            candidate_id: candidateId
        }
    })
    .then(candidate => {
        return Company.findSimilar(candidate.company_id)
    })
    .then(company => {
        return company;
    })
}



module.exports = Candidate;