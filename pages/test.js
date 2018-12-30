import React, { Component } from "react";
import { connect } from "react-redux";

class Test extends Component {
  static getInitialProps({store, isServer, pathname, query}) {
    // console.log(store.getState());
    return { custom: 'custom' };
  }
  render() {
    return (
      <div>
        <div>{this.props.activeSelection}</div>
        <div>{this.props.custom}</div>
        <button onClick={() => this.props.setActiveElement(2)}>Set Active Element</button>
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
  ...reducer(state, 'SET_ACTIVE_ELEMENT')
})

const mapDispatchToProps = dispatch => ({
  setActiveElement: id => dispatch({ type: 'SET_ACTIVE_ELEMENT', selectedElement: id })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
