import React, { Component } from "react";
import { connect } from "react-redux";
import activeSelection from '../reducers';
import { setActiveElement } from '../actions';

class Test extends Component {
  static getInitialProps({store, isServer, pathname, query}) {
    // console.log(store.getState());
    return { custom: 'custom' };
  }

  setActiveElement = () => {
    this.props.setActiveElement({top: 10, left: 10, right: 10, bottom: 10, options: ['Option 1', 'Option 2', 'Option 3']});
  }

  render() {
    return (
      <div>
        <div></div>
        <div>{this.props.custom}</div>
        <button onClick={this.setActiveElement}>Set Active Element</button>
      </div>
    );
  }
}

const reducer = (state, action) => {
  switch (action) {
    default:
      return state;
  }
}

const mapStateToProps = state => ({
  ...activeSelection(state, '')
})

const mapDispatchToProps = dispatch => ({
  setActiveElement: id => dispatch(setActiveElement(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
