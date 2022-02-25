import React, { useEffect, useState } from 'react'
import InputComponent from './InputComponent'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import OutputComponent from './OutputComponent';

function Home() {
    const [name, setName] = useState("")
    const [outputArr, setOutputArr] = useState([])
    const [option, setOption] = useState("")

    const navigate = useNavigate();
    useEffect(() => {
        const name = localStorage.getItem("name")
        setName(name)
    }, [])
    const storedName = localStorage.getItem("name");
    useEffect(() => {
        if (storedName) {
            navigate("/home")
        }
        else {
            navigate("/welcome")
        }
    }, [])



    const getdata = (num, option) => {
        //  const num = document.getElementById("N").value;
        //const option = document.getElementById("opt").value
        setOption(option)
        let sum = 1;
        let arr = []
        let temp = []
        for (let i = 0; i < num; i++) {
            for (let j = 0; j < i; j++) {
                sum = sum + i
                arr.push(sum)
            }

        }
        for (let i = 0; i < num; i++) {
            temp.push(arr[i])
        }
        setOutputArr(temp)
    }


    return (
        <>
            <body>

                <Navbar name={name} />
                <InputComponent getdata={getdata} />
                <OutputComponent outputArr={outputArr} option={option} />
            </body>
        </>

    )
}

export default Home