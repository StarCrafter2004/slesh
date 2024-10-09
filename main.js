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

  var teachSlider = new Swiper(".teach_slider", {
    slidesPerView: "auto" /* Позволяет использовать ширину слайда как в CSS */,
    spaceBetween: 20 /* Отступ между слайдами */,
    centeredSlides: false /* Отключение автоматического центрирования слайдов */,
    loop: false /* Оставляем как пример: не включать зацикливание */,
  });
  var teachSlider = new Swiper(".case_slider", {
    slidesPerView: "auto" /* Позволяет использовать ширину слайда как в CSS */,
    spaceBetween: 20 /* Отступ между слайдами */,
    centeredSlides: false /* Отключение автоматического центрирования слайдов */,
    loop: false /* Оставляем как пример: не включать зацикливание */,
  });

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
  let endPosition;
  const blockBreakpoints = [];
  setTimeout(() => {
    console.log(blockBreakpoints);

    animatedBlocksWrappers.forEach((item, i) => {
      let k = i == 0 ? 1 : 0.75;
      const inner = item.querySelector(".animated-block");

      let fullHeight = inner.offsetHeight * k;

      item.style.height = fullHeight + "px";
      // inner.style.transition = "all 1s ease-out";
      inner.classList.add("duration-1000");
    });
    const heights = Array.from(animatedBlocks).map(
      (block) => block.offsetHeight,
    );

    console.dir(animatedSection);
    startPosition = animatedSection.offsetTop;
    endPosition = animatedSection.offsetHeight + startPosition;
    console.log("slider:h");
    console.log(animatedSlider.offsetHeight);
    blockBreakpoints[0] = startPosition;
    for (let i = 1; i < 6; i++) {
      blockBreakpoints[i] =
        ((animatedSection.offsetHeight - animatedSlider.offsetHeight) / 5) *
          (i + 1) +
        startPosition;
    }

    console.log(blockBreakpoints);
  }, 100);

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
  });

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

  const activeCurrent = () => {
    animatedBlocks.forEach();
  };

  // setTimeout(() => makeActive(animatedBlocksWrappers[1]), 3000);
  // setTimeout(() => makeDeactive(animatedBlocksWrappers[0]), 3000);
  // setTimeout(() => makeActive(animatedBlocksWrappers[2]), 5000);
  // setTimeout(() => makeDeactive(animatedBlocksWrappers[1]), 5000);
  // setTimeout(() => makeActive(animatedBlocksWrappers[3]), 7000);
  // setTimeout(() => makeDeactive(animatedBlocksWrappers[2]), 7000);
  // setTimeout(() => makeActive(animatedBlocksWrappers[4]), 9000);
  // setTimeout(() => makeDeactive(animatedBlocksWrappers[3]), 9000);

  // const offsets = [];
  // offsets[0] = 0;
  // offsets[1] = (heights[1] - heights[1] * 0.75) / 2;
  // for (let i = 2; i < 5; i++) {
  //   offsets[i] =
  //     offsets[i - 1] +
  //     (heights[i - 1] - heights[i - 1] * 0.75) / 2 +
  //     (heights[i] - heights[i] * 0.75) / 2;
  // }
  // console.log(offsets);
  // animatedBlocks.forEach((item, i) => {
  //   if (i == 0) {
  //     return;
  //   }
  //   console.log(item);
  //   console.log(i);
  //   const currentTransform = getComputedStyle(item).transform;
  //   console.log(currentTransform);
  //   item.style.transform = `scale(0.75) translateY(-${offsets[i]}px)`;
  // });
});
