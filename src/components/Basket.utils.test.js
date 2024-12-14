import { describe, expect, it, beforeAll } from 'vitest';
import { getBasketItems, applyOffers, getSubtotalPriceOfBasket, getDiscountPriceOfBasket, getTotalPriceOfBasket, getTotalBasketQuantity } from './Basket.utils';

describe('basket utils : getBasketItems', () => {

  let products = [];

  beforeAll(async () => {
    products = [
      {
        'id': 1,
        'name': 'Baked Beans',
        'price': 0.99
      },
      {
        'id': 2,
        'name': 'Biscuits',
        'price': 1.20
      },
      {
        'id': 3,
        'name': 'Sardines',
        'price': 1.89
      },
      {
        'id': 4,
        'name': 'Shampoo (Small)',
        'price': 2
      },
      {
        'id': 5,
        'name': 'Shampoo (Medium)',
        'price': 2.5
      },
      {
        'id': 6,
        'name': 'Shampoo (Large)',
        'price': 3.5
      }
    ];
  });

  it('should have 3 item objects', () => {
    const items = [
      {
        'productid': 6,
        'quantity': 3
      },
      {
        'productid': 4,
        'quantity': 2
      },
      {
        'productid': 5,
        'quantity': 1
      }
    ];

    const compare = [
      {
        'productid': 6,
        'quantity': 3,
        'name': 'Shampoo (Large)',
        'price': 3.5,
        'totalPrice': 10.5
      },
      {
        'productid': 4,
        'quantity': 2,
        'name': 'Shampoo (Small)',
        'price': 2,
        'totalPrice': 4
      },
      {
        'productid': 5,
        'quantity': 1,
        'name': 'Shampoo (Medium)',
        'price': 2.5,
        'totalPrice': 2.5
      }
    ];

    const basket = getBasketItems(products, items);
    
    expect(basket).toEqual(compare);
  });

  it('should not change the order of basket items', () => {
    const items = [
      {
        'productid': 6,
        'quantity': 3
      },
      {
        'productid': 4,
        'quantity': 2
      },
      {
        'productid': 5,
        'quantity': 1
      }
    ];

    const basket = getBasketItems(products, items);
    
    expect(basket[1].productid).toEqual(4);
  });

});

describe('basket utils: applyOffers', () => {

  it('multibuy offer, should add properties discount and discountPrice to basket item, and should equal the price for one item', () => {

    const offers = [
      {
        'productid': 1,
        'type': 'multibuy',
        'threshold': 3
      }
    ];

    const items = [
      {
        'productid': 1,
        'quantity': 3,
        'name': 'Shampoo (Large)',
        'price': 3.5,
        'totalPrice': 10.5
      }
    ];

    const basket = applyOffers(items, offers);

    expect(basket).toEqual([
      {
        'productid': 1,
        'quantity': 3,
        'name': 'Shampoo (Large)',
        'price': 3.5,
        'totalPrice': 10.5,
        'discount': 'Buy 2 get 1 free',
        'discountPrice': 3.5
      }
    ]);

    const subtotalPrice = getSubtotalPriceOfBasket(basket);
    const discountPrice = getDiscountPriceOfBasket(basket);
    const totalPrice = getTotalPriceOfBasket(subtotalPrice, discountPrice);
    const quantity = getTotalBasketQuantity(basket);

    // console.log('subtotalPrice', subtotalPrice);
    // console.log('discountPrice', discountPrice);
    // console.log('totalPrice', totalPrice);
    // console.log('quantity', quantity);

    expect(subtotalPrice).toEqual(10.5);
    expect(discountPrice).toEqual(3.5);
    expect(totalPrice).toEqual(7);
    expect(quantity).toEqual(3);

  });

  it('discount offer, should add properties discount and discountPrice to basket item, and should equal 25% off', () => {

    const offers = [
      {
        'productid': 1,
        'type': 'discount',
        'value': 25
      }
    ];

    const items = [
      {
        'productid': 1,
        'quantity': 1,
        'name': 'Sardines',
        'price': 1.89,
        'totalPrice': 1.89
      }
    ];

    const basket = applyOffers(items, offers);

    expect(basket).toEqual([
      {
        'productid': 1,
        'quantity': 1,
        'name': 'Sardines',
        'price': 1.89,
        'totalPrice': 1.89,
        'discount': '25% off',
        'discountPrice': 0.4725
      }
    ]);

    const subtotalPrice = getSubtotalPriceOfBasket(basket);
    const discountPrice = getDiscountPriceOfBasket(basket);
    const totalPrice = getTotalPriceOfBasket(subtotalPrice, discountPrice);
    const quantity = getTotalBasketQuantity(basket);

    expect(subtotalPrice).toEqual(1.89);
    expect(discountPrice).toEqual(0.4725);
    expect(totalPrice).toEqual(1.4175);
    expect(quantity).toEqual(1);

  });

  it('discount offer, should add properties discount and discountPrice to basket items, and should equal the cheapest', () => {

    const offers = [
      {
        'productids': [ 4, 5, 6 ],
        'type': 'cheapest',
        'threshold': 3
      }
    ];

    const items = [
      {
        'productid': 6,
        'quantity': 3,
        'name': 'Shampoo (Large)',
        'price': 3.5,
        'totalPrice': 10.5
      },
      {
        'productid': 4,
        'quantity': 2,
        'name': 'Shampoo (Small)',
        'price': 2,
        'totalPrice': 4
      },
      {
        'productid': 5,
        'quantity': 1,
        'name': 'Shampoo (Medium)',
        'price': 2.5,
        'totalPrice': 2.5
      }
    ];

    const basket = applyOffers(items, offers);

    expect(basket).toEqual([
      {
        'productid': 6,
        'quantity': 3,
        'name': 'Shampoo (Large)',
        'price': 3.5,
        'totalPrice': 10.5,
        'discountPrice': 3.5,
        'discount': 'Buy 3 get cheapest free'
      },
      {
        'productid': 4,
        'quantity': 2,
        'name': 'Shampoo (Small)',
        'price': 2,
        'totalPrice': 4,
        'discountPrice': 2,
        'discount': 'Buy 3 get cheapest free'
      },
      {
        'productid': 5,
        'quantity': 1,
        'name': 'Shampoo (Medium)',
        'price': 2.5,
        'totalPrice': 2.5
      }
    ]);

    const subtotalPrice = getSubtotalPriceOfBasket(basket);
    const discountPrice = getDiscountPriceOfBasket(basket);
    const totalPrice = getTotalPriceOfBasket(subtotalPrice, discountPrice);
    const quantity = getTotalBasketQuantity(basket);

    expect(subtotalPrice).toEqual(17);
    expect(discountPrice).toEqual(5.5);
    expect(totalPrice).toEqual(11.5);
    expect(quantity).toEqual(6);

  });
});