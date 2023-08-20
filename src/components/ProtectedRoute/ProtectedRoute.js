import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isLoading, children }) {
  if (!isLoggedIn && isLoading === false) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
