import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { pickDate } from '../../store/events/actions';

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePickDate = () => {
    dispatch(pickDate(startDate));
    history.push('/edit');
  };

  return (
    <div className="mr-4">
      <DatePicker
        selected={startDate}
        onChange={date => {
          dispatch(pickDate(startDate));
          setStartDate(date);
        }}
        inline
      />
      <Button onClick={handlePickDate}>Добавить</Button>
    </div>
  );
};

export default Calendar;
