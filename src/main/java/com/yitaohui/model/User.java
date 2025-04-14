package com.yitaohui.model;

import lombok.Data;
import java.util.Date;

@Data
public class User {
    private Integer id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String address;
    private String role;
    private Date createdTime;
    private Date updatedTime;
} 