import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import Footer from "../component/Footer";

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <Outlet />
      <Footer />
    </>
  );
}
