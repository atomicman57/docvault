import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import SearchUser from '../../../components/users/SearchUsers.jsx';

/**
 * Test Setup
 *
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

  return shallow(<SearchUser {...props} />);
}

describe('SearchUser', () => {
  it('renders the edit User form', () => {
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
  it('props value on View User', () => {
    const wrapper = setup();
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.find('form').props().onSubmit).toBeA('function');
  });

  it('responds to value change', () => {
    const wrapper = setup();
    const event = { target: { name: 'search', value: 'atom' } };
    wrapper.find('#search').simulate('change', event);
    expect(wrapper.find('#search').props().onChange).toBeA('function');
  });
});
