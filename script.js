
  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("div[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function activateNavLink() {
      let scrollY = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100; // Adjust offset if needed
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          const targetLink = document.querySelector(
            `.nav-link[href="#${section.id}"]`
          );

          navLinks.forEach((link) => link.classList.remove("active"));
          if (targetLink) targetLink.classList.add("active");
        }
      });
    }

    window.addEventListener("scroll", activateNavLink);
  });



// 2.MULTIPLE TEXT
const typed = new Typed('.multiple-text', {
    strings: ['Web Developer', 'Python Developer', 'Graphic Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});



