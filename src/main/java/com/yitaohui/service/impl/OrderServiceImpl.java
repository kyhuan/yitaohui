package com.yitaohui.service.impl;

import com.github.pagehelper.PageHelper;
import com.yitaohui.mapper.OrderMapper;
import com.yitaohui.model.Order;
import com.yitaohui.service.OrderService;
import com.yitaohui.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public ResponseResult<Order> createOrder(Integer userId, String shippingName, String shippingPhone, String shippingAddress) {
        // 创建订单
        Order order = new Order();
        order.setOrderNo(generateOrderNo());
        order.setUserId(userId);
        order.setShippingName(shippingName);
        order.setShippingPhone(shippingPhone);
        order.setShippingAddress(shippingAddress);
        order.setStatus(0); // 待付款
        
        // 设置订单价格（实际项目中应该从购物车中获取商品并计算价格）
        order.setTotalPrice(new java.math.BigDecimal("999.00"));
        order.setPaymentPrice(new java.math.BigDecimal("999.00"));
        order.setPaymentType(1); // 在线支付
        
        // 保存订单
        orderMapper.insert(order);
        
        return ResponseResult.success(order);
    }

    @Override
    public ResponseResult<List<Order>> getOrderList(Integer userId, Integer status, Integer pageNum, Integer pageSize) {
        // 分页查询
        PageHelper.startPage(pageNum, pageSize);
        
        // 查询订单
        List<Order> orders = orderMapper.selectByUserId(userId, status);
        
        return ResponseResult.success(orders);
    }

    @Override
    public ResponseResult<Order> getOrderDetail(String orderNo, Integer userId) {
        // 查询订单
        Order order = orderMapper.selectByOrderNo(orderNo, userId);
        
        if (order == null) {
            return ResponseResult.error("订单不存在");
        }
        
        return ResponseResult.success(order);
    }

    @Override
    public ResponseResult<Void> cancelOrder(String orderNo, Integer userId) {
        // 查询订单
        Order order = orderMapper.selectByOrderNo(orderNo, userId);
        
        if (order == null) {
            return ResponseResult.error("订单不存在");
        }
        
        // 只有待付款的订单才能取消
        if (order.getStatus() != 0) {
            return ResponseResult.error("订单状态不允许取消");
        }
        
        // 取消订单
        order.setStatus(5); // 已取消
        order.setCloseTime(new Date());
        
        // 更新订单
        orderMapper.updateStatus(orderNo, 5);
        
        return ResponseResult.success();
    }

    @Override
    public ResponseResult<Void> confirmReceipt(String orderNo, Integer userId) {
        // 查询订单
        Order order = orderMapper.selectByOrderNo(orderNo, userId);
        
        if (order == null) {
            return ResponseResult.error("订单不存在");
        }
        
        // 只有待收货的订单才能确认收货
        if (order.getStatus() != 2) {
            return ResponseResult.error("订单状态不允许确认收货");
        }
        
        // 确认收货
        order.setStatus(3); // 待评价
        order.setReceiveTime(new Date());
        
        // 更新订单
        orderMapper.updateStatus(orderNo, 3);
        
        return ResponseResult.success();
    }

    @Override
    public ResponseResult<List<Order>> getAllOrderList(Integer status, Integer pageNum, Integer pageSize) {
        // 分页查询
        PageHelper.startPage(pageNum, pageSize);
        
        // 查询订单
        List<Order> orders = orderMapper.selectAll(status);
        
        return ResponseResult.success(orders);
    }

    @Override
    public ResponseResult<Void> shipOrder(String orderNo) {
        // 查询订单
        Order order = orderMapper.selectByOrderNo(orderNo, null);
        
        if (order == null) {
            return ResponseResult.error("订单不存在");
        }
        
        // 只有待发货的订单才能发货
        if (order.getStatus() != 1) {
            return ResponseResult.error("订单状态不允许发货");
        }
        
        // 发货
        order.setStatus(2); // 待收货
        order.setShippingTime(new Date());
        
        // 更新订单
        orderMapper.updateStatus(orderNo, 2);
        
        return ResponseResult.success();
    }
    
    /**
     * 生成订单号
     */
    private String generateOrderNo() {
        return System.currentTimeMillis() + UUID.randomUUID().toString().substring(0, 6);
    }
} 