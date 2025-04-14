package com.yitaohui.mapper;

import com.yitaohui.model.Cart;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface CartMapper {
    // 查询用户的购物车列表
    List<Cart> selectByUserId(Integer userId);
    
    // 查询购物车中的商品
    Cart selectByUserIdAndProductId(@Param("userId") Integer userId, @Param("productId") Integer productId);
    
    // 添加商品到购物车
    int insert(Cart cart);
    
    // 更新购物车商品
    int update(Cart cart);
    
    // 更新购物车商品数量
    int updateQuantity(@Param("userId") Integer userId, @Param("productId") Integer productId, @Param("quantity") Integer quantity);
    
    // 更新购物车商品选中状态
    int updateSelected(@Param("userId") Integer userId, @Param("productId") Integer productId, @Param("selected") Boolean selected);
    
    // 更新用户所有购物车商品的选中状态
    int updateSelectedByUserId(@Param("userId") Integer userId, @Param("selected") Boolean selected);
    
    // 删除购物车商品
    int deleteByUserIdAndProductId(@Param("userId") Integer userId, @Param("productId") Integer productId);
    
    // 删除用户的所有购物车商品
    int deleteByUserId(Integer userId);
    
    // 查询用户购物车中所有已选中商品
    List<Cart> selectSelectedByUserId(Integer userId);
} 