import Header from "@components/layout/header";
import Footer from "@components/layout/footer";
import { Outlet } from "react-router-dom";
import { useEffect, useContext } from "react";
import { getAccountAPI } from "./services/api.service";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

const App = () => {
  const { setUser, isLoading, setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    feetUserInfo();
  }, []);

  const feetUserInfo = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      setUser(res.data.user); // Set user to AuthContext
    }

    setIsLoading(false); // Set isLoading to false after fetching user info
  };

  return (
    <>
      {isLoading === true ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zindex: 1,
          }}
        >
          <Spin />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
