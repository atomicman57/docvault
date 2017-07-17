import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import SearchDocument from '../../../components/documents/SearchDocument.jsx';

/**
 *
 * Test Setup
 * @returns
 */
function setup() {
  const props = {
    currentUser: {
      id: 1,
      roleId: 2
    },
    onSubmit: () => {},
    userSearchRequest: () => Promise.resolve('Success')
  };

  return shallow(<SearchDocument {...props} />);
}

before(() => {
  sinon.spy(SearchDocument.prototype, 'onChange');
  sinon.spy(SearchDocument.prototype, 'onSubmit');
});
after(() => {
  SearchDocument.prototype.onChange.restore();
  SearchDocument.prototype.onSubmit.restore();
});

describe('SearchDocument', () => {
  it('renders the edit document form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders text input', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toEqual(1);
  });

  it('should have a <button/> component', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toBe(1);
  });
  it('props value on View Document', () => {
    const wrapper = setup();
    expect(wrapper.find('#search').props().onChange).toBeA('function');
    expect(wrapper.find('form').props().onSubmit).toBeA('function');
  });
  it('can call onSubmit on submitting the Form', () => {
    const wrapper = setup();
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(SearchDocument.prototype.onSubmit.callCount).toEqual(1);
  });
  it('responds to value change', () => {
    const wrapper = setup();
    const event = { target: { name: 'search', value: 'atom' } };
    wrapper.find('#search').simulate('change', event);
    expect(SearchDocument.prototype.onChange.callCount).toEqual(1);
  });
});
