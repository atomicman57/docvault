import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ViewDocument from '../../../components/documents/ViewDocument.jsx';

/**
 * Test Setup
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
    }
  };

  return shallow(<ViewDocument {...props} />);
}

describe('ViewDocument', () => {
  it('renders 5 div', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toEqual(5);
  });

  it('renders 1 h5', () => {
    const wrapper = setup();
    expect(wrapper.find('h5').length).toEqual(1);
  });
});
