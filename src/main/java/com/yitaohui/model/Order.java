package com.yitaohui.model;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class Order {
    private Integer id;
    private String orderNo;
    private Integer userId;
    private BigDecimal totalPrice;
    private BigDecimal paymentPrice;
    private Integer paymentType;
    private Integer status;
    private String shippingName;
    private String shippingPhone;
    private String shippingAddress;
    private Date paymentTime;
    private Date shippingTime;
    private Date receiveTime;
    private Date closeTime;
    private Date createdTime;
    private Date updatedTime;
    
    // 非数据库字段
    private List<OrderItem> orderItems;
    private String statusDesc; // 订单状态描述
} 