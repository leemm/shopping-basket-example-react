import PropTypes from 'prop-types';
import { Card, Flex, Text, Box, IconButton } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import {formatCurrency} from './../utils';

const Product = ({ id, name, price, onModifyBasket }) => {
  return (
    <Card variant="classic" style={{'marginBottom':'10px'}}>
      <Flex justify="between">
        <Box style={{'order': '-1'}}>
          <Text as="div" size="2" weight="bold">{name}</Text>
          <Text as="div" size="2" color="gray">
            {formatCurrency(price)}
          </Text>
        </Box>
        <Box>
          <IconButton color="gray" style={{ 'cursor': 'pointer' }} variant="surface" onClick={() => onModifyBasket(id, 1)}>
            <PlusIcon />
          </IconButton>
        </Box>
      </Flex>
    </Card>
  );
};

Product.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  onModifyBasket: PropTypes.func,
};

export default Product;