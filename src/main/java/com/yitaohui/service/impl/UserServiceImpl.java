package com.yitaohui.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.yitaohui.mapper.UserMapper;
import com.yitaohui.model.User;
import com.yitaohui.service.UserService;
import com.yitaohui.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public ResponseResult<User> register(User user) {
        // 检查用户名是否已存在
        User existUser = userMapper.selectByUsername(user.getUsername());
        if (existUser != null) {
            return ResponseResult.error("用户名已存在");
        }
        
        // 密码加密
        String md5Password = DigestUtils.md5DigestAsHex(user.getPassword().getBytes());
        user.setPassword(md5Password);
        
        // 设置默认角色
        user.setRole("user");
        
        // 插入用户
        userMapper.insert(user);
        
        // 清空密码
        user.setPassword(null);
        
        return ResponseResult.success(user);
    }

    @Override
    public ResponseResult<User> login(String username, String password) {
        // 查询用户
        User user = userMapper.selectByUsername(username);
        if (user == null) {
            return ResponseResult.error("用户不存在");
        }
        
        // 验证密码
        String md5Password = DigestUtils.md5DigestAsHex(password.getBytes());
        if (!user.getPassword().equals(md5Password)) {
            return ResponseResult.error("密码错误");
        }
        
        // 清空密码
        user.setPassword(null);
        
        return ResponseResult.success(user);
    }

    @Override
    public ResponseResult<User> getUserInfo(Integer userId) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            return ResponseResult.error("用户不存在");
        }
        
        // 清空密码
        user.setPassword(null);
        
        return ResponseResult.success(user);
    }

    @Override
    public ResponseResult<User> updateUserInfo(User user) {
        // 不允许修改用户名和密码
        user.setUsername(null);
        user.setPassword(null);
        
        userMapper.update(user);
        
        // 查询最新的用户信息
        User updatedUser = userMapper.selectById(user.getId());
        
        // 清空密码
        updatedUser.setPassword(null);
        
        return ResponseResult.success(updatedUser);
    }

    @Override
    public ResponseResult<Void> updatePassword(Integer userId, String oldPassword, String newPassword) {
        // 查询用户
        User user = userMapper.selectById(userId);
        if (user == null) {
            return ResponseResult.error("用户不存在");
        }
        
        // 验证旧密码
        String md5OldPassword = DigestUtils.md5DigestAsHex(oldPassword.getBytes());
        if (!user.getPassword().equals(md5OldPassword)) {
            return ResponseResult.error("原密码错误");
        }
        
        // 更新密码
        String md5NewPassword = DigestUtils.md5DigestAsHex(newPassword.getBytes());
        User updateUser = new User();
        updateUser.setId(userId);
        updateUser.setPassword(md5NewPassword);
        
        userMapper.update(updateUser);
        
        return ResponseResult.success();
    }

    @Override
    public ResponseResult<List<User>> getUserList(String username, Integer pageNum, Integer pageSize) {
        // 设置分页
        PageHelper.startPage(pageNum, pageSize);
        
        // 查询用户列表
        List<User> userList = userMapper.selectByPage(username, (pageNum - 1) * pageSize, pageSize);
        
        // 查询总数
        int total = userMapper.count(username);
        
        // 清空密码
        for (User user : userList) {
            user.setPassword(null);
        }
        
        PageInfo<User> pageInfo = new PageInfo<>(userList);
        pageInfo.setTotal(total);
        
        return ResponseResult.success(userList);
    }
} 