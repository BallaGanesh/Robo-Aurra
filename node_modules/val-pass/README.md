# 🔐 Password Validator Utility

A simple and effective utility to validate passwords based on strength rules like length, case sensitivity, digits, and special characters.

---

## 🧩 Function Definition

### `validatePassword(password, length)`

🔎 **Purpose**:  
Validates a password string based on the following rules:

- Must contain at least one:
  - 🔡 Lowercase letter (`a-z`)
  - 🔠 Uppercase letter (`A-Z`)
  - 🔢 Digit (`0-9`)
  - 💥 Special character (`!@#$%^&*`)
- 📏 Must be of a given minimum length (if specified)

---

## ✨ Features

- ✅ Checks for character variety and length
- 🧾 Provides detailed error messages
- 🔁 Converts non-string inputs to string
- 📦 Lightweight and easy to use

---

## 📦 Installation

```bash
npm install val-pass
