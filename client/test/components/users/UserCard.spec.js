import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import UserCard from '../../../components/users/UsersCard.jsx';

const confirmDelete = sinon.spy();
const userUpdateUserRequest = sinon.spy();

function setup() {
  const props = {
    user: {
      id: '1',
      firstname: 'Amala',
      lastname: 'Eba',
      email: 'ama@la.com',
      username: 'Eba',
      Role: {
        id: 1,
        title: 'Regular'
      }
    },
    confirmDelete,
    userUpdateUserRequest,
    deleteUser: () => {}
  };

  return shallow(<UserCard {...props} />);
}

describe('UserCard', () => {
  it('renders a card div', () => {
    const wrapper = setup();
    expect(wrapper.find('.card').length).toEqual(1);
  });

  it('receives the User title from props', () => {
    const wrapper = setup();
    expect(wrapper.find('.title').text()).toEqual('Amala Eba');
  });

  it('can call the confirmDelete modal', () => {
    const wrapper = setup();
    wrapper.find('.deletebutton').simulate('click');
    expect(confirmDelete.callCount).toEqual(1);
  });
});
