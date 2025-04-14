package com.yitaohui.service.impl;

import com.yitaohui.mapper.CartMapper;
import com.yitaohui.mapper.ProductMapper;
import com.yitaohui.model.Cart;
import com.yitaohui.model.Product;
import com.yitaohui.service.CartService;
import com.yitaohui.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private ProductMapper productMapper;
    
    @Autowired
    private CartMapper cartMapper;

    @Override
    public ResponseResult<Cart> addToCart(Integer userId, Integer productId, Integer quantity) {
        // 查询商品是否存在
        Product product = productMapper.selectById(productId);
        if (product == null) {
            return ResponseResult.error("商品不存在");
        }
        
        // 查询商品是否已下架
        if (product.getStatus() != 1) {
            return ResponseResult.error("商品已下架");
        }
        
        // 查询库存是否足够
        if (product.getStock() < quantity) {
            return ResponseResult.error("商品库存不足");
        }
        
        // 查询购物车中是否已存在该商品
        Cart existCart = cartMapper.selectByUserIdAndProductId(userId, productId);
        
        if (existCart != null) {
            // 已存在，更新数量
            existCart.setQuantity(existCart.getQuantity() + quantity);
            existCart.setUpdatedTime(new Date());
            // 更新总价
            existCart.setTotalPrice(product.getPrice().multiply(new BigDecimal(existCart.getQuantity())));
            cartMapper.update(existCart);
            return ResponseResult.success(existCart);
        } else {
            // 不存在，新增
            Cart cart = new Cart();
            cart.setUserId(userId);
            cart.setProductId(productId);
            cart.setQuantity(quantity);
            cart.setSelected(true);
            cart.setCreatedTime(new Date());
            cart.setUpdatedTime(new Date());
            
            // 设置非数据库字段
            cart.setProductName(product.getName());
            cart.setPrice(product.getPrice());
            cart.setTotalPrice(product.getPrice().multiply(new BigDecimal(quantity)));
            cart.setProductImage(product.getImage());
            
            // 添加到购物车
            cartMapper.insert(cart);
            
            return ResponseResult.success(cart);
        }
    }

    @Override
    public ResponseResult<List<Cart>> getCartList(Integer userId) {
        // 查询指定用户的购物车列表
        List<Cart> userCartList = cartMapper.selectByUserId(userId);
        
        // 补充商品信息
        for (Cart cart : userCartList) {
            Product product = productMapper.selectById(cart.getProductId());
            if (product != null) {
                cart.setProductName(product.getName());
                cart.setPrice(product.getPrice());
                cart.setTotalPrice(product.getPrice().multiply(new BigDecimal(cart.getQuantity())));
                cart.setProductImage(product.getImage());
            }
        }
        
        return ResponseResult.success(userCartList);
    }

    @Override
    public ResponseResult<Cart> updateCart(Integer userId, Integer productId, Integer quantity) {
        // 查询购物车中是否存在该商品
        Cart cart = cartMapper.selectByUserIdAndProductId(userId, productId);
        
        if (cart == null) {
            return ResponseResult.error("购物车中不存在该商品");
        }
        
        // 查询商品是否存在
        Product product = productMapper.selectById(productId);
        if (product == null) {
            return ResponseResult.error("商品不存在");
        }
        
        // 查询库存是否足够
        if (product.getStock() < quantity) {
            return ResponseResult.error("商品库存不足");
        }
        
        // 更新数量
        cart.setQuantity(quantity);
        cart.setUpdatedTime(new Date());
        // 更新总价
        cart.setTotalPrice(product.getPrice().multiply(new BigDecimal(cart.getQuantity())));
        cartMapper.updateQuantity(userId, productId, quantity);
        
        return ResponseResult.success(cart);
    }

    @Override
    public ResponseResult<Void> deleteCartItem(Integer userId, Integer productId) {
        // 查询购物车中是否存在该商品
        Cart cart = cartMapper.selectByUserIdAndProductId(userId, productId);
        
        if (cart == null) {
            return ResponseResult.error("购物车中不存在该商品");
        }
        
        // 从购物车中删除
        cartMapper.deleteByUserIdAndProductId(userId, productId);
        
        return ResponseResult.success();
    }

    @Override
    public ResponseResult<Cart> selectCartItem(Integer userId, Integer productId, Boolean selected) {
        // 查询购物车中是否存在该商品
        Cart cart = cartMapper.selectByUserIdAndProductId(userId, productId);
        
        if (cart == null) {
            return ResponseResult.error("购物车中不存在该商品");
        }
        
        // 更新选中状态
        cart.setSelected(selected);
        cart.setUpdatedTime(new Date());
        cartMapper.updateSelected(userId, productId, selected);
        
        return ResponseResult.success(cart);
    }

    @Override
    public ResponseResult<List<Cart>> selectAllCartItems(Integer userId, Boolean selected) {
        // 更新所有购物车商品的选中状态
        cartMapper.updateSelectedByUserId(userId, selected);
        
        // 获取更新后的购物车列表
        List<Cart> userCartList = cartMapper.selectByUserId(userId);
        
        // 补充商品信息
        for (Cart cart : userCartList) {
            Product product = productMapper.selectById(cart.getProductId());
            if (product != null) {
                cart.setProductName(product.getName());
                cart.setPrice(product.getPrice());
                cart.setTotalPrice(product.getPrice().multiply(new BigDecimal(cart.getQuantity())));
                cart.setProductImage(product.getImage());
            }
        }
        
        return ResponseResult.success(userCartList);
    }
}