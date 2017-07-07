import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../../components/includes/Spinner.jsx';

describe('Spinner', () => {
  it('renders main div class myloader ', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('.myloader').length).toEqual(1);
  });
  it('renders circle ', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('.circle').length).toEqual(3);
  });
});
