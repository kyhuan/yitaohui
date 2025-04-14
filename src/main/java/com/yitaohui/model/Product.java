package com.yitaohui.model;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class Product {
    private Integer id;
    private String name;
    private Integer categoryId;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private String description;
    private Integer stock;
    private String image;
    private String detail;
    private Boolean isHot;
    private Boolean isNew;
    private Integer status;
    private Date createdTime;
    private Date updatedTime;
    
    // 非数据库字段
    private String categoryName;
    private List<ProductImage> productImages;
} 