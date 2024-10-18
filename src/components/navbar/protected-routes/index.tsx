import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutesProps {
  isAuthorized: boolean;
  redirectTo: string;
}

export default function ProtectedRoutes({
  isAuthorized,
  redirectTo,
}: ProtectedRoutesProps) {
  if (!isAuthorized) {
    return <Navigate to={redirectTo} />;
  }
  return <Outlet />;
}
