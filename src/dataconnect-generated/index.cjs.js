const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'voltx',
  location: 'asia-east1'
};
exports.connectorConfig = connectorConfig;

const listAllProductsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllProducts');
}
listAllProductsRef.operationName = 'ListAllProducts';
exports.listAllProductsRef = listAllProductsRef;

exports.listAllProducts = function listAllProducts(dc) {
  return executeQuery(listAllProductsRef(dc));
};

const getProductByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProductById', inputVars);
}
getProductByIdRef.operationName = 'GetProductById';
exports.getProductByIdRef = getProductByIdRef;

exports.getProductById = function getProductById(dcOrVars, vars) {
  return executeQuery(getProductByIdRef(dcOrVars, vars));
};

const createProductRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProduct', inputVars);
}
createProductRef.operationName = 'CreateProduct';
exports.createProductRef = createProductRef;

exports.createProduct = function createProduct(dcOrVars, vars) {
  return executeMutation(createProductRef(dcOrVars, vars));
};

const updateProductStockRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProductStock', inputVars);
}
updateProductStockRef.operationName = 'UpdateProductStock';
exports.updateProductStockRef = updateProductStockRef;

exports.updateProductStock = function updateProductStock(dcOrVars, vars) {
  return executeMutation(updateProductStockRef(dcOrVars, vars));
};

const listAllSalesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllSales');
}
listAllSalesRef.operationName = 'ListAllSales';
exports.listAllSalesRef = listAllSalesRef;

exports.listAllSales = function listAllSales(dc) {
  return executeQuery(listAllSalesRef(dc));
};

const createSaleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSale', inputVars);
}
createSaleRef.operationName = 'CreateSale';
exports.createSaleRef = createSaleRef;

exports.createSale = function createSale(dcOrVars, vars) {
  return executeMutation(createSaleRef(dcOrVars, vars));
};
