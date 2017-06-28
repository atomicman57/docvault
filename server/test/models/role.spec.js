import chai from 'chai';
import { Role } from '../../models/';
import testData from '../TestData/TestData';

const { TestRole } = testData;
let updateRoleId;
const expect = chai.expect;

describe('Role Model', () => {
  describe('Create Role', () => {
    it('should create a role', (done) => {
      Role.create(TestRole)
        .then((role) => {
          expect(role.dataValues.title).to.equal(TestRole.title);
          updateRoleId = role.dataValues.id;
          done();
        });
    });

    it('should fail when role name already exist', (done) => {
      Role.create({ title: 'Fellow' })
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Role already exist');
          expect(error.errors[0].type).to.equal('unique violation');
          done();
        });
    });

    it('should fail if name was not provided', (done) => {
      Role.create({ title: '' })
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Title cannot be empty');
          done();
        });
    });

    it('should fail when the name of a role is null', (done) => {
      Role.create({ title: null })
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('title cannot be null');
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].value).to.equal(null);
          done();
        });
    });
  });

  describe('Update Role', () => {
    it('should update a role', (done) => {
      Role.findById(updateRoleId)
        .then((role) => {
          role.update({ title: 'subscriber' })
            .then((updatedRole) => {
              expect(updatedRole.dataValues.id).to.equal(updateRoleId);
              expect(role.dataValues.title).to.equal('subscriber');
              done();
            });
        });
    });
  });

  describe('Delete role', () => {
    it('should delete a role', (done) => {
      Role.destroy({ where: { id: updateRoleId } })
        .then(() => {
          Role.findById(updateRoleId)
            .then((res) => {
              expect(res).to.equal(null);
              done();
            });
        });
    });
  });
});
