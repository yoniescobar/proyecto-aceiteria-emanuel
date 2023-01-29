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
                  <h1 className='text-secondary d-flex justify-content-center' style={{ fontSize: 50 }}>Bienvenido. </h1>
                  <hr></hr>
                  <strong className='text-info d-flex justify-content-center' style={{ fontSize: 25 }}>Aceitera Emanuel</strong>
                  <br></br>
                  <strong className='text-info d-flex justify-content-center' style={{ fontSize: 20 }}> {date.toLocaleTimeString()}</strong>
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
