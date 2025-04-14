$(function () {
    // 选项卡切换功能
    $("ul.nav-tab>li>a").click(function (e) {
        e.preventDefault();
        let showid = $(this).attr("href");
        $(showid).siblings().removeClass("active");
        $(showid).addClass("active");
        $(this).parent("li").siblings().removeClass("active");
        $(this).parent("li").addClass("active");
    })

    // banner
    var bannerSwiper = new Swiper('.index-banner .swiper', {
        autoplay: {
            delay: 3500,
        },
        speed: 1000,
        autoHeight: true,
        loop: true,
        navigation: {
            nextEl: '.index-banner .swiper-button-next',
            prevEl: '.index-banner .swiper-button-prev',
        },
        pagination: {
            el: '.index-banner .swiper-pagination',
            clickable: true
        }
    });

    // 详情页小图
    var swiper_small = new Swiper(".swiper_small", {
        loop: false,
        spaceBetween: 15,
        slidesPerView: 5,
        watchSlidesProgress: true,
    });

    // 详情页大图
    var swiper_big = new Swiper(".swiper_big", {
        loop: false,
        spaceBetween: 0,
        navigation: {
            nextEl: ".swiper_big .swiper-button-next",
            prevEl: ".swiper_big .swiper-button-prev",
        },
        thumbs: {
            swiper: swiper_small,
        },
    });

    var mySwiper2 = new Swiper(".news-recommend .mySwiper", {
        autoplay: {
            delay: 3500,
        },
        speed: 800,
        autoHeight: true,
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
            nextEl: '.news-recommend .swiper-button-next',
            prevEl: '.news-recommend .swiper-button-prev',
        },
        pagination: {
            el: '.news-recommend .swiper-pagination',
            clickable: true
        },
    });

    // 切换登录注册
    $('.login-sec .btn>a').click(function () {
        $('.register-sec').addClass('active')
        $('.login-sec').removeClass('active')
        $('.page-login .layer-form').removeClass('active')
    })

    $('.register-sec .btn>a').click(function () {
        $('.register-sec').removeClass('active')
        $('.login-sec').addClass('active')
        $('.page-login .layer-form').addClass('active')
    })

    // 置顶按钮
    $(window).scroll(function () {
        if ($(window).scrollTop() > 400) {
            $("#roll-top").fadeIn(400);
        } else {
            $("#roll-top").fadeOut(400)
        }
    });

    // 验证表单
    $('.about-sec4 .contact-box form a.button').click(function () {
        let nickname = $('input[name="nickname"]').val()
        let email = $('input[name="email"]').val()
        let phone = $('input[name="phone"]').val()
        let address = $('input[name="address"]').val()
        let content = $('textarea[name="content"]').val()
        let result1 = nickname.length > 0 && email.length > 0 && phone.length > 0 && address.length > 0 && content.length > 0
        if (!result1) {
            alert('信息填写不完整，请检查！')
            return false
        }
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result2 = re.test(email.toLowerCase());

        if (!result2) {
            alert('邮件地址格式错误，请检查！')
            return false
        }

        if (result1 && result2) {
            alert('发送成功！')
            $('input[name="nickname"]').val('')
            $('input[name="email"]').val('')
            $('input[name="phone"]').val('')
            $('input[name="address"]').val('')
            $('textarea[name="content"]').val('')
        }
    })

    // 验证登录
    $('.login-info form a.button').click(function () {
        let username = $(this).siblings('input[name="username"]').val()
        let pwd = $(this).siblings('input[name="pwd"]').val()
        let result1 = username.length > 0 && pwd.length > 0
        if (result1) {
            alert('登录成功！')
        } else {
            alert('信息填写不完整，请检查！')
        }
    })

    // 验证注册
    $('.register-info form a.button').click(function () {
        let username = $(this).siblings('input[name="username"]').val()
        let pwd = $(this).siblings('input[name="pwd"]').val()
        let pwd2 = $(this).siblings('input[name="pwd2"]').val()
        let email = $(this).siblings('input[name="email"]').val()

        let result = ''
        if (username.length <= 0) {
            result = result + '【用户名不能为空】'
        }

        if (pwd <= 0 || pwd2 <= 0) {
            result = result + '【密码框不能为空】'
        }

        if (pwd != pwd2) {
            result = result + '【两次输入的密码不一致】'
        }

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result2 = re.test(email.toLowerCase());

        if (!result2) {
            result = result + '【邮件地址格式错误】'
        }

        if (result == '') {
            alert('注册成功！')
        } else {
            alert(result)
        }
    })
})