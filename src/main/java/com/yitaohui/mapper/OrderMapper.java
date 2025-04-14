package com.yitaohui.mapper;

import com.yitaohui.model.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface OrderMapper {
    // 通过ID查询订单
    Order selectById(Integer id);
    
    // 通过订单号查询订单
    Order selectByOrderNo(@Param("orderNo") String orderNo, @Param("userId") Integer userId);
    
    // 查询用户的订单列表
    List<Order> selectByUserId(@Param("userId") Integer userId, @Param("status") Integer status);
    
    // 查询所有订单
    List<Order> selectAll(@Param("status") Integer status);
    
    // 插入订单
    int insert(Order order);
    
    // 更新订单
    int update(Order order);
    
    // 更新订单状态
    int updateStatus(@Param("orderNo") String orderNo, @Param("status") Integer status);
    
    // 删除订单
    int deleteById(Integer id);
    
    // 统计用户订单数量
    int countByUserId(@Param("userId") Integer userId, @Param("status") Integer status);
    
    // 统计所有订单数量
    int countAll(@Param("status") Integer status);
} 