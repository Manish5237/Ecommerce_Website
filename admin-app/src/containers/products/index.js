import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { Input } from '../../components/UI/input';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../actions';
import Table from 'react-bootstrap/Table';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';

/**
* @author
* @function Products
**/
export const Products = (props) => {

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();


  const handleClose = () => {

    const form = new FormData();
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);

    for (let pic of productPictures) {
      form.append('productPicture', pic);
    }

    dispatch(addProduct(form));
    setShow(false);
    setCategoryId('');
    setName('');
    setQuantity('');
    setPrice('');
    setDescription('');
  }

  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {

    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.childern.length > 0) {
        createCategoryList(category.childern, options);
      }
    }
    return options;
  }

  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }

  // console.log(productPictures);

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  }

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  }

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Categoey</th>
          </tr>
        </thead>
        <tbody>
          {
            product.products.length > 0 ?
              product.products.map(product =>
                <tr onClick={() => showProductDetailsModal(product)} key={product._id}>
                  <td>3</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                </tr>) :
              null
          }

        </tbody>
      </Table>
    );
  }

  const renderAddProductModal = () => {
    return (
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="Name"
            value={name}
            placeholder={`Product Name`}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Quantity"
            value={quantity}
            placeholder={`Quantity`}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Input
            label="Price"
            value={price}
            placeholder={`Price`}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            label="Description"
            value={description}
            placeholder={`Description`}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {
              createCategoryList(category.categories).map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>)
            }
          </select>
          {
            productPictures.length > 0 ?
              productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
          }
          <input type="file" name="productPictures" onChange={handleProductPictures} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const renderProductDetailsModal = () => {

    if (!productDetails) {
      return null;
    }

    return (
      <Modal show={productDetailModal} onHide={handleCloseProductDetailsModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="6">
              <label className="key">Name</label>
              <p className="value">{productDetails.name}</p>
            </Col>
            <Col md="6">
              <label className="key">Price</label>
              <p className="value">{productDetails.price}</p>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <label className="key">Quantity</label>
              <p className="value">{productDetails.quantity}</p>
            </Col>
            <Col md="6">
              <label className="key">Categoey</label>
              <p className="value">{productDetails.category.name}</p>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <label className="key">Description</label>
              <p className="value">{productDetails.description}</p>
            </Col>
          </Row>
          <Row>
            <Col>
            <label className="key">Product Pictures</label>
              <div style={{ display: 'flex' }}>
                {productDetails.productPictures.map(picture =>
                  <div className='productImgContainer'>
                    <img src={generatePublicUrl(picture.img)} />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <div>
      <Layout sidebar />
      <div style={{ marginLeft: '260px' }}>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Products</h3>
                <button onClick={handleShow}>Add</button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {renderProducts()}
            </Col>
          </Row>
        </Container>
        {renderAddProductModal()}
        {renderProductDetailsModal()}
      </div>
    </div>
  )

}