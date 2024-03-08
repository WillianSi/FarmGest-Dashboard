import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";

function AuthenticatedLayout({ children }) {
  const [user, loading, ] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {

    if (!loading && !user) {
      navigate("/home", { replace: true });
    }
  }, [user, loading, navigate]);


  return user ? <div>{children}</div> : null;
}

export default AuthenticatedLayout;