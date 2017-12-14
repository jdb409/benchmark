const db = require('./conn');
const Candidate = require('./Candidate');
const Company = require('./Company');

//Each Candidate works for only one company
// Candidate.belongsTo(Company);

module.exports = {
    db,
    models: {
        Candidate, Company
    }
}