export const addToCart = (item) => {
  console.log('Added to cart:', item);
  return item;
};

export const removeFromCart = (itemId) => {
  console.log('Removed from cart:', itemId);
  return itemId;
};

export const getCartTotal = (items = []) => {
  return items.reduce((total, item) => total + (item.price || 0), 0);
};