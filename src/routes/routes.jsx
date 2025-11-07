import DashBoard from "../view/listings/Dashboard/DashBoard";
import Login from "../view/Login";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/dashboard",
    component: DashBoard,
  },
];
export default routes;
