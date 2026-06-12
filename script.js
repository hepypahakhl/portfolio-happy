document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing carousels...');

  // Smooth scroll
  document.querySelectorAll('nav a, .hero-buttons a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(235, 245, 255, 0.98)';
    } else {
      header.style.background = 'rgba(235, 245, 255, 0.95)';
    }
  });

  // Setup carousel function
  function setupCarousel(containerId, dotsId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const slidesContainer = container.querySelector('.carousel-slides');
    const slides = container.querySelectorAll('.slide');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    const dotsContainer = document.getElementById(dotsId);
    
    if (!slides.length) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoInterval;
    
    // Create dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }
    
    function updateCarousel() {
      const slideWidth = slides[0].clientWidth;
      slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
      }
    }
    
    function goToSlide(index) {
      if (index < 0) index = 0;
      if (index >= totalSlides) index = totalSlides - 1;
      currentIndex = index;
      updateCarousel();
      resetAutoSlide();
    }
    
    function nextSlide() {
      let newIndex = currentIndex + 1;
      if (newIndex >= totalSlides) newIndex = 0;
      goToSlide(newIndex);
    }
    
    function prevSlide() {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = totalSlides - 1;
      goToSlide(newIndex);
    }
    
    function startAutoSlide() {
      autoInterval = setInterval(() => nextSlide(), 4000);
    }
    
    function resetAutoSlide() {
      clearInterval(autoInterval);
      startAutoSlide();
    }
    
    function stopAutoSlide() {
      clearInterval(autoInterval);
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);
    window.addEventListener('resize', () => setTimeout(updateCarousel, 100));
    
    setTimeout(updateCarousel, 100);
    startAutoSlide();
  }
  
  // Setup all carousels
  setupCarousel('carousel1', 'dots1');
  setupCarousel('carousel2', 'dots2');
  setupCarousel('carousel3', 'dots3');
  setupCarousel('carousel4', 'dots4');
  setupCarousel('carousel5', 'dots5');
  setupCarousel('carousel7', 'dots7');
  setupCarousel('carousel8', 'dots8');
});