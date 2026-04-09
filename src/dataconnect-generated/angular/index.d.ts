import { ListAllProductsData, GetProductByIdData, GetProductByIdVariables, CreateProductData, CreateProductVariables, UpdateProductStockData, UpdateProductStockVariables, ListAllSalesData, CreateSaleData, CreateSaleVariables } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise} from '@angular/fire/data-connect';
import { CreateQueryResult, CreateMutationResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions, CreateDataConnectMutationResult, DataConnectMutationOptionsUndefinedMutationFn } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

export type ListAllProductsOptions = () => Omit<CreateDataConnectQueryOptions<ListAllProductsData, undefined>, 'queryFn'>;
export function injectListAllProducts(options?: ListAllProductsOptions, injector?: Injector): CreateDataConnectQueryResult<ListAllProductsData, undefined>;

type GetProductByIdArgs = GetProductByIdVariables | (() => GetProductByIdVariables);
export type GetProductByIdOptions = () => Omit<CreateDataConnectQueryOptions<GetProductByIdData, GetProductByIdVariables>, 'queryFn'>;
export function injectGetProductById(args: GetProductByIdArgs, options?: GetProductByIdOptions, injector?: Injector): CreateDataConnectQueryResult<GetProductByIdData, GetProductByIdVariables>;

type CreateProductOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateProductData, FirebaseError, CreateProductVariables>;
export function injectCreateProduct(options?: CreateProductOptions, injector?: Injector): CreateDataConnectMutationResult<CreateProductData, CreateProductVariables, CreateProductVariables>;

type UpdateProductStockOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateProductStockData, FirebaseError, UpdateProductStockVariables>;
export function injectUpdateProductStock(options?: UpdateProductStockOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateProductStockData, UpdateProductStockVariables, UpdateProductStockVariables>;

export type ListAllSalesOptions = () => Omit<CreateDataConnectQueryOptions<ListAllSalesData, undefined>, 'queryFn'>;
export function injectListAllSales(options?: ListAllSalesOptions, injector?: Injector): CreateDataConnectQueryResult<ListAllSalesData, undefined>;

type CreateSaleOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateSaleData, FirebaseError, CreateSaleVariables>;
export function injectCreateSale(options?: CreateSaleOptions, injector?: Injector): CreateDataConnectMutationResult<CreateSaleData, CreateSaleVariables, CreateSaleVariables>;
