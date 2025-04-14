package com.yitaohui.controller;

import com.yitaohui.model.Cart;
import com.yitaohui.service.CartService;
import com.yitaohui.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    /**
     * 添加商品到购物车
     */
    @PostMapping("/add")
    public ResponseResult<Cart> addToCart(
            @RequestParam Integer userId,
            @RequestParam Integer productId,
            @RequestParam(required = false, defaultValue = "1") Integer quantity) {
        return cartService.addToCart(userId, productId, quantity);
    }

    /**
     * 获取购物车列表
     */
    @GetMapping("/list")
    public ResponseResult<List<Cart>> getCartList(@RequestParam Integer userId) {
        return cartService.getCartList(userId);
    }

    /**
     * 更新购物车商品数量
     */
    @PutMapping("/update")
    public ResponseResult<Cart> updateCart(
            @RequestParam Integer userId,
            @RequestParam Integer productId,
            @RequestParam Integer quantity) {
        return cartService.updateCart(userId, productId, quantity);
    }

    /**
     * 删除购物车商品
     */
    @DeleteMapping("/delete")
    public ResponseResult<Void> deleteCartItem(
            @RequestParam Integer userId,
            @RequestParam Integer productId) {
        return cartService.deleteCartItem(userId, productId);
    }

    /**
     * 选择或取消选择购物车商品
     */
    @PutMapping("/select")
    public ResponseResult<Cart> selectCartItem(
            @RequestParam Integer userId,
            @RequestParam Integer productId,
            @RequestParam Boolean selected) {
        return cartService.selectCartItem(userId, productId, selected);
    }

    /**
     * 全选或取消全选
     */
    @PutMapping("/select-all")
    public ResponseResult<List<Cart>> selectAllCartItems(
            @RequestParam Integer userId,
            @RequestParam Boolean selected) {
        return cartService.selectAllCartItems(userId, selected);
    }
} 