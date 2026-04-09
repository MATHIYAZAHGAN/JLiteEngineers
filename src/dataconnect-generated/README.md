# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `Angular README`, you can find it at [`dataconnect-generated/angular/README.md`](./angular/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAllProducts*](#listallproducts)
  - [*GetProductById*](#getproductbyid)
  - [*ListAllSales*](#listallsales)
- [**Mutations**](#mutations)
  - [*CreateProduct*](#createproduct)
  - [*UpdateProductStock*](#updateproductstock)
  - [*CreateSale*](#createsale)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAllProducts
You can execute the `ListAllProducts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllProducts(): QueryPromise<ListAllProductsData, undefined>;

interface ListAllProductsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllProductsData, undefined>;
}
export const listAllProductsRef: ListAllProductsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllProducts(dc: DataConnect): QueryPromise<ListAllProductsData, undefined>;

interface ListAllProductsRef {
  ...
  (dc: DataConnect): QueryRef<ListAllProductsData, undefined>;
}
export const listAllProductsRef: ListAllProductsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllProductsRef:
```typescript
const name = listAllProductsRef.operationName;
console.log(name);
```

### Variables
The `ListAllProducts` query has no variables.
### Return Type
Recall that executing the `ListAllProducts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllProductsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllProducts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllProducts } from '@dataconnect/generated';


// Call the `listAllProducts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllProducts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllProducts(dataConnect);

console.log(data.products);

// Or, you can use the `Promise` API.
listAllProducts().then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

### Using `ListAllProducts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllProductsRef } from '@dataconnect/generated';


// Call the `listAllProductsRef()` function to get a reference to the query.
const ref = listAllProductsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllProductsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.products);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

## GetProductById
You can execute the `GetProductById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getProductById(vars: GetProductByIdVariables): QueryPromise<GetProductByIdData, GetProductByIdVariables>;

interface GetProductByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProductByIdVariables): QueryRef<GetProductByIdData, GetProductByIdVariables>;
}
export const getProductByIdRef: GetProductByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProductById(dc: DataConnect, vars: GetProductByIdVariables): QueryPromise<GetProductByIdData, GetProductByIdVariables>;

interface GetProductByIdRef {
  ...
  (dc: DataConnect, vars: GetProductByIdVariables): QueryRef<GetProductByIdData, GetProductByIdVariables>;
}
export const getProductByIdRef: GetProductByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProductByIdRef:
```typescript
const name = getProductByIdRef.operationName;
console.log(name);
```

### Variables
The `GetProductById` query requires an argument of type `GetProductByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProductByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetProductById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProductByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetProductById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProductById, GetProductByIdVariables } from '@dataconnect/generated';

// The `GetProductById` query requires an argument of type `GetProductByIdVariables`:
const getProductByIdVars: GetProductByIdVariables = {
  id: ..., 
};

// Call the `getProductById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProductById(getProductByIdVars);
// Variables can be defined inline as well.
const { data } = await getProductById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProductById(dataConnect, getProductByIdVars);

console.log(data.product);

// Or, you can use the `Promise` API.
getProductById(getProductByIdVars).then((response) => {
  const data = response.data;
  console.log(data.product);
});
```

### Using `GetProductById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProductByIdRef, GetProductByIdVariables } from '@dataconnect/generated';

// The `GetProductById` query requires an argument of type `GetProductByIdVariables`:
const getProductByIdVars: GetProductByIdVariables = {
  id: ..., 
};

// Call the `getProductByIdRef()` function to get a reference to the query.
const ref = getProductByIdRef(getProductByIdVars);
// Variables can be defined inline as well.
const ref = getProductByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProductByIdRef(dataConnect, getProductByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.product);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.product);
});
```

## ListAllSales
You can execute the `ListAllSales` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAllSales(): QueryPromise<ListAllSalesData, undefined>;

interface ListAllSalesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllSalesData, undefined>;
}
export const listAllSalesRef: ListAllSalesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllSales(dc: DataConnect): QueryPromise<ListAllSalesData, undefined>;

interface ListAllSalesRef {
  ...
  (dc: DataConnect): QueryRef<ListAllSalesData, undefined>;
}
export const listAllSalesRef: ListAllSalesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllSalesRef:
```typescript
const name = listAllSalesRef.operationName;
console.log(name);
```

### Variables
The `ListAllSales` query has no variables.
### Return Type
Recall that executing the `ListAllSales` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllSalesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllSales`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllSales } from '@dataconnect/generated';


// Call the `listAllSales()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllSales();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllSales(dataConnect);

console.log(data.sales);

// Or, you can use the `Promise` API.
listAllSales().then((response) => {
  const data = response.data;
  console.log(data.sales);
});
```

### Using `ListAllSales`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllSalesRef } from '@dataconnect/generated';


// Call the `listAllSalesRef()` function to get a reference to the query.
const ref = listAllSalesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllSalesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.sales);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.sales);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateProduct
You can execute the `CreateProduct` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createProduct(vars: CreateProductVariables): MutationPromise<CreateProductData, CreateProductVariables>;

interface CreateProductRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProductVariables): MutationRef<CreateProductData, CreateProductVariables>;
}
export const createProductRef: CreateProductRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProduct(dc: DataConnect, vars: CreateProductVariables): MutationPromise<CreateProductData, CreateProductVariables>;

interface CreateProductRef {
  ...
  (dc: DataConnect, vars: CreateProductVariables): MutationRef<CreateProductData, CreateProductVariables>;
}
export const createProductRef: CreateProductRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProductRef:
```typescript
const name = createProductRef.operationName;
console.log(name);
```

### Variables
The `CreateProduct` mutation requires an argument of type `CreateProductVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProductVariables {
  name: string;
  price: number;
  currentStock: number;
  createdAt: TimestampString;
  description?: string | null;
  imageUrl?: string | null;
}
```
### Return Type
Recall that executing the `CreateProduct` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProductData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProductData {
  product_insert: Product_Key;
}
```
### Using `CreateProduct`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProduct, CreateProductVariables } from '@dataconnect/generated';

// The `CreateProduct` mutation requires an argument of type `CreateProductVariables`:
const createProductVars: CreateProductVariables = {
  name: ..., 
  price: ..., 
  currentStock: ..., 
  createdAt: ..., 
  description: ..., // optional
  imageUrl: ..., // optional
};

// Call the `createProduct()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProduct(createProductVars);
// Variables can be defined inline as well.
const { data } = await createProduct({ name: ..., price: ..., currentStock: ..., createdAt: ..., description: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProduct(dataConnect, createProductVars);

console.log(data.product_insert);

// Or, you can use the `Promise` API.
createProduct(createProductVars).then((response) => {
  const data = response.data;
  console.log(data.product_insert);
});
```

### Using `CreateProduct`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProductRef, CreateProductVariables } from '@dataconnect/generated';

// The `CreateProduct` mutation requires an argument of type `CreateProductVariables`:
const createProductVars: CreateProductVariables = {
  name: ..., 
  price: ..., 
  currentStock: ..., 
  createdAt: ..., 
  description: ..., // optional
  imageUrl: ..., // optional
};

// Call the `createProductRef()` function to get a reference to the mutation.
const ref = createProductRef(createProductVars);
// Variables can be defined inline as well.
const ref = createProductRef({ name: ..., price: ..., currentStock: ..., createdAt: ..., description: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProductRef(dataConnect, createProductVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.product_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.product_insert);
});
```

## UpdateProductStock
You can execute the `UpdateProductStock` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProductStock(vars: UpdateProductStockVariables): MutationPromise<UpdateProductStockData, UpdateProductStockVariables>;

interface UpdateProductStockRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProductStockVariables): MutationRef<UpdateProductStockData, UpdateProductStockVariables>;
}
export const updateProductStockRef: UpdateProductStockRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProductStock(dc: DataConnect, vars: UpdateProductStockVariables): MutationPromise<UpdateProductStockData, UpdateProductStockVariables>;

interface UpdateProductStockRef {
  ...
  (dc: DataConnect, vars: UpdateProductStockVariables): MutationRef<UpdateProductStockData, UpdateProductStockVariables>;
}
export const updateProductStockRef: UpdateProductStockRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProductStockRef:
```typescript
const name = updateProductStockRef.operationName;
console.log(name);
```

### Variables
The `UpdateProductStock` mutation requires an argument of type `UpdateProductStockVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProductStockVariables {
  id: UUIDString;
  currentStock: number;
}
```
### Return Type
Recall that executing the `UpdateProductStock` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProductStockData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProductStockData {
  product_update?: Product_Key | null;
}
```
### Using `UpdateProductStock`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProductStock, UpdateProductStockVariables } from '@dataconnect/generated';

// The `UpdateProductStock` mutation requires an argument of type `UpdateProductStockVariables`:
const updateProductStockVars: UpdateProductStockVariables = {
  id: ..., 
  currentStock: ..., 
};

// Call the `updateProductStock()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProductStock(updateProductStockVars);
// Variables can be defined inline as well.
const { data } = await updateProductStock({ id: ..., currentStock: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProductStock(dataConnect, updateProductStockVars);

console.log(data.product_update);

// Or, you can use the `Promise` API.
updateProductStock(updateProductStockVars).then((response) => {
  const data = response.data;
  console.log(data.product_update);
});
```

### Using `UpdateProductStock`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProductStockRef, UpdateProductStockVariables } from '@dataconnect/generated';

// The `UpdateProductStock` mutation requires an argument of type `UpdateProductStockVariables`:
const updateProductStockVars: UpdateProductStockVariables = {
  id: ..., 
  currentStock: ..., 
};

// Call the `updateProductStockRef()` function to get a reference to the mutation.
const ref = updateProductStockRef(updateProductStockVars);
// Variables can be defined inline as well.
const ref = updateProductStockRef({ id: ..., currentStock: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProductStockRef(dataConnect, updateProductStockVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.product_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.product_update);
});
```

## CreateSale
You can execute the `CreateSale` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createSale(vars: CreateSaleVariables): MutationPromise<CreateSaleData, CreateSaleVariables>;

interface CreateSaleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSaleVariables): MutationRef<CreateSaleData, CreateSaleVariables>;
}
export const createSaleRef: CreateSaleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSale(dc: DataConnect, vars: CreateSaleVariables): MutationPromise<CreateSaleData, CreateSaleVariables>;

interface CreateSaleRef {
  ...
  (dc: DataConnect, vars: CreateSaleVariables): MutationRef<CreateSaleData, CreateSaleVariables>;
}
export const createSaleRef: CreateSaleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSaleRef:
```typescript
const name = createSaleRef.operationName;
console.log(name);
```

### Variables
The `CreateSale` mutation requires an argument of type `CreateSaleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSaleVariables {
  saleDate: DateString;
  totalAmount: number;
  createdAt: TimestampString;
  customerName?: string | null;
}
```
### Return Type
Recall that executing the `CreateSale` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSaleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSaleData {
  sale_insert: Sale_Key;
}
```
### Using `CreateSale`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSale, CreateSaleVariables } from '@dataconnect/generated';

// The `CreateSale` mutation requires an argument of type `CreateSaleVariables`:
const createSaleVars: CreateSaleVariables = {
  saleDate: ..., 
  totalAmount: ..., 
  createdAt: ..., 
  customerName: ..., // optional
};

// Call the `createSale()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSale(createSaleVars);
// Variables can be defined inline as well.
const { data } = await createSale({ saleDate: ..., totalAmount: ..., createdAt: ..., customerName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSale(dataConnect, createSaleVars);

console.log(data.sale_insert);

// Or, you can use the `Promise` API.
createSale(createSaleVars).then((response) => {
  const data = response.data;
  console.log(data.sale_insert);
});
```

### Using `CreateSale`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSaleRef, CreateSaleVariables } from '@dataconnect/generated';

// The `CreateSale` mutation requires an argument of type `CreateSaleVariables`:
const createSaleVars: CreateSaleVariables = {
  saleDate: ..., 
  totalAmount: ..., 
  createdAt: ..., 
  customerName: ..., // optional
};

// Call the `createSaleRef()` function to get a reference to the mutation.
const ref = createSaleRef(createSaleVars);
// Variables can be defined inline as well.
const ref = createSaleRef({ saleDate: ..., totalAmount: ..., createdAt: ..., customerName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSaleRef(dataConnect, createSaleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.sale_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.sale_insert);
});
```

