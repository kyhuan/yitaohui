package com.yitaohui.model;

import lombok.Data;
import java.util.Date;

@Data
public class News {
    private Integer id;
    private String title;
    private String content;
    private String image;
    private Boolean isTop;
    private Integer status;
    private Date createdTime;
    private Date updatedTime;
} 