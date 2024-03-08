import Index from "views/Index.js";
import Add from "views/add/new.js";
import Settings from "views/settings/settings.js";

var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-tv-2 text-default",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/add",
    name: "Adicionar",
    icon: "ni ni-fat-add text-default",
    component: <Add />,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Configurações",
    icon: "ni ni-single-02 text-default",
    component: <Settings />,
    layout: "/admin",
  }
];
export default routes;