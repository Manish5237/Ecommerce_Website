import React from "react";
import { Input } from '../../../components/UI/input';
import { Row, Col, Modal, Button } from 'react-bootstrap';

const UpdateCategoriesModal = (props) => {


    const {
        show,
        handleClose,
        hide,
        checkedArray,
        handleCategoryInput,
        categoryList
    } = props;

    return (
        <Modal show={show} onHide={() => hide(false)} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Update Categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <h3>Marked for Update</h3>
                    </Col>
                </Row>

                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={'Category Name'}

                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                />
                            </Col>
                            <Col>
                                <select
                                    value={item.parentId}
                                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                                >
                                    <option>Select Category</option>
                                    {
                                        categoryList.map(option =>
                                            <option key={option.value} value={option.value}>{option.name}</option>)
                                    }

                                </select>
                            </Col>
                            <Col>
                                <select
                                    value={item.type}
                                    onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                                >
                                    <option value="">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateCategoriesModal;