package com.yitaohui.controller;

import com.yitaohui.model.Order;
import com.yitaohui.model.Product;
import com.yitaohui.model.User;
import com.yitaohui.service.OrderService;
import com.yitaohui.service.ProductService;
import com.yitaohui.service.UserService;
import com.yitaohui.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private ProductService productService;
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private UserService userService;

    /**
     * 商品管理：保存商品
     */
    @PostMapping("/product/save")
    public ResponseResult<Product> saveProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    /**
     * 商品管理：删除商品
     */
    @DeleteMapping("/product/delete/{id}")
    public ResponseResult<Void> deleteProduct(@PathVariable Integer id) {
        return productService.deleteProduct(id);
    }

    /**
     * 商品管理：更新商品状态
     */
    @PutMapping("/product/status/{id}")
    public ResponseResult<Void> updateProductStatus(
            @PathVariable Integer id,
            @RequestParam Integer status) {
        return productService.updateProductStatus(id, status);
    }

    /**
     * 订单管理：获取订单列表
     */
    @GetMapping("/order/list")
    public ResponseResult<List<Order>> getOrderList(
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false, defaultValue = "1") Integer pageNum,
            @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        return orderService.getAllOrderList(status, pageNum, pageSize);
    }

    /**
     * 订单管理：订单发货
     */
    @PutMapping("/order/ship/{orderNo}")
    public ResponseResult<Void> shipOrder(@PathVariable String orderNo) {
        return orderService.shipOrder(orderNo);
    }

    /**
     * 用户管理：获取用户列表
     */
    @GetMapping("/user/list")
    public ResponseResult<List<User>> getUserList(
            @RequestParam(required = false) String username,
            @RequestParam(required = false, defaultValue = "1") Integer pageNum,
            @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        return userService.getUserList(username, pageNum, pageSize);
    }
} 