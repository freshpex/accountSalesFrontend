import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const profile = useSelector((state) => state.accountSettings.data.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile?.role !== "admin") {
      navigate("/userdashboard");
    }
  }, [profile, navigate]);

  return children;
};

export default AdminRoute;
