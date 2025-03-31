fetch("/data.json")
  .then((response) => response.json())
  .then((data) => {
    const crewButtons = document.querySelectorAll(".crew-button");
    const crewCategory = document.getElementById("crew-category");
    const crewMemberName = document.getElementById("crew-member-name");
    const crewDescription = document.getElementById("crew-description");
    const crewImage = document.getElementById("crew-member-image");
    const crewContainer = document.getElementById("crew-container");

    function updateCrew(crewMember) {
      const crew = data.crew.find((crew) => crew.name === crewMember);

      if (crew) {
        crewCategory.textContent = crew.role;
        crewMemberName.textContent = crew.name;
        crewDescription.textContent = crew.bio;
        crewImage.src = crew.images.webp;
      }

      crewButtons.forEach((button) => {
        button.classList.remove("selected");
        button.setAttribute("aria-selected", "false");

        if (button.getAttribute("data-crew") === crewMember) {
          button.classList.add("selected");
          button.setAttribute("aria-selected", "true");
        }
      });
    }

    crewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const crewMember = button.getAttribute("data-crew");
        crewContainer.classList.add("fade-out");

        setTimeout(() => {
          updateCrew(crewMember);

          crewContainer.classList.remove("fade-out");
          crewContainer.classList.add("fade-in");

          setTimeout(() => {
            crewContainer.classList.remove("fade-in");
          }, 500);
        }, 500);
      });
    });

    // Initialiser la page avec le premier membre de l'équipage (Scott)
    updateCrew("Douglas Hurley");
  });
