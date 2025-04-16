document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const toursMenu = document.getElementById("toursMenu");
  const dropdownContent = document.getElementById("dropdownContent");
  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      navLinks.classList.toggle("active");

      // Close dropdown when mobile menu closes
      if (dropdownContent && !navLinks.classList.contains("active")) {
        dropdownContent.classList.remove("show");
      }
    });
  }
  // Dropdown menu functionality
  if (toursMenu && dropdownContent) {
    toursMenu.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Only toggle dropdown if on mobile or menu is active
      if (window.innerWidth <= 992 || navLinks.classList.contains("active")) {
        dropdownContent.classList.toggle("show");
      }
    });
  }
  // Close menus when clicking outside
  document.addEventListener("click", function (e) {
    // Close mobile menu
    if (
      navLinks &&
      navLinks.classList.contains("active") &&
      !e.target.closest("nav") &&
      !e.target.closest(".menu-toggle")
    ) {
      navLinks.classList.remove("active");
    }

    // Close dropdown
    if (
      dropdownContent &&
      dropdownContent.classList.contains("show") &&
      !e.target.closest(".dropdown")
    ) {
      dropdownContent.classList.remove("show");
    }
  });
  // Handle Details buttons
  document.querySelectorAll(".btn-details").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      // Get content from onclick attribute or data attribute
      const content =
        this.getAttribute("onclick")?.match(/showPopup\('([^']+)'/)?.[1] ||
        this.dataset.popupContent ||
        "Package details not available";
      showPopup(content);
    });
  });

  // Handle Book Now buttons
  document.querySelectorAll(".btn-book").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const packageCard = this.closest(".package-card");
      const packageTitle =
        packageCard?.querySelector("h3")?.textContent || "this package";
      showPopup(
        `You are booking: ${packageTitle}\n\nPlease fill out the contact form or call us to complete your booking.`
      );
    });
  });

  // Popup functionality
  function showPopup(content) {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const popupContent = document.getElementById("popupContent");

    if (popup && overlay && popupContent) {
      popupContent.innerHTML = content.replace(/\n/g, "<br>");
      overlay.style.display = "block";
      popup.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  function closePopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");

    if (popup && overlay) {
      overlay.style.display = "none";
      popup.style.display = "none";
      document.body.style.overflow = "";
    }
  }
  // Close popup when clicking overlay or X button
  const overlay = document.getElementById("overlay");
  const popupClose = document.querySelector(".popup-close");

  if (overlay) overlay.addEventListener("click", closePopup);
  if (popupClose) popupClose.addEventListener("click", closePopup);

  // Close popup with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePopup();
    }
  });
});
