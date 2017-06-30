import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import EditDocument from '../../../components/documents/EditDocument.jsx';

const onSubmit = sinon.spy();
const userUpdateDocumentRequest = sinon.spy();

function setup() {
  const props = {
    document: {
      id: '1',
      title: 'This is a test',
      content: 'Testing is awesome',
      userId: 1,
      User: {
        username: 'Tolu'
      }
    },
    currentUser: {
      id: 1,
      roleId: 2
    },
    onSubmit,
    userUpdateDocumentRequest
    // deleteDocument: () => {}
  };

  return shallow(<EditDocument {...props} />);
}

describe('EditDocument', () => {
  it('renders the edit document form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders text input', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toEqual(1);
  });

  it('renders select input', () => {
    const wrapper = setup();
    expect(wrapper.find('select').length).toEqual(1);
  });

  it('receives the document title from props', () => {
    const wrapper = setup();
    expect(wrapper.find('.title').text()).toEqual('This is a test');
  });
  it('renders the content editor', () => {
    const wrapper = setup();
    expect(wrapper.find('Editor').length).toEqual(1);
  });
  it('can call the confirmDelete modal', () => {
    const wrapper = setup();
    wrapper.find('#edit-doc').simulate('click');
    expect(onSubmit.callCount).toEqual(1);
  });
});
