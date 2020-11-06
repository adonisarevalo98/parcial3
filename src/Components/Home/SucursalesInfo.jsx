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
import { data } from "autoprefixer";

const SucursalesInfo = () => {

  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
 

  const [Sucursales, setSucursales] = useState([]);
  const [Condicion1, setSucursales1] = useState([]);
  const [Condicion2, setSucursales2] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const cantidad = Sucursales.length;
  const cantidad1 = Condicion1.length;
  const cantidad2 = Condicion2.length;
var ganancias= 0;
var totalganancias = 0;
Sucursales.forEach((datos)=>{
    totalganancias += parseInt(datos.ganancia)
});
console.log(totalganancias);
  const getSucursales = async () => {
    firestore.collection("Sucursales").onSnapshot((querySnapshot) => {
      const docs = [];
      const docs1 = [];
      const docs2 = [];
     
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
        if(doc.data().ganancia >= 1000 && doc.data().ganancia <= 25000  ){
        
        docs1.push({ ...doc.data(), id: doc.id });
         }else if(doc.data().ganancia >= 30000){

            docs2.push({ ...doc.data(), id: doc.id });
         }
      });
      setSucursales(docs);
      setSucursales1(docs1);
      setSucursales2(docs2);
      
    });
   
  };

 

  useEffect(() => {
    getSucursales();
  }, []);

  



  return(
    <div>
      
      <div className="container">
     
          <div className="col-md-10">
          
  <h1 className="text-2xl font-semibold">Sucursales que obtienen ganancias entre $1,000 y $25,000 son : {cantidad1}</h1>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Ganancias</th>
                    <th>Empleados</th>
                    <th>Mensaje</th>
                  </tr>
                </thead>
                <tbody>
                  {Condicion1.map((Cdn1) => (
                    <tr key={Cdn1.id}>
                      <td>{Cdn1.sucursal}</td>
                      <td>${Cdn1.ganancia}</td>
                      <td>{Cdn1.empleados}</td>
                      <td>
                    <p>Buen Trabajo</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br></br><br></br>
            <br></br><br></br>
      
            <div className="col-md-10">
          
                  <h1 className="text-2xl font-semibold">Sucursales que obtienen ganancias mayores de $30,000 son: {cantidad2}</h1>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Ganancias</th>
                    <th>Empleados</th>
                    <th>Mensaje</th>
                  </tr>
                </thead>
                <tbody>
                  {Condicion2.map((Cdn2) => (
                    <tr key={Cdn2.id}>
                      <td>{Cdn2.sucursal}</td>
                      <td>${Cdn2.ganancia}</td>
                      <td>{Cdn2.empleados}</td>
                      <td>
                    <p>Excelente Trabajo</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
      </div>
      <br></br><br></br>
     
      <div className="col-md-4 ">
            <h1 className="text-3xl font-semibold">Total de ganancias: ${totalganancias}</h1>
        
          </div>
          <br></br><br></br>
          </div>

           
);

};

export default SucursalesInfo;

