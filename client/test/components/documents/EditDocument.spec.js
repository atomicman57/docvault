import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import EditDocument from '../../../components/documents/EditDocument.jsx';

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
    onSubmit: () => {},
    userUpdateDocumentRequest: () => Promise.resolve('Success')
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

  it('should have a <button/> component', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toBe(1);
  });
  it('props value on Edit Document', () => {
    const wrapper = setup();
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.find('form').props().onSubmit).toBeA('function');
  });

  it('responds to value change', () => {
    const wrapper = setup();
    const event = { target: { name: 'title', value: 'atom' } };
    wrapper.find('.edit-input').simulate('change', event);
    expect(wrapper.find('.edit-input').props().onChange).toBeA('function');
  });
});
