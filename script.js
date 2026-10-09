// =========================================
// MOBILE MENU
// =========================================

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

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
    });
});


