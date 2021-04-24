import { PICK_DATE, CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from './types';

const initialState = {
  selectedDate: null,
  eventList: {},
};

const eventsReducer = (events = {}, { type, payload }) => {
  switch (type) {
    case PICK_DATE:
      return { ...events, selectedDate: payload };
    case CREATE_EVENT:
      let value = [payload];

      if (events.eventList && events.eventList[payload.date]) {
        value = [...events.eventList[payload.date], payload];
      }

      return {
        ...events,
        eventList: {
          ...events.eventList,
          [payload.date]: value,
        },
      };
    case UPDATE_EVENT:
      return {
        ...events,
        eventList: {
          ...events.eventList,
          [payload.date]: events.eventList[payload.date].map(ev =>
            ev.id === payload.id ? payload : ev,
          ),
        },
      };
    case DELETE_EVENT:
      return {
        ...events,
        eventList: {
          ...events.eventList,
          [payload.date]: events.eventList[payload.date].filter(ev => ev.id !== payload.id),
        },
      };
    default:
      return events;
  }
};

export default eventsReducer;
