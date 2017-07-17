import chai from 'chai';
import httpMocks from 'node-mocks-http';
import events from 'events';
import chaiHttp from 'chai-http';
import server from '../../../server';
import TestData from '../TestData/TestData';
import Authentication from '../../middleware/Authentication';

const { regularUser } = TestData;
let regularToken;

const expect = chai.expect;
const responseEvent = () =>
  httpMocks.createResponse({ eventEmitter: events.EventEmitter });
chai.use(chaiHttp);

describe('Authentication', () => {
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

  describe('CheckToken', () => {
    it('should grant access if token is valid', (done) => {
      const response = responseEvent();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { authorization: regularToken }
      });

      const callback = () => {
        expect(req.decoded.id).to.equal(1);
        expect(req.decoded.username).to.equal('user');
        done();
      };
      Authentication.checkToken(req, response, callback);
      expect(response._getData().message).to.equal(undefined);
    });

    it('should deny access if no token was provided', (done) => {
      const response = responseEvent();
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users'
      });

      const callback = () => {
        expect(response._getData().message).to.equal('No token provided');
      };
      Authentication.checkToken(request, response, callback);
      done();
    });

    it('should deny access if token is invalid', (done) => {
      const response = responseEvent();
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { authorization: 'anythingforyou' }
      });

      const callback = () => {
        expect(response._getData().message).to.equal(
          'Failed to authenticate token'
        );
        done();
      };
      Authentication.checkToken(request, response, callback);
      done();
    });
  });

  describe('allowAdmin', () => {
    it('should grant access to an admin', (done) => {
      const response = responseEvent();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/users'
      });
      req.decoded = { roleId: 2 };

      const callback = () => {
        expect(req.decoded.roleId).to.equal(2);
        done();
      };
      Authentication.allowAdmin(req, response, callback);

      expect(response._getData().message).to.equal(undefined);
    });

    it('should deny access if the user is not an admin', (done) => {
      const response = responseEvent();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/users'
      });
      req.decoded = { roleId: 1 };

      const callback = () => {
        expect(response._getData().message).to.equal(
          'Sorry, You do not have sufficient permission'
        );
      };
      Authentication.allowAdmin(req, response, callback);
      done();
    });
  });

  describe('allowUserOrAdmin', () => {
    it('should grant access to an admin', (done) => {
      const response = responseEvent();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        params: { id: 2 }
      });
      req.decoded = { roleId: 1 };

      const callback = () => {
        expect(req.decoded.roleId).to.equal(2);
        done();
      };
      Authentication.allowUserOrAdmin(req, response, callback);
      expect(response._getData().message).to.equal(undefined);
      done();
    });

    it('should grant access to the profile owner', (done) => {
      const response = responseEvent();
      response.locals = { decoded: { roleId: 2, id: 2 } };
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        params: { id: 2 }
      });

      const callback = () => {
        expect(req.decoded.id).to.equal(2);
        done();
      };
      Authentication.allowUserOrAdmin(req, response, callback);
      expect(response._getData().message).to.equal(undefined);
      done();
    });

    it('should deny access if the user is not an admin or profile owner', (done) => {
      const response = responseEvent();
      response.locals = { decoded: { roleId: 2 } };
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        params: { id: 2 }
      });

      const callback = () => {
        expect(response._getData().message).to.equal('You do not have access');
        done();
      };
      Authentication.allowUserOrAdmin(request, response, callback);
      done();
    });
  });
});
