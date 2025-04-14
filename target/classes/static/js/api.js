/**
 * 易淘汇商城API接口
 * 包含所有与后端交互的函数
 */

// API基础URL
const API_BASE_URL = '/api';

// 用户相关API
const UserAPI = {
    // 用户登录
    login: (username, password) => {
        return $.ajax({
            url: `${API_BASE_URL}/user/login`,
            type: 'POST',
            data: { username, password }
        });
    },
    
    // 用户注册
    register: (userData) => {
        return $.ajax({
            url: `${API_BASE_URL}/user/register`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData)
        });
    },
    
    // 获取用户信息
    getUserInfo: (userId) => {
        return $.ajax({
            url: `${API_BASE_URL}/user/info`,
            type: 'GET',
            data: { userId }
        });
    }
};

// 商品相关API
const ProductAPI = {
    // 获取商品列表
    getProductList: (categoryId, keyword, pageNum = 1, pageSize = 10) => {
        return $.ajax({
            url: `${API_BASE_URL}/product/list`,
            type: 'GET',
            data: { categoryId, keyword, pageNum, pageSize }
        });
    },
    
    // 获取商品详情
    getProductDetail: (productId) => {
        return $.ajax({
            url: `${API_BASE_URL}/product/detail/${productId}`,
            type: 'GET'
        });
    },
    
    // 获取热门商品
    getHotProducts: (limit = 10) => {
        return $.ajax({
            url: `${API_BASE_URL}/product/hot`,
            type: 'GET',
            data: { limit }
        });
    },
    
    // 获取新品
    getNewProducts: (limit = 10) => {
        return $.ajax({
            url: `${API_BASE_URL}/product/new`,
            type: 'GET',
            data: { limit }
        });
    },
    
    // 搜索商品
    searchProducts: (keyword, pageNum = 1, pageSize = 10) => {
        return $.ajax({
            url: `${API_BASE_URL}/product/search`,
            type: 'GET',
            data: { keyword, pageNum, pageSize }
        });
    }
};

// 购物车相关API
const CartAPI = {
    // 添加商品到购物车
    addToCart: (userId, productId, quantity = 1) => {
        return $.ajax({
            url: `${API_BASE_URL}/cart/add`,
            type: 'POST',
            data: { userId, productId, quantity }
        });
    },
    
    // 获取购物车列表
    getCartList: (userId) => {
        return $.ajax({
            url: `${API_BASE_URL}/cart/list`,
            type: 'GET',
            data: { userId }
        });
    },
    
    // 更新购物车商品数量
    updateCart: (userId, productId, quantity) => {
        return $.ajax({
            url: `${API_BASE_URL}/cart/update`,
            type: 'PUT',
            data: { userId, productId, quantity }
        });
    },
    
    // 删除购物车商品
    deleteCartItem: (userId, productId) => {
        return $.ajax({
            url: `${API_BASE_URL}/cart/delete`,
            type: 'DELETE',
            data: { userId, productId }
        });
    },
    
    // 选择或取消选择购物车商品
    selectCartItem: (userId, productId, selected) => {
        return $.ajax({
            url: `${API_BASE_URL}/cart/select`,
            type: 'PUT',
            data: { userId, productId, selected }
        });
    },
    
    // 全选或取消全选
    selectAllCartItems: (userId, selected) => {
        return $.ajax({
            url: `${API_BASE_URL}/cart/select-all`,
            type: 'PUT',
            data: { userId, selected }
        });
    }
};

// 订单相关API
const OrderAPI = {
    // 创建订单
    createOrder: (userId, shippingName, shippingPhone, shippingAddress) => {
        return $.ajax({
            url: `${API_BASE_URL}/order/create`,
            type: 'POST',
            data: { userId, shippingName, shippingPhone, shippingAddress }
        });
    },
    
    // 获取订单列表
    getOrderList: (userId, status, pageNum = 1, pageSize = 10) => {
        return $.ajax({
            url: `${API_BASE_URL}/order/list`,
            type: 'GET',
            data: { userId, status, pageNum, pageSize }
        });
    },
    
    // 获取订单详情
    getOrderDetail: (orderNo, userId) => {
        return $.ajax({
            url: `${API_BASE_URL}/order/detail/${orderNo}`,
            type: 'GET',
            data: { userId }
        });
    },
    
    // 取消订单
    cancelOrder: (orderNo, userId) => {
        return $.ajax({
            url: `${API_BASE_URL}/order/cancel/${orderNo}`,
            type: 'PUT',
            data: { userId }
        });
    },
    
    // 确认收货
    confirmOrder: (orderNo, userId) => {
        return $.ajax({
            url: `${API_BASE_URL}/order/confirm/${orderNo}`,
            type: 'PUT',
            data: { userId }
        });
    }
}; 