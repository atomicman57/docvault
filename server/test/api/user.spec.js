import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../../models/';
import server from '../../../server';
// import { User, Role } from '../../models';
import TestData from '../TestData/TestData';

const {
  TestUser3,
  TestUser2,
  invalidUserDetails,
  admin,
  regularUser,
  thirdUser
} = TestData;
let regularToken, adminToken, secondId, TestUser3Token;

const expect = chai.expect;
chai.use(chaiHttp);

describe('User', () => {
  after((done) => {
    models.User.destroy({ where: { id: { $notIn: [1, 2] } } });
    done();
  });

  // POST /users/login
  describe('/POST/login user', () => {
    it('can login a user and return a token', (done) => {
      chai.request(server).post('/users/login').send(admin).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys(['token', 'message', 'userInfo']);
        expect(res.body.message).to.eql('Login Sucessful here is ur details:');
        done();
      });
    });

    it('should fail for invalid user credentials', (done) => {
      chai
        .request(server)
        .post('/users/login')
        .send({ email: admin.email, password: 'invalidpass' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Wrong Password');
          done();
        });
    });
  });

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

  // POST /users
  describe('/POST user', () => {
    it('can create a new user', (done) => {
      chai.request(server).post('/users').send(TestUser3).end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys(['userDetails', 'message', 'token']);
        expect(res.body.message).to.eql(
          'Sign up Sucessful here is ur details:'
        );
        TestUser3Token = res.body.token;
        done();
      });
    });

    it('should fail if email already exists', (done) => {
      chai.request(server).post('/users').send(TestUser3).end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.eql('User already exists');
        done();
      });
    });

    it('should fail if username alreay exists', (done) => {
      TestUser2.username = TestUser3.username;
      chai.request(server).post('/users').send(TestUser2).end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.eql('User already exists');
        done();
      });
    });

    // it('should not allow the creation of a user with admin role', (done) => {
    //   TestUser2.roleId = '1';
    //   chai.request(server)
    //   .post('/users')
    //   .send(TestUser2)
    //   .end((err, res) => {
    //     expect(res.status).to.equal(401);
    //     expect(res.body.message).to.eql('Invalid roleId');
    //     done();
    //   });
    // });

    it('should return a token after creating a user', (done) => {
      chai.request(server).post('/users').send(thirdUser).end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql(
          'Sign up Sucessful here is ur details:'
        );
        done();
      });
    });

    it('should fail for invalid user details', (done) => {
      chai
        .request(server)
        .post('/users')
        .send(invalidUserDetails)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.eql('Email is not rightly formatted');
          done();
        });
    });
  });

  // GET /users
  describe('/GET users', () => {
    it('should return all users', (done) => {
      chai
        .request(server)
        .get('/users')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.users).to.be.a('array');
          expect(res.body.users.length).to.be.greaterThan(2);
          done();
        });
    });

    it('should deny access if user is not admin', (done) => {
      chai
        .request(server)
        .get('/users')
        .set({ authorization: regularToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql(
            'Sorry, You do not have sufficient permission'
          );
          done();
        });
    });

    it('should deny access if no token was provided', (done) => {
      chai.request(server).get('/users').end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('No token provided');
        done();
      });
    });

    it('should return correct user(s) for a query', (done) => {
      chai
        .request(server)
        .get('/users?q=user')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.users).to.be.a('array');
          expect(res.body.users[0].username).to.eql('user');
          done();
        });
    });

    it('can limit the number of users returned', (done) => {
      chai
        .request(server)
        .get('/users?limit=2')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.users).to.be.a('array');
          expect(res.body.users.length).to.equal(2);
          secondId = res.body.users[1].id;
          done();
        });
    });

    it('can offset the starting position of returned data', (done) => {
      chai
        .request(server)
        .get('/users?offset=1')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.users).to.be.a('array');
          expect(res.body.users[0].id).to.eql(secondId);
          done();
        });
    });
  });

  // GET /users/:id
  describe('/GET/:id user', () => {
    it('should return a particular user given an id', (done) => {
      chai
        .request(server)
        .get('/users/2')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          //   expect(res.body).to.eql({
          //     id: 2,
          //     username: 'montaro',
          //     fullName: 'Tony Montaro',
          //     email: 'bossmontaro@gmail.com',
          //     about: 'I love playing chess.',
          //     roleId: 2
          //   });
          done();
        });
    });

    it('should deny access if no token was provided', (done) => {
      chai.request(server).get('/users/2').end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('No token provided');
        done();
      });
    });

    it('should send "No User Found" for invalid id', (done) => {
      chai
        .request(server)
        .get('/users/250')
        .set({ authorization: regularToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('No User Found');
          done();
        });
    });

    it('should fail if the provided id is out of range', (done) => {
      chai
        .request(server)
        .get('/users/3000000000')
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
    it('should allow a user to update his/her details', (done) => {
      chai
        .request(server)
        .put('/users/1')
        .set({ authorization: regularToken })
        .send({ firstname: 'Danger' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.eql({
            id: 1,
            username: 'user',
            firstname: 'Danger',
            lastname: 'Mylast',
            email: 'user@dms.com',
            roleId: 1
          });
          done();
        });
    });

    it("should allow admin to update a user's details", (done) => {
      chai
        .request(server)
        .put('/users/2')
        .set({ authorization: adminToken })
        .send({ firstname: 'Developer' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.eql({
            id: 2,
            username: 'Admin',
            firstname: 'Developer',
            lastname: 'MyAdminn',
            email: 'admin@dms.com',
            roleId: 2,
          });
          done();
        });
    });

    it('should not allow a user to use an existing email', (done) => {
      chai
        .request(server)
        .put('/users/1')
        .set({ authorization: regularToken })
        .send({ email: TestUser3.email })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Email already exist');
          done();
        });
    });

    it("should deny access if a user tries to update another user's profile", (done) => {
      chai
        .request(server)
        .put('/users/2')
        .set({ authorization: regularToken })
        .send({ firstname: 'AmChanged' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('You do not have access');
          done();
        });
    });
  });

  // POST /users/logout
  describe('/POST/logout user', () => {
    it('can logout a user', (done) => {
      chai.request(server).post('/users/logout').send(admin).end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('User logged out');
        done();
      });
    });
  });

  // DELETE /users/:id
  describe('/DELETE/:id user', () => {
    let thirdUserToken;
    before((done) => {
      chai
        .request(server)
        .post('/users/login')
        .send(thirdUser)
        .end((err, res) => {
          thirdUserToken = res.body.token;
          thirdUser.id = res.body.userInfo.id;
          done();
        });
    });

    it("should deny access if a user tries to delete another user's profile", (done) => {
      chai
        .request(server)
        .delete('/users/2')
        .set({ authorization: regularToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('You do not have access');
          done();
        });
    });

    it('should allow user to delete his/her profile', (done) => {
      chai
        .request(server)
        .delete(`/users/${thirdUser.id}`)
        .set({ authorization: thirdUserToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Deleted');
          done();
        });
    });

    it('should send "No User Found" for invalid id', (done) => {
      chai
        .request(server)
        .delete('/users/250')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('No User Found');
          done();
        });
    });
  });

  // GET /users/:id/documents
  describe('/GET/:id/documents user', () => {
    it("should return a user's document(s) when passed user's id", (done) => {
      chai
        .request(server)
        .get('/users/1/documents')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.document).to.be.a('array');
        //   expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });

    it('should send "No User Found" for invalid id', (done) => {
      chai
        .request(server)
        .get('/users/250/documents')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('No User Found');
          done();
        });
    });

    it('should fail if the provided id is out of range', (done) => {
      chai
        .request(server)
        .get('/users/12000000000/documents')
        .set({ authorization: adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql(
            'value "12000000000" is out of range for type integer'
          );
          done();
        });
    });
  });
});
