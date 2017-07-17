import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import EditDocument from '../../../components/documents/EditDocument.jsx';

/**
 *
 * Test Setup
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
    onChange: () => {},
    onSubmit: () => {},
    userUpdateDocumentRequest: () => Promise.resolve('Success')
  };

  return shallow(<EditDocument {...props} />);
}
before(() => {
  sinon.spy(EditDocument.prototype, 'onChange');
  sinon.spy(EditDocument.prototype, 'onSubmit');
});
after(() => {
  EditDocument.prototype.onChange.restore();
  EditDocument.prototype.onSubmit.restore();
});

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
    expect(wrapper.find('form').props().onSubmit).toBeA('function');
    expect(wrapper.find('.edit-input').props().onChange).toBeA('function');
  });

  it('can call onSubmit on submitting the Form', () => {
    const wrapper = setup();
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(EditDocument.prototype.onSubmit.callCount).toEqual(1);
  });

  it('responds to value change', () => {
    const wrapper = setup();
    const event = { target: { name: 'title', value: 'atom' } };
    wrapper.find('.edit-input').simulate('change', event);
    expect(EditDocument.prototype.onChange.callCount).toEqual(1);
  });
});
