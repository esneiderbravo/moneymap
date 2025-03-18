import { Routes, Route } from "react-router-dom";
import Splash from "./splash/Splash";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
    </Routes>
  );
};

export default AppRoutes;
