import Swiper from "swiper/bundle";
import "./style.css";

// import styles bundle
import "swiper/css/bundle";

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
