const galleryImages = Array.from(document.querySelectorAll(".still img"));
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxCaption = document.querySelector(".lightbox__caption");
const closeButtons = document.querySelectorAll("[data-lightbox-close]");
const prevButton = document.querySelector(".lightbox__nav--prev");
const nextButton = document.querySelector(".lightbox__nav--next");

let currentIndex = 0;

function getCaption(image) {
  const figure = image.closest(".still");
  const caption = figure ? figure.querySelector("figcaption") : null;
  return caption ? caption.textContent.trim() : "";
}

function renderLightbox(index) {
  const image = galleryImages[index];
  if (!image) {
    return;
  }

  currentIndex = index;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "";
  lightboxCaption.textContent = getCaption(image);
}

function openLightbox(index) {
  renderLightbox(index);
  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function stepLightbox(step) {
  const nextIndex = (currentIndex + step + galleryImages.length) % galleryImages.length;
  renderLightbox(nextIndex);
}

galleryImages.forEach((image, index) => {
  image.addEventListener("click", () => {
    openLightbox(index);
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

prevButton.addEventListener("click", () => {
  stepLightbox(-1);
});

nextButton.addEventListener("click", () => {
  stepLightbox(1);
});

document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    stepLightbox(-1);
  }

  if (event.key === "ArrowRight") {
    stepLightbox(1);
  }
});
