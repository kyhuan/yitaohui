package com.yitaohui.controller;

import com.yitaohui.model.Product;
import com.yitaohui.service.ProductService;
import com.yitaohui.utils.ResponseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    /**
     * 获取商品列表
     */
    @GetMapping("/list")
    public ResponseResult<List<Product>> getProductList(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false, defaultValue = "1") Integer pageNum,
            @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        return productService.getProductList(categoryId, keyword, pageNum, pageSize);
    }

    /**
     * 获取商品详情
     */
    @GetMapping("/detail/{id}")
    public ResponseResult<Product> getProductDetail(@PathVariable Integer id) {
        return productService.getProductDetail(id);
    }

    /**
     * 获取热门商品
     */
    @GetMapping("/hot")
    public ResponseResult<List<Product>> getHotProducts(
            @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return productService.getHotProducts(limit);
    }

    /**
     * 获取新品
     */
    @GetMapping("/new")
    public ResponseResult<List<Product>> getNewProducts(
            @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return productService.getNewProducts(limit);
    }

    /**
     * 搜索商品
     */
    @GetMapping("/search")
    public ResponseResult<List<Product>> searchProducts(
            @RequestParam String keyword,
            @RequestParam(required = false, defaultValue = "1") Integer pageNum,
            @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        return productService.searchProducts(keyword, pageNum, pageSize);
    }
} 