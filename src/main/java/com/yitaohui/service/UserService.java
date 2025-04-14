package com.yitaohui.service;

import com.yitaohui.model.User;
import com.yitaohui.utils.ResponseResult;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface UserService {
    
    /**
     * 用户注册
     */
    ResponseResult<User> register(User user);
    
    /**
     * 用户登录
     */
    ResponseResult<User> login(String username, String password);
    
    /**
     * 获取用户信息
     */
    ResponseResult<User> getUserInfo(Integer userId);
    
    /**
     * 更新用户信息
     */
    ResponseResult<User> updateUserInfo(User user);
    
    /**
     * 修改密码
     */
    ResponseResult<Void> updatePassword(Integer userId, String oldPassword, String newPassword);
    
    /**
     * 获取用户列表
     */
    ResponseResult<List<User>> getUserList(String username, Integer pageNum, Integer pageSize);
} 