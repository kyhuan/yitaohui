package com.yitaohui.service;

import com.yitaohui.model.Cart;
import com.yitaohui.utils.ResponseResult;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {
    
    /**
     * 添加商品到购物车
     */
    ResponseResult<Cart> addToCart(Integer userId, Integer productId, Integer quantity);
    
    /**
     * 获取购物车列表
     */
    ResponseResult<List<Cart>> getCartList(Integer userId);
    
    /**
     * 更新购物车商品数量
     */
    ResponseResult<Cart> updateCart(Integer userId, Integer productId, Integer quantity);
    
    /**
     * 删除购物车商品
     */
    ResponseResult<Void> deleteCartItem(Integer userId, Integer productId);
    
    /**
     * 选择或取消选择购物车商品
     */
    ResponseResult<Cart> selectCartItem(Integer userId, Integer productId, Boolean selected);
    
    /**
     * 全选或取消全选
     */
    ResponseResult<List<Cart>> selectAllCartItems(Integer userId, Boolean selected);
} 