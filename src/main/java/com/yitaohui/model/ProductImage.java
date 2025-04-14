package com.yitaohui.model;

import lombok.Data;
import java.util.Date;

@Data
public class ProductImage {
    private Integer id;
    private Integer productId;
    private String imageUrl;
    private Integer sortOrder;
    private Date createdTime;
} 