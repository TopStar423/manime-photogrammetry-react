export const COMBINED_ORDERS_COLUMN_DESCRIPTION = [
    '',
    '_Email',
    'Nail Description',
    'Shipping Address',
    'Fit Status',
    'User ID',
    'Order ID',
    'Group Order ID',
    'Nail Product ID',
    'Order Status',
    'Date Created'
];

export const COMBINED_ORDERS_COLUMN_PROPERTIES = [
    'userid',
    'email',
    'description',
    'shippingaddress',
    'fitstatus',
    'userid',
    'orderid',
    'grouporderid',
    'nailproductid',
    'orderstatus',
    'datecreated'
];

export const COMBINED_ORDERS_COLUMN_PROPERTIES_TYPE = [
    'OPEN_PHOTOGRAMMETRY',
    'text',
    'text',
    'text',
    'modal',
    'modal',
    'modal',
    'modal',
    'menu',
    'time'
];

export const pathName = '/orders/cms/read/combined';
export const tableName = 'combinedorders';
export const endpoint = 'LambdaRDSClient';
