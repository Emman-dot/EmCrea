const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Resend } = require("resend");

dotenv.config();

const app = express();

const PORT = 5000;

// ========================================
// RESEND
// ========================================

const resend = new Resend(process.env.RESEND_API_KEY);

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ========================================
// HOME / TEST ROUTE
// ========================================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "EmCréa backend is working!"
    });

});

// ========================================
// CONTACT FORM API
// ========================================

app.post("/api/contact", async (req, res) => {

    const {
        name,
        email,
        service,
        message
    } = req.body;

    if (!name || !email || !message) {

        return res.status(400).json({
            success: false,
            message: "Please provide your name, email and message."
        });

    }

    try {

        const { data, error } = await resend.emails.send({

            from: "EmCréa Website <onboarding@resend.dev>",

            to: ["oyedotunfawale@gmail.com"],

            subject: `New EmCréa Project Inquiry - ${service || "General Inquiry"}`,

            replyTo: email,

            html: `
                <h2>New EmCréa Project Inquiry</h2>

                <p>
                    <strong>Name:</strong> ${name}
                </p>

                <p>
                    <strong>Email:</strong> ${email}
                </p>

                <p>
                    <strong>Service:</strong> ${service || "Not specified"}
                </p>

                <p>
                    <strong>Message:</strong>
                </p>

                <p>
                    ${message}
                </p>

                <hr>

                <p>
                    This message was sent from the EmCréa portfolio website.
                </p>
            `
        });

        if (error) {

            console.error("Resend error:", error);

            return res.status(500).json({
                success: false,
                message: "Unable to send your message right now."
            });

        }

        console.log("--------------------------------");
        console.log("EMAIL SENT SUCCESSFULLY");
        console.log("--------------------------------");

        console.log("Resend ID:", data.id);

        console.log("--------------------------------");

        res.status(200).json({

            success: true,

            message:
                "Your message has been sent successfully!"

        });

    } catch (error) {

        console.error("Server error:", error);

        res.status(500).json({

            success: false,

            message:
                "Something went wrong. Please try again."

        });

    }

});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {

    console.log(
        `EmCréa backend running on http://localhost:${PORT}`
    );

});