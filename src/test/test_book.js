const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../server.js');
const { Book, Member } = require('../models');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Book Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET /api/books', () => {
    it('should return all available books', (done) => {
      const mockBooks = [
        {
          code: 'JK-45',
          title: 'Harry Potter',
          author: 'J.K Rowling',
          stock: 1,
          borrowedBy: null,
        },
        // Add more mock books as needed
      ];

      sinon.stub(Book, 'findAll').resolves(mockBooks);

      chai
        .request(app)
        .get('/api/books')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.deep.equal(mockBooks);
          done();
        });
    });
  });

  describe('POST /api/books/borrow', () => {
    it('should allow a member to borrow a book', (done) => {
      const mockMember = { id: 1, penalty: false, borrowedBooksCount: 1 };
      const mockBook = {
        id: 1,
        borrowedBy: null,
        save: sinon.stub().resolves(),
      };

      sinon.stub(Member, 'findByPk').resolves(mockMember);
      sinon.stub(Book, 'findByPk').resolves(mockBook);
      sinon.stub(Book, 'count').resolves(1);

      chai
        .request(app)
        .post('/api/books/borrow')
        .send({ memberId: 1, bookId: 1 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property(
            'message',
            'Book borrowed successfully'
          );
          done();
        });
    });

    it('should not allow a member to borrow more than 2 books', (done) => {
      const mockMember = { id: 1, penalty: false, borrowedBooksCount: 2 };

      sinon.stub(Member, 'findByPk').resolves(mockMember);

      chai
        .request(app)
        .post('/api/books/borrow')
        .send({ memberId: 1, bookId: 1 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property(
            'error',
            'Member cannot borrow more than 2 books'
          );
          done();
        });
    });

    it('should not allow a member to borrow a book already borrowed by another member', (done) => {
      const mockMember = { id: 1, penalty: false, borrowedBooksCount: 1 };
      const mockBook = { id: 1, borrowedBy: 2 };

      sinon.stub(Member, 'findByPk').resolves(mockMember);
      sinon.stub(Book, 'findByPk').resolves(mockBook);

      chai
        .request(app)
        .post('/api/books/borrow')
        .send({ memberId: 1, bookId: 1 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property(
            'error',
            'Book is already borrowed by another member'
          );
          done();
        });
    });

    it('should not allow a member under penalty to borrow books', (done) => {
      const mockMember = { id: 1, penalty: true, borrowedBooksCount: 0 };

      sinon.stub(Member, 'findByPk').resolves(mockMember);

      chai
        .request(app)
        .post('/api/books/borrow')
        .send({ memberId: 1, bookId: 1 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property(
            'error',
            'Member is currently under penalty and cannot borrow books'
          );
          done();
        });
    });
  });

  describe('POST /api/books/return', () => {
    it('should allow a member to return a book', (done) => {
      const mockBook = {
        id: 1,
        borrowedBy: 1,
        borrowedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // Borrowed 6 days ago
        save: sinon.stub().resolves(),
      };
      const mockMember = {
        id: 1,
        penalty: false,
        save: sinon.stub().resolves(),
      };

      sinon.stub(Book, 'findByPk').resolves(mockBook);
      sinon.stub(Member, 'findByPk').resolves(mockMember);

      chai
        .request(app)
        .post('/api/books/return')
        .send({ memberId: 1, bookId: 1 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property(
            'message',
            'Book returned successfully'
          );
          done();
        });
    });

    it('should penalize a member for returning a book after 7 days', (done) => {
      const mockBook = {
        id: 1,
        borrowedBy: 1,
        borrowedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // Borrowed 8 days ago
        save: sinon.stub().resolves(),
      };
      const mockMember = {
        id: 1,
        penalty: false,
        save: sinon.stub().resolves(),
      };

      sinon.stub(Book, 'findByPk').resolves(mockBook);
      sinon.stub(Member, 'findByPk').resolves(mockMember);

      chai
        .request(app)
        .post('/api/books/return')
        .send({ memberId: 1, bookId: 1 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property(
            'message',
            'Book returned, but member is penalized for late return'
          );
          done();
        });
    });

    it('should not allow returning a book that was not borrowed by the member', (done) => {
      const mockBook = {
        id: 1,
        borrowedBy: 2, // Borrowed by another member
        borrowedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // Borrowed 6 days ago
        save: sinon.stub().resolves(),
      };
      const mockMember = {
        id: 1,
        penalty: false,
        save: sinon.stub().resolves(),
      };

      sinon.stub(Book, 'findByPk').resolves(mockBook);
      sinon.stub(Member, 'findByPk').resolves(mockMember);

      chai
        .request(app)
        .post('/api/books/return')
        .send({ memberId: 1, bookId: 1 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property(
            'error',
            'This book was not borrowed by the member'
          );
          done();
        });
    });
  });
});
