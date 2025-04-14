package com.yitaohui.model;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class Category {
    private Integer id;
    private String name;
    private Integer parentId;
    private Integer level;
    private Integer sortOrder;
    private Date createdTime;
    private Date updatedTime;
    
    // 非数据库字段
    private List<Category> children;
} 