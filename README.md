# 易淘汇电商网站

易淘汇电商网站是一个简单的电商平台，支持用户注册登录、商品浏览、购物车管理、订单管理等基本功能。

## 技术栈

- 前端：HTML、CSS、JavaScript、jQuery
- 后端：Spring Boot、MyBatis
- 数据库：MySQL

## 项目结构

```
yitaohui/
├── web/                      # 前端代码目录
├── src/                      # 后端源代码
│   ├── main/                 # 主代码
│   │   ├── java/             # Java源代码
│   │   │   └── com/
│   │   │       └── yitaohui/ # 主包
│   │   │           ├── YitaohuiApplication.java     # SpringBoot启动类
│   │   │           ├── config/                      # 配置类
│   │   │           ├── controller/                  # 控制器
│   │   │           ├── model/                       # 实体类
│   │   │           ├── mapper/                      # 数据访问层
│   │   │           ├── service/                     # 服务层
│   │   │           └── utils/                       # 工具类
│   │   └── resources/        # 资源文件
│   │       ├── application.properties  # 应用配置
│   │       ├── mapper/                 # MyBatis映射文件
│   │       ├── static/                 # 静态资源
│   │       └── db/                     # 数据库初始化脚本
```

## 功能模块

1. 用户模块
   - 注册
   - 登录
   - 个人信息管理

2. 商品模块
   - 商品分类
   - 商品列表
   - 商品详情
   - 商品搜索

3. 购物车模块
   - 添加商品到购物车
   - 修改商品数量
   - 删除购物车商品
   - 购物车结算

4. 订单模块
   - 创建订单
   - 订单列表
   - 订单详情
   - 取消订单
   - 确认收货

5. 后台管理模块
   - 商品管理
   - 订单管理
   - 用户管理

## 安装部署

1. 创建数据库并导入初始数据
```sql
source src/main/resources/db/schema.sql
source src/main/resources/db/data.sql
```

2. 修改配置文件 `src/main/resources/application.properties`，配置数据库连接

3. 编译打包
```bash
mvn clean package -DskipTests
```

4. 运行应用
```bash
java -jar target/yitaohui-1.0-SNAPSHOT.jar
```

5. 访问地址：http://localhost:8080

## 管理员账号

- 用户名：admin
- 密码：admin123 