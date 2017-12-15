const db = require('./conn');
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

const Company = db.define('company', {
    company_id: {
        type: Sequelize.INTEGER
    },
    fractal_index: {
        type: Sequelize.FLOAT
    }
})

Company.findSimilar = (companyId) => {
    const getCompany = Company.findOne({
        where: {
            company_id: companyId
        }
    });

    const getOther = Company.findAll({
        //exclude current company
        where: {
            company_id: {
                [Op.ne]: companyId
            }
        }
    })
    return Promise.all([getCompany, getOther])
        .then(([company, others]) => {
            //filter out companies that are too different
            const similar = others.filter(other => {
                return Math.abs(company.fractal_index - other.fractal_index) < .15
            }).map(other => other.company_id)
            return similar;
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = Company;