import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from 'react-router-dom';

const EmpDashComp = () => {
     const [users,setUsers] = useState([]);

    useEffect(()=>{
        fetchData();
    },[]);
    // get request code 
    const fetchData = ()=>{
        axios.get("http://localhost:8888/users").then((res)=>{
            // console.log(res.data);
            setUsers(res.data);
        }).catch((error)=>{})
    }

    //delete request code 
    const deleteRecord = (id)=>{
      if(window.confirm(`Are you sure to delete record with id:${id}`)){
        axios.delete(`http://localhost:8888/users/${id}`).then(()=>{
            window.alert("Record Delete Successfully");
            fetchData();
        }).catch((error)=>{})
      }
    }


    return (
        <div>
            <h2>This is Employee Dashboard component</h2>
            <Link to="/main/empadd" className='btn btn-primary mb-2 mt-2'>Add</Link>
            <table className='table table-striped'>
             <thead>
                <tr>
                    <th>Sr.No</th><th>User Id</th><th>User Password</th><th>Actions</th>
                </tr>
             </thead>
             <tbody>
                { users.map((val,index)=>{
                    return <tr key={index}>
                        <td>{index+1}</td>
                        <td>{val.userId}</td>
                        <td>{val.userPassword}</td>
                        <td>
                            <Link to={`/main/empedit/${val.id}`}  className='btn btn-outline-success btn-sm'>
                             <EditNoteOutlinedIcon></EditNoteOutlinedIcon>     
                           </Link> | 
                            <button type='button' onClick={()=>deleteRecord(val.id)} className='btn btn-outline-danger btn-sm'>
                                <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                            </button>
                        </td>
                    </tr>
                })}
             </tbody>
            </table>
        </div>
    )
}

export default EmpDashComp
