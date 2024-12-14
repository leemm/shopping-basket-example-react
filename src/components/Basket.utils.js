/**
 * Returns an array of formatted basket items, ready for render
 * @param {Array} products Array representing catalogue of product objects (id, name, price)
 * @param {Array} items Array representing items added to basket (productid, quantity)
 * @returns {Array}
 */
export const getBasketItems = (products, items) => {
  return items?.map(item => {
    const product = products.find(product => product.id === item.productid);
    const basketItem = { ...item, name: product?.name ?? '', price: product?.price };
    basketItem.totalPrice = basketItem.price * basketItem.quantity;
    
    return basketItem;
  });
};

/**
 * Returns an array of formatted basket items, after all discounts are applied
 * @param {Array} items Array representing items added to basket (productid, quantity)
 * @param {Array} offers Array representing current available offers
 * @returns {Array} Contains two new properties where applicable (discount, totalDiscount)
 */
export const applyOffers = (items, offers) => {

  // Apply individual product discount
  let results = items?.map(item => {
        
    offers?.forEach(offer => {
      if (item.productid === offer.productid){
                
        switch (offer.type){

        case 'discount':
          item.discount = `${offer.value}% off`;
          item.discountPrice = (item.discountPrice ? item.discountPrice : 0) + (offer.value / 100 * item.totalPrice);
          break;

        case 'multibuy':
          let free = Math.floor(item.quantity / offer.threshold);
          if (free > 0){
            item.discount = `Buy ${offer.threshold - 1} get 1 free`;
            item.discountPrice = (item.discountPrice ? item.discountPrice : 0) + (item.price * free);
          }
          break;

        }

      }
    });

    return item;

  });

  // Apply bulk/cheapest free over several items
  offers?.filter(offer => offer.type === 'cheapest').map(offer => {

    // Find items the offer applies and "flatten" (by quantity)
    const itemsInBasket = new Array(...items.filter(item => offer.productids.includes(item.productid)));
    itemsInBasket.forEach(item => {
      if (item.quantity > 1){ 
        for (let x = 0; x < item.quantity - 1; x++){
          itemsInBasket.push(item); 
        }
      }
    });

    // Sort products by price so the fair logic can work
    itemsInBasket.sort((a, b) => a.price - b.price);

    let discountedItems = [];

    // Apply the "Buy 3, get the cheapest free" offer
    while (itemsInBasket.length >= offer.threshold) {
      let group = itemsInBasket.splice(0, offer.threshold);
      let cheapestItem = group[0];
      discountedItems.push({ 
        ...cheapestItem, 
        discountPrice: cheapestItem.price,
        discount: `Buy ${offer.threshold} get cheapest free`
      });
    }

    // Update the original basket with the discounted data
    results.map(item => {
      discountedItems.filter(bskItem => bskItem.productid === item.productid).forEach(bskItem => {
        item.discountPrice = item.discountPrice ?? 0 + bskItem.discountPrice;
        item.discount = item.discount ?? '' + bskItem.discount;
      });
    });

  });

  return results;
};

/**
 * Returns the subtotal of the entire basket
 * @param {Array} items Array representing items added to basket
 * @returns {Number} Float representing the currency
 */
export const getSubtotalPriceOfBasket = (items) => {
  return items?.map(item => item.totalPrice).reduce((accu, current) => accu + current, 0);
};

/**
 * Returns the entire discount price of the entire basket
 * @param {Array} items Array representing items added to basket
 * @returns {Number} Float representing the currency
 */
export const getDiscountPriceOfBasket = (items) => {
  return items?.map(item => item.discountPrice ?? 0).reduce((accu, current) => accu + current, 0);
};

/**
 * Returns the entire total price of the entire basket (subtotal - disco
 * @param {Number} subtotalPrice
 * @param {Number} discountPrice
 * @returns {Number} Float representing the currency
 */
export const getTotalPriceOfBasket = (subtotalPrice, discountPrice) => {
  return subtotalPrice - discountPrice;
};

/**
 * Returns the entire quantity of items in the basket array
 * @param {Array} items Array representing items added to basket
 * @returns {Number}
 */
export const getTotalBasketQuantity = (items) => {
  return items?.map(item => item.quantity).reduce((accu, current) => accu + current, 0);
};
