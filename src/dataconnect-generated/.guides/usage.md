# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.


### Angular

The generated SDK creates injectable wrapper functions.

Here's an example:
```
import { injectListAllProducts, injectGetProductById, injectCreateProduct, injectUpdateProductStock, injectListAllSales, injectCreateSale } from '@dataconnect/generated/angular';

@Component({
  selector: 'my-component',
  ...
})
class MyComponent {
  // The types of these injectors are available in angular/index.d.ts
  private readonly ListAllProductsOperation = injectListAllProducts();
  private readonly GetProductByIdOperation = injectGetProductById(getProductByIdVars);
  private readonly CreateProductOperation = injectCreateProduct(createProductVars);
  private readonly UpdateProductStockOperation = injectUpdateProductStock(updateProductStockVars);
  private readonly ListAllSalesOperation = injectListAllSales();
  private readonly CreateSaleOperation = injectCreateSale(createSaleVars);
  }
```

Each operation is a wrapper function around Tanstack Query Angular.

Here's an example:
```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'simple-example',
  template: `
    @if (movies.isPending()) {
      Loading...
    }
    @if (movies.error()) {
      An error has occurred: {{ movies.error().message }}
    }
    @if (movies.data(); as data) {
      @for (movie of data.movies ; track
        movie.id) {
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.synopsis }}</p>
      }
    }
  `
})
export class SimpleExampleComponent {
  http = inject(HttpClient)

  movies = injectListMovies();
}
```




## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { listAllProducts, getProductById, createProduct, updateProductStock, listAllSales, createSale } from '@dataconnect/generated';


// Operation ListAllProducts: 
const { data } = await ListAllProducts(dataConnect);

// Operation GetProductById:  For variables, look at type GetProductByIdVars in ../index.d.ts
const { data } = await GetProductById(dataConnect, getProductByIdVars);

// Operation CreateProduct:  For variables, look at type CreateProductVars in ../index.d.ts
const { data } = await CreateProduct(dataConnect, createProductVars);

// Operation UpdateProductStock:  For variables, look at type UpdateProductStockVars in ../index.d.ts
const { data } = await UpdateProductStock(dataConnect, updateProductStockVars);

// Operation ListAllSales: 
const { data } = await ListAllSales(dataConnect);

// Operation CreateSale:  For variables, look at type CreateSaleVars in ../index.d.ts
const { data } = await CreateSale(dataConnect, createSaleVars);


```