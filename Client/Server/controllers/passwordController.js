const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { User } = require("../models/Users");

const controller = {
  // Rendre la page de réinitialisation de mot de passe
  showForgotPasswordPage: async (req, res) => {
    return res.render("forgot-password");
  },

  // Reset password
  sendResetPasswordLink: async (req, res) => {
    try {
      const emailUser = req.body.email;

      const user = await User.findOne({ email: emailUser });
      if (!user) {
        return res.status(200).json({
          message: `Si votre adresse e-mail est enregistrée dans notre base de données, vous recevrez bientôt un e-mail contenant un lien pour réinitialiser votre mot de passe. Veuillez vérifier votre boîte de réception, y compris le dossier de courrier indésirable.`,
        });
      } else {
        const secret = process.env.JWT_SECRET_KEY + user.password;
        const token = jwt.sign(
          { id: user._id, username: user.userName },
          secret,
          { expiresIn: "10m" }
        );

        const resetLink = `http://localhost:3000/api/auth/setResetPassword/${user._id}/${token}`;
        return res.status(200).json({ resetlink: resetLink });
      }
    } catch (error) {
      return res.status(400).json({ message: "invalid email" });
    }
  },

  // Reset password
  showResetPasswordForm: async (req, res) => {
    try {
      // Récupération des paramètres d'URL
      const { id, token } = req.params;

      // Recherche de l'utilisateur en utilisant l'ID
      const user = await User.findOne({ _id: id });
      if (!user) {
        // Si l'utilisateur n'est pas trouvé, retourner une réponse 404
        return res.status(404).json({
          message: `L'utilisateur avec l'id ${id} n'existe pas`,
        });
      } else {
        // Création de la clé secrète pour vérifier le token
        const secret = process.env.JWT_SECRET_KEY + user.password;

        // Vérification du token
        const verificationToken = jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            // Si le token est invalide ou expiré, retourner une réponse 400
            return res.status(400).json({
              message: `Le lien de réinitialisation de mot de passe a expiré`,
            });
          } else {
            return res.render("reset-password");
          }
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: `Le lien de réinitialisation de mot de passe a expiré`,
      });
    }
  },
  // Reset password
  saveResetPassword: async (req, res) => {
    // Récupération des paramètres d'URL
    const { id, token } = req.params;

    // Recherche de l'utilisateur en utilisant l'ID
    const user = await User.findOne({ _id: id });
    if (!user) {
      // Si l'utilisateur n'est pas trouvé, retourner une réponse 404
      return res.status(404).json({
        message: `L'utilisateur avec l'id ${id} n'existe pas`,
      });
    }
    // Création de la clé secrète pour vérifier le token
    const secret = process.env.JWT_SECRET_KEY + user.password;

    // Vérification du token
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        // Si le token est invalide ou expiré, retourner une réponse 400
        return res.status(400).json({
          message: `Le lien de réinitialisation de mot de passe a expiré`,
        });
      }

      console.log(req.params.id);
      console.log(decoded.id);
      if (req.params.id !== decoded.id) {
        // Si le token est valide mais ne correspond pas à l'ID, retourner une réponse 400
        return res.status(404).json({
          message: `Le lien de réinitialisation de mot de passe a expiré`,
        });
      }

      // Si le token est valide et correspond à l'ID, retourner une réponse 200
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
      user.password = req.body.password;
      user.save();
      return res.render("success-password-reset");
    });
  },
};

module.exports = controller;
