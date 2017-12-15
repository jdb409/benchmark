const request = require('request')
const csv = require('csvtojson')

const db = require('./db')
const { Candidate, Company } = db;

//csv receievs a stream from the csv and processes each row before moving on to the next one

const seed = () => {
    csv()
        .fromStream(request.get('https://s3.amazonaws.com/simple-fractal-recruiting/score-records.csv'))
        .on('csv', (json) => {
            Candidate.create({
                candidate_id: json[0],
                communication_score: json[1],
                coding_score: json[2],
                title: json[3],
                company_id: json[4]

            }).catch(console.log)
        })
        .on('done', (error) => {
            if (error) console.log(error);
        })

    csv()
        .fromStream(request.get('https://s3.amazonaws.com/simple-fractal-recruiting/companies.csv'))
        .on('csv', (json) => {
            Company.create({
                company_id: json[0],
                fractal_index: json[1],
            }).catch(console.log)
        })
        .on('done', (error) => {
            if (error) console.log(error);
        })
}

db.db.sync({force: true})
.then(() => {
    seed();
})