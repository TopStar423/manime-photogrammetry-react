import React from 'react';
import { InfiniteLoader, List } from 'react-virtualized';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ML_ROW_ITEM = 2;
const ROW_ITEM_WIDTH = 200;
const space = [0, 4, 8, 16, 32, 64, 128, 256, 512]

export default function ({
  /** Are there more items to load? (This information comes from the most recent API request.) */
  hasNextPage,
  /** Are we currently loading a page of items? (This may be an in-flight flag in your Redux store for example.) */
  isNextPageLoading,
  /** List of items loaded so far */
  list,
  /** Callback function (eg. Redux action-creator) responsible for loading the next page of items */
  loadNextPage,
  tableProps,
  table
}) {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const rowCount = hasNextPage
    ? list.size + 1
    : list.size

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = isNextPageLoading
    ? () => {}
    : loadNextPage

  // Every row is loaded except for our loading indicator row.
  const isRowLoaded = ({ index }) => !hasNextPage || index < list.size

  // Render a list item or a loading indicator.
  const rowRenderer = ({ index, key, style }) => {
    let content

    if (!isRowLoaded({ index })) {
      content = 'Loading...'
    } else {

      // tableProps.map(prop => )

      content = list.getIn([index])
    }

    const itemStyle = {
      display: 'inline-block',
      width: '200px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      boxSizing: 'border-box',
      marginLeft: '8px'
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

  // white-space: nowrap;
  // overflow: hidden;
  // font-weight: ${(props) => props.description ? 400 : 200};
  // flex: 0 0 ${ROW_ITEM_WIDTH}px;
  // height: 80%;
  // align-items: center;
  // display: flex;
  // border-radius: 3px;
  // box-sizing: border-box;


  const numColumns = tableProps.length;
  const width = (space[ML_ROW_ITEM] + ROW_ITEM_WIDTH) * numColumns;

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
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
