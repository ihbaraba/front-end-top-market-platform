import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';

import AdministratorSide from './containers/AdministratorSide/AdministratorSide';
import Cabinet from "./containers/AdministratorSide/Cabinet/Cabinet";
import KnowledgeBase from "./containers/AdministratorSide/KnowledgeBase/KnowledgeBase";
import ProfileSettings from "./containers/AdministratorSide/ProfileSettings/ProfileSettings";
import Cart from "./containers/AdministratorSide/Cart/Cart";
import AdditionalServices from "./containers/AdministratorSide/AdditionalServices/AdditionalServices";
import Employees from "./containers/AdministratorSide/Employees/Employees";
import MyProducts from "./containers/AdministratorSide/MyProducts/MyProducts";
import Finance from "./containers/AdministratorSide/Finance/Finance";
import Store from "./containers/AdministratorSide/Store/Store";
import Login from "./containers/AdministratorSide/Login/Login";


const Routes = () => {
    return (
        <Fragment>
            <Switch>
                <Route exact path='/' component={Login}/>

                {/*ADMIN SIDE*/}
                <Route path='/admin' render={() => (
                    <AdministratorSide>
                      <Route path='/admin/cabinet' component={Cabinet}/>
                      <Route path='/admin/knowledge-base' component={KnowledgeBase}/>
                      <Route path='/admin/profile-settings' component={ProfileSettings}/>
                      <Route path='/admin/cart' component={Cart}/>
                      <Route path='/admin/additional-services' component={AdditionalServices}/>
                      <Route path='/admin/employees' component={Employees}/>
                      <Route path='/admin/my-products' component={MyProducts}/>
                      <Route path='/admin/finance' component={Finance}/>
                      <Route path='/admin/store' component={Store}/>


                    </AdministratorSide>
                )}>
                </Route>

                {/*USER SIDE*/}
                {/*<Route path='' render={() => (*/}
                    {/*<UserSide>*/}
                       {/*/!*<Route exact path='/' component={HomePage}/>*!/*/}
                    {/*</UserSide>*/}
                {/*)}>*/}
                {/*</Route>*/}
            </Switch>
        </Fragment>
    )
};

export default Routes;