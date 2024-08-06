import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login';
import Welcome from './Dashboard';
import Customer from './Customer';
import Products from './Products';


import Productedit from './Productedit'
import Customersedit from './Customeredit';

import FourZeroFour from './FourZeroFour';

const PrivateRoute = (props) => {
    const token = sessionStorage.getItem('token');
    if (token) {
        return <Route exact={true} path={props.path} component={props.component} />
        console.log(`Component ${props.component}`)
    } else {
        return <Login {...props} />
    }
}


const Router = (props) => {
    return <Switch>

        <Route path="/" component={Login} exact={true} />

        <Route path="/login" component={Login} />


        <PrivateRoute path="/welcome" component={Welcome} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/customers" component={Customer} />
        
        <PrivateRoute path="/Editcategory/:id" component={Productedit} />
        <PrivateRoute path="/Editcustomer/:id" component={Customersedit} />

        <Route component={FourZeroFour} />

    
    </Switch>
}

export default Router;