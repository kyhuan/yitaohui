package com.yitaohui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.mybatis.spring.annotation.MapperScan;

@SpringBootApplication
@MapperScan("com.yitaohui.mapper")
public class YitaohuiApplication {
    public static void main(String[] args) {
        SpringApplication.run(YitaohuiApplication.class, args);
    }
} 