import React from "react";
import { Input } from '../../../components/UI/input';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const AddCategoryModal = (props) => {

    const {
        show,
        handleClose,
        hide,
        handleCategoryImage,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList
    } = props;

    return (
        <Modal show={show} onHide={() => hide(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Categoey</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Input
                            value={categoryName}
                            placeholder={`Category Name`}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <select
                            value={parentCategoryId}
                            onChange={(e) => setParentCategoryId(e.target.value)}
                        >
                            <option>Select Category</option>
                            {
                                categoryList.map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>)
                            }
                        </select>
                    </Col>
                </Row>
                <Row><input type='file' name='categoryImage' onChange={handleCategoryImage} /></Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddCategoryModal;