import React from "react";
import {Switch, Route} from 'react-router-dom';
import Users from "../Redux/Containers/Users";
import UserInfo from "./User/UserInfo";
import NotFound from "./NotFound";
 
const Routing = () => (
    <Switch>
        <Route path="/" exact component={Users}/>
        <Route path={`/user/:id`} exact component={UserInfo}/>
        {/* <Route component={NotFound} /> */}
    </Switch>
);

export default Routing;