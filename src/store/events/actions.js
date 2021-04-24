import { PICK_DATE, CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from './types';

export const pickDate = date => ({ type: PICK_DATE, payload: date });

export const createEvent = (event, date) => dispatch => {
  let createdEvent = {
    id: date.getTime().toString(),
    name: event.name,
    type: event.type,
    date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
  };

  switch (event.type) {
    case 'OCCASION':
      createdEvent.budget = event.budget;
      break;
    case 'EVENT':
      createdEvent.address = event.address;
      createdEvent.time = event.time;
      break;
    case 'NOTE':
      createdEvent.note = event.note;
      break;
  }

  const localEvent = JSON.parse(localStorage.getItem('userEvents')) || {};

  if (localEvent && localEvent[createdEvent.date]) {
    localEvent[createdEvent.date].push(createdEvent);
  } else {
    localEvent[createdEvent.date] = [createdEvent];
  }

  localStorage.setItem('userEvents', JSON.stringify(localEvent));

  dispatch({ type: CREATE_EVENT, payload: createdEvent });
};

export const updateEvent = event => dispatch => {
  const localEvent = JSON.parse(localStorage.getItem('userEvents'));

  let updatedEvents;
  if (localEvent && localEvent[event.date]) {
    updatedEvents = localEvent[event.date].map(ev => (ev.id === event.id ? event : ev));
  }

  localStorage.setItem(
    'userEvents',
    JSON.stringify({ ...localEvent, [event.date]: updatedEvents }),
  );

  dispatch({ type: UPDATE_EVENT, payload: event });
};

export const deleteEvent = event => dispatch => {
  dispatch({ type: DELETE_EVENT, payload: event });
};
