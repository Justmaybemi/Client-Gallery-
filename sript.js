function setupClientGallery(config) {
  const galleryGrid = document.getElementById("galleryGrid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeLightboxBtn = document.getElementById("closeLightbox");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const downloadSelectedBtn = document.getElementById("downloadSelectedBtn");

  const images = config.images || [];
  let currentIndex = 0;

  function renderGallery() {
    galleryGrid.innerHTML = "";

    images.forEach((imagePath, index) => {
      const card = document.createElement("div");
      card.className = "photo-card";

      card.innerHTML = `
        <div class="photo-image-wrap" data-index="${index}">
          <img src="${imagePath}" alt="Gallery image ${index + 1}">
        </div>
        <label class="photo-select">
          <input type="checkbox" class="photo-checkbox" value="${imagePath}">
          Select for download
        </label>
      `;

      const imageWrap = card.querySelector(".photo-image-wrap");
      imageWrap.addEventListener("click", () => openLightbox(index));

      galleryGrid.appendChild(card);
    });
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function updateLightbox() {
    lightboxImage.src = images[currentIndex];
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  function showPreviousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }

  function downloadFile(filePath) {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function downloadSelectedImages() {
    const selectedCheckboxes = document.querySelectorAll(".photo-checkbox:checked");

    if (selectedCheckboxes.length === 0) {
      alert("Please select at least one photo.");
      return;
    }

    selectedCheckboxes.forEach((checkbox, index) => {
      setTimeout(() => {
        downloadFile(checkbox.value);
      }, index * 300);
    });
  }

  closeLightboxBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", showPreviousImage);
  nextBtn.addEventListener("click", showNextImage);
  downloadSelectedBtn.addEventListener("click", downloadSelectedImages);

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowRight") {
      showNextImage();
    } else if (event.key === "ArrowLeft") {
      showPreviousImage();
    }
  });

  renderGallery();
}
