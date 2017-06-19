import React, { PropTypes } from 'react';

/**
 * Select input
 *
 * @param {Object} props { name, onChange, value, error, icon = 'user', options, label }
 * @returns {Object} jsx object
 */
const SelectInput = ({ name="test", onChange, value="aaa", error, icon = 'user', options, label='Test' }) =>
  <div className="input-field">
    <i className={`fa fa-${icon} prefix`} />
    <select
      className="select-role"
      id="selectInput"
      name={name}
      onChange={onChange}
      value={value} >
      <option value="null" disabled>{label}</option>
    </select>
  </div>;

export default SelectInput;
