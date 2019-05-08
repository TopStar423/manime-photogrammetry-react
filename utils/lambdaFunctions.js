import { API } from 'aws-amplify';

export const updateUserColumn = (identityId, columnName, columnValue) => {
  let userData = {
    userid: identityId,
    columnname: columnName,
    columnvalue: columnValue
  };
  let userInit = {
    body: userData,
    headers: { 'Content-Type': 'application/json' }
  };
  API.post('LambdaRDS', '/users/update/column', userInit)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

export const updateOrderColumn = (orderId, columnName, columnValue) => {
  let orderData = {
    orderId,
    columnname: columnName,
    columnvalue: columnValue
  };
  let userInit = {
    body: orderData,
    headers: { 'Content-Type': 'application/json' }
  };
  API.post('LambdaRDS', '/orders/update/column', userInit)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

export const getNailProducts = async versionNumber => {
  let apiName = 'LambdaRDSCompany';
  let path = `/nailproducts/read/version/${versionNumber}`;

  return API.get(apiName, path);
};

export const getNailProductItem = async nailProductId => {
  let apiName = 'LambdaRDSCompany';
  let path = `/nailproducts/read/item/${nailProductId}`;

  return await API.get(apiName, path);
};

export const getCustomerCards = async customerId => {
  const userData = {};
  const userInit = {
    body: userData,
    headers: { 'Content-Type': 'application/json' }
  };
  const response = await API.get('LambdaPayment', `/cards/list/${customerId}`, userInit);
  return response;
};

export const addShippingAddress = async body => {
  // [req.body.shippingAddressId, req.body.userId, req.body.name, req.body.addressLine1, req.body.addressCity, req.body.addressZip, req.body.addressState, req.body.addressCountry, req.body.addressLatitude,
  // req.body.addressLongitude];
  const userInit = {
    body,
    headers: { 'Content-Type': 'application/json' }
  };
  const response = await API.post(
    'LambdaRDSClientNoncritical',
    '/shippingaddresses/create',
    userInit
  );
  return response;
};

export const getShippingAddresses = async identityId => {
  const userInit = {
    headers: { 'Content-Type': 'application/json' }
  };
  const response = await API.get(
    'LambdaRDSClientNoncritical',
    `/shippingaddresses/read/${identityId}`,
    userInit
  );
  return response;
};

export const getGroupOrders = async identityId => {
  const userInit = {
    headers: { 'Content-Type': 'application/json' }
  };
  const response = await API.get(
    'LambdaRDS',
    `/grouporders/read/${identityId}`,
    userInit
  );
  return response;
};

export const getOrders = async groupOrderId => {
  const userInit = {
    headers: { 'Content-Type': 'application/json' }
  };
  const response = await API.get(
    'LambdaRDS',
    `/orders/read/${groupOrderId}`,
    userInit
  );
  return response;
};

// LambdaServer
export const rotateImage = async (identityId, angle, fileName) => {
  const userInit = {
    body: { identityId, angle, fileName },
    headers: { 'Content-Type': 'application/json' }
  };
  const response = await API.post(
    'LambdaServer',
    '/image/rotate',
    userInit
  );
  return response;
};

export const sendEmail = async dynamicData => {
  const userInit = {
    body: { ...dynamicData },
    headers: { 'Content-Type': 'application/json' }
  };

  // const response = await API.post('LambdaServer', '/email', userInit);
  // return response;
  return null;
}


// Subscription
export const getSubscription = async stripeId => {
  if (!stripeId) return null;
  const response = await API.get('LambdaPayment', `/subscription/retrieve/${stripeId}`);
  return response;
}

export const cancelSubscription = async subscriptionId => {
  if (!subscriptionId) return null;
  const response = await API.post('LambdaPayment', `/subscription/cancel/${subscriptionId}`);
  return response;
}

export const resumeSubscription = async subscriptionId => {
  if (!subscriptionId) return null;
  // if null, that means this user does not have any subscriptions, we need to subscribe this user to a new subscription with the right plan.
  const response = await API.post('LambdaPayment', `/subscription/resume/${subscriptionId}`);
  return response;
}

// Test this function
export const startSubscription = async (subscriptionPlan, customerId, discountCode) => {
  let userData = {
    pricingPlan: subscriptionPlan,
    customerId,
    discountCode: discountCode.toLowerCase()
  };
  let userInit = {
    body: userData,
    headers: { 'Content-Type': 'application/json' }
  };

  API.post('LambdaPayment', '/subscription/subscribe', userInit)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
}

// Retry
const API_RETRIES = 7;
const INIT_TIMEOUT = 2000;

function wait(waitTime) { return new Promise(resolve => setTimeout(resolve, waitTime)) }

function retryAPI(apiName, path, myInit, waitTime, retry) {
  if (retry < 0) return Promise.reject(apiName+path);

  return API.post(apiName, path, myInit)
  .catch(error => {
    return wait(waitTime).then(() => retryAPI(apiName, path, myInit, waitTime * 2, retry - 1));
  });
}
