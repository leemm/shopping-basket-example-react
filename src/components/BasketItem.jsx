import PropTypes from 'prop-types';
import { Box,
  Flex,
  Text,
  IconButton } from '@radix-ui/themes';
import {
  gray,
  grayDark
} from '@radix-ui/colors';
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';
import {formatCurrency} from './../utils';

const BasketItem = ({ item, onModifyBasket, hideActions }) => {
  return (
    <Flex
      key={item.productid}
      justify="between"
      color={grayDark.gray9}
      position="relative"
    >
      <Box>
        <Text style={{ color: gray.gray9 }}>
          {`${item.quantity}x `}
        </Text>
        <Text>{item.name}</Text>
        <Text as="div" style={{ color: gray.gray9 }}>{formatCurrency(item.totalPrice)}{item.discount ? ` (${item.discount})` : ''}</Text>
      </Box>

      {/* { !(hideActions === true) && 
        <Flex
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          gap="10"
        >
          <IconButton variant="surface" style={{'cursor': 'pointer'}}
            onClick={() => onModifyBasket(item.productid, -1)}
          >
            <MinusIcon />
          </IconButton>
          <IconButton variant="surface" style={{'cursor': 'pointer'}}
            onClick={() => onModifyBasket(item.productid, 1)}
          >
            <PlusIcon />
          </IconButton>
        </Flex>
      } */}
    </Flex>
  );
};

BasketItem.propTypes = {
  item: PropTypes.object,
  onModifyBasket: PropTypes.func,
  hideActions: PropTypes.bool
};

export default BasketItem;