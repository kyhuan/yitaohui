/**
 * 商品列表和搜索功能
 */

// 当前页码和每页数量
let currentPage = 1;
const pageSize = 12;

// 存储查询参数
let searchParams = {
    categoryId: null,
    keyword: null,
    pageNum: currentPage,
    pageSize: pageSize
};

// 初始化函数
$(function() {
    // 从URL获取查询参数
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('categoryId')) {
        searchParams.categoryId = urlParams.get('categoryId');
    }
    if (urlParams.has('keyword')) {
        searchParams.keyword = urlParams.get('keyword');
        // 将关键词填充到搜索框
        $('#searchInput').val(searchParams.keyword);
    }
    
    // 首次加载商品列表
    loadProductList();
    
    // 绑定搜索按钮事件
    $('#searchBtn').on('click', function() {
        const keyword = $('#searchInput').val().trim();
        if (keyword) {
            searchParams.keyword = keyword;
            searchParams.categoryId = null; // 搜索时清除分类筛选
            searchParams.pageNum = 1; // 重置为第一页
            loadProductList();
            
            // 更新URL参数，但不刷新页面
            const newUrl = updateURLParameter(window.location.href, 'keyword', keyword);
            window.history.pushState({path: newUrl}, '', newUrl);
        }
    });
    
    // 绑定搜索框回车事件
    $('#searchInput').on('keypress', function(e) {
        if (e.which === 13) {
            $('#searchBtn').click();
            return false; // 阻止表单提交
        }
    });
    
    // 绑定分类筛选事件
    $('.category-item').on('click', function() {
        const categoryId = $(this).data('category-id');
        searchParams.categoryId = categoryId;
        searchParams.keyword = null; // 分类筛选时清除关键词
        searchParams.pageNum = 1; // 重置为第一页
        loadProductList();
        
        // 更新URL参数，但不刷新页面
        let newUrl = updateURLParameter(window.location.href, 'categoryId', categoryId);
        newUrl = updateURLParameter(newUrl, 'keyword', '');
        window.history.pushState({path: newUrl}, '', newUrl);
        
        // 清空搜索框
        $('#searchInput').val('');
    });
    
    // 绑定分页事件
    $(document).on('click', '.pagination-item', function() {
        if (!$(this).hasClass('active') && !$(this).hasClass('disabled')) {
            searchParams.pageNum = parseInt($(this).data('page'));
            loadProductList();
            
            // 滚动到页面顶部
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        }
    });
});

// 加载商品列表
function loadProductList() {
    // 显示加载中状态
    $('#productList').html('<div class="loading-spinner"><div class="spinner"></div><p>加载中...</p></div>');
    
    // 调用API获取商品列表
    ProductAPI.getProductList(
        searchParams.categoryId, 
        searchParams.keyword, 
        searchParams.pageNum, 
        searchParams.pageSize
    ).done(function(response) {
        // 处理成功响应
        if (response.code === 0) {
            const data = response.data;
            renderProductList(data.list, data.total);
        } else {
            // 显示错误消息
            $('#productList').html('<div class="error-message">加载商品列表失败：' + response.msg + '</div>');
        }
    }).fail(function(error) {
        // 处理错误
        $('#productList').html('<div class="error-message">加载商品列表失败，请稍后再试</div>');
        console.error('获取商品列表失败:', error);
    });
}

// 渲染商品列表
function renderProductList(products, total) {
    // 清空商品列表
    $('#productList').empty();
    
    if (products && products.length > 0) {
        // 渲染商品列表
        $.each(products, function(index, product) {
            const productItem = `
                <div class="col-md-3 col-sm-6 mb-4">
                    <div class="product-item">
                        <a href="productDetail.html?id=${product.id}" class="product-link">
                            <div class="product-img">
                                <img src="${product.mainImage}" alt="${product.name}" class="img-fluid">
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">${product.name}</h3>
                                <div class="product-price">¥${product.price.toFixed(2)}</div>
                                <div class="product-sale">${product.stock > 0 ? '有货' : '缺货'}</div>
                            </div>
                        </a>
                    </div>
                </div>
            `;
            $('#productList').append(productItem);
        });
        
        // 渲染分页
        renderPagination(total, searchParams.pageSize, searchParams.pageNum);
    } else {
        // 没有找到商品
        let message = '没有找到相关商品';
        if (searchParams.keyword) {
            message = `没有找到与"${searchParams.keyword}"相关的商品`;
        }
        $('#productList').html(`<div class="no-results"><i class="fa fa-search"></i><p>${message}</p></div>`);
    }
}

// 渲染分页
function renderPagination(total, pageSize, currentPage) {
    const totalPages = Math.ceil(total / pageSize);
    if (totalPages <= 1) return; // 只有一页不显示分页
    
    let paginationHtml = '<div class="pagination-container"><ul class="pagination">';
    
    // 上一页按钮
    if (currentPage > 1) {
        paginationHtml += `<li class="pagination-item" data-page="${currentPage - 1}"><i class="fa fa-chevron-left"></i></li>`;
    } else {
        paginationHtml += `<li class="pagination-item disabled"><i class="fa fa-chevron-left"></i></li>`;
    }
    
    // 分页数字
    const maxDisplayPages = 5; // 最多显示5个页码
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayPages / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);
    
    // 调整起始页码
    if (endPage - startPage + 1 < maxDisplayPages) {
        startPage = Math.max(1, endPage - maxDisplayPages + 1);
    }
    
    // 第一页
    if (startPage > 1) {
        paginationHtml += `<li class="pagination-item" data-page="1">1</li>`;
        if (startPage > 2) {
            paginationHtml += `<li class="pagination-item disabled">...</li>`;
        }
    }
    
    // 页码
    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHtml += `<li class="pagination-item active" data-page="${i}">${i}</li>`;
        } else {
            paginationHtml += `<li class="pagination-item" data-page="${i}">${i}</li>`;
        }
    }
    
    // 最后一页
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHtml += `<li class="pagination-item disabled">...</li>`;
        }
        paginationHtml += `<li class="pagination-item" data-page="${totalPages}">${totalPages}</li>`;
    }
    
    // 下一页按钮
    if (currentPage < totalPages) {
        paginationHtml += `<li class="pagination-item" data-page="${currentPage + 1}"><i class="fa fa-chevron-right"></i></li>`;
    } else {
        paginationHtml += `<li class="pagination-item disabled"><i class="fa fa-chevron-right"></i></li>`;
    }
    
    paginationHtml += '</ul></div>';
    
    // 添加到商品列表后面
    $('#productList').after(paginationHtml);
}

// 更新URL参数函数
function updateURLParameter(url, param, value) {
    // 删除哈希部分
    const hashIndex = url.indexOf("#");
    let hash = '';
    if (hashIndex !== -1) {
        hash = url.substring(hashIndex);
        url = url.substring(0, hashIndex);
    }
    
    // 解析URL
    let urlParts = url.split('?');
    let baseUrl = urlParts[0];
    let urlParams = urlParts[1] ? urlParts[1].split('&') : [];
    let updated = false;
    
    // 检查并替换已存在的参数
    for (let i = 0; i < urlParams.length; i++) {
        let paramParts = urlParams[i].split('=');
        if (paramParts[0] === param) {
            if (value) {
                urlParams[i] = param + '=' + encodeURIComponent(value);
            } else {
                urlParams.splice(i, 1); // 如果值为空，则删除参数
                i--;
            }
            updated = true;
        }
    }
    
    // 如果参数不存在且有值，则添加
    if (!updated && value) {
        urlParams.push(param + '=' + encodeURIComponent(value));
    }
    
    // 重建URL
    return baseUrl + (urlParams.length ? '?' + urlParams.join('&') : '') + hash;
} 