package com.yitaohui.mapper;

import com.yitaohui.model.OrderItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface OrderItemMapper {
    // 通过ID查询订单项
    OrderItem selectById(Integer id);
    
    // 通过订单ID查询订单项
    List<OrderItem> selectByOrderId(Integer orderId);
    
    // 插入订单项
    int insert(OrderItem orderItem);
    
    // 批量插入订单项
    int batchInsert(List<OrderItem> orderItems);
    
    // 更新订单项
    int update(OrderItem orderItem);
    
    // 删除订单项
    int deleteById(Integer id);
    
    // 通过订单ID删除订单项
    int deleteByOrderId(Integer orderId);
} 