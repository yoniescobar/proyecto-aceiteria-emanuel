
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';
import storage from "../../firebaseConfig.js";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"

const baseUrl = process.env.REACT_APP_BASE_URL

const AddArticulo = () => {
  const [categorias, setCategorias] = useState([]);
    // State to store uploaded file
    const [file, setFile] = useState("");    
    // progress
    const [percent, setPercent] = useState(0);
    // Handle file upload event and update state
    function handleChange(event) {
      setFile(event.target.files[0]);
      //handleUpload();
    }        
    const handleUpload = () => {
      if (!file) {
          alert("Please upload an image first!");
      }

      const storageRef = ref(storage, `/files/${file.name}`);

      // progress can be paused and resumed. It also exposes progress updates.
      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
          "state_changed",
          (snapshot) => {
              const percent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );

              // update progress
              setPercent(percent);
          },
          (err) => console.log(err),
          () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  Articulo.imagen=url;
              });
          }
      );
    };

  let navigate = useNavigate();
  useEffect(() => {
    cargarCategoria();
  }, []);
  const [Articulo, setArticulo] = useState({
    nombre: "",
    categoria:{
      id:0
    },
    existencia: "",
    descripcion: "",
    imagen: "",
    codigo: "",
   
  })

  function logChange(val) {
    Articulo.categoria.id = val.id;
  }
  const { nombre, categoria,existencia,descripcion,imagen,codigo } = Articulo;


  const onInputChange = (e) => {
    setArticulo({ ...Articulo, [e.target.name]: e.target.value });
  };

  const onSubmitt = async (e) => {
    e.preventDefault();
    if(Articulo.nombre!="" && Articulo.codigo!="" || Articulo.categoria.id!=0){
      await axios.post(`${baseUrl}/Articulo`, Articulo);
      navigate("/tblArticulo");
    }else{
      alert("Ingresar campos obligatorios");
    }
  };



  const cargarCategoria = async () => {
    const response = await axios.get(`${baseUrl}/all`);
    response.data.data.forEach(element => {element.value=element.id; element.label=element.nombre});
    setCategorias(response.data.data);
  }



  return (
    <div className="container">
      <div className="row justify-content-center">
        <h2 className="text-center m-4">Registro de Artículo</h2>
        <div className="col-12 col-lg-9">
          <section className />
          <div className="clas " />
          <form action className="bg-light my-3 p-3 border rounded" onSubmit={e => e.preventDefault()}>
            <div className="form-row mb-4">
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="nombre">Nombre(*):</label>
                <input type="text" name="nombre" id="nombre" className="form-control" placeholder="Nombre de Producto" 
                value={nombre} onChange={(e)=>onInputChange(e)}/>
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="categoria">Categoria(*):</label>
                <Select
                  options={categorias}
                  onChange={logChange}
                />
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="existencia">Existencia(*):</label>
                <input type="number" name="existencia" id="existencia" className="form-control" 
                value={existencia} onChange={(e)=>onInputChange(e)}/>
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="descripcion">Descripción(*):</label>
                <input type="text" name="descripcion" id="descripcion" className="form-control" 
                value={descripcion} onChange={(e)=>onInputChange(e)}/>
              </div>
              <div className="form-group col-12 col-sm-6">
                <div>
                    <input type="file" onChange={handleChange} accept="/image/*" />
                    <button onClick={handleUpload}>Guardar imagen</button>
                    <p>{percent} "% Listo!"</p>
                </div>                
              </div>
              <div className="form-group col-12 col-sm-6">
                <label htmlFor="codigo">Código de Barra:</label>
                <input type="number" name="codigo" id="codigo" className="form-control"
                value={codigo} onChange={(e)=>onInputChange(e)}/>
              </div>
            </div>
            <button onClick={onSubmitt} className="btn btn-outline-primary">Guardar Articulo</button>
            <Link className="btn btn-outline-danger mx-2" to="/tblArticulo">Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddArticulo