import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch, useLocation} from 'react-router-dom';
import {isAdmin, isAuth} from "./service/auth.service";
import Login from "./screens/Auth/Login";
import Registration from "./screens/Auth/Registration";
import {ToastContainer} from "react-toastify";
import React from "react";
import Dashboard from "./screens/Home/Dashboard";
import MainPage from "./screens/Home/MainPage";
import Header from "./screens/Header/Header";
import DisciplinesPage from "./screens/Disciplines/DisciplinesPage";
import Discipline from "./screens/Disciplines/Discipline";
import About from "./screens/Home/About";

function App() {
    return (
        <div className={'h-screen flex items-center justify-center'}>
            <Router>
                <ConditionalHeader/>
                <Switch>

                    <Route path={'/login'}
                           render={() => isAuth() ? isAdmin()? <Redirect to={'/dashboard'}/> : <Redirect to={'/'}/> : <Login/>
                           }
                    />
                    <Route
                        path={'/registration'}
                        render={() => isAuth() ? <Redirect to={'/faculty'}/> : <Registration/>
                        }
                    />
                    <Route path={'/disciplines/:letter'} component={Discipline}/>

                    <Route path={'/disciplines'} component={DisciplinesPage}/>

                    <Route path={'/dashboard'}
                           render={()=>isAdmin()? <Dashboard/> : <Redirect to={'/faculty'}/>}/>

                    <Route path={'/about'} component={About}/>
                    <Route path={'/faculty'} component={MainPage}/>

                </Switch>
            </Router>
            <ToastContainer position={"bottom-right"} theme={"dark"} hideProgressBar={true}/>

        </div>
    );
}

function ConditionalHeader() {
    const location = useLocation();
    const noHeaderRoutes = ['/login', '/registration'];

    if (noHeaderRoutes.includes(location.pathname)) {
        return null;
    }

    return <Header />;
}
export default App;
