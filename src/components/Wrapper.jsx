import { useState } from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@radix-ui/themes';
import Products from './Products';
import Basket from './Basket';
import { getItemFromQuerystring } from '../utils';

const Wrapper = ({ catalogue }) => {
  const [items, setItems] = useState([]);

  const hideActions = getItemFromQuerystring('hideactions') === 'true';

  // Simple helper function to modify basket based on productid and quantity
  const onModifyBasket = (productid, quantity) => {
    console.log('productid', productid, 'quantity', quantity); // Just to help!

    if (quantity === 999999){ setItems([]); return; } // Cheap way to clear the basket

    const clonedItems = structuredClone(items);

    const product = catalogue?.products.find(product => product.id === productid); // Find product in catalogue data
    const itemIdx = items.findIndex(item => item.productid === productid); // Find product in existing basket
    if (product){ 
      if (itemIdx > -1){ // Already exists in basket
        clonedItems[itemIdx].quantity += quantity;
        if (clonedItems[itemIdx].quantity < 1){ clonedItems.splice(itemIdx, 1); } // Item quantity is now less than 1 we should remove the item from the basket array
      } else { // If new item
        clonedItems.push({ productid, quantity });
      }
    }

    setItems(clonedItems);
  };

  return (
    <Flex justify="start" p={4}>
      <Products products={catalogue?.products} onModifyBasket={onModifyBasket} />
      <Basket products={catalogue?.products} offers={catalogue?.offers} items={items} onModifyBasket={onModifyBasket} hideActions={hideActions} />
    </Flex>
  );
};

Wrapper.propTypes = {
  catalogue: PropTypes.object
};

export default Wrapper;