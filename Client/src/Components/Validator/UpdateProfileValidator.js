export function validateInputData(formData) {
    const validationErrors = {};
  
    if (formData.userName && (formData.userName.length < 2 || formData.userName.length > 10)) {
      validationErrors.userName = "Le nom d'utilisateur doit avoir entre 2 et 10 caractères.";
    }
  
    if (formData.email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (formData.email.length < 5 || formData.email.length > 100 || !emailPattern.test(formData.email)) {
        validationErrors.email = "Veuillez entrer une adresse e-mail valide (entre 5 et 100 caractères).";
      }
    }
  
    if (formData.password && formData.password.length < 6) {
      validationErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    }
  
    return validationErrors;
  }
  