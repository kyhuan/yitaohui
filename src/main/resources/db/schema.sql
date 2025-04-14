-- 创建数据库
CREATE DATABASE IF NOT EXISTS yitaohui DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE yitaohui;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user', -- user或admin
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 商品分类表
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    parent_id INT DEFAULT NULL,
    level INT DEFAULT 1, -- 分类层级: 1一级分类, 2二级分类
    sort_order INT DEFAULT 0, -- 排序
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 商品表
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    description TEXT,
    stock INT DEFAULT 0,
    image VARCHAR(255), -- 主图
    detail TEXT, -- 详情描述
    is_hot BOOLEAN DEFAULT FALSE, -- 是否热门
    is_new BOOLEAN DEFAULT TRUE, -- 是否新品
    status INT DEFAULT 1, -- 1:上架, 0:下架
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 商品图片表
CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 新闻表
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    image VARCHAR(255),
    is_top BOOLEAN DEFAULT FALSE, -- 是否置顶
    status INT DEFAULT 1, -- 1:显示, 0:隐藏
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 购物车表
CREATE TABLE IF NOT EXISTS carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    selected BOOLEAN DEFAULT TRUE, -- 是否选中
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 订单表
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_no VARCHAR(50) NOT NULL UNIQUE, -- 订单号
    user_id INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    payment_price DECIMAL(10,2) NOT NULL, -- 实付金额
    payment_type INT DEFAULT 1, -- 支付方式: 1.在线支付
    status INT DEFAULT 0, -- 0:待付款, 1:待发货, 2:待收货, 3:待评价, 4:已完成, 5:已取消
    shipping_name VARCHAR(50), -- 收货人姓名
    shipping_phone VARCHAR(20), -- 收货人电话
    shipping_address VARCHAR(255), -- 收货地址
    payment_time DATETIME, -- 支付时间
    shipping_time DATETIME, -- 发货时间
    receive_time DATETIME, -- 收货时间
    close_time DATETIME, -- 交易关闭时间
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 订单项表
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    product_image VARCHAR(255),
    price DECIMAL(10,2) NOT NULL, -- 单价
    quantity INT NOT NULL, -- 数量
    total_price DECIMAL(10,2) NOT NULL, -- 总价
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
); 