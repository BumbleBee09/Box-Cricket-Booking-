import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const BookGround = (props) => {

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [bslot , setBSlot] = useState({
    name: "", email: "", phone: "", gid: props.gid, bdate: "", arvtime: "", deptime: ""
 });

 let name, value;

 const handleInputs = (e) => {
   console.log(e);
   name = e.target.name;
   value = e.target.value;

   setBSlot({...bslot, [name] : value });
 }

 const postBSlot = async (e) => {

   e.preventDefault();

  //  console.log(bslot);
  try {
    const res = await axios.post("http://localhost:5000/bookground" ,bslot,{headers: "application/json"});

  // const data = await res.json();
  if(res.data.error){

    console.log("Invalid");
    Swal.fire({
      title: 'Ooops!!!',
      text: 'Invalid Details',
      icon: 'error',
      confirmButtonText: 'Okay'
    })
    navigate('/moreground/:id');

  }else{

    console.log("Success");
    Swal.fire({
      title: 'Congrats!!',
      text: 'Successfully Ground Booked',
      icon: 'success',
      confirmButtonText: 'Okay'
    })
    navigate('/profile');

  }

  } catch (error) {
    console.log(error)
  }



}

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Book Your Slot
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking The Slot</Modal.Title>
        </Modal.Header>
        <form className='form'  method='POST'></form>
        <Modal.Body>
        <input type="text" id="inputMDEx" className="form-control" placeholder='Your Name' style={{marginBottom : "3% "}}
          name='name' value={bslot.name} onChange={handleInputs}
        />
        <input type="tel" id="inputMDEx" className="form-control" placeholder='Your Number' style={{marginBottom : "3% "}}
          name='phone' value={bslot.phone} onChange={handleInputs}
        />
        <input type="email" id="inputMDEx" className="form-control" placeholder='Your Email' style={{marginBottom : "3% "}}
          name='email' value={bslot.email} onChange={handleInputs}
        />
        <b>Booking Date:</b>
        <br/>
        <input type="date" id="inputMDEx" className="form-control" placeholder='Booking Date' style={{marginBottom : "3% "}}
          name='bdate' value={bslot.bdate} onChange={handleInputs} 
        />
        <b>Booking Slot Timing :</b>
        <br/>
        From:
        <input type="number" id="arvtime"  min="0" max="23" className="form-control" placeholder='24 hours notation' style={{marginBottom : "3% "}}
          name='arvtime' value={bslot.arvtime} onChange={handleInputs} 
        />
        To:
        <input type="number" id="deptime"  min="0" max="23" className="form-control" placeholder='24 hours notation' style={{marginBottom : "3% "}}
          name='deptime' value={bslot.deptime} onChange={handleInputs}  
        />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={postBSlot} type='submit'>
            Book
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookGround;