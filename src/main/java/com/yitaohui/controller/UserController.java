package com.yitaohui.controller;

import com.yitaohui.model.User;
import com.yitaohui.service.UserService;
import com.yitaohui.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 用户注册
     */
    @PostMapping("/register")
    public ResponseResult<User> register(@RequestBody User user) {
        return userService.register(user);
    }

    /**
     * 用户登录
     */
    @PostMapping("/login")
    public ResponseResult<User> login(@RequestParam String username, @RequestParam String password) {
        return userService.login(username, password);
    }

    /**
     * 获取用户信息
     */
    @GetMapping("/info")
    public ResponseResult<User> getUserInfo(@RequestParam Integer userId) {
        return userService.getUserInfo(userId);
    }

    /**
     * 更新用户信息
     */
    @PutMapping("/update")
    public ResponseResult<User> updateUserInfo(@RequestBody User user) {
        return userService.updateUserInfo(user);
    }

    /**
     * 修改密码
     */
    @PutMapping("/password")
    public ResponseResult<Void> updatePassword(
            @RequestParam Integer userId,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {
        return userService.updatePassword(userId, oldPassword, newPassword);
    }

    /**
     * 获取用户列表
     */
    @GetMapping("/list")
    public ResponseResult<List<User>> getUserList(
            @RequestParam(required = false) String username,
            @RequestParam(required = false, defaultValue = "1") Integer pageNum,
            @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        return userService.getUserList(username, pageNum, pageSize);
    }
} 