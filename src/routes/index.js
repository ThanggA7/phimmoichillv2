import Country from "../Pages/Category/Country";
import Category from "../Pages/Category/Category";
import Home from "../Pages/Home/Home";
import Info from "../Pages/Info/Info";
import Watch from "../Pages/Watch/Watch";
import NOTFOUND from "../Pages/404/404";

const routePublic = [
  { path: "/", component: Home },
  { path: "/info/:id", component: Info },
  { path: "/watch/:id/:chap", component: Watch },
  { path: "/watch/:id/", component: Watch },
  { path: "/quoc-gia/:id", component: Country },
  { path: "/the-loai/:id", component: Category },
  { path: "*", component: NOTFOUND },
];

export default routePublic;
