import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";

const SucursalesForm = (props) => {

    const initialStateValues = {
      sucursal: "",
      ganancia: "",
      empleados: "",
    };
  
    const [values, setValues] = useState(initialStateValues);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      props.addOrEditSucursal(values);
      setValues({ ...initialStateValues });
    };
  
    const getSucursalById = async (id) => {
      const doc = await firestore.collection("Sucursales").doc(id).get();
      setValues({ ...doc.data() });
    };
  
    useEffect(() => {
      if (props.currentId === "") {
        setValues({ ...initialStateValues });
      } else {
        //https://stackoverflow.com/questions/56059127/how-to-fix-this-error-function-collectionreference-doc
        if (props.currentId !== null && props.currentId !== undefined) {
          getSucursalById(props.currentId);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currentId]);
  
    
    return (
      <form onSubmit={handleSubmit} className="card card-body border-primary">
        <div className="form-group input-group">
          <div className="input-group-text bg-light">
          
          </div>
          <a>Nombre de sucursal</a>
          <input
            type="text"
            className="form-control"
            value={values.sucursal}
            name="sucursal"
            required
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-group">
          <div className="input-group-text bg-light">
            
          </div>
          <a>Ganancias</a>
          <input
            type="number"
            value={values.ganancia}
            name="ganancia"
             required
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-group">
          <div className="input-group-text bg-light">
          
          </div>
          <a>Número de empleados</a>
          <input
            type="number"
            value={values.empleados}
            name="empleados"
            required
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <button class="btn btn-success btn-xs">
          {props.currentId === "" ? "Guardar" : "Actualizar"}
        </button>
      </form>
    );
  };
  
  export default SucursalesForm;
  