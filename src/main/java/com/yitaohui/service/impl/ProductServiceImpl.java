package com.yitaohui.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.yitaohui.mapper.ProductMapper;
import com.yitaohui.model.Product;
import com.yitaohui.service.ProductService;
import com.yitaohui.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductMapper productMapper;

    @Override
    public ResponseResult<List<Product>> getProductList(Integer categoryId, String keyword, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Product> products = productMapper.selectByPage(categoryId, keyword, (pageNum - 1) * pageSize, pageSize);
        return ResponseResult.success(products);
    }

    @Override
    public ResponseResult<Product> getProductDetail(Integer id) {
        Product product = productMapper.selectById(id);
        if (product == null) {
            return ResponseResult.error("商品不存在");
        }
        return ResponseResult.success(product);
    }

    @Override
    public ResponseResult<List<Product>> getHotProducts(Integer limit) {
        List<Product> products = productMapper.selectHotProducts(limit);
        return ResponseResult.success(products);
    }

    @Override
    public ResponseResult<List<Product>> getNewProducts(Integer limit) {
        List<Product> products = productMapper.selectNewProducts(limit);
        return ResponseResult.success(products);
    }

    @Override
    public ResponseResult<List<Product>> searchProducts(String keyword, Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<Product> products = productMapper.selectByNameLike(keyword);
        return ResponseResult.success(products);
    }

    @Override
    public ResponseResult<Product> saveProduct(Product product) {
        if (product.getId() == null) {
            // 新增
            productMapper.insert(product);
        } else {
            // 更新
            productMapper.update(product);
        }
        return ResponseResult.success(product);
    }

    @Override
    public ResponseResult<Void> deleteProduct(Integer id) {
        productMapper.deleteById(id);
        return ResponseResult.success();
    }

    @Override
    public ResponseResult<Void> updateProductStatus(Integer id, Integer status) {
        productMapper.updateStatus(id, status);
        return ResponseResult.success();
    }
}
