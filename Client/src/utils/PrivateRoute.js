import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function PrivateRoute() {
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("userId");
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && id) {
      fetch(`http://localhost:3000/api/verifInformationSessionStorage`, {
        method: "POST",
        headers: {
          token: token,
          idd: id,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "true") {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
        })

        //
        .catch((error) => {
          console.error(
            "Erreur de vérification des token et id en frontEnd:",
            error
          );
          setIsAuthorized(false);
        })
        //
        .finally(() => {
          setLoading(false);
        });
    } else {
      setIsAuthorized(false);
      setLoading(false);
    }
  }, [token, id]);

  // bloquer l'accès et attendre la réponse de fetch avant de donner accès aux composants
  if (loading) {
    return null;
  }

  if (isAuthorized === true) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}

export default PrivateRoute;
