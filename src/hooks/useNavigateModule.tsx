import { useNavigate } from "react-router-dom";

const useNavigateModule = () => {
  const navigate = useNavigate();

  const handleNavigate = (module = "") => {
    navigate(`/dashboard/${module}`);
  };

  const handleNavigateDashboard = (module = "") => {
    navigate(`/dashboard/${module}`);
  };

  const handleNavigateProvider = (module = "") => {
    navigate(`/provider/${module}`);
  };

  const loginNavigate = () => {
    navigate("/");
  };

  return { handleNavigate, handleNavigateProvider, handleNavigateDashboard, loginNavigate };
};

export default useNavigateModule;
