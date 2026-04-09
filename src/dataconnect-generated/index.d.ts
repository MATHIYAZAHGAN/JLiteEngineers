import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateProductData {
  product_insert: Product_Key;
}

export interface CreateProductVariables {
  name: string;
  price: number;
  currentStock: number;
  createdAt: TimestampString;
  description?: string | null;
  imageUrl?: string | null;
}

export interface CreateSaleData {
  sale_insert: Sale_Key;
}

export interface CreateSaleVariables {
  saleDate: DateString;
  totalAmount: number;
  createdAt: TimestampString;
  customerName?: string | null;
}

export interface GetProductByIdData {
  product?: {
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
    currentStock: number;
    imageUrl?: string | null;
    barcode?: string | null;
    discontinued?: boolean | null;
    category?: {
      id: UUIDString;
      name: string;
    } & Category_Key;
  } & Product_Key;
}

export interface GetProductByIdVariables {
  id: UUIDString;
}

export interface ListAllProductsData {
  products: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
    currentStock: number;
    imageUrl?: string | null;
    category?: {
      id: UUIDString;
      name: string;
    } & Category_Key;
  } & Product_Key)[];
}

export interface ListAllSalesData {
  sales: ({
    id: UUIDString;
    saleDate: DateString;
    totalAmount: number;
    customerName?: string | null;
    processedBy?: {
      id: UUIDString;
      username: string;
    } & User_Key;
  } & Sale_Key)[];
}

export interface Product_Key {
  id: UUIDString;
  __typename?: 'Product_Key';
}

export interface SaleItem_Key {
  saleId: UUIDString;
  productId: UUIDString;
  __typename?: 'SaleItem_Key';
}

export interface Sale_Key {
  id: UUIDString;
  __typename?: 'Sale_Key';
}

export interface UpdateProductStockData {
  product_update?: Product_Key | null;
}

export interface UpdateProductStockVariables {
  id: UUIDString;
  currentStock: number;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface ListAllProductsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllProductsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllProductsData, undefined>;
  operationName: string;
}
export const listAllProductsRef: ListAllProductsRef;

export function listAllProducts(): QueryPromise<ListAllProductsData, undefined>;
export function listAllProducts(dc: DataConnect): QueryPromise<ListAllProductsData, undefined>;

interface GetProductByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProductByIdVariables): QueryRef<GetProductByIdData, GetProductByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProductByIdVariables): QueryRef<GetProductByIdData, GetProductByIdVariables>;
  operationName: string;
}
export const getProductByIdRef: GetProductByIdRef;

export function getProductById(vars: GetProductByIdVariables): QueryPromise<GetProductByIdData, GetProductByIdVariables>;
export function getProductById(dc: DataConnect, vars: GetProductByIdVariables): QueryPromise<GetProductByIdData, GetProductByIdVariables>;

interface CreateProductRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProductVariables): MutationRef<CreateProductData, CreateProductVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProductVariables): MutationRef<CreateProductData, CreateProductVariables>;
  operationName: string;
}
export const createProductRef: CreateProductRef;

export function createProduct(vars: CreateProductVariables): MutationPromise<CreateProductData, CreateProductVariables>;
export function createProduct(dc: DataConnect, vars: CreateProductVariables): MutationPromise<CreateProductData, CreateProductVariables>;

interface UpdateProductStockRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProductStockVariables): MutationRef<UpdateProductStockData, UpdateProductStockVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProductStockVariables): MutationRef<UpdateProductStockData, UpdateProductStockVariables>;
  operationName: string;
}
export const updateProductStockRef: UpdateProductStockRef;

export function updateProductStock(vars: UpdateProductStockVariables): MutationPromise<UpdateProductStockData, UpdateProductStockVariables>;
export function updateProductStock(dc: DataConnect, vars: UpdateProductStockVariables): MutationPromise<UpdateProductStockData, UpdateProductStockVariables>;

interface ListAllSalesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllSalesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllSalesData, undefined>;
  operationName: string;
}
export const listAllSalesRef: ListAllSalesRef;

export function listAllSales(): QueryPromise<ListAllSalesData, undefined>;
export function listAllSales(dc: DataConnect): QueryPromise<ListAllSalesData, undefined>;

interface CreateSaleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSaleVariables): MutationRef<CreateSaleData, CreateSaleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSaleVariables): MutationRef<CreateSaleData, CreateSaleVariables>;
  operationName: string;
}
export const createSaleRef: CreateSaleRef;

export function createSale(vars: CreateSaleVariables): MutationPromise<CreateSaleData, CreateSaleVariables>;
export function createSale(dc: DataConnect, vars: CreateSaleVariables): MutationPromise<CreateSaleData, CreateSaleVariables>;

