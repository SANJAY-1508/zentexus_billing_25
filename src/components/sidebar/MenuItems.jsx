import { MdOutlineHome } from "react-icons/md";
import { MdOutlineGroup } from "react-icons/md"; 
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdOutlineSell } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";





const MenuItems = [
  {
    path: "/dashboard",
    text: "Dashboard",
    icon: <MdOutlineHome />,
  },
  {
    path: "/parties",
    text: "Parties",
    icon: <MdOutlineGroup/>,
  },
  {
    path: "/items",
    text: "Items",
    icon: <MdOutlineShoppingBag/>,

  },
  {
    path: "/sale",
    text: "Sale",
    icon: <MdOutlineSell/>,
  },
  {
    path:"/purchaseandexpanse",
    text:"Purchase and Expanse",
    icon: <MdOutlineShoppingCart/>,
  },
  {
    path:"/grow",
    tetx:"Grow Your Business"
    
  }
];

export default MenuItems;
