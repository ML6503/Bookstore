import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Bookstore } from './components/Bookstore';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
// import { Home } from "./components/Home";

const AppRoutes = [
  //{
  //  index: true,
  //  element: <Home />
    //},{
    {
    index: true,
    element: <Bookstore />
    },
  {
    path: '/counter',
    element: <Counter />
    },

  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
