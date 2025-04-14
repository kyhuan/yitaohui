// 搜索功能实现
// 该脚本实现商品搜索功能

// 商品数据，实际应用中可能从后端获取
const products = [
    { id: 1, name: "iqoo neo 9spro", category: "手机通讯", price: 2999.00, image: "./images/product10.jpg" },
    { id: 2, name: "vivo x100", category: "手机通讯", price: 2999.00, image: "./images/product1.jpg" },
    { id: 3, name: "xiaomi 13ultra", category: "手机通讯", price: 2999.00, image: "./images/product2.jpg" },
    { id: 4, name: "iphone 15", category: "手机通讯", price: 2999.00, image: "./images/product3.jpg" },
    { id: 5, name: "redmi 13pro", category: "手机通讯", price: 2999.00, image: "./images/product4.jpg" },
    { id: 6, name: "iqoo neo9", category: "手机通讯", price: 2999.00, image: "./images/product5.png" },
    { id: 7, name: "oppo find x7ultra", category: "手机通讯", price: 2999.00, image: "./images/product6.jpg" },
    { id: 8, name: "iqoo neo 9pro", category: "手机通讯", price: 2999.00, image: "./images/product7.jpg" },
    { id: 9, name: "vivo x100", category: "手机通讯", price: 2999.00, image: "./images/product8.jpg" },
    { id: 10, name: "iqoo 12", category: "手机通讯", price: 2999.00, image: "./images/product9.jpg" },
    { id: 11, name: "福临门 食用油", category: "食品生鲜", price: 49.00, image: "./images/product21.jpg" },
    { id: 12, name: "茅台 王子酒", category: "食品生鲜", price: 49.00, image: "./images/product22.jpg" },
    { id: 13, name: "京鲜生 山东大樱桃", category: "食品生鲜", price: 49.00, image: "./images/product23.jpg" },
    { id: 14, name: "海飞丝去屑洗发水", category: "美妆护理", price: 49.00, image: "./images/product24.jpg" },
    { id: 15, name: "青岛啤酒", category: "食品生鲜", price: 49.00, image: "./images/product25.jpg" },
    { id: 16, name: "维达抽纸", category: "家居日用", price: 49.00, image: "./images/product26.jpg" },
    { id: 17, name: "王小卤虎皮凤爪", category: "食品生鲜", price: 49.00, image: "./images/product27.jpg" },
    { id: 18, name: "小鹿蓝蓝 婴幼儿棒棒饼干", category: "食品生鲜", price: 49.00, image: "./images/product28.jpg" },
    { id: 19, name: "立白洗衣凝珠", category: "家居日用", price: 49.00, image: "./images/product29.jpg" },
    { id: 20, name: "福临门 葵花籽油", category: "食品生鲜", price: 49.00, image: "./images/product210.jpg" }
];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取搜索框和按钮
    const searchInput = document.querySelector('.search input');
    const searchButton = document.querySelector('.search button');

    // 搜索按钮点击事件
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        performSearch(searchInput.value);
    });

    // 搜索框回车事件
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(searchInput.value);
        }
    });

    // 初始化localStorage
    if (!localStorage.getItem('searchHistory')) {
        localStorage.setItem('searchHistory', JSON.stringify([]));
    }
});

// 执行搜索
function performSearch(query) {
    if (!query.trim()) {
        alert('请输入搜索关键词');
        return;
    }

    // 保存搜索历史
    saveSearchHistory(query);

    // 执行搜索
    const results = searchProducts(query);

    // 保存搜索结果到sessionStorage
    sessionStorage.setItem('searchResults', JSON.stringify(results));

    // 重定向到搜索结果页面（这里假设有个search-results.html页面）
    // 如果没有单独的结果页面，也可以直接在当前页显示结果
    window.location.href = 'productList.html?query=' + encodeURIComponent(query);
}

// 搜索商品
function searchProducts(query) {
    query = query.toLowerCase().trim();
    return products.filter(product => {
        return product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query);
    });
}

// 保存搜索历史
function saveSearchHistory(query) {
    query = query.trim();
    if (!query) return;

    let history = JSON.parse(localStorage.getItem('searchHistory') || '[]');

    // 如果已经存在，移除旧的
    history = history.filter(item => item !== query);

    // 添加到历史记录的开头
    history.unshift(query);

    // 限制历史记录数量（例如保存最近10条）
    history = history.slice(0, 10);

    localStorage.setItem('searchHistory', JSON.stringify(history));
}

// 商品列表页面加载时处理搜索结果
function displaySearchResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        // 从URL中获取搜索关键词，显示在搜索框中
        const searchInput = document.querySelector('.search input');
        if (searchInput) {
            searchInput.value = query;
        }

        const results = JSON.parse(sessionStorage.getItem('searchResults') || '[]');

        // 获取商品列表容器
        const productContainer = document.querySelector('.bookslist-sec2');

        if (productContainer && results.length > 0) {
            // 清空现有内容
            productContainer.innerHTML = '';

            // 显示搜索结果
            results.forEach(product => {
                const productElement = createProductElement(product);
                productContainer.appendChild(productElement);
            });

            // 更新页面标题，显示搜索结果
            const titleElement = document.querySelector('.layer');
            if (titleElement) {
                titleElement.textContent = `"${query}" 的搜索结果`;
            }
        } else if (productContainer && results.length === 0) {
            // 没有搜索结果
            productContainer.innerHTML = '<div class="no-results">没有找到符合条件的商品</div>';

            // 添加一些样式
            const style = document.createElement('style');
            style.textContent = `
        .no-results {
          text-align: center;
          padding: 50px 0;
          font-size: 18px;
          color: #888;
        }
      `;
            document.head.appendChild(style);
        }
    }
}

// 创建商品元素
function createProductElement(product) {
    const productElement = document.createElement('a');
    productElement.href = `./productShow.html?id=${product.id}`;
    productElement.className = 'once';

    productElement.innerHTML = `
    <div class="box-img">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="price">￥${product.price.toFixed(2)}</div>
    <div class="title clamp2">${product.name}</div>
    <div class="info">
      <span>${new Date().toISOString().slice(0, 10)}</span>
      <span>易淘汇</span>
    </div>
    <div class="btn">
      <span class="collection">
        <i class="iconfont icon-a-shoucang-weishoucang"></i>
      </span>
      <span class="cart" data-id="${product.id}">
        <i class="iconfont icon-gouwuche"></i>
        加入购物车
      </span>
    </div>
  `;

    // 为商品添加"加入购物车"点击事件
    productElement.querySelector('.cart').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    });

    return productElement;
}

// 页面加载时初始化
window.addEventListener('load', function() {
    if (window.location.pathname.includes('productList.html')) {
        displaySearchResults();
    }
});