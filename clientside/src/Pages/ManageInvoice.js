import React,{useState,useEffect} from 'react'
// import { useSelector } from "react-redux";
import { deleteInvoice, showinvoicelist } from '../services/auth.services';
import {Container, Button, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Pagination from './Pagination.js'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ManageInvoice() {
  // const userdata = useSelector((state) => (state.auth))
  // console.log(userdata)


  const handleSubmit = async (_id) => {
    console.log(handleSubmit)
    alert("customer deleted")
    const updateResponse = await deleteInvoice(_id);

  console.log("ijni",updateResponse)
window.location.reload()
}


  const [show, setShow] = useState([]);
 
  useEffect(() => {
    const showList = async () => {
      const result = await showinvoicelist()
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

  // const downloadHandler = (data) => {
  //     const doc = new jsPDF();
  //     doc.text("Invalid List",20,10);

  //     doc.autoTable({
  //         columns:[
  //             {headers:"Customer name", datakey:`${data.customername}`},
  //             {headers:"Product name", datakey:"productname"},
  //             {headers:"Quantity", datakey:"quantity"},
  //             {headers:"Price", datakey:"price"},
  //             {headers:"Tax", datakey:"tax"},
  //             {headers:"Grand Total", datakey:"grandtotal"},
  //             {headers:"Status", datakey:"status"},

  //         ],
  //         body:show
  //     })
  //     doc.save("Invoice List")
  // }
  // console.log(downloadHandler)


  const pdfGenerate = (data) => {
      var doc = new jsPDF('landscape','px','a4','false');
      doc.setFont('Helvertica','bold')
      doc.setDrawColor(255,60,60);
      doc.text(60,60,`Customer name : ${data.customername}`)
      doc.text(60,80,`Product name : ${data.item[0].productname}`)
      doc.text(60,100,`Quantity : ${data.item[0].quantity}`)
      doc.text(60,120,`Price : ${data.item[0].price}`)
      doc.text(60,140,`Tax : ${data.item[0].tax}`)
      doc.text(60, 160, `Grand Total:${data.grandtotal}`)
      doc.text(60,180,`Status: ${data.status}`)
      doc.save(`${data.customername}.pdf`)

  }

   return (
    <>
      <Container>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <div className="my-4">
        </div>
        <Link to="/addinvoice">
          <Button variant="dark" >Add Invoice</Button>
        </Link>

        <div><br />
       

        </div>
       
        <div><br />
          <Table striped bordered hover>
            <thead>
              <tr>
             
                <th>S.No</th>
                <th>Customer Name</th>
                <th>Grand Total</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {show.slice(pagination.start,pagination.end).map((data, index) => {
                return (
                  <tr key={index}>
                     
                    <td>{index + 1}</td>
                    <td>{data.customername}</td>
             
                    <td>{data.grandtotal}</td>
                    <td>{data.status}</td>
                    <td><Link to={`/editInvoice/${data._id}`}><i class="fa fa-edit"></i></Link></td>

                    <td><Button variant="danger"
                       onClick={()=>handleSubmit(data._id)} 
                        className="bi bi-trash" ><i class="fa fa-trash"></i></Button></td>
                 <td><Button type="button" class="btn btn-outline-primary" onClick={(e) => pdfGenerate(data)}><i class="fa-solid fa-file-pdf"></i></Button></td>
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