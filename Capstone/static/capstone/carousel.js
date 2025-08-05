document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector('.section-explanation');
  const carousel = document.querySelector('.scroll-carousel');
  const track = document.querySelector('.carousel-track');
  const items = document.querySelectorAll('.carousel-item');

  const sectionHeight = window.innerHeight * items.length;
  section.style.height = `${sectionHeight}px`; 

  window.addEventListener("scroll", () => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      const scrollY = Math.min(Math.max(-rect.top, 0), sectionHeight - window.innerHeight);
      const scrollPercent = scrollY / (sectionHeight - window.innerHeight);
      const scrollX = scrollPercent * (track.scrollWidth - window.innerWidth);

      track.scrollLeft = scrollX;

      // Calculate current item index
      const itemIndex = Math.round(scrollPercent * (items.length - 1));
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('carouselItemChange', { detail: { itemIndex } }));
    }
  });
});

