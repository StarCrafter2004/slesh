import "./style.css";
import Swiper from "swiper/bundle";
import lozad from "lozad";

// import styles bundle
import "swiper/css/bundle";
window.addEventListener("load", () => {
  // функция аккордеона

  initAnchors();
  initVideoButtons();
  initAnimatedBlocks();
  initDrum();
  // Инициализируем lazyload
  const observer = lozad(".lozad", {
    loaded: (el) => {
      console.log("loaded");
      // Пытаемся запустить воспроизведение
      el.play().catch(() => {
        // Если autoplay заблокирован, воспроизводим видео при клике
        setTimeout(() => {
          el.play().catch(() => {
            console.log("Video doesnt load");
          });
        }, 200);
      });
    },
    rootMargin: "100px 0px", // syntax similar to that of CSS Margin
    threshold: 0.1, // ratio of element convergence
    enableAutoReload: true, // it will reload the new image when validating attributes changes
  });
  observer.observe();
  // Загружаем важные медиа
  // lazyLoadInstance.loadAll(document.querySelectorAll(".important-media"));
  initStageLine();
  initMobileSlider();

  initBottomSlider();

  initAccordeon();
});

function initStageLine() {
  const stageSection = document.querySelector(".stage-section");
  const stageBlock = document.querySelector(".stage-block");
  const stageLine = document.querySelector(".stage-line");
  const stageLindeSectionHeight = stageSection.offsetHeight;
  const lineSectionStartPosition = stageSection.offsetTop;
  const lineSectionEndPosition =
    lineSectionStartPosition + stageLindeSectionHeight;
  let screenHeight = window.innerHeight;
  let stageLineStartPosition = screenHeight / 2;
  window.addEventListener("resize", () => {
    screenHeight = window.innerHeight;
    stageLineStartPosition = screenHeight / 2;
  });

  let speed = 0.5;
  let stageLineHeight = 0;
  let scrollY = 0;

  stageLine.style.top = stageLineStartPosition + "px";

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  });

  function animate() {
    stageLineHeight +=
      (scrollY - lineSectionStartPosition - stageLineHeight) * speed;
    if (stageLineHeight >= lineSectionEndPosition - stageLineStartPosition) {
      stageLineHeight = lineSectionEndPosition - stageLineStartPosition;
    }

    const line = document.querySelector(".stage-line");
    line.style.height = stageLineHeight + "px";
    requestAnimationFrame(animate);
  }
  animate();
}

function initMobileSlider() {
  const mobileSliderSection = document.querySelector(".mobile-slider-section");
  const mobileSliderWrapper = document.querySelector(".mobile-wrapper");
  const mobileSliderSlides = Array.from(
    document.querySelectorAll(".mobile-slide"),
  );

  const paginationInner = document.querySelector(".pagination-inner");
  const pagination = document.querySelector(".pagination");

  const mobileSliderStartPosition = mobileSliderSection.offsetTop;
  const sliderHeight = mobileSliderWrapper.offsetHeight;
  const offset = 100;
  const mobileSliderSectionHeight =
    sliderHeight + offset * (mobileSliderSlides.length + 1);
  let sliderScroll = 0;
  let nearestSlidePosition = 0;
  let isTouched = false;

  window.addEventListener("touchstart", () => {
    isTouched = true;
    console.log("Пользователь касается экрана");
    document.body.style.overflow = "";
  });

  window.addEventListener("touchend", () => {
    isTouched = false;
    console.log("Пользователь отпустил экран");
  });
  let nearestSlideIndex = 0;
  let currentSlide = 0;

  class MobileSlider {
    constructor(index, slide, startPoint, endPoint) {
      this.index = index;
      this.slide = slide;
      this.startPoint = startPoint;
      this.endPoint = endPoint;
    }
    normalizeNumber(num) {
      if (num <= this.startPoint) {
        return 0;
      }
      if (num >= this.endPoint) {
        return offset;
      }
      return num % offset; // Иначе берем остаток от деления на 100
    }

    setOpacity(scroll) {
      let opacity;
      if (scroll < 0) {
        opacity = 0;
      } else if (scroll >= breakpoints.at(-1)) {
        if (this.index == currentSlide) {
          opacity = 1;
        } else {
          opacity = 0;
        }
      } else if (this.index == currentSlide) {
        if (scroll == this.startPoint) {
          opacity = 0;
        } else if (scroll == this.endPoint) {
          opacity = 1;
        } else {
          opacity = (scroll % offset) / offset;
        }
      } else if (this.index + 1 == currentSlide) {
        if (scroll == this.startPoint) {
          opacity = 0;
        }
        if (scroll == this.endPoint) {
          opacity = 1;
        } else {
          opacity = 1 - (scroll % offset) / offset;
        }
      } else {
        opacity = 0;
      }
      this.slide.style.opacity = opacity;
    }

    setTop(scroll) {
      let top = this.normalizeNumber(scroll);
      this.slide.style.top = -top + offset + "px";
    }
  }
  const breakpoints = [];
  for (let i = 0; i < mobileSliderSlides.length + 1; i++) {
    breakpoints[i] = i * offset;
  }

  const slides = mobileSliderSlides.map((slide, i) => {
    return new MobileSlider(i, slide, breakpoints[i], breakpoints[i + 1]);
  });

  mobileSliderSection.style.height = mobileSliderSectionHeight + "px";

  window.addEventListener("scroll", () => {
    const scrollY = Math.round(window.scrollY);
    sliderScroll = scrollY - mobileSliderStartPosition;

    pagination.style.opacity = sliderScroll >= 0 ? 1 : 0;
    const clampedScroll = Math.max(
      0,
      Math.min(sliderScroll, breakpoints.at(-1)),
    );

    const scrollPercent =
      (clampedScroll / (offset * mobileSliderSlides.length)) * 100;
    paginationInner.style.width = scrollPercent + "%";

    for (let i = 0; i < mobileSliderSlides.length + 1; i++) {
      if (
        sliderScroll >= breakpoints[i] &&
        sliderScroll <= breakpoints[i + 1]
      ) {
        currentSlide = i;
      }
      if (
        sliderScroll >= breakpoints[i + 1] - offset / 2 &&
        sliderScroll < breakpoints[i + 1] + offset / 2
      ) {
        if (nearestSlideIndex != i) {
          console.log(i);
        }
        nearestSlideIndex = i;
      } else if (
        sliderScroll >= breakpoints[0] &&
        sliderScroll < breakpoints[1]
      ) {
        nearestSlideIndex = 0;
      } else if (
        sliderScroll < breakpoints.at(-1) &&
        sliderScroll >= breakpoints.at(-2) + offset / 2
      ) {
        nearestSlideIndex = mobileSliderSlides.length - 1;
      } else if (
        sliderScroll < breakpoints[0] ||
        sliderScroll > breakpoints.at(-1)
      ) {
        nearestSlideIndex = -1;
      }
    }

    nearestSlidePosition =
      (nearestSlideIndex + 1) * offset + mobileSliderStartPosition;

    slides.forEach((slide) => {
      slide.setOpacity(sliderScroll);
      slide.setTop(sliderScroll);
    });
  });

  function scroll() {
    console.log(nearestSlidePosition);

    if (nearestSlideIndex != -1 && !isTouched) {
      document.body.style.overflow = "hidden";
      window.scrollTo({
        top: nearestSlidePosition,
        behavior: "smooth",
      });
    }
    requestAnimationFrame(scroll);
  }
  scroll();
}

function initBottomSlider() {
  const container = document
    .querySelector("#mentor")
    .querySelector(".container");
  const wrappers = document.querySelectorAll(".swiper-wrapper-bottom");
  let pageWidth = window.innerWidth;
  let p = pageWidth >= 1024 ? 80 : 15;
  let containerWidth = container.offsetWidth;
  let padding = (pageWidth - containerWidth) / 2 + p;
  wrappers.forEach((item) => {
    item.style.padding = `0px ${padding}px 0px ${padding}px`;
  });

  window.addEventListener("resize", () => {
    pageWidth = window.innerWidth;
    p = pageWidth >= 1024 ? 80 : 15;
    containerWidth = container.offsetWidth;
    let padding = (pageWidth - containerWidth) / 2 + p;
    wrappers.forEach((item) => {
      item.style.padding = `0px ${padding}px 0px ${padding}px`;
    });
  });

  const initSliderOpacity = (slides, opacity) => {
    slides.forEach((slide) => {
      slide.style.opacity = opacity;
    });
  };

  const changeOpasity = (e, slides) => {
    if (pageWidth >= 640) {
      initSliderOpacity(slides, 1);
    } else {
      const totalSlides = e.slides.length;

      initSliderOpacity(slides, 0.7);
      slides[e.activeIndex].style.opacity = 1;

      if (e.activeIndex === totalSlides - 1) {
        e.allowSlideNext = false;
      } else {
        e.allowSlideNext = true;
      }
    }
  };

  const teachSlides = document.querySelectorAll(".mentor-slide");
  const caseSlides = document.querySelectorAll(".case-slide");
  const swiperWrapers = document.querySelectorAll(".swiper-wrapper");
  if (pageWidth >= 640) {
    initSliderOpacity(teachSlides, 1);
    initSliderOpacity(caseSlides, 1);
  } else {
    initSliderOpacity(teachSlides, 0.7);
    initSliderOpacity(caseSlides, 0.7);
  }

  teachSlides[0].style.opacity = 1;
  caseSlides[0].style.opacity = 1;

  var teachSlider = new Swiper(".teach_slider", {
    slidesPerView: "auto" /* Позволяет использовать ширину слайда как в CSS */,
    spaceBetween: 20 /* Отступ между слайдами */,
    centeredSlides: false /* Отключение автоматического центрирования слайдов */,
    loop: false /* Оставляем как пример: не включать зацикливание */,
    slidesOffsetAfter: 1000,
  });
  var caseSlider = new Swiper(".case_slider", {
    slidesPerView: "auto" /* Позволяет использовать ширину слайда как в CSS */,
    spaceBetween: 20 /* Отступ между слайдами */,
    centeredSlides: false /* Отключение автоматического центрирования слайдов */,
    loop: false /* Оставляем как пример: не включать зацикливание */,
    slidesOffsetAfter: 1500,
  });

  teachSlider.on("activeIndexChange", (e) => changeOpasity(e, teachSlides));
  caseSlider.on("activeIndexChange", (e) => changeOpasity(e, caseSlides));
}

function initAnchors() {
  document.querySelectorAll(".anchor").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const offset = -100; // Устанавливаем желаемое смещение вверх
        const offsetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

function initAccordeon() {
  document.querySelectorAll(".accordion").forEach((item) => {
    item.addEventListener("click", () => {
      const content = item.nextElementSibling;
      const accordeonPlusElement = item.querySelector(".accordeon_plus");

      if (content.style.maxHeight) {
        document
          .querySelectorAll(".accordion_content")
          .forEach((item) => (item.style.maxHeight = null));
        document
          .querySelectorAll(".accordeon_plus")
          .forEach((item) => item.classList.remove("active"));
      } else {
        document
          .querySelectorAll(".accordion_content")
          .forEach((item) => (item.style.maxHeight = null));
        document
          .querySelectorAll(".accordeon_plus")
          .forEach((item) => item.classList.remove("active"));
        content.style.maxHeight = content.scrollHeight + "px";
        accordeonPlusElement.classList.add("active");
      }
    });
  });
}

function initAnimatedBlocks() {
  const animatedSection = document.querySelector(".blocks_section");
  const animatedSlider = document.querySelector("#animated-slider");
  const animatedBlocks = document.querySelectorAll(".animated-block");

  const animatedBlocksWrappers = document.querySelectorAll(
    ".animated-block_wrapper",
  );
  const startPosition = animatedSection.offsetTop;

  animatedBlocksWrappers.forEach((item, i) => {
    const k = i == 0 ? 1 : 0.75;
    const inner = item.querySelector(".animated-block");
    const fullHeight = inner.offsetHeight * k;

    item.style.height = fullHeight + "px";
    inner.classList.add("duration-1000");
    item.classList.add("duration-1000");
  });

  //инициализация значений высоты для полосы прокрутки и координат слайдера
  const blockHeight = animatedSlider.offsetHeight;
  const sectionHeight = 4 * blockHeight;

  //инициализация брейкпоинтов
  const blockBreakpoints = [];
  blockBreakpoints[0] = startPosition;
  for (let i = 1; i < 6; i++) {
    blockBreakpoints[i] = blockBreakpoints[i - 1] + blockHeight / 2;
  }

  //установка высоты для секции
  animatedSection.style.height = sectionHeight + "px";

  const makeActive = (item) => {
    const inner = item.querySelector(".animated-block");
    const fullHeight = inner.offsetHeight;
    item.style.height = fullHeight + "px";
    inner.style.transform = "scale(1)";
    inner.style.opacity = "1";
  };

  const makeDeactive = (item) => {
    const inner = item.querySelector(".animated-block");
    const fullHeight = inner.offsetHeight;
    item.style.height = fullHeight * 0.75 + "px";
    inner.style.transform = "scale(0.75)";
    inner.style.opacity = "0.5";
  };

  function animateBlocks(scrollY) {
    for (let i = 0; i < 5; i++) {
      if (scrollY > blockBreakpoints[i] && scrollY < blockBreakpoints[i + 1]) {
        if (i != 0) {
          makeDeactive(animatedBlocksWrappers[i - 1]);
        }

        makeActive(animatedBlocksWrappers[i]);
        if (i < 4) {
          makeDeactive(animatedBlocksWrappers[i + 1]);
        }
      }
    }
  }

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    animateBlocks(scrollY);
  });
}

function initDrum() {
  const drum = document.querySelector(".drum");
  const drumContainer = document.querySelector(".drum-container");
  const drumItems = document.querySelectorAll(".drum-element");
  const drumSection = document.querySelector(".drum-section");
  const drumBlocks = document.querySelectorAll(".drum-block");

  const drumTextMax = window.getComputedStyle(drumItems[2]).fontSize;
  const drumTextMin = window.getComputedStyle(drumItems[1]).fontSize;
  const drumLeadingMax = window.getComputedStyle(drumItems[2]).lineHeight;
  const drumLeadingMin = window.getComputedStyle(drumItems[1]).lineHeight;
  const offsetBottom = window.getComputedStyle(drumItems[2]).marginBottom;

  const drumBlockHeight = drumContainer.offsetHeight;
  const drumSectionHeight = 4 * drumBlockHeight;

  let drumStartPosition = drumSection.offsetTop;
  const drumBreakpoints = [];

  let drumPosition = 0;

  drumSection.style.height = drumSectionHeight + "px";

  drumBreakpoints[0] = drumStartPosition;
  for (let i = 1; i < 6; i++) {
    drumBreakpoints[i] = drumBreakpoints[i - 1] + drumBlockHeight * 0.6;
  }
  drumItems[1].classList.add("transition-all");
  drumItems[1].classList.add("duration-700");
  drumItems[2].classList.add("transition-all");
  drumItems[2].classList.add("duration-700");

  const firstItemHeight = drumItems[0].offsetHeight;

  let currentNumber = 0;

  function scrollUp() {
    //находим последний элемент
    const currentItems = [];

    for (let i = 0; i < 6; i++) {
      currentItems[i] = drum.querySelector(
        `[data-number="${i + currentNumber}"]`,
      );
    }

    let lastItem = currentItems[0];

    //смещение контейнера
    drumPosition -= firstItemHeight + 2;
    drum.style.transform = `translateY(${drumPosition}px)`;

    //плавное затемнение верхнего блока
    lastItem.style.opacity = 0;

    //Измение параметров остального слайда
    currentItems[1].style.opacity = 0.25;
    currentItems[2].style.fontSize = drumTextMin;
    currentItems[2].style.marginBottom = 0;
    // currentItems[2].style.lineHeight = drumLeadingMin;
    currentItems[2].style.opacity = 0.5;
    currentItems[3].style.fontSize = drumTextMax;
    currentItems[3].style.marginBottom = offsetBottom;
    // currentItems[3].style.lineHeight = drumLeadingMax;
    currentItems[3].style.opacity = 1;
    currentItems[4].style.opacity = 0.5;

    currentItems[5].style.opacity = 0.25;

    //меняем текущий индекс
  }

  function scrollDown() {
    //находим последний элемент
    const currentItems = [];

    for (let i = 0; i < 6; i++) {
      currentItems[i] = drum.querySelector(
        `[data-number="${i + currentNumber - 1}"]`,
      );
    }

    let lastItem = currentItems[5];

    //смещение контейнера
    drumPosition += firstItemHeight + 2;
    drum.style.transform = `translateY(${drumPosition}px)`;

    //плавное затемнение верхнего блока
    lastItem.style.opacity = 0;

    //Измение параметров остального слайда
    currentItems[0].style.opacity = 0.25;
    currentItems[1].style.opacity = 0.5;
    currentItems[2].style.fontSize = drumTextMax;
    currentItems[2].style.marginBottom = offsetBottom;
    // currentItems[2].style.lineHeight = drumLeadingMax;
    currentItems[2].style.opacity = 1;
    currentItems[3].style.opacity = 0.5;
    currentItems[3].style.fontSize = drumTextMin;
    currentItems[3].style.marginBottom = 0;

    // currentItems[3].style.lineHeight = drumLeadingMin;
    currentItems[4].style.opacity = 0.25;
  }
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    animateDrum(scrollY);
  });

  function setCurrentDrumItem(DrumItem) {
    if (DrumItem > currentNumber) {
      for (let i = 0; i < DrumItem - currentNumber; i++) {
        scrollUp();
        currentNumber++;
      }
    }
    if (DrumItem < currentNumber) {
      for (let i = 0; i < currentNumber - DrumItem; i++) {
        scrollDown();
        currentNumber--;
      }
    }
  }

  function setCurrentDrumBlock(DrumItem) {
    if (DrumItem === undefined) {
      return;
    }
    drumBlocks.forEach((item) => {
      item.style.opacity = 0;
    });

    drumBlocks[DrumItem].style.opacity = 1;
  }

  function animateDrum(scrollY) {
    let drumItem;
    for (let i = 0; i < 5; i++) {
      if (scrollY > drumBreakpoints[i] && scrollY < drumBreakpoints[i + 1]) {
        drumItem = i;
      }
    }
    setCurrentDrumItem(drumItem);
    setCurrentDrumBlock(drumItem);
  }
}

function initVideoButtons() {
  const videos = document
    .querySelectorAll(".case-video")
    .forEach((videoWrap) => {
      const videoButton = videoWrap.querySelector("button");
      const video = videoWrap.querySelector("video");
      const playImg = videoButton.querySelector("img");

      videoButton.addEventListener("click", () => {
        video.play();
        playImg.style.opacity = 0;
      });
    });
}
