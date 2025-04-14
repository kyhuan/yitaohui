package com.yitaohui.controller;

import com.yitaohui.model.Order;
import com.yitaohui.service.OrderService;
import com.yitaohui.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * 创建订单
     */
    @PostMapping("/create")
    public ResponseResult<Order> createOrder(
            @RequestParam Integer userId,
            @RequestParam String shippingName,
            @RequestParam String shippingPhone,
            @RequestParam String shippingAddress) {
        return orderService.createOrder(userId, shippingName, shippingPhone, shippingAddress);
    }

    /**
     * 获取订单列表
     */
    @GetMapping("/list")
    public ResponseResult<List<Order>> getOrderList(
            @RequestParam Integer userId,
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false, defaultValue = "1") Integer pageNum,
            @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        return orderService.getOrderList(userId, status, pageNum, pageSize);
    }

    /**
     * 获取订单详情
     */
    @GetMapping("/detail/{orderNo}")
    public ResponseResult<Order> getOrderDetail(
            @PathVariable String orderNo,
            @RequestParam Integer userId) {
        return orderService.getOrderDetail(orderNo, userId);
    }

    /**
     * 取消订单
     */
    @PutMapping("/cancel/{orderNo}")
    public ResponseResult<Void> cancelOrder(
            @PathVariable String orderNo,
            @RequestParam Integer userId) {
        return orderService.cancelOrder(orderNo, userId);
    }

    /**
     * 确认收货
     */
    @PutMapping("/confirm/{orderNo}")
    public ResponseResult<Void> confirmOrder(
            @PathVariable String orderNo,
            @RequestParam Integer userId) {
        return orderService.confirmReceipt(orderNo, userId);
    }
} 