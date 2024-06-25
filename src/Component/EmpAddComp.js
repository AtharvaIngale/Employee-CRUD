import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EmpAddComp = () => {
    const nav = useNavigate();
    const [newUser, setNewUser] = useState({
        userId: '',
        userPassword: ''
    });

    const inputchangeHandler = (event) => {
        //   console.log(event.target.type)
        //   console.log(event.target.name)
        //   console.log(event.target.value)
        const { type, name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    }
    const addRecord = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:8888/users`, newUser).then(() => {
            window.alert("Record Added successfully");
            nav("/main/empdash");
        }).catch((error) => { })
    }

    return (
        <div>
            <h2>This is Emp Add Component</h2>
            <form onSubmit={addRecord}>
                <input type='text' name='userId' placeholder='enter user id'
                    onChange={(event) => inputchangeHandler(event)} value={newUser.userId} /> <br /><br />

                <input type='text' name='userPassword' placeholder='enter user password'
                    onChange={(event) => inputchangeHandler(event)} value={newUser.userPassword} /> <br /><br />
                <button type='submit' className='btn btn-primary'>submit</button>
            </form>
        </div>
    )
}

export default EmpAddComp
