// import './Dashboard.css'
import React, { useState,useEffect } from 'react'
import { countList } from '../services/auth.services'
import {PieChart,Pie,Tooltip} from 'recharts'
// import Chart from 'react-apexcharts';


const Dashboard = () => {
    const [show,setShow] = useState(' ')

    useEffect (() => {
        const count = async() => {
            const result = await countList()
            const arr = result.data;
            setShow(arr);
        }
        count();
    })
    console.log(show)

    const result = [
        {name : 'Paid', value: show.paid},
        {name : 'UnPaid', value: show.unpaid},
    ]
    return (
        <>
          <div className="container my-5">
              <div className="row">
                  {/* <div className="col-md-2"></div> */}

                  <div className="card1 col-md-5">  
                  <div className="card">
                        <div className="card-body1">
                            <h3>Total no. of customer</h3><hr/>
                            <p className="card-text">{show.result}</p>
                        </div>
                        </div>
                  </div>


                    <div className="col-md-5">
                    <div class="card">
                        <div class="card-body2">
                            <h3>Total no. of invoice</h3><hr/>
                            <p class="card-text">{show.data}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="row my-5">
                  {/* <div className="col-md-2"></div> */}

                  <div className="col-md-5"> 
                  <div class="card">
                        <div class="card-body3">
                            <h3>Total no. of paid customer</h3><hr/>
                            <p class="card-text">{show.paid}</p>
                        </div>
                        </div>
                  </div>


                    <div className="col-md-5">
                    <div class="card">
                        <div class="card-body4">
                        <h3>Total no. of unpaid customer</h3><hr/>
                            <p class="card-text">{show.unpaid}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                        <PieChart width={300} height={300}>
                                            <Pie
                                            dataKey="value"
                                            isAnimationActive={false}
                                            data={result}
                                            cx="30%"
                                            cy="30%"
                                            outerRadius={50}
                                            // fill="red"
                                            fill="#4f63b6"
                                            
                                            label
                                            />
                                            <Tooltip/>
                                            </PieChart>
                        {/* <Chart
                                type="pie"
                                width={500}
                                height={300}
                                series={result}
                                options={{
                                    title: {
                                        text: "Total Paid or Unpaid"
                                    },
                                    labels: ["paid","unpaid"],
                                }}>
                            </Chart> */}
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                    
            </div>      
        </>
    )
}

export default Dashboard
