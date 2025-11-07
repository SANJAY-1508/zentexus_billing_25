import dashboard from "../view/listings/Dashboard/dashboard";
import Login from "../view/Login";
import parties from "../view/listings/Parties/parties";
import items from "../view/listings/Items/items";
import sale from "../view/listings/Sale/sale";
import purchaseandexpanse from "../view/listings/Purchaseandexpanse/purchaseandexpanse";
import grow from "../view/listings/Grow/grow";

 
const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/Dashboard",
    component: dashboard,
  },
  {
    path: "/parties",
    component: parties,
  },
  {
    path: "/items",
    component: items,
  },
  {
    path:"/sale",
    component: sale,
  },
  {
    path:"/purchaseandexpanse",
    component: purchaseandexpanse,
  },
  {
    path:"/grow",
    component: grow,
  },
  
 
];
export default routes;
