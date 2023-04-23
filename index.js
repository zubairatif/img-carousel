const carouselContainer = document.querySelector(".imgCarousel_container");
const slides = carouselContainer.querySelector(".imgCarousel_slides");
const slideList = carouselContainer.querySelectorAll(".imgCarousel_slides img");
const prevBtn = carouselContainer.querySelector(".imgCarousel_prev");
const nextBtn = carouselContainer.querySelector(".imgCarousel_next");
const dots = carouselContainer.querySelectorAll(".imgCarousel_dot");

let slideIndex = 0;

function showSlide(index) {
  // Wrap around if the index is out of range
  if (index < 0) {
    index = slideList.length - 1;
  } else if (index >= slideList.length) {
    index = 0;
  }

  // Move the carousel container to show the slide
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
export default function carousel() {
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

  // Pause the automatic slide show when the user interacts with the carousel
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });

  carouselContainer.addEventListener("mouseleave", () => {
    intervalId = setInterval(() => {
      nextSlide();
    }, 5000);
  });
}
