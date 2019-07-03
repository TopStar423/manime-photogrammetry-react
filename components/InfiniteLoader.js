import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { InfiniteLoader, List } from 'react-virtualized';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import uuid from 'uuid';

import Rotate from './Rotate';
import { getSignedUriArray } from '../utils/queryString';
import { updateUserColumn, updateOrderColumn } from '../utils/lambdaFunctions';

const ML_ROW_ITEM = 2;
const ROW_ITEM_WIDTH = 200;
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];

class Workbench extends React.Component {
  state = {
    showPortal: false,
    signedUriArray: [],
    latestKeys: [],
    email: '',
    measure: ''
  };
  openWorkbench = async () => {
    let leftFingers, leftThumb, rightFingers, rightThumb, side;
    const measure = this.props.list.getIn([this.props.index, 'userid']);
    const email = this.props.list.getIn([this.props.index, 'email']);

    const { latestKeys, signedUriArray } = await getSignedUriArray(this.props.user, measure); // user is adminIdentityId, measure is clientIdentityId
    this.setState({ showPortal: true, signedUriArray, latestKeys, measure, email });
  };
  render() {
    return (
      <React.Fragment>
        <button style={this.props.itemStyle} onClick={this.openWorkbench}>
          Open Photogrammetry Workbench
        </button>
        {this.state.showPortal &&
          ReactDOM.createPortal(
            <Rotate
              onClick={() => this.setState({ showPortal: false })}
              openWorkbench={this.openWorkbench}
              {...this.state}
            />,
            document.getElementById('layout')
          )}
      </React.Fragment>
    );
  }
}

class SelectFitStatus extends React.PureComponent {
  state = {
    value: this.props.value,
    isAdmin: this.props.user == 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea'
  };
  onChange = ev => {
    if (!this.state.isAdmin) {
      const value = ev.target.value;
      if (value == 'fittingValidated') return;
    }
    this.setState({ value: ev.target.value });
    updateUserColumn(this.props.userId, this.props.columnName, ev.target.value);
  };
  render() {
    // const locked = this.state.isAdmin ? { backgroundColor: '#ff0000' } : { backgroundColor: '#ff0000' };
    return (
      <select style={this.props.selectStyle} onChange={this.onChange} value={this.state.value}>
        <option value=''></option>
        <option value='pictureInvalid'>Pictures Invalid</option>
        <option value='toBeFitted'>To be Fitted</option>
        <option value='fittedByDesigner'>Fitted by Designer</option>
        <option value='fittingValidated'>Fitting Validated</option>
      </select>
    );
  }
}

class SelectOrderStatus extends React.PureComponent {
  state = {
    value: this.props.value
  };
  onChange = ev => {
    if (this.props.user != 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea') return;
    this.setState({ value: ev.target.value });
    updateOrderColumn(this.props.orderId, this.props.columnName, ev.target.value);
  };
  render() {
    return (
      <select style={this.props.selectStyle} onChange={this.onChange} value={this.state.value}>
        <option value=''></option>
        <option value='toBeValidated'>To be Validated</option>
        <option value='toBePrinted'>To be Printed</option>
        <option value='toBeShipped'>To be Shipped</option>
        <option value='shipped'>Shipped</option>
      </select>
    );
  }
}

export const ListComponent = function({
  list,
  tableProps,
  table,
  tablePropsType,
  user,
  tableId,
  showRemoved,
  toggleVisible
}) {
  class RowRenderer extends React.Component {
    constructor(props) {
      super(props);
      let visible = true;
      if (tableId == 'users') visible = props.content['visible'];
      this.state = {
        visible
      };
    }

    clickToggleVisible = () => {
      this.setState({ visible: !this.state.visible });
      toggleVisible(
        tableId,
        this.props.content['userid'],
        'visible',
        !this.props.content['visible']
      );
    };

    render() {
      const index = this.props.index;
      const key = this.props.key;
      const style = this.props.style;
      const content = this.props.content;
      // if visible is false don't display
      if (content['visible'] == false && !showRemoved) return <div />;
      if (!this.state.visible && !showRemoved) return <div />;

      const itemStyle = {
        padding: '0px',
        display: 'inline-block',
        width: '200px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        boxSizing: 'border-box',
        marginLeft: '8px',
        backgroundColor: !this.state.visible ? '#ff0000' : 'transparent'
      };

      const selectStyle = {
        display: 'inline-block',
        width: '200px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        boxSizing: 'border-box',
        marginLeft: '8px',
        backgroundColor: 'rgba(255,0,0,0.3)',
        marginTop: '1px',
        marginBottom: '1px'
      };

      const toggleText = !this.state.visible ? 'ADD' : 'REMOVE';
      return (
        <div key={key} style={style}>
          <React.Fragment>
            <div
              style={{
                width: 35,
                fontSize: 12,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              {list.size - index}
            </div>
            {tableId == 'users' && <button onClick={this.clickToggleVisible}>{toggleText}</button>}
            {tableProps.map((prop, i) => {
              if (table[i] == '') {
                return <Workbench itemStyle={itemStyle} index={index} user={user} list={list} />;
              } else if (tableProps[i] == 'fitstatus') {
                const userId = content['userid'];
                const value = content[prop] ? content[prop] : '';
                const columnName = tableProps[i];

                return (
                  <SelectFitStatus
                    selectStyle={selectStyle}
                    user={user}
                    userId={userId}
                    value={value}
                    columnName={columnName}
                  />
                );
              } else if (tableProps[i] == 'orderstatus') {
                const orderId = content['orderid'];
                const value = content[prop] ? content[prop] : '';
                const columnName = tableProps[i];

                return (
                  <SelectOrderStatus
                    selectStyle={selectStyle}
                    user={user}
                    orderId={orderId}
                    value={value}
                    columnName={columnName}
                  />
                );
              } else if (tablePropsType[i] == 'preview') {
                return (
                  <div style={{ width: '200px', overflow: 'hidden' }}>
                    <img src={content['picuri1']} style={{ minWidth: '50%', minHeight: '50%' }} />
                  </div>
                );
              } else {
                return (
                  <CopyToClipboard text={content[prop]} onCopy={() => {}}>
                    <div style={itemStyle}>{content[prop]}</div>
                  </CopyToClipboard>
                );
              }
            })}
          </React.Fragment>
        </div>
      );
    }
  }

  const numColumns = tableProps.length;
  const style = {
    height: '60px',
    width: '100%',
    display: 'flex'
  };

  return list.map((item, index) => {
    return <RowRenderer index={index} key={uuid.v1()} style={style} content={item} />;
    // return rowRenderer({ index, key: uuid.v1(), style, content: item });
  });
};

// if we need the infiniteloader again

// export const InfiniteLoaderComponent = function ({
//   /** Are there more items to load? (This information comes from the most recent API request.) */
//   hasNextPage,
//   /** Are we currently loading a page of items? (This may be an in-flight flag in your Redux store for example.) */
//   isNextPageLoading,
//   /** List of items loaded so far */
//   list,
//   /** Callback function (eg. Redux action-creator) responsible for loading the next page of items */
//   loadNextPage,
//   tableProps,
//   table,
//   user
// }) {
//   // If there are more items to be loaded then add an extra row to hold a loading indicator.
//   // const rowCount = hasNextPage
//   //   ? list.size + 1
//   //   : list.size;
//
//   const rowCount = list.length;
//
//   // Only load 1 page of items at a time.
//   // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
//   const loadMoreRows = isNextPageLoading
//     ? () => {}
//     : loadNextPage;
//
//   // Every row is loaded except for our loading indicator row.
//   const isRowLoaded = ({ index }) => !hasNextPage || index < list.size
//
//   // Render a list item or a loading indicator.
//   const rowRenderer = ({ index, key, style }) => {
//     let content;
//     let id;
//
//     if (!isRowLoaded({ index })) {
//       content = 'Loading...'
//     } else {
//       content = list.getIn([index]);
//     }
//
//     const itemStyle = {
//       padding: '0px',
//       display: 'inline-block',
//       width: '200px',
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//       boxSizing: 'border-box',
//       marginLeft: '8px'
//     };
//
//     const selectStyle = {
//       display: 'inline-block',
//       width: '200px',
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//       boxSizing: 'border-box',
//       marginLeft: '8px',
//       backgroundColor: 'rgba(255,0,0,0.3)',
//       marginTop: '1px',
//       marginBottom: '1px'
//     };
//
//     const customRowStyle = { ...style, display: 'flex' };
//
//     function openUri() {
//       let leftFingers, leftThumb, rightFingers, rightThumb, side;
//       const measure = list.getIn([index, 'userid']);
//       const email = list.getIn([index, 'email']);
//
//       const uri = `http://52.27.72.157/_v4G/workbench/mmw.php?measure=${measure}&user=${email}&nailLength=3&shape=square&texture=test`;
//
//       var win = window.open(uri, '_blank');
//       win.focus();
//     }
//
//     class SelectFitStatus extends React.PureComponent {
//       state = {
//         value: this.props.value,
//         isAdmin: user == 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea'
//       };
//       onChange = ev => {
//         if (!this.state.isAdmin) {
//           const value = ev.target.value;
//           if (value == 'fittingValidated') return;
//         }
//         this.setState({ value: ev.target.value });
//         updateUserColumn(this.props.userId, this.props.columnName, ev.target.value);
//       }
//       render() {
//         // const locked = this.state.isAdmin ? { backgroundColor: '#ff0000' } : { backgroundColor: '#ff0000' };
//         return (
//           <select style={selectStyle} onChange={this.onChange} value={this.state.value}>
//             <option value=''></option>
//             <option value='pictureInvalid'>Pictures Invalid</option>
//             <option value='toBeFitted'>To be Fitted</option>
//             <option value='fittedByDesigner'>Fitted by Designer</option>
//             <option value='fittingValidated'>Fitting Validated</option>
//           </select>
//         );
//       }
//     }
//
//     class SelectOrderStatus extends React.PureComponent {
//       state = {
//         value: this.props.value
//       };
//       onChange = ev => {
//         if (user != 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea') return;
//         this.setState({ value: ev.target.value });
//         updateOrderColumn(this.props.orderId, this.props.columnName, ev.target.value);
//       }
//       render() {
//         return (
//           <select style={selectStyle} onChange={this.onChange} value={this.state.value}>
//             <option value=''></option>
//             <option value='toBeValidated'>To be Validated</option>
//             <option value='toBePrinted'>To be Printed</option>
//             <option value='toBeShipped'>To be Shipped</option>
//             <option value='shipped'>Shipped</option>
//           </select>
//         );
//       }
//     }
//
//     return (
//       <div
//         key={key}
//         style={customRowStyle}
//       >
//         <React.Fragment>
//           {
//             tableProps.map((prop, i) => {
//               if (table[i] == '') {
//                 return (
//                   <button style={itemStyle} onClick={openUri}>Open Photogrammetry Workbench</button>
//                 );
//               } else if (tableProps[i] == 'fitstatus') {
//                 const userId = content['userid'];
//                 const value = content[prop] ? content[prop] : '';
//                 const columnName = tableProps[i];
//
//                 return (
//                   <SelectFitStatus userId={userId} value={value} columnName={columnName}/>
//                 );
//               } else if (tableProps[i] == 'orderstatus') {
//                 const orderId = content['orderid'];
//                 const value = content[prop] ? content[prop] : '';
//                 const columnName = tableProps[i];
//
//                 return (
//                   <SelectOrderStatus orderId={orderId} value={value} columnName={columnName}/>
//                 );
//               } else {
//                 return (
//                   <CopyToClipboard text={content[prop]}
//                     onCopy={() => {}}>
//                     <button style={itemStyle}>{content[prop]}</button>
//                   </CopyToClipboard>
//                 );
//               }
//             })
//           }
//         </React.Fragment>
//       </div>
//     )
//   }
//
//   const numColumns = tableProps.length;
//   const width = (space[ML_ROW_ITEM] + ROW_ITEM_WIDTH) * numColumns;
//
//   return (
//     <InfiniteLoader
//       isRowLoaded={isRowLoaded}
//       loadMoreRows={loadMoreRows}
//       rowCount={rowCount}
//       minimumBatchSize={500}
//       threshold={100}
//     >
//       {({ onRowsRendered, registerChild }) => (
//         <List
//           ref={registerChild}
//           onRowsRendered={onRowsRendered}
//           rowRenderer={rowRenderer}
//           height={1000}
//           rowCount={list.size}
//           rowHeight={20}
//           width={width}
//         />
//       )}
//     </InfiniteLoader>
//   )
// }
