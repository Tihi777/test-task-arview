import React, { useEffect, useState } from 'react';
import useEvents from '../../store/events/selectors';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createEvent, updateEvent } from '../../store/events/actions';

const useQuery = () => {
  return new URLSearchParams(useLocation().search).get('id');
};

const EditPage = () => {
  const [eventData, setEventData] = useState({
    name: '',
    type: 'OCCASION',
    budget: '',
    address: '',
    time: '',
    note: '',
  });
  const { eventList, selectedDate } = useEvents();

  const history = useHistory();
  const dispatch = useDispatch();
  const query = useQuery();

  const key = `${selectedDate?.getDate()}/${selectedDate?.getMonth()}/${selectedDate?.getFullYear()}`;
  const currentEvent =
    eventList && eventList[key] && eventList[key].find(event => event.id === query);

  const handleChange = event => {
    setEventData(prevEventData => ({ ...prevEventData, [event.target.name]: event.target.value }));
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    if (currentEvent) {
      await dispatch(updateEvent(eventData));
    } else {
      await dispatch(createEvent(eventData, selectedDate));
    }

    history.push('/');
  };

  const handleFormCancel = event => {
    event.preventDefault();
    history.push('/');
  };

  useEffect(() => {
    if (!selectedDate && !query) {
      history.push('/');
    }
  }, [selectedDate]);

  useEffect(() => {
    if (currentEvent) {
      setEventData(prevEventData => ({ ...prevEventData, ...currentEvent }));
    }
  }, [query]);

  return (
    <div className="d-flex justify-content-center mt-4">
      <Form>
        <h3>{query ? 'Редактирование ' : 'Добавление '}события</h3>
        <Form.Group controlId="eventName">
          <Form.Label>Название события</Form.Label>
          <Form.Control
            name="name"
            value={eventData.name}
            onChange={handleChange}
            placeholder="Бар за углом на Московской"
          />
        </Form.Group>
        <Form.Group controlId="eventType">
          <Form.Label>Тип события</Form.Label>
          <Form.Control as="select" name="type" onChange={handleChange}>
            <option value="OCCASION">Событие</option>
            <option value="EVENT">Мероприятие</option>
            <option value="NOTE">Пометки/Другое</option>
          </Form.Control>
        </Form.Group>
        {eventData.type === 'OCCASION' && (
          <>
            <Form.Group controlId="eventBudget">
              <Form.Label>Сколько это стоит?</Form.Label>
              <Form.Control
                name="budget"
                value={eventData.budget}
                onChange={handleChange}
                type="number"
              />
            </Form.Group>
          </>
        )}
        {eventData.type === 'EVENT' && (
          <>
            <Form.Group controlId="eventPlace">
              <Form.Label>Куда идти?</Form.Label>
              <Form.Control
                name="address"
                value={eventData.address}
                onChange={handleChange}
                placeholder="Бар за углом на Московской"
              />
            </Form.Group>
            <Form.Group controlId="eventTime">
              <Form.Label>Во сколько?</Form.Label>
              <Form.Control name="time" value={eventData.time} onChange={handleChange} />
            </Form.Group>
          </>
        )}
        {eventData.type === 'NOTE' && (
          <>
            <Form.Group controlId="eventNote">
              <Form.Label>Введите ваши пометки</Form.Label>
              <Form.Control
                name="note"
                value={eventData.note}
                onChange={handleChange}
                as="textarea"
              />
            </Form.Group>
          </>
        )}
        <Form.Group className="d-flex justify-content-between">
          <Button variant="secondary" type="submit" onClick={handleFormCancel}>
            Отмена
          </Button>
          <Button variant="primary" type="submit" onClick={handleFormSubmit}>
            {query ? 'Редактировать ' : 'Сохранить '}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditPage;
