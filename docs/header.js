function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  const iconClose = document.querySelector(".icon-close");
  const iconMenu = document.querySelector(".icon-menu");

  if (navLinks.classList.contains("hidden")) {
    navLinks.classList.remove("hidden");
    navLinks.classList.add("flex");

    iconClose.classList.remove("hidden");
    iconMenu.classList.add("hidden");
  } else {
    navLinks.classList.add("hidden");
    navLinks.classList.remove("flex");

    iconClose.classList.add("hidden");
    iconMenu.classList.remove("hidden");
  }
}

fetch("header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header-container").innerHTML = data;

    // Maintenant que le header est chargé, on peut attacher les événements
    document.querySelector(".icon-menu").addEventListener("click", toggleMenu);
    document.querySelector(".icon-close").addEventListener("click", toggleMenu);

    // Sélection automatique du lien actif
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".link a");

    navLinks.forEach((link) => {
      const linkPage = link.getAttribute("href");

      if (linkPage === currentPage) {
        link.setAttribute("aria-current", "page"); // ✅ Correct
        link.parentElement.classList.add("selected"); // Ajoute une classe CSS pour le styling
      } else {
        link.removeAttribute("aria-current");
        link.parentElement.classList.remove("selected");
      }

      link.addEventListener("click", () => {
        navLinks.forEach((item) =>
          item.parentElement.classList.remove("selected"),
        );
        link.parentElement.classList.add("selected");
      });
    });

    // Sélectionner le bouton après le chargement du header
    const btnExplore = document.getElementById("btn-explore");
    if (btnExplore) {
      btnExplore.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.add("fade-out");

        setTimeout(() => {
          window.location.href = "./destination.html";
        }, 600);
      });
    }

    // Donner le focus directement au lien "Home"
    const homeLink = document.querySelector('a[href="index.html"]'); // Sélectionne le lien vers "Home"
    if (homeLink) {
      homeLink.focus(); // Applique le focus sur ce lien
    }
  })
  .catch((error) =>
    console.error("Erreur lors du chargement du header :", error),
  );
