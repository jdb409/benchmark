const db = require('./conn');
const Sequelize = db.Sequelize;

const Company = db.define('company', {
    company_id: {
        type: Sequelize.INTEGER
    },
    fractal_index: {
        type: Sequelize.FLOAT
    }
})

module.exports = Company;