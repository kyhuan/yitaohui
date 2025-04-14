// 商品详情页功能实现
// 该脚本实现商品详情页的立即购买、加入购物车等功能

// 保存在localStorage中的键名
const CART_KEY = 'shopping_cart';
const ORDER_HISTORY_KEY = 'order_history';

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在商品详情页
    if (window.location.pathname.includes('productShow.html')) {
        initializeProductDetail();
    }

    // 更新购物车数量显示
    updateCartCount();
});

// 初始化商品详情页
function initializeProductDetail() {
    // 获取URL中的商品ID
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // 如果没有ID，使用默认的展示商品
    if (!productId) {
        setupDetailPageActions();
        return;
    }

    // 根据ID获取商品数据（这里模拟从后台获取）
    const product = getProductById(productId);

    // 如果找到了商品，显示商品信息
    if (product) {
        displayProductDetails(product);
    }

    // 设置页面按钮的事件
    setupDetailPageActions();
}

// 根据ID获取商品
function getProductById(id) {
    // 这里应该是从API获取，为了简化演示，我们从一个预定义的列表中获取
    // 实际应用中应该是AJAX请求后端API

    // 这里使用与搜索脚本相同的商品数据结构
    const products = [
        { id: 1, name: "VIVOX100 Ultra 5G智能手机", category: "手机通讯", price: 5999.00, image: "./images/pro-show1.avif",
            description: "VIVOX100 Ultra 5G智能手机 蔡司2亿 APO 超级长焦 搭载第三代骁龙8",
            stock: 100, originalPrice: 6499.00 },
        // 其他商品...
    ];

    // 尝试从产品列表找到匹配的ID
    const product = products.find(p => p.id.toString() === id.toString());

    // 如果找不到，使用页面上已有的商品信息
    if (!product) {
        return {
            id: 1,
            name: document.querySelector('.booksshow-top .info h1').textContent,
            price: parseFloat(document.querySelector('.booksshow-top .info .price').textContent.replace('￥', '')),
            originalPrice: parseFloat(document.querySelector('.booksshow-top .info .old-price').textContent.replace('￥', '')),
            image: document.querySelector('.swiper_big .swiper-slide:first-child img').src,
            stock: 100,
            category: "手机通讯",
            description: document.querySelector('.booksshow-top .info h1').textContent
        };
    }

    return product;
}

// 显示商品详情
function displayProductDetails(product) {
    // 这个函数用来更新页面上的商品信息
    // 实际应用中应该更新更多的字段

    // 设置商品名称
    const titleElement = document.querySelector('.booksshow-top .info h1');
    if (titleElement) {
        titleElement.textContent = product.name;
    }

    // 设置价格
    const priceElement = document.querySelector('.booksshow-top .info .price');
    if (priceElement) {
        priceElement.textContent = `￥${product.price.toFixed(2)}`;
    }

    // 设置原价
    const oldPriceElement = document.querySelector('.booksshow-top .info .old-price');
    if (oldPriceElement) {
        oldPriceElement.textContent = `￥${product.originalPrice.toFixed(2)}`;
    }

    // 更新图片链接可能更复杂，这里简化处理
    const mainImage = document.querySelector('.swiper_big .swiper-slide:first-child img');
    if (mainImage && product.image) {
        mainImage.src = product.image;
    }
}

// 设置详情页按钮事件
function setupDetailPageActions() {
    // 获取数量调整按钮
    const reduceBtn = document.querySelector('.number .sum .reduce');
    const addBtn = document.querySelector('.number .sum .add');
    const quantityInput = document.querySelector('.number .sum input[name="num"]');

    // 减少数量
    if (reduceBtn) {
        reduceBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }

    // 增加数量
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value) || 1;
            quantityInput.value = currentValue + 1;
        });
    }

    // 加入购物车事件
    const addToCartBtn = document.querySelector('.btn-all .cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // 获取当前商品信息
            const product = getCurrentProductInfo();
            const quantity = parseInt(quantityInput.value) || 1;

            // 添加到购物车
            addToCart(product, quantity);

            // 显示成功提示
            showMessage('商品已成功加入购物车！');
        });
    }

    // 立即购买事件
    const buyNowBtn = document.querySelector('.btn-all .buy');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // 获取当前商品信息
            const product = getCurrentProductInfo();
            const quantity = parseInt(quantityInput.value) || 1;

            // 立即购买
            buyNow(product, quantity);
        });
    }
}

// 获取当前页面上的商品信息
function getCurrentProductInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get('id') || 1;

    // 从页面获取商品信息
    const name = document.querySelector('.booksshow-top .info h1').textContent;
    const price = parseFloat(document.querySelector('.booksshow-top .info .price').textContent.replace('￥', ''));
    const originalPrice = parseFloat(document.querySelector('.booksshow-top .info .old-price').textContent.replace('￥', ''));
    const image = document.querySelector('.swiper_big .swiper-slide:first-child img').src;

    return {
        id: productId,
        name: name,
        price: price,
        originalPrice: originalPrice,
        image: image,
        category: "手机通讯", // 假设分类
        stock: 100 // 假设库存
    };
}

// 添加商品到购物车
function addToCart(product, quantity = 1) {
    // 从localStorage获取购物车
    let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

    // 检查商品是否已经在购物车中
    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
        // 如果已存在，增加数量
        cart[existingItemIndex].quantity += quantity;
    } else {
        // 如果不存在，添加新条目
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    // 保存回localStorage
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    // 更新购物车计数
    updateCartCount();
}

// 立即购买
function buyNow(product, quantity = 1) {
    // 创建订单对象
    const order = {
        id: generateOrderId(),
        date: new Date().toISOString(),
        status: 'pending',
        items: [
            {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            }
        ],
        total: product.price * quantity,
        shipping: 0, // 免运费
        tax: 0, // 不计税
        grandTotal: product.price * quantity
    };

    // 保存订单到sessionStorage
    sessionStorage.setItem('current_order', JSON.stringify(order));

    // 显示支付弹窗
    showPaymentModal(order);
}

// 显示支付弹窗
function showPaymentModal(order) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'payment-modal';

    modal.innerHTML = `
    <div class="payment-modal-content">
      <span class="close">&times;</span>
      <h2>确认订单</h2>
      <div class="order-summary">
        <h3>订单摘要</h3>
        <div class="order-items">
          ${order.items.map(item => `
            <div class="order-item">
              <img src="${item.image}" alt="${item.name}" />
              <div class="item-details">
                <h4>${item.name}</h4>
                <p>数量: ${item.quantity}</p>
                <p>单价: ￥${item.price.toFixed(2)}</p>
                <p>小计: ￥${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="order-totals">
          <p>商品总价: ￥${order.total.toFixed(2)}</p>
          <p>运费: ￥${order.shipping.toFixed(2)}</p>
          <p>税费: ￥${order.tax.toFixed(2)}</p>
          <p class="grand-total">应付总额: ￥${order.grandTotal.toFixed(2)}</p>
        </div>
      </div>
      <div class="payment-methods">
        <h3>选择支付方式</h3>
        <div class="payment-options">
          <label>
            <input type="radio" name="payment-method" value="alipay" checked />
            <span>支付宝</span>
          </label>
          <label>
            <input type="radio" name="payment-method" value="wechat" />
            <span>微信支付</span>
          </label>
          <label>
            <input type="radio" name="payment-method" value="creditcard" />
            <span>银行卡支付</span>
          </label>
        </div>
      </div>
      <div class="actions">
        <button class="cancel-btn">取消</button>
        <button class="confirm-btn">确认支付</button>
      </div>
    </div>
  `;

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
    .payment-modal {
      display: block;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    
    .payment-modal-content {
      background-color: #fff;
      margin: 5% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      max-width: 800px;
      border-radius: 5px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
    }
    
    .close:hover {
      color: #000;
    }
    
    h2, h3, h4 {
      color: #333;
    }
    
    .order-items {
      max-height: 300px;
      overflow-y: auto;
      margin: 15px 0;
    }
    
    .order-item {
      display: flex;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }
    
    .order-item img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      margin-right: 15px;
    }
    
    .item-details h4 {
      margin: 0 0 5px 0;
    }
    
    .item-details p {
      margin: 5px 0;
      color: #666;
    }
    
    .order-totals {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #eee;
    }
    
    .order-totals p {
      margin: 5px 0;
      text-align: right;
    }
    
    .grand-total {
      font-weight: bold;
      color: #e53935;
      font-size: 18px;
    }
    
    .payment-methods {
      margin-top: 20px;
    }
    
    .payment-options {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 10px;
    }
    
    .payment-options label {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .payment-options label:hover {
      background-color: #f9f9f9;
    }
    
    .payment-options input {
      margin-right: 8px;
    }
    
    .actions {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    
    .cancel-btn {
      background-color: #f5f5f5;
      color: #333;
    }
    
    .confirm-btn {
      background-color: #e53935;
      color: white;
    }
    
    .confirm-btn:hover {
      background-color: #d32f2f;
    }
    
    .cancel-btn:hover {
      background-color: #e0e0e0;
    }
  `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // 添加事件监听
    // 关闭按钮
    modal.querySelector('.close').addEventListener('click', function() {
        document.body.removeChild(modal);
    });

    // 取消按钮
    modal.querySelector('.cancel-btn').addEventListener('click', function() {
        document.body.removeChild(modal);
    });

    // 确认支付按钮
    modal.querySelector('.confirm-btn').addEventListener('click', function() {
        // 模拟支付过程
        const loadingMsg = showMessage('正在处理支付...', false);

        // 模拟3秒后支付成功
        setTimeout(function() {
            // 关闭加载消息
            document.body.removeChild(loadingMsg);

            // 修改订单状态
            order.status = 'paid';
            order.paymentDate = new Date().toISOString();
            order.paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

            // 保存订单到历史记录
            saveOrderToHistory(order);

            // 关闭支付弹窗
            document.body.removeChild(modal);

            // 显示支付成功消息
            showMessage('支付成功！感谢您的购买！');

            // 3秒后跳转到订单页面
            setTimeout(function() {
                window.location.href = 'orderForm.html';
            }, 3000);
        }, 3000);
    });
}

// 保存订单到历史记录
function saveOrderToHistory(order) {
    // 从localStorage获取订单历史
    let orderHistory = JSON.parse(localStorage.getItem(ORDER_HISTORY_KEY) || '[]');

    // 添加新订单
    orderHistory.push(order);

    // 保存回localStorage
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(orderHistory));
}

// 生成订单ID
function generateOrderId() {
    return Date.now().toString() + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}

// 显示消息提示
function showMessage(message, autoClose = true) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message-toast';
    messageEl.textContent = message;

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
    .message-toast {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      z-index: 9999;
      text-align: center;
      min-width: 200px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    }
  `;
    document.head.appendChild(style);
    document.body.appendChild(messageEl);

    // 自动关闭
    if (autoClose) {
        setTimeout(function() {
            if (document.body.contains(messageEl)) {
                document.body.removeChild(messageEl);
            }
        }, 2000);
    }

    return messageEl;
}

// 更新购物车数量显示
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);

    // 更新顶部导航栏的购物车数量
    const cartCountEl = document.querySelector('.cart span');
    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
    }
}