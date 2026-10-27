// =========================================
// MOBILE MENU
// =========================================

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.querySelector(".header .navbar");

    if (!menuBtn || !navbar) {
        console.error("Mobile menu elements not found.");
        return;
    }

    menuBtn.addEventListener("click", function () {
        navbar.classList.toggle("active");

        const isOpen = navbar.classList.contains("active");

        menuBtn.textContent = isOpen ? "✕" : "☰";
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    navbar.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navbar.classList.remove("active");
            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
});



// =========================================
// CONTACT FORM
// =========================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async function (event) {

    // Stop the page from refreshing
    event.preventDefault();

    // Get the information from the form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value;

    // Show sending message
    formMessage.textContent = "Sending message...";


    try {

        // Send information to our backend
        const response = await fetch(
            "https://emcrea.onrender.com/api/contact",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    service: service,
                    message: message
                })
            }
        );


        // Get response from backend
        const data = await response.json();


        // Check if message was successful
        if (data.success) {

            formMessage.textContent =
                "Your message has been sent successfully!";

            // Clear the form
            contactForm.reset();

        } else {

            formMessage.textContent =
                data.message || "Something went wrong.";

        }


    } catch (error) {

        console.error("Error:", error);

        formMessage.textContent =
            "Unable to send message. Please try again.";

    }

});


// =========================================
// CLOSE MENU WHEN LINK IS CLICKED
// =========================================

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        const navbar = document.querySelector(".header .navbar");
        if (navbar) {
            navbar.classList.remove("active");
        }
    });
});


// EmCréa Cookie Consent
document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookie-banner");
    const modal = document.getElementById("cookie-modal");

    const acceptBtn = document.getElementById("accept-all-cookies");
    const rejectBtn = document.getElementById("reject-cookies");
    const customizeBtn = document.getElementById("customize-cookies");
    const saveBtn = document.getElementById("save-cookie-preferences");
    const closeBtn = document.getElementById("close-cookie-settings");

    const analytics = document.getElementById("analytics-cookies");
    const marketing = document.getElementById("marketing-cookies");

    const storageKey = "emcrea-cookie-consent-v1";

    if (!banner || !modal) {
        console.error("Cookie banner or preferences modal is missing.");
        return;
    }

    function getConsent() {
        try {
            return JSON.parse(localStorage.getItem(storageKey));
        } catch {
            return null;
        }
    }

    function saveConsent(analyticsAllowed, marketingAllowed) {
        const consent = {
            essential: true,
            analytics: analyticsAllowed,
            marketing: marketingAllowed,
            savedAt: new Date().toISOString()
        };

        try {
            localStorage.setItem(storageKey, JSON.stringify(consent));
        } catch (error) {
            console.error("Could not save cookie preferences:", error);
        }

        banner.hidden = true;
        modal.hidden = true;
    }

    const saved = getConsent();

    if (saved &&
        typeof saved.analytics === "boolean" &&
        typeof saved.marketing === "boolean") {
        banner.hidden = true;
        if (analytics) analytics.checked = saved.analytics;
        if (marketing) marketing.checked = saved.marketing;
    } else {
        banner.hidden = false;
        modal.hidden = true;
    }

    acceptBtn?.addEventListener("click", function () {
        saveConsent(true, true);
    });

    rejectBtn?.addEventListener("click", function () {
        saveConsent(false, false);
    });

    customizeBtn?.addEventListener("click", function () {
        const current = getConsent();
        if (analytics) analytics.checked = current?.analytics ?? false;
        if (marketing) marketing.checked = current?.marketing ?? false;
        modal.hidden = false;
    });

    saveBtn?.addEventListener("click", function () {
        saveConsent(
            analytics ? analytics.checked : false,
            marketing ? marketing.checked : false
        );
    });

    closeBtn?.addEventListener("click", function () {
        modal.hidden = true;
    });
});
