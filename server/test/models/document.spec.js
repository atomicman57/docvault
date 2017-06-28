import chai from 'chai';
import { Document } from '../../models';
import TestData from '../TestData/TestData';

const { sampleDocument } = TestData;
let updateDocId;
const expect = chai.expect;

describe('Document Model', () => {
  describe('Create Document', () => {
    it('should create a document', (done) => {
      Document.create(sampleDocument)
        .then((document) => {
          expect(document.dataValues.title).to.equal(sampleDocument.title);
          expect(document.dataValues.content).to.equal(sampleDocument.content);
          updateDocId = document.dataValues.id;
          done();
        });
    });

    it('should fail if title already exist', (done) => {
      Document.create(sampleDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Title already exist');
          expect(error.errors[0].type).to.equal('unique violation');
          done();
        });
    });

    it('should fail if title was not provided', (done) => {
      sampleDocument.title = '';
      Document.create(sampleDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Title cannot be empty');
          done();
        });
    });

    it('should fail if content was not provided', (done) => {
      sampleDocument.title = 'sample title';
      sampleDocument.content = '';
      Document.create(sampleDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Content cannot be empty');
          done();
        });
    });

    it('should fail if access is not public, private or role', (done) => {
      sampleDocument.content = 'sample content';
      sampleDocument.access = 'wrongRole';
      Document.create(sampleDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Use a valid access type');
          done();
        });
    });
  });

  describe('Update Document', () => {
    it('should update a document', (done) => {
      Document.findById(updateDocId)
        .then((document) => {
          document.update({ title: 'Chessmen from mars' })
            .then((updatedDocument) => {
              expect(updatedDocument.dataValues.id).to.equal(updateDocId);
              expect(document.dataValues.title).to.equal('Chessmen from mars');
              done();
            });
        });
    });
  });

  describe('Delete Document', () => {
    it('should delete a document', (done) => {
      Document.destroy({ where: { id: updateDocId } })
        .then(() => {
          Document.findById(updateDocId)
            .then((res) => {
              expect(res).to.equal(null);
              done();
            });
        });
    });
  });
});
