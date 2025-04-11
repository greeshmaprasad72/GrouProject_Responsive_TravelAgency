document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
      });
    }
    
    document.addEventListener('click', function(event) {
      if (!event.target.closest('nav') && !event.target.closest('.menu-toggle') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });