/**
 * 易淘汇商城前端功能实现
 * 包含：搜索功能、加入购物车、删除购物车商品、结算功能
 */

// 初始化购物车数据
function initCart() {
    let cart = localStorage.getItem('yitaohui_cart');
    if (!cart) {
        cart = [];
        localStorage.setItem('yitaohui_cart', JSON.stringify(cart));
    }
    updateCartCount();
}

// 更新购物车计数
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('yitaohui_cart') || '[]');
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    // 更新所有购物车计数器显示
    const cartCountElements = document.querySelectorAll('.cart span');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

// 搜索功能实现
function initSearch() {
    const searchForms = document.querySelectorAll('.search form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const keyword = this.querySelector('input').value.trim();
            if (keyword) {
                // 存储搜索关键词
                localStorage.setItem('yitaohui_search_keyword', keyword);
                // 跳转到商品列表页
                window.location.href = './productList.html';
            } else {
                alert('请输入搜索关键词');
            }
        });
    });
}

// 处理搜索结果页面
function handleSearchResults() {
    if (window.location.pathname.includes('productList.html')) {
        const keyword = localStorage.getItem('yitaohui_search_keyword');
        if (keyword) {
            const title = document.querySelector('.common-title h1');
            if (title) {
                title.textContent = `搜索结果: "${keyword}"`;
            }
            
            // 可以在这里实现更复杂的搜索结果过滤逻辑
            // 例如过滤商品列表中包含关键词的商品
            const productItems = document.querySelectorAll('.item-all .item h3');
            let matchCount = 0;
            
            productItems.forEach(item => {
                const parent = item.closest('.item');
                if (item.textContent.toLowerCase().includes(keyword.toLowerCase())) {
                    parent.style.display = 'block';
                    matchCount++;
                } else {
                    parent.style.display = 'none';
                }
            });
            
            if (matchCount === 0) {
                // 如果没有匹配项，显示提示
                const itemAll = document.querySelector('.item-all');
                if (itemAll) {
                    const noResult = document.createElement('div');
                    noResult.className = 'no-result';
                    noResult.textContent = `没有找到与"${keyword}"相关的商品`;
                    noResult.style.textAlign = 'center';
                    noResult.style.padding = '50px 0';
                    noResult.style.fontSize = '16px';
                    noResult.style.color = '#999';
                    itemAll.innerHTML = '';
                    itemAll.appendChild(noResult);
                }
            }
        }
    }
}

// 商品详情页功能
function initProductDetail() {
    if (window.location.pathname.includes('productShow.html')) {
        // 加入购物车按钮
        const addToCartBtn = document.querySelector('.btn-add-cart') || document.querySelector('button:contains("加入购物车")') || document.getElementById('addToCart');
        
        if (!addToCartBtn) {
            // 如果没有找到按钮，创建一个
            const btnContainer = document.querySelector('.detail-btns') || document.createElement('div');
            btnContainer.className = 'detail-btns';
            btnContainer.style.marginTop = '20px';
            
            const productInfo = document.querySelector('.product-info') || document.querySelector('.detail-info');
            if (productInfo && !document.querySelector('.detail-btns')) {
                productInfo.appendChild(btnContainer);
            }
            
            // 创建加入购物车按钮
            const addToCartBtn = document.createElement('button');
            addToCartBtn.id = 'addToCart';
            addToCartBtn.textContent = '加入购物车';
            addToCartBtn.className = 'btn-add-cart';
            addToCartBtn.style.backgroundColor = '#ff6700';
            addToCartBtn.style.color = '#fff';
            addToCartBtn.style.border = 'none';
            addToCartBtn.style.padding = '10px 20px';
            addToCartBtn.style.marginRight = '10px';
            addToCartBtn.style.borderRadius = '4px';
            addToCartBtn.style.cursor = 'pointer';
            btnContainer.appendChild(addToCartBtn);
            
            // 创建立即购买按钮
            const buyNowBtn = document.createElement('button');
            buyNowBtn.id = 'buyNow';
            buyNowBtn.textContent = '立即购买';
            buyNowBtn.className = 'btn-buy-now';
            buyNowBtn.style.backgroundColor = '#ff9800';
            buyNowBtn.style.color = '#fff';
            buyNowBtn.style.border = 'none';
            buyNowBtn.style.padding = '10px 20px';
            buyNowBtn.style.borderRadius = '4px';
            buyNowBtn.style.cursor = 'pointer';
            btnContainer.appendChild(buyNowBtn);
        }
        
        // 重新获取按钮引用
        const addToCartBtn = document.getElementById('addToCart') || document.querySelector('.btn-add-cart');
        const buyNowBtn = document.getElementById('buyNow') || document.querySelector('.btn-buy-now');
        
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                addToCart();
            });
        }
        
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', function() {
                buyNow();
            });
        }
    }
}

// 获取当前商品信息
function getProductInfo() {
    // 从页面中获取商品信息
    const title = document.querySelector('.product-title')?.textContent || 
                  document.querySelector('h1')?.textContent || 
                  'VIVO X100 Ultra';
    
    const priceElement = document.querySelector('.product-price')?.textContent || 
                         document.querySelector('.price')?.textContent || 
                         '¥2999.00';
    const price = parseFloat(priceElement.replace(/[^0-9.]/g, ''));
    
    const imgSrc = document.querySelector('.product-img img')?.src || 
                   document.querySelector('.box-img img')?.src || 
                   './images/product1.jpg';
    
    // 获取数量输入框的值
    const quantityInput = document.querySelector('input[type="number"]') || 
                         document.querySelector('.quantity-input');
    const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
    
    return {
        id: new Date().getTime(), // 使用时间戳作为ID
        title: title,
        price: price,
        imgSrc: imgSrc,
        quantity: quantity
    };
}

// 加入购物车
function addToCart() {
    const product = getProductInfo();
    let cart = JSON.parse(localStorage.getItem('yitaohui_cart') || '[]');
    
    // 检查购物车中是否已有该商品
    const existingProductIndex = cart.findIndex(item => item.title === product.title);
    
    if (existingProductIndex !== -1) {
        // 如果已存在，增加数量
        cart[existingProductIndex].quantity += product.quantity;
    } else {
        // 否则添加新商品
        cart.push(product);
    }
    
    localStorage.setItem('yitaohui_cart', JSON.stringify(cart));
    updateCartCount();
    
    // 显示提示
    showToast('成功加入购物车');
}

// 立即购买
function buyNow() {
    addToCart(); // 先加入购物车
    
    // 创建模拟支付弹窗
    const paymentModal = document.createElement('div');
    paymentModal.className = 'payment-modal';
    paymentModal.style.position = 'fixed';
    paymentModal.style.top = '0';
    paymentModal.style.left = '0';
    paymentModal.style.width = '100%';
    paymentModal.style.height = '100%';
    paymentModal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    paymentModal.style.display = 'flex';
    paymentModal.style.justifyContent = 'center';
    paymentModal.style.alignItems = 'center';
    paymentModal.style.zIndex = '9999';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.width = '300px';
    
    const product = getProductInfo();
    
    modalContent.innerHTML = `
        <h3 style="margin-top:0;">确认支付</h3>
        <p>商品: ${product.title}</p>
        <p>价格: ¥${product.price.toFixed(2)}</p>
        <p>数量: ${product.quantity}</p>
        <p>总计: ¥${(product.price * product.quantity).toFixed(2)}</p>
        <div style="display:flex;justify-content:flex-end;margin-top:20px;">
            <button id="cancelPayment" style="margin-right:10px;padding:8px 15px;border:1px solid #ddd;background:#f5f5f5;border-radius:4px;cursor:pointer;">取消</button>
            <button id="confirmPayment" style="padding:8px 15px;background:#ff6700;color:#fff;border:none;border-radius:4px;cursor:pointer;">确认支付</button>
        </div>
    `;
    
    paymentModal.appendChild(modalContent);
    document.body.appendChild(paymentModal);
    
    // 添加事件监听
    document.getElementById('cancelPayment').addEventListener('click', function() {
        document.body.removeChild(paymentModal);
    });
    
    document.getElementById('confirmPayment').addEventListener('click', function() {
        // 模拟支付成功
        modalContent.innerHTML = `
            <h3 style="margin-top:0;">支付成功</h3>
            <p style="color:green;font-size:18px;text-align:center;margin:30px 0;">
                <span style="font-size:30px;">✓</span><br>
                支付已完成
            </p>
            <div style="display:flex;justify-content:center;margin-top:20px;">
                <button id="closePayment" style="padding:8px 15px;background:#ff6700;color:#fff;border:none;border-radius:4px;cursor:pointer;">完成</button>
            </div>
        `;
        
        document.getElementById('closePayment').addEventListener('click', function() {
            document.body.removeChild(paymentModal);
            // 可以跳转到订单页面
            // window.location.href = './orderForm.html';
        });
    });
}

// 显示提示信息
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0,0,0,0.7)';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '4px';
    toast.style.zIndex = '10000';
    
    document.body.appendChild(toast);
    
    // 2秒后移除提示
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 2000);
}

// 初始化购物车页面
function initCartPage() {
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
        
        // 添加结算按钮点击事件
        const checkoutBtn = document.querySelector('.checkout-btn') || document.querySelector('button:contains("去结算")');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', checkout);
        }
    }
}

// 渲染购物车
function renderCart() {
    const cartContainer = document.querySelector('.cart-items') || document.querySelector('.cart-list');
    
    if (!cartContainer) {
        // 如果找不到购物车容器，创建一个新的
        const mainContent = document.querySelector('.cart-content') || document.querySelector('main') || document.body;
        const cartSection = document.createElement('div');
        cartSection.className = 'cart-container';
        cartSection.style.padding = '20px 0';
        
        cartSection.innerHTML = `
            <div class="cart-header" style="display:flex;background:#f5f5f5;padding:10px 15px;font-weight:bold;margin-bottom:10px;">
                <div style="flex:1;">商品信息</div>
                <div style="width:100px;text-align:center;">单价</div>
                <div style="width:120px;text-align:center;">数量</div>
                <div style="width:100px;text-align:center;">金额</div>
                <div style="width:80px;text-align:center;">操作</div>
            </div>
            <div class="cart-items"></div>
            <div class="cart-footer" style="display:flex;justify-content:flex-end;margin-top:20px;padding:15px;background:#f5f5f5;">
                <div class="cart-total" style="margin-right:20px;line-height:38px;">
                    总计: <span class="total-price" style="color:#ff6700;font-size:18px;font-weight:bold;">¥0.00</span>
                </div>
                <button class="checkout-btn" style="padding:8px 25px;background:#ff6700;color:#fff;border:none;border-radius:4px;cursor:pointer;">去结算</button>
            </div>
        `;
        
        mainContent.appendChild(cartSection);
        cartContainer = cartSection.querySelector('.cart-items');
    }
    
    // 获取购物车数据
    const cart = JSON.parse(localStorage.getItem('yitaohui_cart') || '[]');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<div style="text-align:center;padding:50px 0;color:#999;">购物车空空如也，快去选购商品吧！</div>';
        updateCartTotal();
        return;
    }
    
    // 渲染购物车商品
    let cartHTML = '';
    
    cart.forEach(item => {
        cartHTML += `
            <div class="cart-item" data-id="${item.id}" style="display:flex;align-items:center;padding:15px;border-bottom:1px solid #eee;">
                <div style="flex:1;display:flex;align-items:center;">
                    <img src="${item.imgSrc}" alt="${item.title}" style="width:80px;height:80px;object-fit:cover;margin-right:15px;">
                    <div class="item-title">${item.title}</div>
                </div>
                <div style="width:100px;text-align:center;color:#ff6700;">¥${item.price.toFixed(2)}</div>
                <div style="width:120px;text-align:center;">
                    <div class="quantity-control" style="display:inline-flex;border:1px solid #ddd;border-radius:3px;">
                        <button class="quantity-decrease" style="width:30px;background:none;border:none;border-right:1px solid #ddd;cursor:pointer;">-</button>
                        <input type="text" value="${item.quantity}" class="quantity-input" style="width:40px;text-align:center;border:none;outline:none;">
                        <button class="quantity-increase" style="width:30px;background:none;border:none;border-left:1px solid #ddd;cursor:pointer;">+</button>
                    </div>
                </div>
                <div style="width:100px;text-align:center;color:#ff6700;font-weight:bold;">¥${(item.price * item.quantity).toFixed(2)}</div>
                <div style="width:80px;text-align:center;">
                    <button class="remove-item" style="background:none;border:none;color:#999;cursor:pointer;">删除</button>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartHTML;
    
    // 添加事件监听
    const decreaseBtns = document.querySelectorAll('.quantity-decrease');
    const increaseBtns = document.querySelectorAll('.quantity-increase');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const removeBtns = document.querySelectorAll('.remove-item');
    
    decreaseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.cart-item');
            const id = item.dataset.id;
            updateItemQuantity(id, -1);
        });
    });
    
    increaseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.cart-item');
            const id = item.dataset.id;
            updateItemQuantity(id, 1);
        });
    });
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const item = this.closest('.cart-item');
            const id = item.dataset.id;
            const value = parseInt(this.value) || 1;
            if (value < 1) this.value = 1;
            setItemQuantity(id, parseInt(this.value));
        });
    });
    
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.cart-item');
            const id = item.dataset.id;
            removeCartItem(id);
        });
    });
    
    updateCartTotal();
}

// 更新商品数量
function updateItemQuantity(id, change) {
    const cart = JSON.parse(localStorage.getItem('yitaohui_cart') || '[]');
    const index = cart.findIndex(item => item.id == id);
    
    if (index !== -1) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) cart[index].quantity = 1;
        
        localStorage.setItem('yitaohui_cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

// 设置商品数量
function setItemQuantity(id, quantity) {
    const cart = JSON.parse(localStorage.getItem('yitaohui_cart') || '[]');
    const index = cart.findIndex(item => item.id == id);
    
    if (index !== -1) {
        cart[index].quantity = quantity < 1 ? 1 : quantity;
        
        localStorage.setItem('yitaohui_cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

// 删除购物车商品
function removeCartItem(id) {
    let cart = JSON.parse(localStorage.getItem('yitaohui_cart') || '[]');
    cart = cart.filter(item => item.id != id);
    
    localStorage.setItem('yitaohui_cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
    showToast('商品已从购物车中移除');
}

// 更新购物车总金额
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('yitaohui_cart') || '[]');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const totalElement = document.querySelector('.total-price');
    if (totalElement) {
        totalElement.textContent = `¥${total.toFixed(2)}`;
    }
}

// 结算功能
function checkout() {
    const cart = JSON.parse(localStorage.getItem('yitaohui_cart') || '[]');
    
    if (cart.length === 0) {
        showToast('购物车为空，无法结算');
        return;
    }
    
    // 计算总金额
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 创建结算弹窗
    const checkoutModal = document.createElement('div');
    checkoutModal.className = 'checkout-modal';
    checkoutModal.style.position = 'fixed';
    checkoutModal.style.top = '0';
    checkoutModal.style.left = '0';
    checkoutModal.style.width = '100%';
    checkoutModal.style.height = '100%';
    checkoutModal.style.backgroundColor = 'rgba(0,0,0,0.5)';
    checkoutModal.style.display = 'flex';
    checkoutModal.style.justifyContent = 'center';
    checkoutModal.style.alignItems = 'center';
    checkoutModal.style.zIndex = '9999';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.width = '400px';
    
    // 生成订单商品列表
    let orderItemsHTML = '';
    cart.forEach(item => {
        orderItemsHTML += `
            <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                <div style="flex:1;">${item.title} x${item.quantity}</div>
                <div>¥${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `;
    });
    
    modalContent.innerHTML = `
        <h3 style="margin-top:0;">确认订单</h3>
        <div style="max-height:200px;overflow-y:auto;margin:15px 0;padding:10px 0;border-top:1px solid #eee;border-bottom:1px solid #eee;">
            ${orderItemsHTML}
        </div>
        <div style="display:flex;justify-content:space-between;font-weight:bold;margin-bottom:20px;">
            <div>总计:</div>
            <div style="color:#ff6700;font-size:18px;">¥${total.toFixed(2)}</div>
        </div>
        <div style="margin-bottom:15px;">
            <div style="margin-bottom:5px;">收货地址：</div>
            <textarea id="address" style="width:100%;height:60px;padding:8px;border:1px solid #ddd;border-radius:4px;resize:none;" placeholder="请输入您的收货地址"></textarea>
        </div>
        <div style="margin-bottom:15px;">
            <div style="margin-bottom:5px;">支付方式：</div>
            <select id="paymentMethod" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;">
                <option value="wechat">微信支付</option>
                <option value="alipay">支付宝</option>
                <option value="creditCard">银行卡</option>
                <option value="cod">货到付款</option>
            </select>
        </div>
        <div style="display:flex;justify-content:flex-end;margin-top:20px;">
            <button id="cancelCheckout" style="margin-right:10px;padding:8px 15px;border:1px solid #ddd;background:#f5f5f5;border-radius:4px;cursor:pointer;">取消</button>
            <button id="confirmCheckout" style="padding:8px 15px;background:#ff6700;color:#fff;border:none;border-radius:4px;cursor:pointer;">确认支付</button>
        </div>
    `;
    
    checkoutModal.appendChild(modalContent);
    document.body.appendChild(checkoutModal);
    
    // 添加事件监听
    document.getElementById('cancelCheckout').addEventListener('click', function() {
        document.body.removeChild(checkoutModal);
    });
    
    document.getElementById('confirmCheckout').addEventListener('click', function() {
        const address = document.getElementById('address').value.trim();
        if (!address) {
            alert('请输入收货地址');
            return;
        }
        
        // 模拟支付成功
        modalContent.innerHTML = `
            <h3 style="margin-top:0;">支付成功</h3>
            <p style="color:green;font-size:18px;text-align:center;margin:30px 0;">
                <span style="font-size:30px;">✓</span><br>
                订单支付成功
            </p>
            <div style="margin:20px 0;padding:10px;background:#f9f9f9;border-radius:4px;">
                <p style="margin:5px 0;">订单号：${Math.floor(Math.random() * 1000000000)}</p>
                <p style="margin:5px 0;">收货地址：${address}</p>
                <p style="margin:5px 0;">订单金额：¥${total.toFixed(2)}</p>
            </div>
            <div style="display:flex;justify-content:center;margin-top:20px;">
                <button id="closeCheckout" style="padding:8px 15px;background:#ff6700;color:#fff;border:none;border-radius:4px;cursor:pointer;">完成</button>
            </div>
        `;
        
        document.getElementById('closeCheckout').addEventListener('click', function() {
            document.body.removeChild(checkoutModal);
            // 清空购物车
            localStorage.setItem('yitaohui_cart', '[]');
            updateCartCount();
            renderCart();
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initCart();
    initSearch();
    handleSearchResults();
    initProductDetail();
    initCartPage();
}); 