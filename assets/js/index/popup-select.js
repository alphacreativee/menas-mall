let locations = {};
let selectedCity = "";
let selectedLocation = null;

function loadLocationsFromHTML() {
  const locationDataDiv = document.getElementById("locationData");
  const cityDivs = locationDataDiv.querySelectorAll(".city");

  cityDivs.forEach((cityDiv) => {
    const cityName = cityDiv.getAttribute("data-city");
    locations[cityName] = [];

    const locationDivs = cityDiv.querySelectorAll(".location");
    locationDivs.forEach((locDiv) => {
      locations[cityName].push({
        name: locDiv.getAttribute("data-name"),
        url: locDiv.getAttribute("data-url"),
      });
    });
  });

  selectedCity = Object.keys(locations)[0];
  selectedLocation = locations[selectedCity][0];
}

function generateTabs() {
  const tabsContainer = document.getElementById("tabs");
  tabsContainer.innerHTML = "";

  Object.keys(locations).forEach((city, index) => {
    const button = document.createElement("button");
    button.className = "tab-btn";
    if (index === 0) button.classList.add("active");
    button.setAttribute("data-city", city);
    button.textContent = city;
    tabsContainer.appendChild(button);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (!document.querySelector(".popup-select-wrapper")) return;
  loadLocationsFromHTML();
  generateTabs();

  const dropdownInput = document.getElementById("dropdownInput");
  const locationInput = document.getElementById("locationInput");
  const dropdownMenu = document.getElementById("dropdownMenu");

  const discoverBtn = document.querySelector(".discover-btn");

  locationInput.value = selectedLocation.name;
  updateDropdownMenu();

  discoverBtn.addEventListener("click", function () {
    // if (selectedLocation && selectedLocation.url) {
    //   window.open(selectedLocation.url, "_blank");
    // }
    document.querySelector(".popup-select-wrapper").classList.add("hidden");
  });

  // Toggle dropdown
  dropdownInput.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleDropdown();
  });

  function toggleDropdown() {
    dropdownMenu.classList.toggle("active");

    dropdownInput.classList.toggle("active");
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!dropdownInput.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove("active");

      dropdownInput.classList.remove("active");
    }
  });

  // Tab click handler (use event delegation)
  document.getElementById("tabs").addEventListener("click", function (e) {
    if (e.target.classList.contains("tab-btn")) {
      // Remove active class from all tabs
      document
        .querySelectorAll(".tab-btn")
        .forEach((t) => t.classList.remove("active"));
      // Add active class to clicked tab
      e.target.classList.add("active");

      // Update selected city
      selectedCity = e.target.getAttribute("data-city");
      selectedLocation = locations[selectedCity][0];
      locationInput.value = selectedLocation.name;

      // Update dropdown menu
      updateDropdownMenu();
    }
  });

  function updateDropdownMenu() {
    dropdownMenu.innerHTML = "";
    locations[selectedCity].forEach((location) => {
      const item = document.createElement("div");
      item.className = "dropdown-item";
      if (location.name === selectedLocation.name) {
        item.classList.add("selected");
      }
      item.innerHTML = `<p>${location.name}</p>`;
      item.addEventListener("click", function () {
        selectedLocation = location;
        locationInput.value = location.name;

        document.querySelectorAll(".dropdown-item").forEach((i) => {
          i.classList.remove("selected");
        });
        this.classList.add("selected");

        toggleDropdown();
      });
      dropdownMenu.appendChild(item);
    });
  }
});
