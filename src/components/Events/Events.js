import React from 'react';
import Card from 'react-bootstrap/Card';

import useEvents from '../../store/events/selectors';

import './Events.scss';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../../store/events/actions';
import { useHistory } from 'react-router-dom';

const Events = () => {
  const { eventList, selectedDate } = useEvents();
  const dispatch = useDispatch();
  const history = useHistory();

  const key = `${selectedDate?.getDate()}/${selectedDate?.getMonth()}/${selectedDate?.getFullYear()}`;

  const handleEditClick = async event => {
    history.push(`/edit?id=${event.id}`);
  };

  const handleDeleteClick = event => {
    dispatch(deleteEvent(event));
  };

  return (
    <div className="events">
      {eventList &&
        eventList[key] &&
        eventList[key].map(event => (
          <Card key={event.name} className="mb-4">
            <Card.Header className="d-flex">
              <Card.Title>{event.name}</Card.Title>
              <div className="events__card-actions">
                <p className="events__card-action" onClick={() => handleEditClick(event)}>
                  Редактировать
                </p>
                <p className="events__card-action" onClick={() => handleDeleteClick(event)}>
                  Удалить
                </p>
              </div>
            </Card.Header>
            <Card.Body>
              {event.budget && <Card.Text>Бюджет: {event.budget}$</Card.Text>}
              {event.address && <Card.Text>Адрес: {event.address}</Card.Text>}
              {event.time && <Card.Text>Время: {event.time}</Card.Text>}
              {event.note && <Card.Text>{event.note}</Card.Text>}
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default Events;
