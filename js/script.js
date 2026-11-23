// Portafolio de Elvis Mejía — interacciones principales
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const backToTop = document.getElementById("backToTop");
  const modal = document.getElementById("projectModal");

  // Menú adaptable para celulares
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Año automático del pie de página
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mostrar botón para volver arriba
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 450);
  });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Animaciones al entrar en pantalla
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

  // Filtros de proyectos
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      projectCards.forEach(card => {
        const categories = card.dataset.category.split(" ");
        const visible = filter === "todos" || categories.includes(filter);
        card.classList.toggle("hidden", !visible);
      });
    });
  });

  // Ventana de detalles de cada proyecto
  document.querySelectorAll(".project-more").forEach(button => {
    button.addEventListener("click", () => {
      document.getElementById("modalTitle").textContent = button.dataset.title;
      document.getElementById("modalDescription").textContent = button.dataset.description;
      const tech = document.getElementById("modalTech");
      tech.replaceChildren();
      button.dataset.tech.split("·").forEach(item => {
        const tag = document.createElement("span");
        tag.textContent = item.trim();
        tech.appendChild(tag);
      });
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  modal.querySelectorAll("[data-close-modal]").forEach(element => element.addEventListener("click", closeModal));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  // Resaltar el enlace de navegación según la sección visible
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-link");
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => sectionObserver.observe(section));
});
