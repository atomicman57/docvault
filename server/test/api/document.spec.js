import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';
import { User, Role } from '../../models';
import TestData from '../TestData/TestData';

const {
  TestUser1,
  TestUser2,
  admin,
  regularUser,
  regularUser2,
  TestRole,
  privateDocument,
  roleDocument
} = TestData;

let regularToken;
let regularToken2;
let adminToken;
let TestUser1Token;
let secondDoc;

const expect = chai.expect;
chai.use(chaiHttp);

describe('Documents', () => {
  before((done) => {
    Role.create(TestRole).then((role) => {
      TestUser1.roleId = role.id;
      TestUser2.roleId = role.id;
      User.bulkCreate([TestUser1, TestUser2]).then(() => {
        chai
          .request(server)
          .post('/users/login')
          .send({ email: TestUser1.email, password: 'Andela' })
          .end((err, res) => {
            TestUser1Token = res.body.token;
            done();
          });
      });
    });
  });
  after((done) => {
    User.destroy({
      where: { id: { $notIn: [1, 2] } }
    })
      .then(() =>
        Role.destroy({
          where: { id: { $notIn: [1, 2] } }
        })
      )
      .then(() => done());
  });
  before((done) => {
    chai
      .request(server)
      .post('/users/login')
      .send(regularUser)
      .end((err, res) => {
        regularToken = res.body.token;
        done();
      });
  });
  before((done) => {
    chai
      .request(server)
      .post('/users/login')
      .send(regularUser2)
      .end((err, res) => {
        regularToken2 = res.body.token;
        done();
      });
  });
  before((done) => {
    chai.request(server).post('/users/login').send(admin).end((err, res) => {
      adminToken = res.body.token;
      done();
    });
  });
  // POST /documents
  describe('/POST document', () => {
    it('can create a new document', (done) => {
      chai
        .request(server)
        .post('/documents')
        .send(privateDocument)
        .set({ authorization: regularToken })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys([
            'id',
            'title',
            'content',
            'access',
            'userId',
            'userRoleId',
            'updatedAt',
            'createdAt'
          ]);
          expect(res.body.userId).to.equal(1);
          expect(res.body.title).to.equal(privateDocument.title);
          privateDocument.docId = res.body.id;
          done();
        });
    });

    it('should return error message if document title is empty', (done) => {
      chai
        .request(server)
        .post('/documents')
        .send({ title: '', content: 'abc' })
        .set({ authorization: regularToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql('Fields cannot be empty');
          done();
        });
    });

    it('should return error if document title is less than 4', (done) => {
      chai
        .request(server)
        .post('/documents')
        .send({
          title: 'aaa',
          content: 'Testing Doc',
          access: 'public'
        })
        .set({ authorization: regularToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql(
            'Title and content length must be more than 4'
          );
          done();
        });
    });

    it('should return error if document title already exists', (done) => {
      chai
        .request(server)
        .post('/documents')
        .send(privateDocument)
        .set({ authorization: regularToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql('Title already exist');
          done();
        });
    });

    it('can create a new document and save the correct details', (done) => {
      chai
        .request(server)
        .post('/documents')
        .send(roleDocument)
        .set({ authorization: TestUser1Token })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys([
            'id',
            'title',
            'content',
            'access',
            'userId',
            'userRoleId',
            'updatedAt',
            'createdAt'
          ]);
          expect(res.body.title).to.equal(roleDocument.title);
          expect(res.body.userRoleId).to.equal(TestUser1.roleId);
          roleDocument.docId = res.body.id;
          done();
        });
    });
  });

  // GET /documents
  describe('/GET documents', () => {
    it('should return all role and public documents for an admin', (done) => {
      chai
        .request(server)
        .get('/documents')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.document).to.be.a('array');
          expect(res.body.document.length).to.equal(4);
          done();
        });
    });

    it('should return public documents for all users', (done) => {
      chai
        .request(server)
        .get('/documents')
        .set({ authorization: regularToken2 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.document).to.be.a('array');
          expect(res.body.document.length).to.equal(2);
          done();
        });
    });

    it('should return correct documents(s) for a query', (done) => {
      chai
        .request(server)
        .get('/documents?q=The Wolf')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.document).to.be.a('array');
          expect(res.body.document[0].title).to.eql('The Wolf and the Lamb');
          done();
        });
    });

    it('can limit the number of documents returned', (done) => {
      chai
        .request(server)
        .get('/documents?limit=2')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.document).to.be.a('array');
          expect(res.body.document.length).to.equal(2);
          secondDoc = res.body.document[1].id;
          done();
        });
    });

    it('should return error if the provided id is out of range', (done) => {
      chai
        .request(server)
        .get('/documents/9300000000')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql(
            'value "9300000000" is out of range for type integer'
          );
          done();
        });
    });

    it('can offset the starting position of returned documents', (done) => {
      chai
        .request(server)
        .get('/documents?offset=1')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.document).to.be.a('array');
          expect(res.body.document[0].id).to.eql(secondDoc);
          done();
        });
    });
  });

  // GET /documents/:id
  describe('/GET/:id document', () => {
    let TestUser2Token;
    before((done) => {
      chai
        .request(server)
        .post('/users/login')
        .send({ email: TestUser2.email, password: 'adetom' })
        .end((err, res) => {
          TestUser2Token = res.body.token;
          done();
        });
    });

    it('should return a particular document given an id', (done) => {
      chai
        .request(server)
        .get('/documents/1')
        .set({ authorization: regularToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.keys([
            'id',
            'title',
            'content',
            'access',
            'userId',
            'userRoleId',
            'updatedAt',
            'createdAt'
          ]);
          expect(res.body.title).to.equal('It Started With A Converse');
          done();
        });
    });

    it('should allow user to view a public document', (done) => {
      chai
        .request(server)
        .get('/documents/1')
        .set({ authorization: regularToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.title).to.equal('It Started With A Converse');
          done();
        });
    });

    it("should deny a user access to another user's private doc", (done) => {
      chai
        .request(server)
        .get(`/documents/${privateDocument.docId}`)
        .set({ authorization: TestUser1Token })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('You do not have access');
          done();
        });
    });

    it("should not allow a admin to view user's private document", (done) => {
      chai
        .request(server)
        .get(`/documents/${privateDocument.docId}`)
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql(
            'You do not have access to private documents'
          );
          done();
        });
    });

    it('should allow a user to access a document with the same role', (done) => {
      chai
        .request(server)
        .get(`/documents/${roleDocument.docId}`)
        .set({ authorization: TestUser2Token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.keys([
            'id',
            'title',
            'content',
            'access',
            'userId',
            'userRoleId',
            'updatedAt',
            'createdAt'
          ]);
          expect(res.body.title).to.equal(roleDocument.title);
          expect(res.body.userRoleId).to.equal(TestUser2.roleId);
          done();
        });
    });

    it('should send "Document not found" for an invalid id', (done) => {
      chai
        .request(server)
        .get('/documents/150')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Document not found');
          done();
        });
    });
  });

  // PUT /documents/:id
  describe('/PUT/:id document', () => {
    it('should allow a user to update his/her document', (done) => {
      chai
        .request(server)
        .put('/documents/2')
        .set({ authorization: regularToken })
        .send({ title: 'The End is near' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.title).to.eql('The End is near');
          done();
        });
    });
    it(`should deny access if a user tries to update 
    another user's document`, (done) => {
      chai
        .request(server)
        .put('/documents/2')
        .set({ authorization: TestUser1Token })
        .send({ title: 'And Once Again' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('You do not have access');
          done();
        });
    });
    it('should not allow a user to use an existing document title', (done) => {
      chai
        .request(server)
        .put(`/documents/${privateDocument.docId}`)
        .set({ authorization: regularToken })
        .send({ title: 'The End is near' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Title already exist');
          done();
        });
    });
  });

  // DELETE /documents/:id
  describe('/DELETE/:id document', () => {
    it("should deny access if a user tries to delete another user's document", (done) => {
      chai
        .request(server)
        .delete(`/documents/${roleDocument.docId}`)
        .set({ authorization: regularToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('You do not have access');
          done();
        });
    });
    it('should allow a user to delete his/her document', (done) => {
      chai
        .request(server)
        .delete(`/documents/${privateDocument.docId}`)
        .set({ authorization: regularToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should send "Document not found" given an invalid id', (done) => {
      chai
        .request(server)
        .delete('/documents/250')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Document not found');
          done();
        });
    });
  });
});
