import React, { Component } from 'react';
import { List } from 'immutable';
// import { connect } from "react-redux";
// import activeSelection from '../reducers';
// import { setActiveElement } from '../actions';

export default class Test extends Component {
  // static getInitialProps({store, isServer, pathname, query}) {
  //   // console.log(store.getState());
  //   return { custom: 'custom' };
  // }
  //
  // setActiveElement = () => {
  //   this.props.setActiveElement({top: 10, left: 10, right: 10, bottom: 10, options: ['Option 1', 'Option 2', 'Option 3']});
  // }

  render() {
    const x = [1, 2, 3, 4, 5, 6];
    const list = List(x);
    console.log(list);
    console.log(list.size);
    return (
      <div>
        {/* <div></div>
        <div>{this.props.custom}</div>
        <button onClick={this.setActiveElement}>Set Active Element</button> */}
      </div>
    );
  }
}

// const reducer = (state, action) => {
//   switch (action) {
//     default:
//       return state;
//   }
// }
//
// const mapStateToProps = state => ({
//   ...activeSelection(state, '')
// })
//
// const mapDispatchToProps = dispatch => ({
//   setActiveElement: id => dispatch(setActiveElement(id))
// })
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Test);
