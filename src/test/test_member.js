const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../server.js');
const { Book, Member } = require('../models');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Member Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET /api/members', () => {
    it('should return all members and their borrowed book counts', (done) => {
      const mockMembers = [
        { id: 1, name: 'Angga', borrowedBooksCount: 1 },
        { id: 2, name: 'Ferry', borrowedBooksCount: 0 },
        // Add more mock members as needed
      ];

      sinon.stub(Member, 'findAll').resolves(mockMembers);

      chai
        .request(app)
        .get('/api/members')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.deep.equal(mockMembers);
          done();
        });
    });
  });

  // Add more test cases for different scenarios if needed
});
