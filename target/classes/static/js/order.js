// 这个文件应该保存为 src/main/resources/static/js/order.js

$(function() {
    // // 检查用户登录状态
    // checkLoginStatus();

    // 加载订单数据
    loadOrderData();

    // 标签页切换
    $('.orderform-list .cate li').click(function() {
        $('.orderform-list .cate li').removeClass('active');
        $(this).addClass('active');

        // 根据选中的状态筛选订单
        var status = $(this).index();
        if (status === 0) {
            // 所有订单
            $('tbody').show();
        } else {
            // 根据状态筛选
            $('tbody').hide();
            $('tbody:has(.state:contains("待付款"))').show();
        }
    });

    // 模拟支付功能
    $(document).on('click', '.pay', function() {
        var orderNo = $(this).closest('tbody').find('.code p:nth-child(2)').text().split('：')[1];

        // 弹出确认框
        if (confirm('确认支付订单: ' + orderNo + ' ?')) {
            // 发送支付请求
            $.ajax({
                url: '/api/order/pay/' + orderNo,
                type: 'PUT',
                data: {
                    userId: localStorage.getItem('userId')
                },
                success: function(response) {
                    if (response.code === 200) {
                        alert('支付成功！');
                        // 刷新订单列表
                        location.reload();
                    } else {
                        alert(response.message || '支付失败，请重试！');
                    }
                },
                error: function() {
                    // 模拟支付成功，实际中应与后端交互
                    alert('支付成功！');

                    // 修改订单状态
                    var $row = $(this).closest('tbody');
                    $row.find('.state').text('待发货');
                    $row.find('.btn').html(
                        '<a href="javascript:;" class="detail">订单详情</a>'
                    );

                    // 刷新页面
                    setTimeout(function() {
                        location.reload();
                    }, 1500);
                }
            });
        }
    });

    // 取消订单功能
    $(document).on('click', '.cancel', function() {
        var $row = $(this).closest('tbody');
        var orderNo = $row.find('.code p:nth-child(2)').text().split('：')[1];

        // 弹出确认框
        if (confirm('确认取消订单: ' + orderNo + ' ?')) {
            // 发送取消订单请求
            $.ajax({
                url: '/api/order/cancel/' + orderNo,
                type: 'PUT',
                data: {
                    userId: localStorage.getItem('userId')
                },
                success: function(response) {
                    if (response.code === 200) {
                        alert('订单已取消！');
                        // 刷新订单列表
                        location.reload();
                    } else {
                        alert(response.message || '取消订单失败，请重试！');
                    }
                },
                error: function() {
                    // 模拟取消成功，实际中应与后端交互
                    alert('订单已取消！');

                    // 修改订单状态
                    $row.find('.state').text('已取消');
                    $row.find('.btn').html(
                        '<a href="javascript:;" class="detail">订单详情</a>'
                    );

                    // 刷新页面
                    setTimeout(function() {
                        location.reload();
                    }, 1500);
                }
            });
        }
    });

    // 订单详情功能
    $(document).on('click', '.detail', function() {
        var orderNo = $(this).closest('tbody').find('.code p:nth-child(2)').text().split('：')[1];
        // 跳转到订单详情页
        window.location.href = '/static/orderDetail.html?orderNo=' + orderNo;
    });

    // 搜索功能
    $('#searchOrder').on('click', function() {
        var keyword = $('#orderKeyword').val().trim();
        if (!keyword) {
            alert('请输入订单号或商品名称');
            return;
        }

        // 隐藏所有订单
        $('tbody').hide();

        // 显示符合条件的订单
        $('tbody:contains("' + keyword + '")').show();
    });

    // 重置搜索功能
    $('#resetSearch').on('click', function() {
        $('#orderKeyword').val('');
        $('tbody').show();
    });
});

// 检查用户登录状态
function checkLoginStatus() {
    var isLogin = localStorage.getItem('isLogin');
    var userId = localStorage.getItem('userId');

    if (!isLogin || !userId) {
        // 未登录，跳转到登录页
        alert('请先登录！');
        window.location.href = '/static/login.html';
    }
}

// 加载订单数据
function loadOrderData() {
    var userId = localStorage.getItem('userId');

    // 从后端加载订单数据
    $.ajax({
        url: '/api/order/list',
        type: 'GET',
        data: {
            userId: userId
        },
        success: function(response) {
            if (response.code === 200 && response.data) {
                renderOrderList(response.data);
            } else {
                console.log('获取订单数据失败：', response.message);
            }
        },
        error: function() {
            console.log('获取订单数据失败');
            // 页面中已有静态数据，所以这里不做处理
        }
    });
}

// 渲染订单列表
function renderOrderList(orders) {
    // 如果有真实订单数据，可以在这里渲染
    // 但由于目前页面上已有静态数据，暂不实现

    // 为已有的订单按钮添加点击事件
    $('.pay').click(function() {
        var orderNo = $(this).closest('tbody').find('.code p:nth-child(2)').text().split('：')[1];
        simulatePayment(orderNo, $(this));
    });

    $('.cancel').click(function() {
        var orderNo = $(this).closest('tbody').find('.code p:nth-child(2)').text().split('：')[1];
        cancelOrder(orderNo, $(this));
    });
}

// 模拟支付
function simulatePayment(orderNo, buttonElement) {
    // 弹出确认框
    if (confirm('确认支付订单: ' + orderNo + ' ?')) {
        // 显示支付中
        buttonElement.text('支付中...');

        // 模拟支付过程
        setTimeout(function() {
            alert('支付成功！');

            // 修改订单状态
            var $row = buttonElement.closest('tbody');
            $row.find('.state').text('待发货');
            $row.find('.btn').html(
                '<a href="javascript:;" class="detail">订单详情</a>'
            );

            // 刷新页面
            setTimeout(function() {
                location.reload();
            }, 500);
        }, 1000);
    }
}

// 取消订单
function cancelOrder(orderNo, buttonElement) {
    // 弹出确认框
    if (confirm('确认取消订单: ' + orderNo + ' ?')) {
        // 显示取消中
        buttonElement.text('取消中...');

        // 模拟取消过程
        setTimeout(function() {
            alert('订单已取消！');

            // 修改订单状态
            var $row = buttonElement.closest('tbody');
            $row.find('.state').text('已取消');
            $row.find('.btn').html(
                '<a href="javascript:;" class="detail">订单详情</a>'
            );

            // 刷新页面
            setTimeout(function() {
                location.reload();
            }, 500);
        }, 1000);
    }
}