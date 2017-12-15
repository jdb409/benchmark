const { expect } = require('chai');
const { Candidate } = require('../server/db')
const { Company } = require('../server/db')

describe('Company model', () => {
  it('exists', () => {
    expect(Company).to.be.ok;
  })

  describe('Similar company method ', () => {
    it('can find similar companies', () => {
      return Company.findSimilar(1)
        .then(similar => {
          expect(similar.length).to.equal(3);
        })
    })

    it('will return 0 for companies without similar ones', () => {
      return Company.findSimilar(5)
        .then(similar => {
          expect(similar.length).to.equal(0);
        })
    })
  })
});

describe('Candidate model', () => {
  it('exists', () => {
    expect(Candidate).to.be.ok;
  })

  describe('findSimilar class method', () => {
    it('will get similar candidates, given a title and list of companies', () => {
      return Candidate.findSimilar({ title: 'Engineer' }, [2, 3, 4])
        .then(candidates => {
          expect(candidates.length).to.equal(19)
        })
    })
  })

  describe('calculatePercentile class method', () => {
    let candidates;
    beforeEach(() => {
      return Candidate.findSimilar({ title: 'Engineer' }, [2, 3, 4])
        .then((_candidates) => {
          candidates = _candidates;
        })
    });
    it('will provide percentile for type of score', () => {
      const result = Candidate.calculatePercentile({ coding_score: '170000' }, candidates, 'coding_score')
      expect(result).to.equal(63)
    })
    it('will work for either type', () => {
      const result = Candidate.calculatePercentile({ communication_score: '170000' }, candidates, 'communication_score')
      expect(result).to.equal(84)
    })
  })

  describe('getPercentiles class method', () => {
    it('will return an obj containing percentiles', () => {
      return Candidate.getPercentiles(898)
      .then(result => {
        expect(result.codingPercentile).to.be.greaterThan(0);
        expect(result.communicationPercentile).to.be.greaterThan(0);
      })
    })
  })
})