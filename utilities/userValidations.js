const validateUsername = (string) => {
  if (!string) return false
  if (string.length < 2 || string.length > 12) return "Username must be between 2-12 characters."
  if (!/^[a-z]{2,12}$/.test(string.toLowerCase())) return "Invalid Username."
}

const validatePassword = (string) => {
  if (!string) return false
  if (string.length < 7) return "Password must be at least 7 characters."
}

const validatePasswordConfirmation = (password, passwordConfirmation) => {
  if (password !== passwordConfirmation) return "Password confirmation must match."
}

const validateDiscordUsername = (string) => {
  if (!string) return false
  if (string.length < 7 || string.length > 37) return "Discord username must be between 7-37 characters."
  if (!/^\w+#\d{4}$/.test(string)) return "Invalid Discord username."
}

module.exports = {
  validateUsername,
  validatePassword,
  validateDiscordUsername,
  validatePasswordConfirmation
}
