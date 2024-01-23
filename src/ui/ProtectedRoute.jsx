import { useEffect } from "react";
import { useGetCurrentUserQuery } from "../features/authentication/authSlice";

import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { data: user, isLoading, isFetching } = useGetCurrentUserQuery();
  const navigate = useNavigate();
  const isAuthenticated = user != null && user?.role === "authenticated";
  // console.log(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isFetching) navigate("/");
  }, [isAuthenticated, isLoading, isFetching, navigate]);

  if (isLoading || isFetching) return null;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
