const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 3000;
const RECAPTCHA_SECRET_KEY = "6LecS4krAAAAAI3fB_4eNo2wsEMyFcS641CmWu26"; // Replace with your secret key

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit-form", async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;

  if (!name || !email || !message || !recaptchaToken) {
    return res.status(400).json({ success: false, msg: "Missing fields" });
  }

  // Verify reCAPTCHA
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

  try {
    const response = await fetch(verifyUrl, { method: "POST" });
    const data = await response.json();

    if (data.success) {
      // reCAPTCHA passed - process form (e.g., save or email)
      // For demo, just respond success
      res.json({ success: true, msg: "Form submitted successfully." });
    } else {
      res.status(400).json({ success: false, msg: "Failed reCAPTCHA verification." });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: "Server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
