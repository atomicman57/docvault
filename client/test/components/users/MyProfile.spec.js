import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import MyProfile from '../../../components/users/MyProfile.jsx';

/**
 *
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
    onSubmitPassword: () => {},
    userUpdateUserRequest: () => Promise.resolve('Success')
  };

  return shallow(<MyProfile {...props} />);
}

describe('MyProfile', () => {
  it('renders the edit document form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toEqual(2);
  });

  it('renders text input', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toEqual(6);
  });

  it('should have a <button/> component', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toBe(2);
  });

  it('props value on My Profile', () => {
    const wrapper = setup();
    wrapper.find('.form1').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.find('.form1').props().onSubmit).toBeA('function');
  });

  it('props value on My Profile', () => {
    const wrapper = setup();
    wrapper.find('.form2').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.find('.form2').props().onSubmit).toBeA('function');
  });

  it('responds to value change', () => {
    const wrapper = setup();
    const event = { target: { name: 'firstname', value: 'atom' } };
    wrapper.find('.firstname').simulate('change', event);
    expect(wrapper.find('.firstname').props().onChange).toBeA('function');
  });
});
