import React from "react";
import App, { Container } from "next/app";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

function createMiddlewares ({ isServer }) {
  let middlewares = [ thunkMiddleware ];
  middlewares.push(createLogger({
    level: 'info',
    collapsed: true
  }));

  return middlewares;
}

const initStore = (initialState = {}, context) => {
  let { isServer } = context;
  let middlewares = createMiddlewares({ isServer })
  return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
}

class _App extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(_App);
