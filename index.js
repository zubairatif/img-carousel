const sliderContainer = document.querySelector(".imgSlider_container");
const slides = sliderContainer.querySelector(".imgSlider_slides");
const slideList = sliderContainer.querySelectorAll(".imgSlider_slides img");
const prevBtn = sliderContainer.querySelector(".imgSlider_prev");
const nextBtn = sliderContainer.querySelector(".imgSlider_next");
const dots = sliderContainer.querySelectorAll(".imgSlider_dot");

let slideIndex = 0;

function showSlide(index) {
  // Wrap around if the index is out of range
  if (index < 0) {
    index = slideList.length - 1;
  } else if (index >= slideList.length) {
    index = 0;
  }

  // Move the slider container to show the slide
  const offset = -index * 100;
  slides.style.transform = `translateX(${offset}%)`;

  // Set the active dot
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });
  dots[index].classList.add("active");

  // Update the slide index
  slideIndex = index;
}

function prevSlide() {
  showSlide(slideIndex - 1);
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

function jumpToSlide(index) {
  showSlide(index);
}
export default function slider() {
  showSlide(slideIndex);
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      jumpToSlide(index);
    });
  });

  // Set up the automatic slide show
  let intervalId = setInterval(() => {
    nextSlide();
  }, 5000);

  // Pause the automatic slide show when the user interacts with the slider
  sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });

  sliderContainer.addEventListener("mouseleave", () => {
    intervalId = setInterval(() => {
      nextSlide();
    }, 5000);
  });
}
