import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from "./../../setup/axios"
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faS, faStar, faL } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';

function ModalBookRating(props) {
    const { show, onHide, book_id } = props
    const [comment, setComment] = useState("")
    const [hoveredStar, setHoveredStar] = useState(1)

    const handleCloseModalBookRating = () => {
        setComment("");
        setHoveredStar(1);
        onHide();
    }
    const handleConfirmSendPreview = async () => {
        if (book_id && hoveredStar >= 1) {
            try {
                const res = await axios.post("/ratings/", { book: book_id, rating: hoveredStar, comment: comment })
                toast.success("Send book preview successfully")
            } catch (error) {
                toast.error(error);
            }
            handleCloseModalBookRating();
        }
        else {
            toast.error("something wrongs")
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            centered
            show={show}
            onHide={() => { handleCloseModalBookRating() }}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Write book reviews
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <div className='d-flex justify-content-center mb-3'>
                        {[...Array(5)].map((star, index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                className={index + 1 <= hoveredStar ? "fa-regular fa-star me-1 text-warning" : "fa-regular fa-star me-1"}
                                style={{ fontSize: "20px", cursor: "pointer" }}
                                onMouseOver={() => setHoveredStar(index + 1)}
                            />
                        ))}
                    </div>

                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Leave your comment here"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => { handleCloseModalBookRating() }} >
                    Cancel
                </Button>

                <Button variant="success" onClick={() => { handleConfirmSendPreview() }}>
                    Send your book preview
                </Button>

            </Modal.Footer>
        </Modal>
    );
}

export default ModalBookRating;