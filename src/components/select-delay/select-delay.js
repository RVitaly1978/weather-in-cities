import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUpdateDelay } from '../../store/action-creators';

import './select-delay.scss';

const options = [
  { label: '20c', value: 20000 },
  { label: '10мин', value: 600000 },
  { label: '1час', value: 3600000 },
];

export const SelectDelay = () => {
  const dispatch = useDispatch();
  const { updateDelay } = useSelector(s => s);

  const handleChange = (evt) => {
    const { value } = evt.target;
    dispatch(setUpdateDelay(value));
  }

  const Options = options.map(({ label, value }) => {
    return <option key={label} value={value}>{label}</option>;
  });

  return (
    <div className='select_container'>
      <select
        onChange={handleChange}
        value={updateDelay}>
        {Options}
      </select>
    </div>
  );
};
