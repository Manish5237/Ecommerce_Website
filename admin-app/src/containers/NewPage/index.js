import React, { useState, useEffect } from 'react'
import { Col, Container, Modal, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions/page.action';
import { Layout } from '../../components/Layout'
import { Input } from '../../components/UI/input';
import linearCategories from '../../helpers/linearCategories';

/**
* @author
* @function NewPage
**/

export const NewPage = (props) => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const dispatch = useDispatch();
    const page = useSelector(state => state.page)

    useEffect(() => {
        setCategories(linearCategories(category.categories));
    }, [category]);


    useEffect(() => {
        console.log(page);
        if (!page.loading) {
            setCreateModal(false);
        }
    }, [page]);

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]]);
    }
    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]]);
    }

    const onCategoryChange = (e) => {
        const category = categories.find(category => category.value === e.target.value)
        setCategoryId(e.target.value);
        setType(category.type);
    }

    const submitPageForm = (e) => {
        //e.target.preventDefault();
        const form = new FormData();
        if (title === "" ||
            desc === "" ||
            categoryId === "" ||
            banners.length === 0 ||
            products.length === 0
        ) {
            alert('All fields are neccessary');
            return;
        }
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        })
        products.forEach((product, index) => {
            form.append('products', product);
        })
        dispatch(createPage(form));
        setCreateModal(false);
        setBanners([]);
        setProducts([]);
        setTitle('');
        setDesc('');
        setCategoryId('');
    }

    const renderCreatePageModal = () => {
        return (
            <Modal show={createModal} onHide={() => setCreateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder={'Page Title'}
                                />
                            </Col>
                            <Col>
                                <select
                                    value={categoryId}
                                    onChange={onCategoryChange}
                                >
                                    <option key="" value="">Select Category</option>
                                    {
                                        categories.map(cat =>
                                            <option key={cat.value} value={cat.value}>{cat.name}</option>
                                        )
                                    }
                                </select>
                                {/* <Input
                                    type='select'
                                    value={categoryId}
                                    onChange={onCategoryChange}
                                    options={categories}
                                /> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    placeholder={'Page desc'}
                                />
                            </Col>
                        </Row>
                        {
                            banners.length > 0 ?
                                banners.map((banner, index) => {
                                    <div key={index}>{banner.name}</div>
                                }) : null
                        }
                        {
                            products.length > 0 ?

                                products.map((product, index) => {
                                    <div key={index}>{product.name}</div>
                                }) : null
                        }
                        <Row>
                            <Col>
                                Choose Banner Images
                                <input
                                    type='file'
                                    name='banners'
                                    onChange={handleBannerImages}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Choose Product Images
                                <input
                                    type="file"
                                    name="products"
                                    onChange={handleProductImages}
                                />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={submitPageForm}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <div>
            <Layout sidebar />
            <div style={{ marginLeft: '260px' }}>
                {
                    page.loading ?
                        <p>
                            Creating page ...
                        </p>
                        :
                        <>
                            {renderCreatePageModal()}
                            < button onClick={() => setCreateModal(true)}>Create Page</button>
                        </>
                }
            </div>
        </div >
    )

}