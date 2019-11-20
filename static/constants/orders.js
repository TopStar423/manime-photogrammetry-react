export const ORDERS_COLUMN_DESCRIPTION = [
    '_Email',
    'Order ID',
    'Group Order ID',
    'Nail Product ID',
    'Nail Length',
    'Nail Shape',
    'Order Status',
    'Date Created'
];

export const ORDERS_COLUMN_PROPERTIES = [
    'email',
    'orderid',
    'grouporderid',
    'nailproductid',
    'naillength',
    'nailshape',
    'orderstatus',
    'datecreated'
];

export const ORDERS_COLUMN_PROPERTIES_TYPE = [
    'text',
    'modal',
    'modal',
    'modal',
    'text',
    'text',
    'menu',
    'time'
];

export const pathName = '/orders/cms/read';
export const tableName = 'orders';
export const endpoint = 'LambdaRDSClient';
