import React, { useContext,useEffect, useState  } from "react";
import { UserContext } from "../providers/UserProvider";
import { firestore } from "../firebase";
import { auth } from "../firebase";
import { Router, Link } from "@reach/router";
import { toast } from "react-toastify";
import Info from "./Home/Info"
import  SucursalesForm from "./Home/SucursalesForm"
import SucursalesList  from "./Home/SucursalesList"
import Help from "./Home/Help"
import User from "./Home/User"

const ProfilePage = () => {

  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  
  const signOut = () => {
    auth.signOut();  
  };

  return (
    <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Sucursales</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Inicio</Link></li>
            <li><Link to="info">Detalles de sucursales</Link></li>
           
            

             
          </ul>
          <ul class="nav navbar-nav navbar-right">
      <li><a href="#"><span class="glyphicon glyphicon-user"></span>{email}</a></li>
      <button className="btn btn-danger" onClick={() => { signOut() }}>
              Sign out</button>
    </ul>
        </div>
      </nav>
      <Router>
        <Info exact path="info" />
        <SucursalesList exact path="sucursalesList" />

      </Router>

      <div className="container">
      <SucursalesList></SucursalesList>
        
      </div>
          </div>

          //------------------------------Formulario y lista de sucursales
          
        
          
        
  );
};

export default ProfilePage;

