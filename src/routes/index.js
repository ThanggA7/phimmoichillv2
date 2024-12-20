import Category from "../Pages/Category/Category";
import Home from "../Pages/Home/Home";
import Info from "../Pages/Info/Info";
import Watch from "../Pages/Watch/Watch";

const routePublic = [
  { path: "/", component: Home },
  { path: "/info/:id", component: Info },
  { path: "/watch/:id/:chap", component: Watch },
  { path: "/watch/:id/", component: Watch },
  { path: "/the-loai/:id", component: Category },
];

export default routePublic;
