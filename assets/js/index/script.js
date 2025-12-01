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
const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  customDropdown();
  hero();
  swiperNews();
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
