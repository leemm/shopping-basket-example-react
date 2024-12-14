import PropTypes from 'prop-types';
import { 
  Flex,
  Heading,
  Text,
  Button,
  Separator } from '@radix-ui/themes';
import BasketItem from './BasketItem';
import { applyOffers, getBasketItems, getSubtotalPriceOfBasket, getDiscountPriceOfBasket, getTotalBasketQuantity, getTotalPriceOfBasket } from './Basket.utils';
import {formatCurrency} from './../utils';

/**
 * A reusable Basket component that displays a list of items, and 
 * a breakdown of subtotal, discount, and total price.
 * 
 * products: An array of items from a catalogue i.e. 
 *          [{
 *              "id": 1,
 *              "name": "Baked Beans",
 *              "price": 0.99
 *          },
 *          ...]
 * 
 * offers: An array of currently available offers i.e.
 *          [{
 *              "productid": 1,
 *              "type": "multibuy",
 *              "threshold": 3
 *          },
 *          ...]
 * 
 * items: An array of items in the basket i.e.
 *          [{
 *               "productid": 6,
 *               "quantity": 3
 *          },
 *          ...]
 * 
 * onModifyBasket: State can also be optionally managed here. Callback function will return a productid and a quantity as 2 properties.
 * 
 * hideActions: bool that disables any action button e.g. clear basket, add/remove items.
 */

const Basket = ({ products, offers, items, onModifyBasket, hideActions }) => {

  let basketItems = getBasketItems(products, items);
  basketItems = applyOffers(basketItems, offers);
  const subtotalPrice = getSubtotalPriceOfBasket(basketItems);
  const discountPrice = getDiscountPriceOfBasket(basketItems);
  const totalPrice = getTotalPriceOfBasket(subtotalPrice, discountPrice);
  const quantity = getTotalBasketQuantity(basketItems);

  return (
    <Flex
      m="3"
      width="40%"
      position="sticky"
      top="4"
      maxHeight="calc(100vh - 40px)"
      overflow="auto"
      direction="column"
    >
      <Flex
        justify="between"
        align="center"
        mb="2"
      >
        <Heading size={1}>Basket {quantity ? `(${quantity})` : ''}</Heading>
      </Flex>

      {basketItems?.map((item) => (
        <BasketItem key={`basketproduct-${item.productid}`} item={item} onModifyBasket={onModifyBasket} hideActions={hideActions} />
      ))}

      <Separator style={{'margin': '10px 0 10px 0', 'width': '100%'}} />

      {quantity > 0 ? (
        <>
          <Flex
            justify="between"
            fontWeight="bold"
          >
            <Text fontWeight="bold">Sub-total:</Text>
            <Text fontWeight="bold" data-testid="subtotal-element">{formatCurrency(subtotalPrice)}</Text>
          </Flex>

          { discountPrice > 0 && 
            <Flex
              justify="between"
              fontWeight="bold"
            >
              <Text fontWeight="bold">Discount:</Text>
              <Text fontWeight="bold" data-testid="discount-element">{formatCurrency(discountPrice)}</Text>
            </Flex>
          }

          <Flex
            justify="between"
            fontWeight="bold"
            mb="5"
          >
            <Text fontWeight="bold">Total:</Text>
            <Text fontWeight="bold" data-testid="total-element">{formatCurrency(totalPrice)}</Text>
          </Flex>

          { !(hideActions === true) && quantity > 0 && (
            <Flex mt="auto" justify="end" gap="10">
              <Button variant="soft" mr="2" onClick={() => onModifyBasket(0, 999999)}>
                    Clear
              </Button>

              <Button variant="blue" onClick={() => console.log('checkout')}>
                Checkout
              </Button>
            </Flex>
          )}
        </>
      ) : (
        <Text mt="3">Your basket is empty!</Text>
      )}
    </Flex>
  );
};

Basket.propTypes = {
  products: PropTypes.array,
  offers: PropTypes.array,
  items: PropTypes.array,
  onModifyBasket: PropTypes.func,
  hideActions: PropTypes.bool
};

export default Basket;