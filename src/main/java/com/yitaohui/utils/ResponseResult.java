package com.yitaohui.utils;

import lombok.Data;

/**
 * 通用响应结果类
 */
@Data
public class ResponseResult<T> {
    private Integer code;
    private String message;
    private T data;

    // 成功响应
    public static <T> ResponseResult<T> success() {
        return success(null);
    }

    public static <T> ResponseResult<T> success(T data) {
        ResponseResult<T> result = new ResponseResult<>();
        result.setCode(200);
        result.setMessage("操作成功");
        result.setData(data);
        return result;
    }

    // 失败响应
    public static <T> ResponseResult<T> error(String message) {
        return error(500, message);
    }

    public static <T> ResponseResult<T> error(Integer code, String message) {
        ResponseResult<T> result = new ResponseResult<>();
        result.setCode(code);
        result.setMessage(message);
        return result;
    }
} 