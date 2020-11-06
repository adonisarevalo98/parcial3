import React, { useContext,useEffect, useState  } from "react";
import { UserContext } from "../../providers/UserProvider";
import { firestore } from "../../firebase";
import { auth } from "../../firebase";
import { Router, Link } from "@reach/router";
import { toast } from "react-toastify";
import Info from "./Info"
import  SucursalesForm from "./SucursalesForm"
import Help from "./Help"
import User from "./User"

const SucursalesList = () => {

  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
 

  const [Sucursales, setSucursales] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const cantidad = Sucursales.length;
 
  const getSucursales = async () => {
    firestore.collection("Sucursales").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
     
      setSucursales(docs);
    });
  };

  const onDeleteSucursal = async (id) => {
    if (window.confirm("Seguro que quieres eliminar este registro?")) {
      await firestore.collection("Sucursales").doc(id).delete();
      toast("Se eliminó un Sucursal", {
        type: "error",
        //autoClose: 2000
      });
    }
  };


  useEffect(() => {
    getSucursales();
  }, []);

  const addOrEditSucursal = async (SucursalObject) => {
    try {
      if (currentId === "") {
        if(cantidad == 3){
          window.alert("Ya se han ingresado 3 sucursales, elimine una para seguir");
        }else{
         if(SucursalObject.ganancia < 1000){
          window.alert("No se permiten ganancias negativas ni menores a $1000");
         }else{
           if(SucursalObject.empleados < 10){
            window.alert("El número de empleados no puede ser menor a 10");
           }else{
            await firestore.collection("Sucursales").doc().set(SucursalObject);
            toast("Se agregó un Sucursal", {
              type: "success",
            });
           }
         }          
        }
        
      } else {
        await firestore.collection("Sucursales").doc(currentId).update(SucursalObject);
        toast("Se actualizó un Sucursal", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };



  return(
    <div>
      
      <div className="container">
     
        <br></br>
        <div className="col-md-3 ">
            <h1 className="text-2xl font-semibold">Agregar Sucursales</h1>
            <br></br>
            <SucursalesForm {...{ addOrEditSucursal, currentId, Sucursales }} />
          </div>
    
          <div className="col-md-6">
          
              <h2>Lista Sucursales</h2>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Ganancias</th>
                    <th>Empleados</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Sucursales.map((Sucursal) => (
                    <tr key={Sucursal.id}>
                      <td>{Sucursal.sucursal}</td>
                      <td>${Sucursal.ganancia}</td>
                      <td>{Sucursal.empleados}</td>
                      <td>
                        <button className="btn btn-primary" onClick={() => setCurrentId(Sucursal.id)}>Editar</button>
                        &nbsp;
                        &nbsp;
                        <button className="btn btn-danger" onClick={() => onDeleteSucursal(Sucursal.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
      </div>
          </div>

         
          
        
          
        
);
};

export default SucursalesList;

