package com.yitaohui.mapper;

import com.yitaohui.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface UserMapper {
    // 根据ID查询用户
    User selectById(Integer id);
    
    // 根据用户名查询用户
    User selectByUsername(String username);
    
    // 插入用户
    int insert(User user);
    
    // 更新用户
    int update(User user);
    
    // 删除用户
    int deleteById(Integer id);
    
    // 查询所有用户
    List<User> selectAll();
    
    // 根据条件查询用户总数
    int count(@Param("username") String username);
    
    // 分页查询用户
    List<User> selectByPage(@Param("username") String username, 
                            @Param("offset") Integer offset, 
                            @Param("limit") Integer limit);
} 