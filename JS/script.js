document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".menu-toggle");
    const navContainer = document.querySelector(".nav-container");
    const navLinks = document.querySelectorAll(".nav-links a");
    
    // Ensure menu is closed on page load
    if (navContainer) {
        navContainer.classList.remove("active");
    }
    if (toggleBtn) {
        toggleBtn.textContent = "☰";
    }
    
    // Mobile menu toggle functionality
    if (toggleBtn) {
        toggleBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            navContainer.classList.toggle("active");
            
            // Update toggle button text
            if (navContainer.classList.contains("active")) {
                toggleBtn.textContent = "✕";
                toggleBtn.setAttribute("aria-expanded", "true");
            } else {
                toggleBtn.textContent = "☰";
                toggleBtn.setAttribute("aria-expanded", "false");
            }
        });
    }
    
    // Close menu when any navigation link is clicked
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener("click", function () {
                // Close mobile menu immediately
                if (navContainer && navContainer.classList.contains("active")) {
                    navContainer.classList.remove("active");
                    if (toggleBtn) {
                        toggleBtn.textContent = "☰";
                        toggleBtn.setAttribute("aria-expanded", "false");
                    }
                }
                
                // Optional: Add a small delay to ensure menu closes before navigation
                // Remove this if it causes issues with navigation
                setTimeout(() => {
                    // Navigation will happen normally via href
                }, 50);
            });
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (navContainer && 
            navContainer.classList.contains("active") && 
            !event.target.closest('.navbar')) {
            navContainer.classList.remove("active");
            if (toggleBtn) {
                toggleBtn.textContent = "☰";
                toggleBtn.setAttribute("aria-expanded", "false");
            }
        }
    });
    
    // Close menu on escape key press
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && 
            navContainer && 
            navContainer.classList.contains("active")) {
            navContainer.classList.remove("active");
            if (toggleBtn) {
                toggleBtn.textContent = "☰";
                toggleBtn.setAttribute("aria-expanded", "false");
            }
        }
    });
    
    // Close menu when window is resized to desktop size
    function handleResize() {
        if (window.innerWidth > 768 && 
            navContainer && 
            navContainer.classList.contains("active")) {
            navContainer.classList.remove("active");
            if (toggleBtn) {
                toggleBtn.textContent = "☰";
                toggleBtn.setAttribute("aria-expanded", "false");
            }
        }
    }
    
    // Debounce resize event for better performance
    let resizeTimer;
    window.addEventListener("resize", function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });
});