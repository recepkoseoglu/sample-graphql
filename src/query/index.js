import { productResolvers, productSchema } from './Product';
import { categoryResolvers, categorySchema } from './Category';
import { brandResolvers, brandSchema } from './Brand';
import { breadcrumbResolvers, breadcrumbSchema } from './Breadcrumb';
import { userResolvers, userSchema } from './User';
import { kindResolvers, kindSchema } from './Kinds';

export default {
  schemas: [
    userSchema,
    productSchema,
    categorySchema,
    brandSchema,
    breadcrumbSchema,
    kindSchema,
  ],
  resolvers: [
    userResolvers,
    productResolvers,
    categoryResolvers,
    brandResolvers,
    breadcrumbResolvers,
    kindResolvers,
  ],
};
