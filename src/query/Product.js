import { makeExecutableSchema } from 'graphql-tools';
import Product from '../api/Product';
import { category } from './Category';
import { brands } from './Brand';

const productSchema = makeExecutableSchema({
  typeDefs: `
    type Products {
      totalCount: Int,
      result: [Product]
    }

    type Product {
      name: String,
      price: Float,
      image: String,
      url: String,
      rating: Int,
      brandId: Int,
      categoryId: Int,
      id: Int,
    }

    type ProductDetail {
      name: String,
      description: String,
      type: String,
      price: Float,
      image: String,
      url: String,
      free_shipping: Boolean,
      popularity: Int,
      rating: Int,
      categoryId: Int,
      brandId: Int,
      id: Int,
    }

    type Query {
      products(
        _limit: Int,
        _page: Int,
        _sort: String,
        _order: String,
        categorySlug: String,
        brandSlug: [String],
        q: String
      ): Products,
      product(id: Int): ProductDetail
    }
  `,
});

// query
const products = async (_, arg) => {
  if (arg.categorySlug) {
    const categoryItem = await category(_, { slug: arg.categorySlug });
    if (categoryItem) {
      arg.categoryId = categoryItem.id;
    }
    delete arg.categorySlug;
  }
  if (arg.brandSlug) {
    const brandArray = await brands(_, { slug: arg.brandSlug });
    if (brandArray) {
      arg.brandId = brandArray.result.map(i => i.id);
    }
    delete arg.brandSlug;
  }
  return Product.GET_PRODUCTS.call(null, arg);
};

const product = (_, arg) => {
  return Product.GET_PRODUCT.call(arg);
};

const productResolvers = {
  Query: {
    products,
    product,
  },
};

export { productSchema, productResolvers };
