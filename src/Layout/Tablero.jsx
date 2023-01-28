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
            <div className="col-7">
              <div className="small-box bg-success">
                <div className="inner">
                  <h1 style={{ fontSize: 50 }}>Bienvenido.</h1>
                  <strong style={{ fontSize: 25 }}>Aceitera Emanuel</strong>
                  <strong className='text-dark' style={{ marginLeft: '10%', fontSize: 20 }}> {date.toLocaleTimeString()}</strong>

                  <div className="row d-flex">
                    <div className="col-12 d-flex justify-content-center">
                      <div className="col-5"></div>
                      <div className="small-box bg-success">
                        <div className="icon text-success">
                          <i style={{ fontSize: 450 }} className="ion ion-stats-bars" />
                        </div>
                      </div>
                    </div>
                  </div>
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
