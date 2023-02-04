import React, { useState, useEffect } from 'react'

const Tablero = () => {
  var [date, setDate] = useState(new Date());
  
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  });


  return (
    <>
      {/* Main content */}
      <section className="content">
        <div className="container-fluid" lassName="col-lg-3 col-6">
          <div className="row justify-content-center">
            <div className="col-9">
              <div className="small-box bg-white d-flex justify-content-center my-5">
                <div className="inner">
                  <h1 className='text-secondary d-flex justify-content-center' style={{ fontSize: 25 }}>Bienvenido. </h1>
                  <hr></hr>
                  <strong className='text-info d-flex justify-content-center' style={{ fontSize: 50 }}>Aceitera Emanuel</strong>
                  <div>
                    <img src="https://media.istockphoto.com/id/518901244/es/foto/aceite-de-motor.jpg?s=612x612&w=0&k=20&c=9LXxMhTz4TGpQQDdPbdz43BoUjvN5_wiAZuT_SHRmdc=" alt="BigCo Inc. logo"/>
                  </div>    
                  <br>                
                  </br>
                  <strong className='text-info d-flex justify-content-center' style={{ fontSize: 40 }}> {date.toLocaleTimeString()}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* icono */}
          {/* <div className="row justify-content-center">
            <div className="col-lg-3 col-12">
              <div className="small-box bg-secondary">
                <div className="icon text-success">
                  <i style={{ fontSize: 500 }} className="ion ion-stats-bars" />
                </div>
              </div>
            </div>
          </div> */}

        </div>{/* /.container-fluid */}
      </section>
      {/* /.content */}


    </>
  )
}

export default Tablero
