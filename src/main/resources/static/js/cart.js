/**
 * 购物车功能实现
 * 功能包括：
 * 1. 添加商品到购物车
 * 2. 从购物车中删除商品
 * 3. 更新商品数量
 * 4. 计算总价
 * 5. 结算功能
 */

// 初始化购物车
let cart = [];

// DOM 元素选择器
document.addEventListener("DOMContentLoaded", function() {
    // 为所有"加入购物车"按钮添加事件监听
    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            const productRow = this.closest('.product');
            addToCart(productRow);
        });
    });

    // 为全选按钮添加事件监听
    const selectAllCheckboxes = document.querySelectorAll('table th input[type="checkbox"], .payment .left input[type="checkbox"]');
    selectAllCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const isChecked = this.checked;
            const allCheckboxes = document.querySelectorAll('.cart-sec1 .product input[type="checkbox"]');
            allCheckboxes.forEach(box => {
                box.checked = isChecked;
            });
            updateCartTotal();
        });
    });

    // 为数量加减按钮添加事件监听
    const quantityButtons = document.querySelectorAll('.sum .add, .sum .reduce');
    quantityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input[name="num"]');
            let value = parseInt(input.value);

            if (this.classList.contains('add')) {
                value++;
            } else if (this.classList.contains('reduce') && value > 1) {
                value--;
            }

            input.value = value;

            // 找到对应的商品行并更新价格
            const productRow = this.closest('.product');
            if (productRow) {
                updateProductTotal(productRow);
            }

            updateCartTotal();
        });
    });

    // 为删除按钮添加事件监听 - 修复这一部分
    const deleteButtons = document.querySelectorAll('.cart-sec1 .product .btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productRow = this.closest('.product');
            removeFromCart(productRow);
        });
    });

    // 为"批量删除"按钮添加事件监听
    const batchDeleteButton = document.querySelector('.payment .left .remove');
    if (batchDeleteButton) {
        batchDeleteButton.addEventListener('click', function(e) {
            e.preventDefault();
            batchRemoveFromCart();
        });
    }

    // 为"去结算"按钮添加事件监听
    const checkoutButton = document.querySelector('.payment-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            checkout();
        });
    }

    // 初始化购物车总价
    updateCartTotal();
});

/**
 * 从商品行中提取商品信息并添加到购物车
 * @param {HTMLElement} productRow - 包含商品信息的HTML元素
 */
function addToCart(productRow) {
    if (!productRow) return;

    // 获取商品信息
    const productImage = productRow.querySelector('img').src;
    const productName = productRow.querySelector('.bookname').textContent.trim();
    const productPrice = parseFloat(productRow.querySelector('td:nth-child(3)').textContent.replace('￥', ''));
    const productId = generateProductId(productName);
    const quantity = parseInt(productRow.querySelector('input[name="num"]').value);

    // 检查商品是否已在购物车中
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // 更新数量
        existingItem.quantity += quantity;
    } else {
        // 添加新商品
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity
        });
    }

    // 更新购物车显示
    updateCartDisplay();
    updateCartTotal();

    // 显示添加成功提示
    showNotification('商品已添加到购物车');
}

/**
 * 从购物车中移除商品
 * @param {HTMLElement} productRow - 包含商品信息的HTML元素
 */
function removeFromCart(productRow) {
    if (!productRow) return;

    // 获取商品名称用于匹配
    const productName = productRow.querySelector('.bookname').textContent.trim();
    const productId = generateProductId(productName);

    // 从购物车中移除
    cart = cart.filter(item => item.id !== productId);

    // 从DOM中移除对应的行
    productRow.remove();

    // 更新购物车显示和总价
    updateCartDisplay();
    updateCartTotal();

    // 显示移除成功提示
    showNotification('商品已从购物车中移除');
}

/**
 * 批量删除选中的商品
 */
function batchRemoveFromCart() {
    const checkedProducts = document.querySelectorAll('.cart-sec1 .product input[type="checkbox"]:checked');

    if (checkedProducts.length === 0) {
        showNotification('请先选择要删除的商品');
        return;
    }

    checkedProducts.forEach(checkbox => {
        const productRow = checkbox.closest('.product');
        if (productRow) {
            removeFromCart(productRow);
        }
    });

    showNotification(`已删除 ${checkedProducts.length} 件商品`);
}

/**
 * 更新购物车中商品的数量
 * @param {string} productId - 商品ID
 * @param {number} quantity - 新数量
 */
function updateProductQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        updateCartDisplay();
        updateCartTotal();
    }
}

/**
 * 更新单个商品的总价
 * @param {HTMLElement} productRow - 包含商品信息的HTML元素
 */
function updateProductTotal(productRow) {
    if (!productRow) return;

    const priceElement = productRow.querySelector('td:nth-child(3)');
    const quantityInput = productRow.querySelector('input[name="num"]');
    const totalElement = productRow.querySelector('td:nth-child(5)');

    if (priceElement && quantityInput && totalElement) {
        const price = parseFloat(priceElement.textContent.replace('￥', ''));
        const quantity = parseInt(quantityInput.value);
        const total = price * quantity;

        totalElement.textContent = `￥${total.toFixed(2)}`;
    }
}

/**
 * 更新购物车总价
 */
function updateCartTotal() {
    // 计算所有选中商品的总价
    let total = 0;
    let count = 0;
    const checkedProducts = document.querySelectorAll('.cart-sec1 .product input[type="checkbox"]:checked');

    checkedProducts.forEach(checkbox => {
        const productRow = checkbox.closest('.product');
        const totalElement = productRow.querySelector('td:nth-child(5)');
        const quantityInput = productRow.querySelector('input[name="num"]');

        if (totalElement && quantityInput) {
            const itemTotal = parseFloat(totalElement.textContent.replace('￥', ''));
            const quantity = parseInt(quantityInput.value);
            total += itemTotal;
            count += quantity;
        }
    });

    // 更新总价显示
    const totalElement = document.querySelector('.payment .right span:last-child i');
    if (totalElement) {
        totalElement.textContent = `￥${total.toFixed(2)}`;
    }

    // 更新选中商品数量
    const countElement = document.querySelector('.payment .right span:nth-child(2) i');
    if (countElement) {
        countElement.textContent = count;
    }
}

/**
 * 更新购物车显示
 */
function updateCartDisplay() {
    // 更新购物车图标上的数量
    const cartCountElement = document.querySelector('.cart span');
    if (cartCountElement) {
        cartCountElement.textContent = getTotalItemsInCart();
    }
}

/**
 * 获取购物车中的商品总数
 * @returns {number} 商品总数
 */
function getTotalItemsInCart() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * 从商品名称生成唯一ID
 * @param {string} name - 商品名称
 * @returns {string} 生成的ID
 */
function generateProductId(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
}

/**
 * 显示通知消息
 * @param {string} message - 通知消息
 */
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#f8f8f8';
    notification.style.color = '#333';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease-in-out';

    // 添加到文档中
    document.body.appendChild(notification);

    // 显示通知
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);

    // 3秒后隐藏
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * 结算功能
 */
function checkout() {
    const checkedProducts = document.querySelectorAll('.cart-sec1 .product input[type="checkbox"]:checked');

    if (checkedProducts.length === 0) {
        showNotification('请选择要结算的商品');
        return;
    }

    // 模拟结算过程
    showNotification('正在处理您的订单...');

    setTimeout(() => {
        // 从购物车和DOM中移除已结算商品
        checkedProducts.forEach(checkbox => {
            const productRow = checkbox.closest('.product');
            const productName = productRow.querySelector('.bookname').textContent.trim();
            const productId = generateProductId(productName);

            // 从购物车移除
            cart = cart.filter(item => item.id !== productId);

            // 从DOM中移除
            productRow.remove();
        });

        // 更新购物车显示和总价
        updateCartDisplay();
        updateCartTotal();

        // 显示结算成功消息
        showNotification('结算成功！感谢您的购买');

        // 跳转到订单页面
        setTimeout(() => {
            window.location.href = './orderForm.html';
        }, 2000);
    }, 1500);
}