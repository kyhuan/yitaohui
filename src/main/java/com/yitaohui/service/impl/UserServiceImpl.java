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
        
        // 设置默认角色
        user.setRole("user");
        
        // 插入用户（不进行密码加密，直接存储明文密码）
        userMapper.insert(user);
        
        // 清空密码
        user.setPassword(null);
        
        return ResponseResult.success(user);
    }

    /**
     * 临时测试用登录方法，不进行密码加密
     */
    // 注释掉正式方法，使用测试方法
    /*
    @Override
    public ResponseResult<User> login(String username, String password) {
        // 查询用户
        User user = userMapper.selectByUsername(username);
        if (user == null) {
            return ResponseResult.error("用户不存在");
        }
        
        // 调试日志
        System.out.println("输入的原始密码: " + password);
        String md5Password = DigestUtils.md5DigestAsHex(password.getBytes());
        System.out.println("加密后的密码: " + md5Password);
        System.out.println("数据库中的密码: " + user.getPassword());
        
        // 验证密码
        if (!user.getPassword().equals(md5Password)) {
            return ResponseResult.error("密码错误");
        }
        
        // 清空密码
        user.setPassword(null);
        
        return ResponseResult.success(user);
    }
    */
    
    // 临时测试用方法
    @Override
    public ResponseResult<User> login(String username, String password) {
        // 查询用户
        User user = userMapper.selectByUsername(username);
        if (user == null) {
            return ResponseResult.error("用户不存在");
        }
        
        // 直接比较明文密码
        if (password.equals(user.getPassword())) {
            // 登录成功，清空密码
            user.setPassword(null);
            return ResponseResult.success(user);
        } else {
            // 密码错误
            return ResponseResult.error("密码错误");
        }
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
        
        // 验证旧密码（直接明文比较）
        if (!user.getPassword().equals(oldPassword)) {
            return ResponseResult.error("原密码错误");
        }
        
        // 更新密码（不进行加密）
        User updateUser = new User();
        updateUser.setId(userId);
        updateUser.setPassword(newPassword);
        
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