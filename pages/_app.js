import React from "react";
import App, { Container } from "next/app";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const reducer = (state = { activeSelection: '' }, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_ELEMENT':
      return { ...state, activeSelection: action.selectedElement };
    default:
      return state
  }
};

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
  return createStore(reducer, initialState, compose(applyMiddleware(...middlewares)));
  // return createStore(reducer, initialState);
}

class _App extends App {
  static async getInitialProps({ Component, ctx }) {
    // ctx.store.dispatch({ type: 'SET_ACTIVE_ELEMENT', selectedElement: 'button1' });
    // console.log(ctx.store.getState());
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
