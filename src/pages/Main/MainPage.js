import React from 'react';
import Container from 'react-bootstrap/Container';
import Calendar from '../../components/Calendar/Calendar';
import Events from '../../components/Events/Events';

const MainPage = () => {
  return (
    <Container className="d-flex mt-4">
      <Calendar />
      <Events />
    </Container>
  );
};

export default MainPage;
