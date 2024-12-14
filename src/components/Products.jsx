import PropTypes from 'prop-types';
import { Grid } from '@radix-ui/themes';
import Product from './Product';

const Products = ({ products, onModifyBasket }) => {
  return (
    <Grid
      gap="16"
      columns={{ initial: '1', md: '1' }}
      minWidth="300px"
    >
      {products?.map((product, idx) => {
        return <Product key={`product-${idx}`} {...product} onModifyBasket={(id, quantity) => onModifyBasket(id, quantity)} />;
      })}
    </Grid>
  );
};

Products.propTypes = {
  products: PropTypes.array,
  onModifyBasket: PropTypes.func
};

export default Products;