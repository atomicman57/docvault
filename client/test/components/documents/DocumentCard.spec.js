import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import DocumentCard from '../../../components/documents/DocumentCard.jsx';

const confirmDelete = sinon.spy();
const userUpdateDocumentRequest = sinon.spy();

/**
 *
 *
 * @returns
 */
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
    confirmDelete,
    userUpdateDocumentRequest,
    deleteDocument: () => {}
  };

  return shallow(<DocumentCard {...props} />);
}

describe('DocumentCard', () => {
  it('renders a card div', () => {
    const wrapper = setup();
    expect(wrapper.find('.card').length).toEqual(1);
  });

  it('receives the document title from props', () => {
    const wrapper = setup();
    expect(wrapper.find('.title').text()).toEqual('This is a test');
  });

  it('can call the confirmDelete modal', () => {
    const wrapper = setup();
    wrapper.find('.deletebutton').simulate('click');
    expect(confirmDelete.callCount).toEqual(1);
  });
});
