package com.yitaohui.service;

import com.yitaohui.model.Product;
import com.yitaohui.utils.ResponseResult;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface ProductService {
    
    /**
     * 获取商品列表
     */
    ResponseResult<List<Product>> getProductList(Integer categoryId, String keyword, Integer pageNum, Integer pageSize);
    
    /**
     * 获取商品详情
     */
    ResponseResult<Product> getProductDetail(Integer id);
    
    /**
     * 获取热门商品
     */
    ResponseResult<List<Product>> getHotProducts(Integer limit);
    
    /**
     * 获取新品
     */
    ResponseResult<List<Product>> getNewProducts(Integer limit);
    
    /**
     * 搜索商品
     */
    ResponseResult<List<Product>> searchProducts(String keyword, Integer pageNum, Integer pageSize);
    
    /**
     * 保存商品(新增或更新)
     */
    ResponseResult<Product> saveProduct(Product product);
    
    /**
     * 删除商品
     */
    ResponseResult<Void> deleteProduct(Integer id);
    
    /**
     * 更新商品状态
     */
    ResponseResult<Void> updateProductStatus(Integer id, Integer status);
}