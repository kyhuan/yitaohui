package com.yitaohui.mapper;

import com.yitaohui.model.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface CategoryMapper {
    // 根据ID查询分类
    Category selectById(Integer id);
    
    // 查询所有一级分类
    List<Category> selectParentCategories();
    
    // 根据父级ID查询子分类
    List<Category> selectByParentId(Integer parentId);
    
    // 查询所有分类
    List<Category> selectAll();
    
    // 插入分类
    int insert(Category category);
    
    // 更新分类
    int update(Category category);
    
    // 删除分类
    int deleteById(Integer id);
    
    // 查询分类及其子分类
    List<Category> selectWithChildren();
} 