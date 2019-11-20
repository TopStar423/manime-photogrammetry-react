export const PRODUCTION_COLUMN_DESCRIPTION = [
    'Shopify Order #',
    'Order Status',
    '3D Model',
    'Email',
    'Full Name',
    'Product',
    'Modeler',
    'Fit Status',
    'Payment',
    'Order Date',
    'Shipping Info',
    'Shopify Order # (Long)',
    'Shopify status'
];

export const PRODUCTION_COLUMN_PROPERTIES = [
    'shopifyordernumber',
    'orderstatusout',
    '3dmodel',
    'email',
    'fullname',
    'product',
    'adminaccess',
    'fitStatus',
    'payment',
    'date',
    'shippingaddress',
    'orderid',
    'shopifystatus'
];

export const PRODUCTION_COLUMN_PROPERTIES_TYPE = [
    'text',
    'menu',
    'OPEN_PHOTOGRAMMETRY',
    'text',
    'text',
    'modal',
    'ADD_ADMIN_ACCESS',
    'text',
    'text',
    'time',
    'text',
    'modal',
    'text'
];

export const pathName = '/orders/production/read';
export const tableName = 'orders';
export const endpoint = 'RDSLambda';

export const orderStatusOptions = [
    { value: 'allstatus', label: 'Status' },
    { value: 'invalidshippinginfo', label: 'Invalid Shipping Info' },
    { value: 'invalidpictures', label: 'Invalid Pictures' },
    { value: 'tobemodeled', label: 'To Be Modeled' },
    { value: 'tobereviewed', label: 'To Be Reviewed' },
    { value: 'tobeprinted', label: 'To Be Printed' }
];

