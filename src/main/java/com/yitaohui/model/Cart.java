package com.yitaohui.model;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class Cart {
    private Integer id;
    private Integer userId;
    private Integer productId;
    private Integer quantity;
    private Boolean selected;
    private Date createdTime;
    private Date updatedTime;
    
    // 非数据库字段
    private String productName;
    private BigDecimal price;
    private BigDecimal totalPrice;
    private String productImage;
} 