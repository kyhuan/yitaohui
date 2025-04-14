package com.yitaohui.service;

import com.yitaohui.model.Order;
import com.yitaohui.utils.ResponseResult;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    
    /**
     * 创建订单
     */
    ResponseResult<Order> createOrder(Integer userId, String shippingName, String shippingPhone, String shippingAddress);
    
    /**
     * 获取订单列表
     */
    ResponseResult<List<Order>> getOrderList(Integer userId, Integer status, Integer pageNum, Integer pageSize);
    
    /**
     * 获取订单详情
     */
    ResponseResult<Order> getOrderDetail(String orderNo, Integer userId);
    
    /**
     * 取消订单
     */
    ResponseResult<Void> cancelOrder(String orderNo, Integer userId);
    
    /**
     * 确认收货
     */
    ResponseResult<Void> confirmReceipt(String orderNo, Integer userId);
    
    /**
     * 管理员：获取所有订单列表
     */
    ResponseResult<List<Order>> getAllOrderList(Integer status, Integer pageNum, Integer pageSize);
    
    /**
     * 管理员：订单发货
     */
    ResponseResult<Void> shipOrder(String orderNo);
} 