import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    console.log(name)
    const saveName = () => {
        localStorage.setItem("name", name)
    }

    const storedName = localStorage.getItem("name");

    useEffect(() => {
        if (storedName) {
            navigate("/home")
        }
        else {
            navigate("/welcome")
        }
    }, [])


    return (
        <>
            <body>
                <div className="container my-5 text-center">
                    <h2 className="text-center">Hello and welcome,</h2>
                    <input type="text" placeholder="Please enter your name" onChange={(e) => setName(e.target.value)} className="form-control form-control-lg w-50 mx-auto mt-5" />
                    <div className="my-5">
                        <Link to="/home">
                            <button className="btn btn-primary btn-lg" onClick={saveName}>Continue</button>
                        </Link>
                    </div>
                </div>
            </body>
        </>
    )
}

export default Welcome