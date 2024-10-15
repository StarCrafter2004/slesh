import Swiper from "swiper/bundle";
import "./style.css";

// import styles bundle
import "swiper/css/bundle";
window.addEventListener("DOMContentLoaded", () => {
  // функция аккордеона

  setTimeout(() => {
    initAnchors();
    initVideoButtons();
    initAnimatedBlocks();
    initDrum();
    initStageLine();
    initMobileSlider();
    initBottomSlider();
    initAccordeon();
  }, 1000);
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
  console.log("Стартовая позиция" + lineSectionStartPosition);

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
    if (scrollY >= lineSectionStartPosition) {
      console.log(scrollY - lineSectionStartPosition);
    }
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
  const mobileSliderElem = document.querySelector(".swiper-wrapper");
  const mobileSliderSlide = document.querySelector(".swiper-slide");
  const mobileSliderStartPosition = mobileSliderSection.offsetTop;
  const mobileSliderWidth = mobileSliderSlide.offsetWidth * 7;
  const sliderHeight = mobileSliderElem.offsetHeight;
  const mobileSliderSectionHeight = sliderHeight + mobileSliderWidth + 100;
  const mobileSlider = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
      progressbarFillClass: "swiper-pagination-progressbar-fill-custom",
    },
    autoHeight: false,
    freeMode: true,
    watchOverflow: true,
  });

  //установка высоты блока
  mobileSliderSection.style.height = mobileSliderSectionHeight + "px";

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    animateMobileSlider(scrollY);
  });

  const animateMobileSlider = (scrollY) => {
    const translateValue = -scrollY + mobileSliderStartPosition;
    if (scrollY < mobileSliderStartPosition) {
      mobileSlider.translateTo(0, 100, false, false);
    }
    if (scrollY > mobileSliderStartPosition) {
      if (-translateValue < mobileSliderWidth) {
        mobileSlider.translateTo(translateValue, 0, false, false);
      } else {
        mobileSlider.translateTo(-mobileSliderWidth, 100, false, false);
      }
    }
    mobileSlider.updateProgress();
    mobileSlider.updateActiveIndex(); // обновляем активный слайд
    mobileSlider.updateSlidesClasses();
  };
}

function initBottomSlider() {
  const initSliderOpacity = (slides) => {
    slides.forEach((slide) => {
      slide.style.opacity = 0.7;
    });
  };

  const changeOpasity = (e, slides) => {
    const totalSlides = e.slides.length;

    initSliderOpacity(slides);
    slides[e.activeIndex].style.opacity = 1;

    if (e.activeIndex === totalSlides - 1) {
      e.allowSlideNext = false;
    } else {
      e.allowSlideNext = true;
    }
  };

  const teachSlides = document.querySelectorAll(".mentor-slide");
  const caseSlides = document.querySelectorAll(".case-slide");
  initSliderOpacity(teachSlides);
  initSliderOpacity(caseSlides);
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
  const drumBlockHeight = drumContainer.offsetHeight;
  const drumSectionHeight = 6 * drumBlockHeight;

  let drumStartPosition = drumSection.offsetTop;
  const drumBreakpoints = [];

  let drumPosition = 0;

  drumSection.style.height = drumSectionHeight + "px";

  drumBreakpoints[0] = drumStartPosition;
  for (let i = 1; i < 6; i++) {
    drumBreakpoints[i] = drumBreakpoints[i - 1] + drumBlockHeight * 0.9;
  }

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
    currentItems[2].style.opacity = 0.5;
    currentItems[3].style.fontSize = drumTextMax;
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
    currentItems[2].style.opacity = 1;
    currentItems[3].style.opacity = 0.5;
    currentItems[3].style.fontSize = drumTextMin;
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
