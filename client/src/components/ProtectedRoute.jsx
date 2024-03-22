import React from "react";
import { useStore } from "../libs/globalState";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute(props) {
  const { accessToken } = useStore();
  if (accessToken) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
