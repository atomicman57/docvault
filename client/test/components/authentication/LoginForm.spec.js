import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import LoginForm from '../../../components/authentication/LoginForm.jsx';

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
    userLoginRequest: () => Promise.resolve('Success')
  };

  return shallow(<LoginForm {...props} />);
}

before(() => {
  sinon.spy(LoginForm.prototype, 'onChange');
  sinon.spy(LoginForm.prototype, 'onSubmit');
});
after(() => {
  LoginForm.prototype.onChange.restore();
  LoginForm.prototype.onSubmit.restore();
});

describe('LoginForm', () => {
  it('renders the login form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders text input', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toEqual(2);
  });

  it('should have a <button/> component', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toBe(1);
  });

  it('props value on Login Form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').props().onSubmit).toBeA('function');
    expect(wrapper.find('.email').props().onChange).toBeA('function');
  });

  it('can call onSubmit on submitting the Form', () => {
    const wrapper = setup();
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(LoginForm.prototype.onSubmit.callCount).toEqual(1);
  });

  it('responds to value change', () => {
    const wrapper = setup();
    const event = { target: { name: 'email', value: 'atom' } };
    wrapper.find('.email').simulate('change', event);
    expect(LoginForm.prototype.onChange.callCount).toEqual(1);
  });
});
