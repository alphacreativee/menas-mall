import { preloadImages } from "../../libs/utils.js";
("use strict");
$ = jQuery;
// setup lenis
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
// end lenis
function customDropdown() {
  const dropdowns = document.querySelectorAll(
    ".dropdown-custom, .dropdown-custom-select"
  );

  dropdowns.forEach((dropdown) => {
    const btnDropdown = dropdown.querySelector(".dropdown-custom-btn");
    const dropdownMenu = dropdown.querySelector(".dropdown-custom-menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-custom-item");
    const valueSelect = dropdown.querySelector(".value-select");
    const displayText = dropdown.querySelector(".dropdown-custom-text");

    // Kiểm tra loại dropdown
    const isSelectType = dropdown.classList.contains("dropdown-custom-select");

    // Toggle dropdown on button click
    btnDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns(dropdown);
      dropdownMenu.classList.toggle("dropdown--active");
      btnDropdown.classList.toggle("--active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function () {
      closeAllDropdowns();
    });

    // Handle item selection
    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();

        if (isSelectType) {
          // Logic cho dropdown-custom-select
          const optionText = item.textContent;
          displayText.textContent = optionText;
          dropdown.classList.add("selected");
        } else {
          // Logic cho dropdown-custom
          const currentImgEl = valueSelect.querySelector("img");
          const currentImg = currentImgEl ? currentImgEl.src : "";
          const currentText = valueSelect.querySelector("span").textContent;
          const clickedHtml = item.innerHTML;

          valueSelect.innerHTML = clickedHtml;

          const isSelectTime = currentText.trim() === "Time";

          if (!isSelectTime) {
            if (currentImg) {
              item.innerHTML = `<span>${currentText}</span><img src="${currentImg}" alt="" />`;
            } else {
              item.innerHTML = `<span>${currentText}</span>`;
            }
          }
        }

        closeAllDropdowns();
      });
    });

    // Close dropdown on scroll
    window.addEventListener("scroll", function () {
      if (dropdownMenu.closest(".header-lang")) {
        dropdownMenu.classList.remove("dropdown--active");
        btnDropdown.classList.remove("--active");
      }
    });
  });

  function closeAllDropdowns(exception) {
    dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector(".dropdown-custom-menu");
      const btn = dropdown.querySelector(".dropdown-custom-btn");

      if (!exception || dropdown !== exception) {
        menu.classList.remove("dropdown--active");
        btn.classList.remove("--active");
      }
    });
  }
}
function hero() {
  if ($("section.hero").length < 1) return;

  var interleaveOffset = 0.9;
  const progressBar = document.querySelector(".swiper-banner .progress-bar");

  var swiperBanner = new Swiper(".swiper-banner", {
    loop: true,
    speed: 900,
    effect: "fade",
    grabCursor: true,
    watchSlidesProgress: true,
    mousewheelControl: true,
    keyboardControl: true,
    navigation: {
      nextEl: ".swiper-banner .swiper-next",
      prevEl: ".swiper-banner .swiper-prev",
    },
    pagination: {
      el: ".swiper-banner .swiper-pagination",
      type: "progressbar",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    on: {
      init: function (swiper) {
        var activeSlide = swiper.slides[swiper.activeIndex];
        var img = activeSlide.querySelector(".slide-banner img");
        if (img) {
          img.style.transform = "scale(1.1)";
          setTimeout(function () {
            img.style.transition = "transform 5000ms ease-out";
            img.style.transform = "scale(1)";
          }, 50);
        }
      },

      setTransition: function (swiper, speed) {
        var easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
        swiper.slides.forEach(function (slide) {
          slide.style.transition = speed + "ms " + easing;
          var slideInner = slide.querySelector(".slide-banner");
          if (slideInner) {
            slideInner.style.transition = speed + "ms " + easing;
          }
        });
      },
      slideChangeTransitionStart: function (swiper) {
        // Reset scale về 1.05 khi bắt đầu chuyển slide
        swiper.slides.forEach(function (slide) {
          var img = slide.querySelector(".slide-banner img");
          if (img) {
            img.style.transform = "scale(1.1)";
          }
        });
      },
      slideChangeTransitionEnd: function (swiper) {
        var activeSlide = swiper.slides[swiper.activeIndex];
        var img = activeSlide.querySelector(".slide-banner img");
        if (img) {
          img.style.transition = "transform 5000ms ease-out";
          img.style.transform = "scale(1)";
        }
      },
    },
  });

  if (
    $("section.hero").length > 0 &&
    $("section.intro").length > 0 &&
    $(window).width() > 991
  ) {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      // markers: true,
      onUpdate: (self) => {
        const threshold = window.innerHeight * 1.4;
        if (self.scroll() >= threshold) {
          $(".hero").addClass("hidden-section");
        } else {
          $(".hero").removeClass("hidden-section");
        }
      },
    });
  }
}
function swiperNews() {
  if ($(".news-slider").length < 1) return;

  var swiperNewsContent = new Swiper(".news-slider-text", {
    effect: "fade",
    loop: true,
    slidesPerView: 1,
    speed: 900,
  });

  var swiperNews = new Swiper(".news-slider", {
    loop: true,
    speed: 900,
    effect: "fade",
    grabCursor: true,
    watchSlidesProgress: true,
    mousewheel: true,
    keyboard: true,
    allowTouchMove: false,
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },
    navigation: {
      nextEl: ".news .swiper-button-next",
      prevEl: ".news .swiper-button-prev",
    },
    controller: {
      control: swiperNewsContent,
    },
  });

  swiperNewsContent.controller.control = swiperNews;

  if ($(".news-mobile").length < 1) return;
  var swiperNewsMobile = new Swiper(".news-mobile", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".news-mobile-wrapper .swiper-button-next",
      prevEl: ".news-mobile-wrapper .swiper-button-prev",
    },
  });
}
function sectionAwards() {
  if ($(".section-awards").length < 1) return;

  document.querySelectorAll(".section-awards").forEach((section) => {
    const swiperEl = section.querySelector(".awards-slider");
    const isAwardsSlider = section.id.includes("awards");

    new Swiper(swiperEl, {
      slidesPerView: isAwardsSlider ? 2 : 4,
      spaceBetween: 30,
      loop: false,
      speed: 800,
      autoplay: false,
      navigation: {
        prevEl: section.querySelector(".arrow-prev"),
        nextEl: section.querySelector(".arrow-next"),
      },
      breakpoints: {
        1024: {
          slidesPerView: isAwardsSlider ? "auto" : 4,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: isAwardsSlider ? "auto" : 3,
          spaceBetween: 24,
        },
        480: {
          slidesPerView: isAwardsSlider ? 1 : 2,
          spaceBetween: 24,
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
      },
    });
  });

  // fade each items
  gsap.utils.toArray(".section-awards").forEach((section) => {
    const items = section.querySelectorAll(".news-item");

    gsap.set(items, { y: 40, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom bottom",
        toggleActions: "play none none none",
        // markers: true,
      },
    });

    tl.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.2,
    });
  });
}
function hideMenuOnFooter() {
  gsap.registerPlugin(ScrollTrigger);
  // show menu chat
  if ($(".chat-button").length > 0) {
    ScrollTrigger.create({
      trigger: "body",
      start: "top top-=180vh",
      end: "bottom bottom",
      onEnter: () => {
        document.querySelector(".chat-button").classList.add("show-chat");
      },
      onLeaveBack: () => {
        document.querySelector(".chat-button").classList.remove("show-chat");
      },
      // markers: true
    });
  }
  // show menu fixed on scroll

  if ($(".menu-fixed-bottom").length > 0) {
    ScrollTrigger.create({
      trigger: "body",
      start: "top top-=180vh",
      end: "bottom bottom",
      onEnter: () => {
        document
          .querySelector(".menu-fixed-bottom")
          .classList.add("show-menu-fixed");
      },
      onLeaveBack: () => {
        document
          .querySelector(".menu-fixed-bottom")
          .classList.remove("show-menu-fixed");
      },
      // markers: true
    });

    // hide menu fixed on footer
    ScrollTrigger.create({
      trigger: "footer",
      start: "top bottom+=50",
      end: "bottom bottom",
      // markers: true,
      onEnter: () => {
        document
          .querySelector(".menu-fixed-bottom")
          .classList.add("hide-menu-fixed");
      },
      onLeaveBack: () => {
        document
          .querySelector(".menu-fixed-bottom")
          .classList.remove("hide-menu-fixed");
      },
    });
  }

  gsap.fromTo(
    ".footer-main",
    { y: 100 },
    {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: () => {
          const heightFooter = document.querySelector("footer").offsetHeight;
          return `bottom-=${heightFooter} bottom`;
        },
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        toggleActions: "play reverse play reverse",
        invalidateOnRefresh: true, // Quan trọng: tính lại khi refresh
      },
    }
  );
}
function magicCursor() {
  if (window.innerWidth < 1024) return;
  const circle = document.querySelector(".magic-cursor");
  if (!circle) return;

  const cursorDot = circle.querySelector(".cursor");
  const cursorText = circle.querySelector(".cursor .text");

  gsap.set(circle, { xPercent: -50, yPercent: -50 });

  let mouseX = 0,
    mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to(circle, {
      x: mouseX,
      y: mouseY,
      duration: 0.1,
    });
  });

  // Hover handler chung, kiểm tra target instanceof Element
  function handleMouseEnter(e) {
    const el =
      e.target instanceof Element
        ? e.target.closest("[data-cursor-text], .modal")
        : null;
    if (!el) return;

    let text = "";

    if (el.classList.contains("modal")) {
      if (lang === "en-US") {
        text = "Close";
      } else if (lang === "zh-CN") {
        text = "关闭";
      } else {
        text = "Đóng";
      }
    } else {
      text = el.dataset.cursorText || "";
    }

    cursorText.innerHTML = `<span class="color-white">${text}</span>`;
    cursorDot.classList.add("show-text");
  }

  function handleMouseLeave(e) {
    const el =
      e.target instanceof Element
        ? e.target.closest("[data-cursor-text], .modal")
        : null;
    if (!el) return;

    cursorText.innerHTML = "";
    cursorDot.classList.remove("show-text");
  }

  function handleModalDialogEnter(e) {
    const el =
      e.target instanceof Element ? e.target.closest(".modal-dialog") : null;
    if (!el) return;

    cursorDot.classList.remove("show-text");
  }

  function handleModalDialogLeave(e) {
    const el =
      e.target instanceof Element ? e.target.closest(".modal-dialog") : null;
    if (!el) return;

    cursorText.innerHTML = `<span class="color-white">Đóng</span>`;
    cursorDot.classList.add("show-text");
  }

  document.addEventListener("mouseenter", handleMouseEnter, true);
  document.addEventListener("mouseleave", handleMouseLeave, true);
  document.addEventListener("mouseenter", handleModalDialogEnter, true);
  document.addEventListener("mouseleave", handleModalDialogLeave, true);
}

function fieldSuggestion() {
  // Normalize string: remove Vietnamese accents
  function removeVietnameseTones(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove diacritics
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }

  // When input is focused
  $(".field-suggestion input").on("focus", function () {
    const $list = $(this).siblings(".field-suggestion__list");

    // Hide all other suggestion lists
    $(".field-suggestion__list").addClass("hidden");

    // Show current list
    $list.removeClass("hidden");
    filterList($list, ""); // show all items
  });

  // Filter when typing
  $(".field-suggestion input").on("input", function () {
    const value = removeVietnameseTones($(this).val().toLowerCase());
    const $list = $(this).siblings(".field-suggestion__list");
    filterList($list, value);
    $list.removeClass("hidden");
  });

  // Select item
  $(".field-suggestion").on("click", "li", function () {
    const text = $(this).text();
    console.log(text);

    const $input = $(this).closest(".field-suggestion").find("input");
    console.log($input);

    $input.val(text);
    $(this).parent().addClass("hidden");
  });

  // Click outside to hide all
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".field-suggestion").length) {
      $(".field-suggestion__list").addClass("hidden");
    }
  });

  // Function: filter list items (accent-insensitive)
  function filterList($list, value) {
    $list.find("li").each(function () {
      const text = $(this).text().toLowerCase();
      const normalizedText = removeVietnameseTones(text);
      $(this).toggle(normalizedText.includes(value));
    });
  }
}

function parallaxSwiper() {
  if (!document.querySelector(".media-list")) return;

  const swiperRoom = new Swiper(".media-list", {
    centeredSlides: true,
    slidesPerView: 1.2,
    initialSlide: 1,
    speed: 900,
    parallax: true,
    loop: true,
    spaceBetween: 8,
    autoplay: {
      delay: 2000,
    },
    navigation: {
      nextEl: ".media .swiper-button-next",
      prevEl: ".media .swiper-button-prev",
    },
    breakpoints: {
      991: {
        slidesPerView: 1.7,
        autoplay: false,
        spaceBetween: 32,
      },
    },
  });
}
function headerMobile() {
  const btnHamburger = document.querySelector(".hamburger");

  btnHamburger.addEventListener("click", () => {
    btnHamburger.classList.toggle("active");
  });
}
const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  customDropdown();
  hero();
  swiperNews();
  sectionAwards();
  hideMenuOnFooter();
  magicCursor();
  fieldSuggestion();
  parallaxSwiper();
  headerMobile();
};
preloadImages("img").then(() => {
  init();
});

// loadpage
let isLinkClicked = false;
$("a").on("click", function (e) {
  // Nếu liên kết dẫn đến trang khác (không phải hash link hoặc javascript void)
  if (this.href && !this.href.match(/^#/) && !this.href.match(/^javascript:/)) {
    isLinkClicked = true;
    console.log("1");
  }
});

$(window).on("beforeunload", function () {
  if (!isLinkClicked) {
    $(window).scrollTop(0);
  }
  isLinkClicked = false;
});
