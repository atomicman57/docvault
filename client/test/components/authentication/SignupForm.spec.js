import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import SignupForm from '../../../components/authentication/SignupForm.jsx';

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
    onChange: () => {},
    userSignupRequest: () => Promise.resolve('Success')
  };

  return shallow(<SignupForm {...props} />);
}

before(() => {
  sinon.spy(SignupForm.prototype, 'onChange');
  sinon.spy(SignupForm.prototype, 'onSubmit');
});
after(() => {
  SignupForm.prototype.onChange.restore();
  SignupForm.prototype.onSubmit.restore();
});

describe('Signup Form', () => {
  it('renders the signup form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders text input', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toEqual(6);
  });

  it('should have a <button/> component', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toBe(1);
  });

  it('can call onSubmit on submitting the Form', () => {
    const wrapper = setup();
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(SignupForm.prototype.onSubmit.callCount).toEqual(1);
  });

  it('responds to value change', () => {
    const wrapper = setup();
    const event = { target: { name: 'firstname', value: 'atom' } };
    wrapper.find('.firstname').simulate('change', event);
    expect(SignupForm.prototype.onChange.callCount).toEqual(1);
  });
});
