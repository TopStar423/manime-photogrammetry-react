import React, { useState, useEffect } from 'react';
import { InfiniteLoader, List } from 'react-virtualized';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import uuid from 'uuid';

import { updateUserColumn, updateOrderColumn } from '../utils/lambdaFunctions';

const ML_ROW_ITEM = 2;
const ROW_ITEM_WIDTH = 200;
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]

export const InfiniteLoaderComponent = function ({
  /** Are there more items to load? (This information comes from the most recent API request.) */
  hasNextPage,
  /** Are we currently loading a page of items? (This may be an in-flight flag in your Redux store for example.) */
  isNextPageLoading,
  /** List of items loaded so far */
  list,
  /** Callback function (eg. Redux action-creator) responsible for loading the next page of items */
  loadNextPage,
  tableProps,
  table,
  user
}) {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  // const rowCount = hasNextPage
  //   ? list.size + 1
  //   : list.size;

  const rowCount = list.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = isNextPageLoading
    ? () => {}
    : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isRowLoaded = ({ index }) => !hasNextPage || index < list.size

  // Render a list item or a loading indicator.
  const rowRenderer = ({ index, key, style }) => {
    let content;
    let id;

    if (!isRowLoaded({ index })) {
      content = 'Loading...'
    } else {
      content = list.getIn([index]);
    }

    const itemStyle = {
      padding: '0px',
      display: 'inline-block',
      width: '200px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      boxSizing: 'border-box',
      marginLeft: '8px'
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

    const customRowStyle = { ...style, display: 'flex' };

    function openUri() {
      let leftFingers, leftThumb, rightFingers, rightThumb, side;
      const measure = list.getIn([index, 'userid']);
      const email = list.getIn([index, 'email']);

      const uri = `http://52.27.72.157/_v4G/workbench/mmw.php?measure=${measure}&user=${email}&nailLength=3&shape=square&texture=test`;
      // getQueryString(this.props.propertyValue);

      var win = window.open(uri, '_blank');
      win.focus();
    }

    class SelectFitStatus extends React.PureComponent {
      state = {
        value: this.props.value,
        isAdmin: user == 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea'
      };
      onChange = ev => {
        if (!this.state.isAdmin) {
          const value = ev.target.value;
          if (value == 'fittingValidated') return;
        }
        this.setState({ value: ev.target.value });
        updateUserColumn(this.props.userId, this.props.columnName, ev.target.value);
      }
      render() {
        // const locked = this.state.isAdmin ? { backgroundColor: '#ff0000' } : { backgroundColor: '#ff0000' };
        return (
          <select style={selectStyle} onChange={this.onChange} value={this.state.value}>
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
        if (user != 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea') return;
        this.setState({ value: ev.target.value });
        updateOrderColumn(this.props.orderId, this.props.columnName, ev.target.value);
      }
      render() {
        return (
          <select style={selectStyle} onChange={this.onChange} value={this.state.value}>
            <option value=''></option>
            <option value='toBeValidated'>To be Validated</option>
            <option value='toBePrinted'>To be Printed</option>
            <option value='toBeShipped'>To be Shipped</option>
            <option value='shipped'>Shipped</option>
          </select>
        );
      }
    }

    return (
      <div
        key={key}
        style={customRowStyle}
      >
        <React.Fragment>
          {
            tableProps.map((prop, i) => {
              if (table[i] == '') {
                return (
                  <button style={itemStyle} onClick={openUri}>Open Photogrammetry Workbench</button>
                );
              } else if (tableProps[i] == 'fitstatus') {
                const userId = content['userid'];
                const value = content[prop] ? content[prop] : '';
                const columnName = tableProps[i];

                return (
                  <SelectFitStatus userId={userId} value={value} columnName={columnName}/>
                );
              } else if (tableProps[i] == 'orderstatus') {
                const orderId = content['orderid'];
                const value = content[prop] ? content[prop] : '';
                const columnName = tableProps[i];

                return (
                  <SelectOrderStatus orderId={orderId} value={value} columnName={columnName}/>
                );
              } else {
                return (
                  <CopyToClipboard text={content[prop]}
                    onCopy={() => {}}>
                    <button style={itemStyle}>{content[prop]}</button>
                  </CopyToClipboard>
                );
              }
            })
          }
        </React.Fragment>
      </div>
    )
  }

  const numColumns = tableProps.length;
  const width = (space[ML_ROW_ITEM] + ROW_ITEM_WIDTH) * numColumns;

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
      minimumBatchSize={500}
      threshold={100}
    >
      {({ onRowsRendered, registerChild }) => (
        <List
          ref={registerChild}
          onRowsRendered={onRowsRendered}
          rowRenderer={rowRenderer}
          height={1000}
          rowCount={list.size}
          rowHeight={20}
          width={width}
        />
      )}
    </InfiniteLoader>
  )
}


export const ListComponent = function ({
  list,
  tableProps,
  table,
  user
}) {

  const rowRenderer = ({ index, key, style, content }) => {
    const itemStyle = {
      padding: '0px',
      display: 'inline-block',
      width: '200px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      boxSizing: 'border-box',
      marginLeft: '8px'
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

    function openUri() {
      let leftFingers, leftThumb, rightFingers, rightThumb, side;
      const measure = list.getIn([index, 'userid']);
      const email = list.getIn([index, 'email']);

      const uri = `http://52.27.72.157/_v4G/workbench/mmw.php?measure=${measure}&user=${email}&nailLength=3&shape=square&texture=test`;
      // getQueryString(this.props.propertyValue);

      var win = window.open(uri, '_blank');
      win.focus();
    }

    class SelectFitStatus extends React.PureComponent {
      state = {
        value: this.props.value,
        isAdmin: user == 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea'
      };
      onChange = ev => {
        if (!this.state.isAdmin) {
          const value = ev.target.value;
          if (value == 'fittingValidated') return;
        }
        this.setState({ value: ev.target.value });
        updateUserColumn(this.props.userId, this.props.columnName, ev.target.value);
      }
      render() {
        // const locked = this.state.isAdmin ? { backgroundColor: '#ff0000' } : { backgroundColor: '#ff0000' };
        return (
          <select style={selectStyle} onChange={this.onChange} value={this.state.value}>
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
        if (user != 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea') return;
        this.setState({ value: ev.target.value });
        updateOrderColumn(this.props.orderId, this.props.columnName, ev.target.value);
      }
      render() {
        return (
          <select style={selectStyle} onChange={this.onChange} value={this.state.value}>
            <option value=''></option>
            <option value='toBeValidated'>To be Validated</option>
            <option value='toBePrinted'>To be Printed</option>
            <option value='toBeShipped'>To be Shipped</option>
            <option value='shipped'>Shipped</option>
          </select>
        );
      }
    }

    return (
      <div
        key={key}
        style={style}
      >
        <React.Fragment>
          {
            tableProps.map((prop, i) => {
              if (table[i] == '') {
                return (
                  <button style={itemStyle} onClick={openUri}>Open Photogrammetry Workbench</button>
                );
              } else if (tableProps[i] == 'fitstatus') {
                const userId = content['userid'];
                const value = content[prop] ? content[prop] : '';
                const columnName = tableProps[i];

                return (
                  <SelectFitStatus userId={userId} value={value} columnName={columnName}/>
                );
              } else if (tableProps[i] == 'orderstatus') {
                const orderId = content['orderid'];
                const value = content[prop] ? content[prop] : '';
                const columnName = tableProps[i];

                return (
                  <SelectOrderStatus orderId={orderId} value={value} columnName={columnName}/>
                );
              } else {
                return (
                  <CopyToClipboard text={content[prop]}
                    onCopy={() => {}}>
                    <button style={itemStyle}>{content[prop]}</button>
                  </CopyToClipboard>
                );
              }
            })
          }
        </React.Fragment>
      </div>
    )
  }

  const numColumns = tableProps.length;
  const width = (space[ML_ROW_ITEM] + ROW_ITEM_WIDTH) * numColumns;
  const style = {
    height: '20px',
    width: '100%',
    display: 'flex'
  };

  return (
    list.map((item, index) => {
      return rowRenderer({ index, key: uuid.v1(), style, content: item });
    })
  )
}
