import Swiper from "swiper/bundle";
import "./style.css";

// import styles bundle
import "swiper/css/bundle";
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".accordion").forEach((item) => {
    item.addEventListener("click", () => {
      const content = item.nextElementSibling;
      const accordeonPlusElement = item.querySelector(".accordeon_plus");
      console.log(content);
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

  var mobileSlider = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
      progressbarFillClass: "swiper-pagination-progressbar-fill-custom",
      autoHeight: false,
    },
  });

  // слайдер с менторами

  setTimeout(() => {
    const initSliderOpacity = (slides) => {
      slides.forEach((slide) => {
        slide.style.opacity = 0.7;
      });
    };

    const changeOpasity = (e, slides) => {
      console.dir(e.activeIndex);
      const totalSlides = e.slides.length;
      console.log("Слайд1 " + totalSlides);
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
      slidesPerView:
        "auto" /* Позволяет использовать ширину слайда как в CSS */,
      spaceBetween: 20 /* Отступ между слайдами */,
      centeredSlides: false /* Отключение автоматического центрирования слайдов */,
      loop: false /* Оставляем как пример: не включать зацикливание */,
      slidesOffsetAfter: 1000,
    });
    var caseSlider = new Swiper(".case_slider", {
      slidesPerView:
        "auto" /* Позволяет использовать ширину слайда как в CSS */,
      spaceBetween: 20 /* Отступ между слайдами */,
      centeredSlides: false /* Отключение автоматического центрирования слайдов */,
      loop: false /* Оставляем как пример: не включать зацикливание */,
      slidesOffsetAfter: 1500,
    });

    teachSlider.on("activeIndexChange", (e) => changeOpasity(e, teachSlides));
    caseSlider.on("activeIndexChange", (e) => changeOpasity(e, caseSlides));
  }, 1000);

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

  const animatedSection = document.querySelector(".blocks_section");
  const animatedSlider = document.querySelector("#animated-slider");
  const animatedBlocks = document.querySelectorAll(".animated-block");
  const animatedBlocksWrappers = document.querySelectorAll(
    ".animated-block_wrapper",
  );

  let startPosition;

  let blockHeight;
  let sectionHeight;
  const blockBreakpoints = [];
  setTimeout(() => {
    console.log(blockBreakpoints);

    //инициализация высоты блоков слайдера
    animatedBlocksWrappers.forEach((item, i) => {
      let k = i == 0 ? 1 : 0.75;
      const inner = item.querySelector(".animated-block");

      let fullHeight = inner.offsetHeight * k;

      item.style.height = fullHeight + "px";
      // inner.style.transition = "all 1s ease-out";
      inner.classList.add("duration-1000");
    });

    //инициализация полосы прокрутки
    //инициализация значений высоты для полосы прокрутки и координат слайдера
    blockHeight = animatedSlider.offsetHeight;
    sectionHeight = 4 * blockHeight;

    //установка высоты для секции
    animatedSection.style.height = sectionHeight + "px";

    startPosition = animatedSection.offsetTop;

    console.log("высота" + blockHeight);

    blockBreakpoints[0] = startPosition;
    for (let i = 1; i < 6; i++) {
      blockBreakpoints[i] = blockBreakpoints[i - 1] + blockHeight / 2;
    }

    console.log(blockBreakpoints);
  }, 100);

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

  const drum = document.querySelector(".drum");
  let drumContainer = document.querySelector(".drum-container");
  let drumItems = document.querySelectorAll(".drum-element");
  let drumSection = document.querySelector(".drum-section");
  let drumPosition = 0;
  let drumTextMax;
  let drumTextMin;
  let drumSectionHeight;
  let drumBlockHeight;
  let drumStartPosition;
  const drumBreakpoints = [];
  const drumBlocks = document.querySelectorAll(".drum-block");
  console.dir(drumBlocks);
  setTimeout(() => {
    drumTextMax = window.getComputedStyle(drumItems[2]).fontSize;
    drumTextMin = window.getComputedStyle(drumItems[1]).fontSize;
    console.log("Текстмакс " + drumTextMax);
    console.log("Текстмин " + drumTextMin);
    drumBlockHeight = drumContainer.offsetHeight;
    drumSectionHeight = 6 * drumBlockHeight;
    drumSection.style.height = drumSectionHeight + "px";
    drumStartPosition = drumSection.offsetTop;
    drumBreakpoints[0] = drumStartPosition;
    for (let i = 1; i < 6; i++) {
      drumBreakpoints[i] = drumBreakpoints[i - 1] + drumBlockHeight * 0.9;
    }
    console.log(drumBreakpoints);
  }, 1000);

  const firstItemHeight = drumItems[0].offsetHeight;
  console.log(firstItemHeight);
  let currentNumber = 0;

  function scrollUp() {
    //находим последний элемент
    const currentItems = [];

    for (let i = 0; i < 6; i++) {
      currentItems[i] = drum.querySelector(
        `[data-number="${i + currentNumber}"]`,
      );
    }
    console.dir(currentItems);
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
    console.dir(currentItems);
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

    //меняем текущий индекс
  }

  const videos = document
    .querySelectorAll(".case-video")
    .forEach((videoWrap) => {
      const videoButton = videoWrap.querySelector("button");
      const video = videoWrap.querySelector("video");
      const playImg = videoButton.querySelector("img");
      console.log(playImg);
      videoButton.addEventListener("click", () => {
        video.play();
        playImg.style.opacity = 0;
      });
    });

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

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
    let drumItem;
    for (let i = 0; i < 5; i++) {
      if (scrollY > drumBreakpoints[i] && scrollY < drumBreakpoints[i + 1]) {
        drumItem = i;
      }
    }
    console.log("DrumTtem: " + drumItem);
    console.log("CurreNmumber: " + currentNumber);
    setCurrentDrumItem(drumItem);
    setCurrentDrumBlock(drumItem);
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
    console.log(DrumItem);
    drumBlocks[DrumItem].style.opacity = 1;
  }

  // setTimeout(() => scrollUp(), 2000);
  // setTimeout(() => scrollDown(), 3000);
  // setTimeout(() => scrollUp(), 4000);
  // setTimeout(() => scrollUp(), 5000);
  // setTimeout(() => scrollDown(), 6000);
});
