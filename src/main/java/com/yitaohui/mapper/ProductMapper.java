package com.yitaohui.mapper;

import com.yitaohui.model.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface ProductMapper {
    // 根据ID查询商品
    Product selectById(Integer id);
    
    // 插入商品
    int insert(Product product);
    
    // 更新商品
    int update(Product product);
    
    // 删除商品
    int deleteById(Integer id);
    
    // 查询所有商品
    List<Product> selectAll();
    
    // 查询热门商品
    List<Product> selectHotProducts(Integer limit);
    
    // 查询新品
    List<Product> selectNewProducts(Integer limit);
    
    // 根据分类ID查询商品
    List<Product> selectByCategoryId(@Param("categoryId") Integer categoryId);
    
    // 根据名称关键字查询商品
    List<Product> selectByNameLike(@Param("keyword") String keyword);
    
    // 更新商品状态
    int updateStatus(@Param("id") Integer id, @Param("status") Integer status);
    
    // 分页查询商品
    List<Product> selectByPage(@Param("categoryId") Integer categoryId, 
                               @Param("keyword") String keyword,
                               @Param("offset") Integer offset, 
                               @Param("limit") Integer limit);
    
    // 根据条件查询商品总数
    int count(@Param("categoryId") Integer categoryId, @Param("keyword") String keyword);
} 