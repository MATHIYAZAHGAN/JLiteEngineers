const { listAllProductsRef, getProductByIdRef, createProductRef, updateProductStockRef, listAllSalesRef, createSaleRef } = require('../');
const { DataConnect, CallerSdkTypeEnum } = require('@angular/fire/data-connect');
const { injectDataConnectQuery, injectDataConnectMutation } = require('@tanstack-query-firebase/angular/data-connect');
const { inject, EnvironmentInjector } = require('@angular/core');

exports.injectListAllProducts = function injectListAllProducts(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listAllProductsRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetProductById = function injectGetProductById(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getProductByIdRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateProduct = function injectCreateProduct(args, injector) {
  return injectDataConnectMutation(createProductRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateProductStock = function injectUpdateProductStock(args, injector) {
  return injectDataConnectMutation(updateProductStockRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListAllSales = function injectListAllSales(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listAllSalesRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectCreateSale = function injectCreateSale(args, injector) {
  return injectDataConnectMutation(createSaleRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

