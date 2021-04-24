import { useSelector } from 'react-redux';

const useEvents = () => {
  return useSelector(({ events }) => events);
};

export default useEvents;
