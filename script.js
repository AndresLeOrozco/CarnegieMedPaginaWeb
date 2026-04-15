document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const backToTop = document.getElementById("backToTop");
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const filterItems = document.querySelectorAll(".filter-item");
  const statNumbers = document.querySelectorAll(".stat-number");
  const revealElements = document.querySelectorAll(".reveal");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  let statsAnimated = false;

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          animateStats();
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  if (statNumbers.length > 0) {
    statsObserver.observe(statNumbers[0].closest(".stats"));
  }

  function animateStats() {
    statNumbers.forEach((stat) => {
      const target = Number(stat.getAttribute("data-target"));
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 50));

      const counter = setInterval(() => {
        current += increment;

        if (current >= target) {
          stat.textContent = target;
          clearInterval(counter);
        } else {
          stat.textContent = current;
        }
      }, 30);
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      filterItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const servicio = document.getElementById("servicio").value;

      if (!nombre || !telefono || !correo || !servicio) {
        formMessage.textContent = "Por favor, completa todos los campos obligatorios.";
        formMessage.style.color = "#b42318";
        return;
      }

      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

      if (!emailValido) {
        formMessage.textContent = "Por favor, ingresa un correo electrónico válido.";
        formMessage.style.color = "#b42318";
        return;
      }

      formMessage.textContent =
        "Tu solicitud fue enviada correctamente. Este mensaje es una simulación visual.";
      formMessage.style.color = "#238c94";

      form.reset();
    });
  }
});