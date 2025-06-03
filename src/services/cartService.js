const CART_STORAGE_KEY = 'shopping_cart';

export const cartService = {
  // Lấy giỏ hàng từ localStorage
  getCart: () => {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  },

  // Thêm sản phẩm vào giỏ hàng
  addToCart: (product, quantity = 1) => {
    const cart = cartService.getCart();
    const existingItem = cart.find(item => item.product_item_id === product.id);

    if (existingItem) {
      // Nếu sản phẩm đã tồn tại, cập nhật số lượng
      existingItem.quantity += quantity;
    } else {
      // Nếu sản phẩm chưa có, thêm mới
      cart.push({
        product_item_id: product.id,
        quantity: quantity,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.product_image_id.find(img => img.imageType === 'MAIN')?.imageUrl,
          stock: product.stock
        }
      });
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    return cart;
  },

  // Cập nhật số lượng sản phẩm
  updateQuantity: (productId, quantity) => {
    const cart = cartService.getCart();
    const item = cart.find(item => item.product_item_id === productId);
    
    if (item) {
      item.quantity = quantity;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
    
    return cart;
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart: (productId) => {
    const cart = cartService.getCart();
    const updatedCart = cart.filter(item => item.product_item_id !== productId);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    return updatedCart;
  },

  // Xóa toàn bộ giỏ hàng
  clearCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  },

  // Lấy tổng số lượng sản phẩm trong giỏ
  getTotalItems: () => {
    const cart = cartService.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  // Lấy tổng tiền giỏ hàng
  getTotalPrice: () => {
    const cart = cartService.getCart();
    return cart.reduce((total, item) => total + (item.quantity * item.product.price), 0);
  }
}; 