// Chargement du fichier JSON contenant les données des destinations
fetch("/data.json")
  .then((response) => response.json()) // Convertir la réponse en format JSON
  .then((data) => {
    // Sélectionner les éléments HTML qui seront mis à jour
    const planetButtons = document.querySelectorAll(".planet-button"); // Les boutons pour chaque planète
    const planetName = document.getElementById("planet-name"); // Le nom de la planète
    const planetDescription = document.getElementById("planet-description"); // La description de la planète
    const planetImage = document.getElementById("planet-image"); // L'image de la planète
    const planetDistance = document.getElementById("planet-distance"); // La distance vers la planète
    const planetTravel = document.getElementById("planet-travel"); // Le temps de voyage pour atteindre la planète
    const planetContainer = document.getElementById("planet-container");
    // Fonction pour mettre à jour les informations d'une planète donnée
    function updatePlanet(planet) {
      // Chercher la destination correspondant au nom de la planète
      const destination = data.destinations.find(
        (destination) => destination.name === planet,
      );

      if (destination) {
        // Mettre à jour les éléments de la page avec les données de la planète
        planetName.textContent = destination.name;
        planetDescription.textContent = destination.description;
        planetImage.src = destination.images.webp; // L'image de la planète au format PNG
        planetDistance.textContent = destination.distance; // La distance vers la planète
        planetTravel.textContent = destination.travel; // Le temps de voyage
      }

      // 🔥 Mettre à jour le focus visuel
      planetButtons.forEach((button) => {
        button.classList.remove("selected"); // Retirer la classe de toutes les planètes
        button.setAttribute("aria-selected", "false"); // Accessibilité

        if (button.getAttribute("data-planet") === planet) {
          button.classList.add("selected"); // Ajouter la classe sur la planète sélectionnée
          button.setAttribute("aria-selected", "true");
        }
      });
    }

    // Ajouter un événement de clic à chaque bouton de planète
    planetButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Récupérer le nom de la planète à partir de l'attribut 'data-planet' du bouton cliqué
        const planet = button.getAttribute("data-planet");

        planetContainer.classList.add("fade-out");

        setTimeout(() => {
          // Mettre à jour les informations de la planète sélectionnée
          updatePlanet(planet);

          planetContainer.classList.remove("fade-out");
          planetContainer.classList.add("fade-in");

          setTimeout(() => {
            planetContainer.classList.remove("fade-in");
          }, 500);
        }, 500);
      });
    });

    // Initialiser la page avec la première planète (Moon)
    updatePlanet("Moon");
  });
