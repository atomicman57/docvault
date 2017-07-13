import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';
import TestData from '../TestData/TestData';
import { Role } from '../../models';

const { admin, regularUser, TestRole } = TestData;
let regularToken, adminToken;

const expect = chai.expect;
chai.use(chaiHttp);
describe('Role', () => {
  before((done) => {
    chai.request(server).post('/users/login').send(admin).end((err, res) => {
      adminToken = res.body.token;
      done();
    });
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
  after((done) => {
    Role.destroy({
      where: { id: { $notIn: [1, 2] } }
    }).then(() => done());
  });
  // GET /roles
  describe('/GET roles', () => {
    it('should return all roles', (done) => {
      chai
        .request(server)
        .get('/roles')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });
  });

  // POST /roles
  describe('/POST role', () => {
    it('should allow an admin to create a new role', (done) => {
      chai
        .request(server)
        .post('/roles')
        .set({ authorization: adminToken })
        .send(TestRole)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys([
            'id',
            'title',
            'createdAt',
            'updatedAt'
          ]);
          expect(res.body.title).to.eql('Fellow');
          TestRole.roleId = res.body.id;
          done();
        });
    });

    it('should fail if role alreay exists', (done) => {
      chai
        .request(server)
        .post('/roles')
        .set({ authorization: adminToken })
        .send(TestRole)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql('Role already exist');
          done();
        });
    });

    it('should deny access if user is not admin', (done) => {
      chai
        .request(server)
        .post('/roles')
        .set({ authorization: regularToken })
        .send({ title: 'P&C' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql(
            'Sorry, You do not have sufficient permission'
          );
          done();
        });
    });
  });

  // GET /roles/:id
  describe('/GET/:id role', () => {
    it('should return a role given an id', (done) => {
      chai
        .request(server)
        .get('/roles/2')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });

    it('should send "Role Not Found" for invalid id', (done) => {
      chai
        .request(server)
        .get('/roles/250')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Role Not Found');
          done();
        });
    });

    it('should fail if the provided id is out of range', (done) => {
      chai
        .request(server)
        .get('/roles/3000000000')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql(
            'value "3000000000" is out of range for type integer'
          );
          done();
        });
    });
  });

  // PUT /users/:id
  describe('/PUT/:id user', () => {
    it('should allow an admin to edit a role', (done) => {
      chai
        .request(server)
        .put(`/roles/${TestRole.roleId}`)
        .set({ authorization: adminToken })
        .send({ title: 'Council' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.title).to.eql('Council');
          done();
        });
    });

    it('should deny access if user is not an admin', (done) => {
      chai
        .request(server)
        .put(`/roles/${TestRole.roleId}`)
        .set({ authorization: regularToken })
        .send({ title: 'Management' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql(
            'Sorry, You do not have sufficient permission'
          );
          done();
        });
    });

    it('should not allow a user to use an existing role name', (done) => {
      chai
        .request(server)
        .put('/roles/2')
        .set({ authorization: adminToken })
        .send({ title: 'Regular' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Role already exist');
          done();
        });
    });

    it('should send "Role not found" for invalid id', (done) => {
      chai
        .request(server)
        .put('/roles/500')
        .set({ authorization: adminToken })
        .send({ title: 'Shipping' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Role Not Found');
          done();
        });
    });

    it('should fail if the provided id is out of range', (done) => {
      chai
        .request(server)
        .put('/roles/3000000000')
        .set({ authorization: adminToken })
        .send({ name: 'team7' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql(
            'value "3000000000" is out of range for type integer'
          );
          done();
        });
    });
  });

  // DELETE /roles/:id
  describe('/DELETE/:id role', () => {
    it('should allow admin to delete a role', (done) => {
      chai
        .request(server)
        .delete(`/roles/${TestRole.roleId}`)
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should send "Role not found" for invalid id', (done) => {
      chai
        .request(server)
        .delete('/roles/250')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Roles Not Found');
          done();
        });
    });

    it('should fail if the provided id is out of range', (done) => {
      chai
        .request(server)
        .delete('/roles/3000000000')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql(
            'value "3000000000" is out of range for type integer'
          );
          done();
        });
    });
  });
});
