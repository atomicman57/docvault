import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../components/includes/Footer.jsx';

describe('Footer', () => {
  it('renders the footer component', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('footer').length).toEqual(1);
  });

  it('renders the footer content', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.container').text()).toBe(
      'Copyright © 2017 - All Rights Reserved Document VaultDeveloped by Philips Blessing'
    );
  });
});
