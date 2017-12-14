const db = require('./conn');
const Sequelize = db.Sequelize;

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
module.exports = Candidate;