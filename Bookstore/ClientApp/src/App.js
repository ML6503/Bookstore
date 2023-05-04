import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout';
import './custom.css';
import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Bookstore } from './components/Bookstore';
import { AddBook } from "./components/AddBook";
import { FetchData } from "./components/FetchData";

const App = ({ appController }) => {
    const AppRoutes = [
        //{
        //  index: true,
        //  element: <Home />
        //},{
        {
            index: true,
            element: <Bookstore appController={appController} />
        },
        //{
        //    path: '/counter',
        //    element: <Counter />
        //},
        {
            path: '/addBook',
           element: <AddBook />
        },
        {
            path: '/fetch-data',
            requireAuth: true,
            element: <FetchData />
        },
        ...ApiAuthorzationRoutes
    ];

    return (
        <Layout appController={appController}>
        <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, requireAuth, ...rest } = route;
                    return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
                })}
        </Routes>
      </Layout>
    );
};

export default App;
//export default class App extends Component {
//  static displayName = App.name;
//    constructor(appController) {
//        super();
//        this.appController = appController;
//    }
//  render() {
//    return (
//      <Layout>
//        <Routes>
//          {AppRoutes.map((route, index) => {
//              const { element, requireAuth, ...rest } = route;
//              console.log('element', element);
//              const newPropos = {
//                  ...element.props, this.appController
//              };
//              element.props = newPropos;

//              return <Route key={index} {...rest} element={requireAuth ?
//                  <AuthorizeRoute {...rest} element={element} appController={this.appController} /> : element  } />;
//          })}
//        </Routes>
//      </Layout>
//    );
//  }
//}
