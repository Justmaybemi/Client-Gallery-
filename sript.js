function setupGallery(imagePaths) {
  const grid = document.getElementById("galleryGrid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCount = document.getElementById("lightboxCount");
  const downloadCurrent = document.getElementById("downloadCurrent");
  const closeLightbox = document.getElementById("closeLightbox");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function renderGrid() {
    imagePaths.forEach((path, index) => {
      const item = document.createElement("div");
      item.className = "gallery-item";
      item.innerHTML = `
        <img src="${path}" alt="Gallery image ${index + 1}" loading="lazy">
        <a class="download-chip" href="${path}" download onclick="event.stopPropagation()">Download</a>
      `;
      item.addEventListener("click", () => openLightbox(index));
      grid.appendChild(item);
    });
  }

  function updateLightbox() {
    const currentImage = imagePaths[currentIndex];
    lightboxImage.src = currentImage;
    lightboxCount.textContent = `${currentIndex + 1} / ${imagePaths.length}`;
    downloadCurrent.href = currentImage;
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeBox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % imagePaths.length;
    updateLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + imagePaths.length) % imagePaths.length;
    updateLightbox();
  }

  closeLightbox.addEventListener("click", closeBox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeBox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeBox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) < 40) return;
    if (diff < 0) {
      showNext();
    } else {
      showPrev();
    }
  }

  renderGrid();
}
