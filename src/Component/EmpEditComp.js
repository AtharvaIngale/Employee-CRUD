import axios from 'axios';
import React, { useEffect ,useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'

const EmpEditComp = () => {
    const {id} = useParams();
    const nav = useNavigate();
    const [newUser, setNewUser] = useState({
        id:'',
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
        axios.put(`http://localhost:8888/users/${id}`, newUser).then(() => {
            window.alert("Record Updated successfully");
            nav("/main/empdash");
        }).catch((error) => { })
    }
    useEffect(()=>{
        axios.get(`http://localhost:8888/users/${id}`).then((res)=>{
            // console.log(res.data);
            setNewUser(res.data);
        }).catch((error)=>{})
    },[])
    return (
        <div>
            <h2>This is Emp Edit component</h2>
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

export default EmpEditComp
