function syncCenteredWidth() {
    const container = document.getElementById("container");
    const centered = document.getElementById("centered");
    centered.style.width = `${container.offsetWidth}px`;
  }
  
  window.addEventListener("load", syncCenteredWidth);
  window.addEventListener("resize", syncCenteredWidth);
  