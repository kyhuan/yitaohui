USE yitaohui;

-- 插入管理员用户
INSERT INTO users (username, password, email, role) 
VALUES ('admin', '$2a$10$6PZYsJEq1FPr.NzSc3Qja.gXs5qwp96KybULZxgfzuFEUNx2Ajvrq', 'admin@yitaohui.com', 'admin'); -- 密码：admin123

-- 插入普通用户
INSERT INTO users (username, password, email, phone, address) VALUES 
('user1', '$2a$10$nBRpXgT2VzO.d5Y5.r41Oe8X3VFoyTXdvaQ75ZFCaC9MpC0xcWvDi', 'user1@example.com', '13800138001', '北京市朝阳区'), -- 密码：123456
('user2', '$2a$10$nBRpXgT2VzO.d5Y5.r41Oe8X3VFoyTXdvaQ75ZFCaC9MpC0xcWvDi', 'user2@example.com', '13800138002', '上海市浦东新区'); -- 密码：123456

-- 插入一级分类
INSERT INTO categories (name, parent_id, level) VALUES 
('手机通讯', NULL, 1),
('电脑整机', NULL, 1),
('教育考试', NULL, 1),
('家居日用', NULL, 1),
('生活休闲', NULL, 1),
('科学技术', NULL, 1),
('食品生鲜', NULL, 1);

-- 插入二级分类
INSERT INTO categories (name, parent_id, level) VALUES 
('游戏手机', 1, 2),
('AI手机', 1, 2),
('对讲机', 1, 2),
('全面屏手机', 1, 2),
('手机维修', 1, 2),
('笔记本', 2, 2),
('游戏本', 2, 2),
('平板电脑', 2, 2),
('中小教辅', 3, 2),
('外语学习', 3, 2),
('厨具', 4, 2),
('居家布艺', 4, 2),
('家居饰品', 4, 2),
('灯具', 4, 2),
('烹饪美食', 5, 2),
('育儿早教', 5, 2),
('工业科技', 6, 2),
('建筑', 6, 2),
('医学', 6, 2),
('新鲜水果', 7, 2),
('蔬菜蛋品', 7, 2),
('精选肉类', 7, 2),
('休闲食品', 7, 2);

-- 插入商品
INSERT INTO products (name, category_id, price, original_price, description, stock, image, detail, is_hot, is_new, status) VALUES 
('小米13Ultra 徕卡光学全焦段四摄 第二代骁龙8处理器', 8, 1999.00, 2999.00, '小米（MI）13Ultra 徕卡光学全焦段四摄 第二代骁龙8处理器 2K超色准屏 16+512GB 黑色 AI', 100, '/images/product2.jpg', '<p>商品详情内容</p>', TRUE, TRUE, 1),
('Apple/苹果 iPhone 15 Pro Max (A3108) 256GB', 1, 1999.00, 2999.00, 'Apple/苹果 iPhone 15 Pro Max (A3108) 256GB 原色钛金属 支持移动联通电信5G 双卡双待', 100, '/images/product3.jpg', '<p>商品详情内容</p>', TRUE, FALSE, 1),
('vivo iQOO Neo9S Pro 天玑9300+旗舰芯', 8, 1999.00, 2999.00, 'vivo iQOO Neo9S Pro 天玑9300+旗舰芯 自研电竞芯片Q1 1.5K 144Hz 8T 全天候无感屏 电竞游戏5G', 100, '/images/product5.png', '<p>商品详情内容</p>', FALSE, TRUE, 1),
('OPPO Find X7 Ultra 哈苏影像', 1, 1999.00, 2999.00, 'OPPO【卫星通信版本可选】OPPO Find X7 Ultra 哈苏影像 第三代骁龙8 AI', 100, '/images/product6.jpg', '<p>商品详情内容</p>', TRUE, TRUE, 1),
('VIVOX100 Ultra 5G智能手机', 1, 5999.00, 6499.00, 'VIVOX100 Ultra 5G智能手机 蔡司2亿 APO 超级长焦 搭载第三代骁龙8 钛色 12+256G', 50, '/images/pro-show1.avif', '<p>商品详情内容</p>', TRUE, TRUE, 1);

-- 商品图片
INSERT INTO product_images (product_id, image_url, sort_order) VALUES 
(5, '/images/pro-show1.avif', 1),
(5, '/images/pro-show2.avif', 2),
(5, '/images/pro-show3.avif', 3),
(5, '/images/pro-show4.avif', 4),
(5, '/images/pro-show5.avif', 5),
(5, '/images/pro-show6.avif', 6);

-- 插入新闻
INSERT INTO news (title, content, image, is_top, status) VALUES 
('易淘汇618大促即将开始', '<p>6月1日-6月18日，易淘汇年中大促，全场5折起，更有满300减50、满500减100活动，快来抢购吧！</p>', '/images/news1.jpg', TRUE, 1),
('全新会员体系上线公告', '<p>尊敬的用户，易淘汇全新会员体系已上线，消费即可积分，积分可当钱花，还有专属会员价，赶快行动吧！</p>', '/images/news2.jpg', FALSE, 1),
('关于假冒易淘汇网站的声明', '<p>近期发现有不法分子假冒易淘汇网站进行诈骗，请广大用户提高警惕，认准官方网址和客服电话。</p>', '/images/news3.jpg', TRUE, 1); 