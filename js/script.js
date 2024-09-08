!(function ($) {
    "use strict";

    /*============================================
        Sticky header
    ============================================*/
    $(window).on("scroll", function () {
        var header = $(".header-area");
        // If window scroll down .is-sticky class will added to header
        if ($(window).scrollTop() >= 200) {
            header.addClass("is-sticky");
        } else {
            header.removeClass("is-sticky");
        }
    });


    /*============================================
        Mobile menu
    ============================================*/
    var mobileMenu = function () {
        // Variables
        var body = $("body"),
            mainNavbar = $(".main-navbar"),
            mobileNavbar = $(".mobile-menu"),
            cloneInto = $(".mobile-menu-wrapper"),
            cloneItem = $(".mobile-item"),
            menuToggler = $(".menu-toggler"),
            offCanvasMenu = $("#offcanvasMenu")

        menuToggler.on("click", function () {
            $(this).toggleClass("active");
            body.toggleClass("mobile-menu-active")
        })

        mainNavbar.find(cloneItem).clone(!0).appendTo(cloneInto);

        if (offCanvasMenu) {
            body.find(offCanvasMenu).clone(!0).appendTo(cloneInto);
        }

        mobileNavbar.find("li").each(function (index) {
            var toggleBtn = $(this).children(".toggle")
            toggleBtn.on("click", function (e) {
                $(this)
                    .parent("li")
                    .children("ul")
                    .stop(true, true)
                    .slideToggle(350);
                $(this).parent("li").toggleClass("show");
            })
        })

        // check browser width in real-time
        var checkBreakpoint = function () {
            var winWidth = window.innerWidth;
            if (winWidth <= 1199) {
                mainNavbar.hide();
                mobileNavbar.show()
            } else {
                mainNavbar.show();
                mobileNavbar.hide()
            }
        }
        checkBreakpoint();

        $(window).on('resize', function () {
            checkBreakpoint();
        });
    }
    mobileMenu();


    /*============================================
        Navlink active class
    ============================================*/
    var a = $("#mainMenu .nav-link"),
        c = window.location;

    for (var i = 0; i < a.length; i++) {
        const el = a[i];

        if (el.href == c) {
            el.classList.add("active");
        }
    }


    /*============================================
        Image to background image
    ============================================*/
    var bgImage = $(".bg-img")
    bgImage.each(function () {
        var el = $(this),
            src = el.attr("data-bg-image");

        el.css({
            "background-image": "url(" + src + ")",
            "display": "block"
        });
    });


    /*============================================
        Sidebar toggle
    ============================================*/
    $(".category-toggle").on("click", function (t) {
        var i = $(this).closest("li"),
            o = i.find("ul").eq(0);

        if (i.hasClass("open")) {
            o.slideUp(300, function () {
                i.removeClass("open")
            })
        } else {
            o.slideDown(300, function () {
                i.addClass("open")
            })
        }
        t.stopPropagation(), t.preventDefault()
    })


    /*============================================
        Sliders
    ============================================*/
    // Hero Slider
    var heroSlider1 = new Swiper(".hero-slider-1", {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
        },
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        coverflowEffect: {
            rotate: 0,
            stretch: -65,
            depth: 200,
            modifier: 1,
            slideShadows: false,
        },

        pagination: {
            el: '#hero-slider-1-pagination',
            clickable: true,
        },

        breakpoints: {
            320: {
                slidesPerView: 2,
                coverflowEffect: {
                    stretch: -25,
                    depth: 200,
                },
            },
            576: {
                slidesPerView: 3,
                coverflowEffect: {
                    stretch: -45,
                },
            },
            768: {
                coverflowEffect: {
                    stretch: -60,
                },
            },
            992: {
                coverflowEffect: {
                    stretch: -80,
                },
            },
            1200: {
                coverflowEffect: {
                    stretch: -65,
                },
            },
        }
    })

    // Screenshot Slider
    var screenshotSlider1 = new Swiper(".screenshot-slider-1", {
        speed: 1200,
        spaceBetween: 10,
        // loop: true,
        pagination: true,
        slidesPerView: 1,
        grabCursor: true,
        autoplay: {
            delay: 5000,
        },

        pagination: {
            el: '.screenshot-slider-pagination',
            clickable: true,
        },

        scrollbar: {
            el: ".swiper-scrollbar"
        },
    })
    
    // Screenshot Slider all
    $(".screenshot-slider").each(function () {
        var id = $(this).attr("id");
        var slidePerView = $(this).data("slides-per-view");
        var sliderId = "#" + id;

        var swiper = new Swiper(sliderId, {
            loop: true,
            centeredSlides: true,
            speed: 1000,
            autoplay: {
                delay: 3000,
            },
            effect: 'coverflow',
            grabCursor: true,
            slidesPerView: slidePerView,
            pagination: true,
            coverflowEffect: {
                rotate: 0,
                depth: 200,
                slideShadows: true
            },

            pagination: {
                el: sliderId + "-pagination",
                clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: sliderId + "-next",
                prevEl: sliderId + "-prev",
            },

            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 2,
                },
                // when window width is >= 576px
                576: {
                    slidesPerView: 3
                },
                // when window width is >= 768px
                992: {
                    slidesPerView: slidePerView
                },
            }
        })
    })

    // Testimonial Slider 1
    // Testimonial Slider 1 Thumb
    var testimonialThumb = new Swiper(".testimonial-thumb", {
        speed: 1000,
        loop: false,
        centeredSlides: true,
        slidesPerView: 'auto',
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
    var testimonialSlider1 = new Swiper("#testimonial-slider-1", {
        speed: 1000,
        spaceBetween: 25,
        loop: false,
        slidesPerView: 1,
        slidesPerView: 'auto',
        autoplay: true,

        pagination: {
            el: '#testimonial-slider-1-pagination',
            bulletClass: 'custom-image-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                var images = [];
                $("#testimonial-slider-1 .swiper-slide").each(function () {
                    var attr = $(this).find('img').attr('data-src');
                    images.push(attr);
                });
                return '<img class="' + className + '" src="' + images[index] + '" alt="Demo Image">';
            },
        },
    });
    // Sync testimonial slider 1
    testimonialSlider1.controller.control = testimonialThumb;
    testimonialThumb.controller.control = testimonialSlider1;
    
    // Testimonial Slider 2
    var testimonialSlider2 = new Swiper("#testimonial-slider-2", {
        speed: 1200,
        spaceBetween: 30,
        loop: true,
        pagination: true,
        slidesPerView: 1,
        grabCursor: true,
        autoplay: {
            delay: 5000,
        },

        pagination: {
            el: '#testimonial-slider-2-pagination',
            clickable: true,
        }
    })

    // Testimonial Slider 3
    var testimonialSlider3 = new Swiper("#testimonial-slider-3", {
        speed: 1200,
        spaceBetween: 0,
        loop: true,
        slidesPerView: 3,
        pagination: true,
        autoplay: true,
        centeredSlides: true,

        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 2
            },
            // when window width is >= 768px
            992: {
                slidesPerView: 3
            },
        }
    })

    // Testimonial Slider 4
    var testimonialSlider4 = new Swiper("#testimonial-slider-4", {
        speed: 1200,
        spaceBetween: 30,
        loop: true,
        slidesPerView: 5,
        pagination: true,
        autoplay: true,
        centeredSlides: true,

        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1
            },
            // when window width is >= 768px
            768: {
                slidesPerView: 2
            },
            // when window width is >= 768px
            992: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
        }
    })

    // Brand Slider
    var brandSlider = new Swiper(".brand-slider", {
        speed: 1200,
        spaceBetween: 30,
        loop: true,
        pagination: true,
        slidesPerView: 5,
        grabCursor: true,
        autoplay: {
            delay: 5000,
        },

        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 5,
            }
        }
    })

    // Team Slider
    $(".team-slider").each(function () {
        var id = $(this).attr("id");
        var sliderId = "#" + id;
        var slidePerView = $(this).data("slides-per-view");

        new Swiper(sliderId, {
            speed: 1200,
            spaceBetween: 30,
            loop: true,
            slidesPerView: slidePerView,
            pagination: true,
            autoplay: true,

            pagination: {
                el: sliderId + "-pagination",
                clickable: true,
            },

            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 2
                },
                // when window width is >= 768px
                992: {
                    slidesPerView: slidePerView
                },
            }
        })
    })

    // Stop slider autoplay
    $(document).ready(function () {

        if ($(".swiper").length) {
            var mySwiper = document.querySelector(".swiper").swiper

            $(".swiper").mouseenter(function () {
                mySwiper.autoplay.stop();
            });

            $(".swiper").mouseleave(function () {
                mySwiper.autoplay.start();
            });
        }
    });


    /*============================================
        Parallax image
    ============================================*/
    var parallax = $('.parallax');

    parallax.each(function () {
        $(this).mousemove(function (e) {
            var wx = $(window).width();
            var wy = $(window).height();
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var newx = x - wx / 2;
            var newy = y - wy / 2;

            var parallaxChild = $(this).find('.parallax-img');
            parallaxChild.each(function () {
                var speed = $(this).attr('data-speed');
                if ($(this).attr('data-revert')) speed *= -.2;
                TweenMax.to($(this), 1, {
                    x: (1 - newx * speed),
                    y: (1 - newy * speed)
                });
            });
        });
    })


    /*============================================
        Pricing Tab Switch
    ============================================*/
    $("#toggleSwitch").on("change", function (event) {
        if (event.currentTarget.checked) {
            $("#yearly, .text-yearly").addClass("active");
            $("#monthly, .text-monthly").removeClass("active");
        } else {
            $("#monthly, .text-monthly").addClass("active");
            $("#yearly, .text-yearly").removeClass("active");
        }
    })


    /*============================================
        Pricing show more toggle
    ============================================*/
    $(".pricing-list").each(function (i) {
        var list = $(this).children();
        var listShow = $(this).data("toggle-show");
        if (list.length > listShow) {
            this.insertAdjacentHTML('afterEnd', '<span class="show-more">Show More</span>');
            const showLink = $(this).next(".show-more");
            list.slice(listShow).toggle(300);
            showLink.on("click", function () {
                list.slice(listShow).slideToggle(300);
                showLink.html(showLink.html() === "Show More" ? "Show Less" : "Show More")
            })
        }
    })
    // Adding active class on hover
    $('.pricing-area .item:nth-child(2) .pricing-item').addClass('active');
    $('.pricing-area').on('mouseover', '.pricing-item', function () {
        $('.pricing-item.active').removeClass('active');
        $(this).addClass('active');
    });


    /*============================================
        Hover Tilt
    ============================================*/
    if($('.js-tilt').length) {
        $('.js-tilt').tilt({
            glare: true,
            maxGlare: .5,
            perspective: 500
        });
    }


    /*============================================
        Odometer
    ============================================*/
    $(".counter").counterUp({
        delay: 10,
        time: 1000
    });


    /*============================================
        Youtube popup
    ============================================*/
    $(".youtube-popup").magnificPopup({
        disableOn: 300,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    })


    /*============================================
        Go to top
    ============================================*/
    $(window).on("scroll", function () {
        // If window scroll down .active class will added to go-top
        var goTop = $(".go-top");

        if ($(window).scrollTop() >= 200) {
            goTop.addClass("active");
        } else {
            goTop.removeClass("active")
        }
    })
    $(".go-top").on("click", function (e) {
        $("html, body").animate({
            scrollTop: 0,
        }, 0);
    });


    /*============================================
        Lazyload image
    ============================================*/
    var lazyLoad = function () {
        window.lazySizesConfig = window.lazySizesConfig || {};
        window.lazySizesConfig.loadMode = 2;
        lazySizesConfig.preloadAfterLoad = true;
    }


    /*============================================
        Nice select
    ============================================*/
    $(".niceselect").niceSelect();

    var selectList = $(".nice-select .list")
    $(".nice-select .list").each(function () {
        var list = $(this).children();
        if (list.length > 5) {
            $(this).css({
                "height": "160px",
                "overflow-y": "scroll"
            })
        }
    })


    /*============================================
        Password icon toggle
    ============================================*/
    $(".show-password-field").on("click", function () {
        var showIcon = $(this).children(".show-icon");
        var passwordField = $(this).prev("input");
        showIcon.toggleClass("show");
        if (passwordField.attr("type") == "password") {
            passwordField.attr("type", "text")
        } else {
            passwordField.attr("type", "password");
        }
    })


    /*============================================
        Cookiebar
    ============================================*/
    window.setTimeout(function () {
        $(".cookie-bar").addClass("show")
    }, 1000);
    $(".cookie-bar .btn").on("click", function () {
        $(".cookie-bar").removeClass("show")
    });


    /*============================================
        Footer date
    ============================================*/
    var date = new Date().getFullYear();
    $("#footerDate").text(date);


    /*============================================
        Document on ready
    ============================================*/
    $(document).ready(function () {
        lazyLoad()
    })

    /*============================================
        Countdown Timer
    ============================================*/
    function makeTimer() {
        var endTime = new Date("May 20, 2024 17:00:00 PDT");
        var endTime = (Date.parse(endTime)) / 1000;
        var now = new Date();
        var now = (Date.parse(now) / 1000);
        var timeLeft = endTime - now;
        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < "10") {
            hours = "0" + hours;
        }
        if (minutes < "10") {
            minutes = "0" + minutes;
        }
        if (seconds < "10") {
            seconds = "0" + seconds;
        }
        $("#days .time").html(days);
        $("#hours .time").html(hours);
        $("#minutes .time").html(minutes);
        $("#seconds .time").html(seconds);
    }
    setInterval(function() {
        makeTimer()
    }, 0);

})(jQuery);

$(window).on("load", function () {
    const delay = 1000;
    /*============================================
        Preloader
    ============================================*/
    $("#preLoader").delay(delay).fadeOut();

    /*============================================
        Aos animation
    ============================================*/
    var aosAnimation = function () {
        AOS.init({
            easing: "ease",
            duration: 1500,
            once: true,
            offset: 0,
            disable: 'mobile'
        });
    }
    if ($("#preLoader")) {
        setTimeout(() => {
            aosAnimation()
        }, delay);
    } else {
        aosAnimation();
    }
})
