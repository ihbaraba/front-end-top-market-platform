import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';

import AdministratorSide from './containers/AdministratorSide/AdministratorSide';
import UserSide from './containers/UserSide/UserSide';
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
import Registration from "./containers/AdministratorSide/Registration/Registration";
import ConfirmRegistration from "./containers/AdministratorSide/Registration/ConfirmRegistration";
import ResetPassword from "./containers/AdministratorSide/ResetPassword/ResetPassword";
import CompanySettings from "./containers/AdministratorSide/CompanySettings/CompanySettings";
import Categories from "./containers/AdministratorSide/Categories/Categories";
import LearningModule from "./containers/AdministratorSide/LearningModule/LearningModule";
import Lessons from "./containers/AdministratorSide/LearningModule/Lessons";
import Instruction from "./containers/AdministratorSide/Instruction/Instruction";
import Orders from "./containers/AdministratorSide/Orders/Orders";
import ContractorProducts from "./containers/AdministratorSide/ContractorProducts/ContractorProducts";
import LandingPage from "./containers/UserSide/LandingPage/LandingPage";

const Routes = () => {
    return (
        <Fragment>
            <Switch>
                <Route exact path='/' component={LandingPage}/>
                <Route exact path='/login' component={Login}/>
                <Route path='/registration' component={Registration}/>
                <Route path='/reset_password' component={ResetPassword}/>
                <Route path='/confirm_email' component={ConfirmRegistration}/>

                {/*ADMIN SIDE*/}
                <Route path='/admin' render={() => (
                    <AdministratorSide>
                      <Route path='/admin/cabinet' component={Cabinet}/>
                      <Route path='/admin/knowledge_base' component={KnowledgeBase}/>
                      <Route path='/admin/profile_settings' component={ProfileSettings}/>
                      <Route path='/admin/company_settings' component={CompanySettings}/>
                      <Route path='/admin/cart' component={Cart}/>
                      <Route path='/admin/additional_services' component={AdditionalServices}/>
                      <Route path='/admin/employees' component={Employees}/>
                      <Route path='/admin/my_products' component={MyProducts}/>
                      <Route path='/admin/finance' component={Finance}/>
                      <Route path='/admin/store' component={Store}/>
                      <Route path='/admin/categories' component={Categories}/>
                      <Route path='/admin/learning' component={LearningModule}/>
                      <Route path='/admin/lessons' component={Lessons}/>
                      <Route path='/admin/instruction' component={Instruction}/>
                      <Route path='/admin/orders' component={Orders}/>

                      <Route path='/admin/products' component={ContractorProducts}/>
                    </AdministratorSide>
                )}>
                </Route>

                {/*USER SIDE*/}
                {/*<Route path='' render={() => (*/}
                    {/*<UserSide>*/}
                       {/*/!*<Route exact path='/' component={HomePage}/>*!/*/}
                       {/*<Route path='/' component={LandingPage}/>*/}
                    {/*</UserSide>*/}
                {/*)}>*/}
                {/*</Route>*/}
            </Switch>
        </Fragment>
    )
}

export default Routes;