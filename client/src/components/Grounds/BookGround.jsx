import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BookGround = (props) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [bslot, setBSlot] = useState({
    name: "",
    email: "",
    phone: "",
    gid: props.gid,
    bdate: "",
    selectedSlots: [],
  });
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch available slots from backend
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/available-slots/${props.gid}/${bslot.bdate}`
        );
        setAvailableSlots(res.data.availableSlots); // Assume backend sends an array of available slots (0-23)
      } catch (error) {
        console.error("Error fetching available slots:", error);
      }
    };
    if (bslot.bdate) fetchAvailableSlots(); // Only fetch when bdate is set
  }, [props.gid, bslot.bdate]);

  // Convert 24-hour format to 12-hour AM/PM format
  const formatSlot = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12:00 AM
    return `${formattedHour}:00 ${period}`;
  };

  // Handle checkbox selection
  const handleSlotChange = (e) => {
    const { value, checked } = e.target;
    setBSlot((prev) => ({
      ...prev,
      selectedSlots: checked
        ? [...prev.selectedSlots, value]
        : prev.selectedSlots.filter((slot) => slot !== value),
    }));
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setBSlot((prev) => ({ ...prev, [name]: value }));
  };

  const postBSlot = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const res = await axios.post("http://localhost:5000/bookground", bslot, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.error) {
        Swal.fire({
          title: "Ooops!!!",
          text: "Invalid Details",
          icon: "error",
          confirmButtonText: "Okay",
        });
        navigate("/moreground/:id");
      } else {
        Swal.fire({
          title: "Congrats!!",
          text: "Successfully Ground Booked",
          icon: "success",
          confirmButtonText: "Okay",
        });
        navigate("/profile");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "Okay",
      });
      console.error(error);
    }
  };

  const BookSlot = React.memo(() => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking The Slot</Modal.Title>
        </Modal.Header>
        <form className="form" onSubmit={postBSlot}>
          <Modal.Body>
            <input
              type="text"
              id="inputMDEx"
              className="form-control"
              placeholder="Your Name"
              style={{ marginBottom: "3%" }}
              name="name"
              value={bslot.name}
              onChange={handleInputs}
            />
            <input
              type="tel"
              id="inputMDEx"
              className="form-control"
              placeholder="Your Phone Number"
              style={{ marginBottom: "3%" }}
              name="phone"
              value={bslot.phone}
              onChange={handleInputs}
            />
            <input
              type="email"
              id="inputMDEx"
              className="form-control"
              placeholder="Your Email"
              style={{ marginBottom: "3%" }}
              name="email"
              value={bslot.email}
              onChange={handleInputs}
            />
            <b>Booking Date:</b>
            <br />
            <input
              type="date"
              id="inputMDEx"
              className="form-control"
              style={{ marginBottom: "3%" }}
              name="bdate"
              value={bslot.bdate}
              onChange={handleInputs}
            />
            <b>Select Available Slots:</b>
            <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
              {availableSlots.length > 0 ? (
                availableSlots.map((slot) => (
                  <div key={slot} style={{ margin: "5px" }}>
                    <label>
                      <input
                        type="checkbox"
                        value={slot}
                        checked={bslot.selectedSlots.includes(slot)} // Ensure checkbox is correctly checked based on state
                        onChange={handleSlotChange}
                      />{" "}
                      {formatSlot(slot)}
                    </label>
                  </div>
                ))
              ) : (
                <p>No available slots for the selected date and ground.</p>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Book Slot
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Book Your Slot
      </Button>
      <BookSlot />
    </>
  );
};

export default BookGround;
