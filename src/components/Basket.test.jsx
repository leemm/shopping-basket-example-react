import {render, cleanup, screen} from '@testing-library/react';
import Basket from './Basket';
import { describe, expect, it, beforeAll, afterEach } from 'vitest';

describe('Basket component', () => {
  let products = [];
  let offers = [];

  beforeAll(async () => {
    products = products = [
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

    offers = [
      {
        'productid': 1,
        'type': 'multibuy',
        'threshold': 3
      },
      {
        'productid': 3,
        'type': 'discount',
        'value': 25
      },
      {
        'productids': [ 4, 5, 6 ],
        'type': 'cheapest',
        'threshold': 3
      },
      {
        'productid': 7,
        'type': 'discount',
        'value': 50
      }
    ];
  });

  afterEach(cleanup);

  it('Buy three, get the cheapest one for free with any of the shampoo products', () => {

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

    render(<Basket products={products} offers={offers} items={items} />);

    const subtotal = screen.getByTestId('subtotal-element')?.textContent;
    const discount = screen.getByTestId('discount-element')?.textContent;
    const total = screen.getByTestId('total-element')?.textContent;

    expect(subtotal).toEqual('£17.00');
    expect(discount).toEqual('£5.50');
    expect(total).toEqual('£11.50');

  });

  it('Baked Beans x 4, Biscuits x 1 subtotal, discount, total', () => {

    const items = [
      {
        'productid': 1,
        'quantity': 4
      },
      {
        'productid': 2,
        'quantity': 1
      }
    ];

    render(<Basket products={products} offers={offers} items={items} />);

    const subtotal = screen.getByTestId('subtotal-element')?.textContent;
    const discount = screen.getByTestId('discount-element')?.textContent;
    const total = screen.getByTestId('total-element')?.textContent;

    expect(subtotal).toEqual('£5.16');
    expect(discount).toEqual('£0.99');
    expect(total).toEqual('£4.17');

  });

  it('Baked Beans x 2, Biscuits x 1, Sardines x 2 subtotal, discount, total', () => {

    const items = [
      {
        'productid': 1,
        'quantity': 2
      },
      {
        'productid': 2,
        'quantity': 1
      },
      {
        'productid': 3,
        'quantity': 2
      }
    ];

    render(<Basket products={products} offers={offers} items={items} />);

    const subtotal = screen.getByTestId('subtotal-element')?.textContent;
    const discount = screen.getByTestId('discount-element')?.textContent;
    const total = screen.getByTestId('total-element')?.textContent;

    expect(subtotal).toEqual('£6.96');
    expect(discount).toEqual('£0.95');
    expect(total).toEqual('£6.01');

  });
});