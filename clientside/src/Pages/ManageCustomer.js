import React,{useState,useEffect} from 'react'
// import { useSelector } from "react-redux";
import { showlist } from '../services/auth.services';
import {deleteCustomer} from '../services/auth.services'
import {Container, Button, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Pagination from './Pagination.js'

export default function ManageCustomer() {
  // const userdata = useSelector((state) => (state.auth))
  // console.log(userdata)


  const handleSubmit = async (_id) => {
    console.log(handleSubmit)
    alert("customer deleted")
    const updateResponse = await deleteCustomer(_id);

  console.log("ijni",updateResponse)
window.location.reload()
}


  const [show, setShow] = useState([]);
 
  useEffect(() => {
    const showList = async () => {
      const result = await showlist()
      const arr = result.data.result;
      setShow(arr);
    }
    showList();
  }, [])
  console.log(show)
  
  const [showPerPage,setShowPerPage] = useState(7)
  const[pagination, setPagination] = useState({
    start:0,
    end : showPerPage,
  })
  
  console.log(setShowPerPage)
  const onPaginationChange = (start,end) => {
    setPagination({start:start, end:end})
  }

  
  return (
    <>
    
      <Container>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <div className="my-4">
        </div>
        <Link to="/addcustomer">
          <Button variant="dark" >Add Customer</Button>
        </Link>

        <div><br />
       

        </div>
       
        <div><br />
          <Table striped bordered hover >
            <thead>
              <tr>
             
                <th>S.No</th>

                <th>Name</th>
                <th>Email</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {show.slice(pagination.start,pagination.end).map((data, index) => {
                return (
                  <tr key={index}>
                     
                    <td>{index + 1}</td>
                    <td>{data.customername}</td>
                    <td>{data.email}</td>
                    <td><Link to={`/editCustomer/${data._id}`}><i class="fa fa-edit"></i></Link>&nbsp;&nbsp;
                    <Link to={`/viewCustomer/${data._id}`}><i class="fa fa-eye"></i></Link></td>

                    <td><Button variant="danger"
                       onClick={()=>handleSubmit(data._id)} 
                        className="bi bi-trash" ><i class="fa fa-trash"></i></Button></td>
                 
                  </tr>
                )
              })}

            </tbody>
          </Table>
        </div>
       <Pagination showPerPage={showPerPage}
       onPaginationChange={onPaginationChange}
       total = {show.length}/>
      </Container>
      </>
  )
}
