import { Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import routePublic from "./routes";
function App() {
  return (
    <>
      <Header />
      <Routes>
        {routePublic.map((route, index) => {
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
