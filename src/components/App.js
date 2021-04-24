import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import MainPage from '../pages/Main/MainPage';
import Header from './Header/Header';
import store from '../store/store';

const EditPage = lazy(() => import('../pages/EditPage/EditPage'));

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Header />
          <div className="main">
            <Switch>
              <Route path="/" component={MainPage} exact />
              <Route path="/edit" component={EditPage} />
            </Switch>
          </div>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
