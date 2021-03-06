import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { InfiniteLoader, List } from 'react-virtualized';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import uuid from 'uuid';

import Rotate from './Rotate';
import AdminAccessModal from './AdminAccessModal';
import OrderReviewDetails from './OrderReviewDetails';
import OrderReviewSelectStatus from './OrderReviewSelectStatus';
import ReviewComments from './ReviewComments';
import { ToggleVisibleButton, AdminAccessButton } from './styled/InfiniteLoader.styled';
import { getSignedUriArray } from '../utils/queryString';
import { createUpdateSSOrder } from '../utils/shipStation';
import { updateUserColumn, updateOrderColumn, getGroupOrders, listAdminDynamoDB } from '../utils/lambdaFunctions';

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
    const measure = this.props.content['userid'];
    const email = this.props.content['email'];
    const versionSide = this.props.content['versionSide'];
    const userObject = this.props.content;
    if (!userObject.userid) {
      userObject.userid = userObject.userId;
    }

    const { latestKeys, signedUriArray } = await getSignedUriArray(this.props.user, userObject); // user is adminIdentityId, measure is clientIdentityId
    this.setState({ showPortal: true, signedUriArray, latestKeys, measure, email });
  };
  render() {
    const title = this.props.title ? this.props.title : 'Open Photogrammetry Workbench';

    return (
      <React.Fragment>
        <button style={this.props.itemStyle} onClick={this.openWorkbench}>
          {title}
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

class AdminAccess extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPortal: false,
      adminList: [],
      admins: ''
    };
    this.handleAdminAccessChange = this.handleAdminAccessChange.bind(this);
  }

  openAdminAccess = async () => {
    const adminList = await listAdminDynamoDB();
      this.setState({
        showPortal: true,
        adminList
      });
  };

  handleAdminAccessChange = admins => {
    const { content, updateAdminData } = this.props;
    this.setState({
      showPortal: false,
      admins
    });
    updateAdminData(content.userid, admins);
  };

  componentDidMount() {
    const { content } = this.props;
    this.setState({ admins: content.admins });
  }

  render() {
      const { content } = this.props;
      const { showPortal, adminList, admins } = this.state;

        return (
            <React.Fragment>
                <AdminAccessButton  style={this.props.itemStyle} onClick={this.openAdminAccess}>
                    {admins}
                </AdminAccessButton>
                {showPortal &&
                ReactDOM.createPortal(
                    <AdminAccessModal
                        clientId={content.userid}
                        adminList={adminList}
                        onUpdateAdminAccess={admins => this.handleAdminAccessChange(admins)}/>,
                    document.getElementById('layout')
                )}
            </React.Fragment>
        );
    }
}

class SelectFitStatus extends React.PureComponent {
  state = {
    value: this.props.value,
    isAdmin: this.props.user == 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea' || this.props.user == 'us-west-2:95a2f104-1308-42e3-bb65-033c4f9a6de4'
  };
  onChange = ev => {
    if (!this.state.isAdmin) {
      const value = ev.target.value;
      if (value == 'fittingValidated') return;
    }
    if (this.state.value != 'fittingValidated' && ev.target.value == 'fittingValidated')
      this.checkGroupOrdersForSS();
    this.setState({ value: ev.target.value });
    updateUserColumn(this.props.userId, this.props.columnName, ev.target.value);
  };

  checkGroupOrdersForSS = async () => {
    // find grouporders with id not shipped.
    let userGroupOrders = await getGroupOrders(this.props.userId);
    // console.log(userGroupOrders.rows);
    userGroupOrders.rows.map(groupOrder => {
      // console.log(groupOrder.grouporderstatus);
      if (groupOrder.grouporderstatus != 'shipped') {
        this.createUpdateSSWrapper(groupOrder);
      }
    })
  }

  createUpdateSSWrapper = groupOrder => {
    // then in createUpdateSS... get data from this.props.userData and the passed grouporder and associated shipping address
    // from grouporder delimit address string
    const userData = this.props.userData;

    const date = new Date();
    const isoString = date.toISOString();
    const firstName = userData && userData.firstname ? userData.firstname : '';
    const lastName = userData && userData.lastname ? userData.lastname : '';
    const name = `${firstName} ${lastName}`;

    const addressArray = groupOrder.shippingaddress.split('|');
    const addressObject = {
      name,
      street1: addressArray[1],
      street2: addressArray[2],
      city: addressArray[3],
      state: addressArray[4],
      postalCode: addressArray[6],
      country: addressArray[5]
    };

    createUpdateSSOrder({
      orderNumber: groupOrder.grouporderid,
      orderKey: groupOrder.grouporderid,
      orderDate: isoString,
      orderStatus: 'awaiting_shipment',
      customerUsername: userData.userid,
      customerEmail: userData.email,
      billTo: {
        name,
      },
      shipTo: addressObject
    });
  }

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
  toggleVisible,
  updateListAdminData
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

    handleAdminDataUpdate = (userid, admins) => {
      this.props.handleAdminDataUpdate(userid, admins);
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '120px',
        height: '50px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        marginLeft: '8px',
        textAlign: 'left',
        backgroundColor: !this.state.visible ? '#ff0000' : 'transparent',
        wordBreak: 'break-all'
      };

      const orderStatusStyle = {
        padding: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '160px',
        height: '50px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        marginLeft: '8px',
        textAlign: 'left',
        backgroundColor: !this.state.visible ? '#ff0000' : 'transparent'
      };

      const modelStyle = {
        padding: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80px',
        height: '50px',
        boxSizing: 'border-box',
        marginLeft: '8px',
        backgroundColor: '#f8bfa0',
        borderRadius: '5px',
        marginRight: '40px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 700
      };

      const selectStyle = {
        display: 'inline-block',
        width: '120px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        boxSizing: 'border-box',
        marginLeft: '8px',
        backgroundColor: 'rgba(255,0,0,0.3)',
        marginTop: '1px',
        marginBottom: '1px',
        textAlign: 'left',
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
              {list.length - index}
            </div>
            {tableId == 'users' && (user == 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea' || user == 'us-west-2:95a2f104-1308-42e3-bb65-033c4f9a6de4') && <ToggleVisibleButton onClick={this.clickToggleVisible}>{toggleText}</ToggleVisibleButton>}
            {tableProps.map((prop, i) => {
              if (table[i] == '' || table[i] == '3D Model' || table[i] == 'Modeler') {
                if (tableProps[i] === 'adminaccess') {
                  return <AdminAccess
                      itemStyle={itemStyle}
                      content={content}
                      updateAdminData={(userid, admins) => this.handleAdminDataUpdate(userid, admins)}
                  />;
                } else if (tableProps[i] === '3dmodel') {
                  return <Workbench itemStyle={modelStyle} index={index} user={user} content={content} title='3D' />;
                } else {
                  return <Workbench itemStyle={itemStyle} index={index} user={user} content={content}/>;
                }
              } else if (tableProps[i] == 'userId') {
                return (
                    <CopyToClipboard text={content['userId']} onCopy={() => {}}>
                      <div style={{...itemStyle, fontSize: '12px'}}>{content['userId']}</div>
                    </CopyToClipboard>
                );
              } else if (tableProps[i] == 'fitstatus' || tableProps[i] == 'fitStatus') {
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
                    userData={content}
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
                    { content['picuri1'] ?
                      <a target="_blank" href={content['picuri1']}>Open image link</a>
                      :
                      <div />
                    }
                    {/* <img src={content['picuri1']} style={{ minWidth: '50%', minHeight: '50%', maxWidth: '200px', maxHeight: '60px' }} /> */}
                  </div>
                );
              } else if (tableProps[i] == 'shippingaddress') {
                const shippingAddress = content['shippingaddress'];
                const formattedAddress = typeof shippingAddress == 'string' ? shippingAddress.split('|').join(' ') : '';

                return (
                    <CopyToClipboard text={formattedAddress} onCopy={() => {}}>
                      <div style={itemStyle}>{formattedAddress}</div>
                    </CopyToClipboard>
                );
              } else if (tableProps[i] == 'orderstatusout') {
                return (
                    <CopyToClipboard text={content['orderstatusout']} onCopy={() => {}}>
                      <div style={{...orderStatusStyle, fontWeight: 700, textTransform: 'uppercase'}}>{content['orderstatusout']}</div>
                    </CopyToClipboard>
                );
              } else if (tableProps[i] == 'reviewDetails') {
                return (
                    <OrderReviewDetails data={content} />
                )
              } else if (tableProps[i] == 'reviewOrderStatus') {
                return (
                    <OrderReviewSelectStatus
                        selectStyle={selectStyle}
                        reviewId={content['reviewId']}
                        fit={content['reviewStatus']}
                        value={content[prop]}
                        columnName={prop}
                    />
                )
              } else if (tableProps[i] == 'reviewComments') {
                return (
                    <ReviewComments
                      reviewId={content['reviewId']}
                      columnName={prop}
                      comments={content[prop]}
                    />
                )
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

  return list.map((content, index) => {
    const style = {
      height: '60px',
      width: '100%',
      display: 'flex',
      flexDirection: 'row-reverse',
      flexShrink: 0,
      alignItems: 'center',
      background: content.bgColor
    };
    return <RowRenderer
        index={index}
        key={uuid.v1()}
        style={style}
        content={content}
        handleAdminDataUpdate={(userid, admins) => updateListAdminData ? updateListAdminData(userid, admins) : null}
    />;
    // return rowRenderer({ index, key: uuid.v1(), style, content: item });
  });
};
