import DashBoard from "../view/listings/Dashboard/DashBoard";
import Login from "../view/Login";
import Parties from "../view/listings/Parties/Parties";
import items from "../view/listings/items/items";
import Sale from "../view/listings/sale/sale";
import PurchaseAndExpanse from "../view/listings/PurchaseandExpanse/PuchaseandExpanse";


 
const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/dashboard",
    component: DashBoard,
  },
  {
    path: "/parties",
    component: Parties,
    
  },
  {
    path: "/items",
    component: items,
  },
  {
    path:"/Sale",
    component: Sale, 
  },
  {
    path:"/purchaseAndExpanse",
    component: PurchaseAndExpanse,
  },
 
  
  
 
];
export default routes;
