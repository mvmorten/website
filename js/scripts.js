/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink')
    } else {
      navbarCollapsible.classList.add('navbar-shrink')
    }

  };

  // Shrink the navbar 
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      rootMargin: '0px 0px -40%',
    });
  };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project, .card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.animation = 'shadowBreathe 5s ease-in-out infinite';
    });
    img.addEventListener('mouseleave', function() {
      this.style.animation = 'none';
    });
  });

  document.querySelectorAll('.btn').forEach(btn => {
    let btnHoverTimeout;
    btn.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 15px 35px rgba(65, 105, 225, 0.5)';
      btnHoverTimeout = setTimeout(() => {
        this.style.animation = 'shadowBreathe 5s ease-in-out infinite';
      }, 300);
    });
    btn.addEventListener('mouseleave', function() {
      clearTimeout(btnHoverTimeout);
      this.style.boxShadow = '0 10px 25px rgba(65, 105, 225, 0.4)';
      this.style.animation = 'none';
    });
  });

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mouseenter', function() {
      const randomDuration = Math.random() * 10 + 12;
      const randomAngle = Math.floor(Math.random() * 360);
      this.style.background = `linear-gradient(${randomAngle}deg, #87CEEB, #4169E1, #87CEEB, #4169E1)`;
      this.style.backgroundSize = '400% 400%';
      this.style.animation = `lavaLamp ${randomDuration}s ease infinite`;
    });
    project.addEventListener('mouseleave', function() {
      this.style.animation = 'none';
    });
  });

});