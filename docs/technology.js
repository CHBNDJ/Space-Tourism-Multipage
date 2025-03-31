fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const technoButtons = document.querySelectorAll(".technology-button");
    const technoName = document.getElementById("technology-name");
    const technoDescription = document.getElementById("technology-description");
    const technoImage = document.getElementById("technology-image");
    const technoContainer = document.getElementById("technology-container");

    function updateTechnology(newTechnology) {
      const techno = data.technology.find(
        (technology) => technology.name === newTechnology,
      );

      if (techno) {
        technoName.textContent = techno.name;
        technoDescription.textContent = techno.description;
        technoImage.style.backgroundImage = `url('${techno.images.portrait}')`;
      }

      technoButtons.forEach((button) => {
        button.classList.remove("selected");
        button.setAttribute("aria-selected", "false");

        if (button.getAttribute("data-techno") === newTechnology) {
          button.classList.add("selected");
          button.setAttribute("aria-selected", "true");
        }
      });
    }

    technoButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const newTechnology = button.getAttribute("data-techno");
        technoContainer.classList.add("fade-out");

        setTimeout(() => {
          updateTechnology(newTechnology);
          technoContainer.classList.remove("fade-out");
          technoContainer.classList.add("fade-in");

          // Animation fade-in
          setTimeout(() => {
            technoContainer.classList.remove("fade-in");
          }, 400); // Durée de l'animation fade-in (500ms)
        }, 400);
      });
    });

    updateTechnology("Launch vehicle");
  });
