import React, { useState } from 'react'
import OutputComponent from './OutputComponent';

function InputComponent({getdata}) {
    const [n,setN] = useState(0)
    const [shape,setShape] = useState("")
    
    return (
        <div>
            <div className="container my-5">
                <div className="card my-5 col-md-6 mx-auto">
                    <div className="card-body p-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <input type="number" id="N" onChange={(e)=>setN(e.target.value)} placeholder="How many numbers?"
                                        className="form-control form-control-lg" />
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <div className="form-group">
                                    <select className="form-control form-control-lg" id="opt" onChange={(e)=>setShape(e.target.value)}>
                                        <option value="">Select Display Option</option>
                                        <option value="Circle">Circle</option>
                                        <option value="Square">Square</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="button" onClick={()=>getdata(n,shape)} className="btn btn-outline-primary btn-lg me-2">Submit</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default InputComponent