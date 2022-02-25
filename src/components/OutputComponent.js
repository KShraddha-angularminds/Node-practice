import React, { useEffect } from 'react'

function OutputComponent({ outputArr, option }) {
useEffect(()=>{
    if(option=="Circle"){
       // let element = document.getElementById('shapid');
      //  console.log(element)
      //element.classList.add('rounded-circle');
    }
})


    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <div className="card">
                        <div className="card-body" id="eight_circle">
                            <div className="row py-4">

                                  {outputArr && outputArr.map((val, index) => {
                                    return (
                                        option == "Circle" ?

                                            <div className="col-auto mb-3">
                                                <h4 className="border border-info px-4 py-3 m-auto rounded rounded-circle" id="shapeid">
                                                    <span>{val}</span>
                                                </h4>
                                            </div> :
                                            option=="Square" ?
                                            <div className="col-auto mb-3">
                                                <h4 className="border border-info px-4 py-3 m-auto rounded">
                                                    <span>{val}</span>
                                                </h4>
                                            </div> :null
                                    )
                                })}  

                        {/* {outputArr && outputArr.map((val, index) => {
                                    return (
                                        

                                            <div className="col-auto mb-3">
                                                <h4 className="border border-info px-4 py-3 m-auto rounded" id="shapid">
                                                    <span>{val}</span>
                                                </h4>
                                            </div>
                                            
                                    )
                                })} */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OutputComponent