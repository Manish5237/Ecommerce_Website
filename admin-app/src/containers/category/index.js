import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategory, updateCategories, deleteCategories as deleteCategoriesAction } from '../../actions'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowDown, IoIosArrowForward, IoIosAdd, IoIosTrash } from 'react-icons/io'
import { MdOutlineEdit } from 'react-icons/md'
import UpdateCategoriesModal from './components/UpdateCategoriesModal'
import AddCategoryModal from './components/AddCategoryModal'
import DeleteCategoryModal from './components/DeleteCategoryModal'
import './style.css'

/**
* @author
* @function Category
**/

export const Category = (props) => {

    const category = useSelector(state => state.category);

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    const handleClose = () => {

        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);

        if(categoryName === "" ){
            alert("Name is Neccessary")
            return;   
        }

        dispatch(addCategory(form));

        // const cat = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // };

        setShow(false);
        setCategoryImage('');
        setCategoryName('');
        setParentCategoryId('');
    }
    
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {

        let myCategories = [];
        for (let category of categories) {
            myCategories.push({
                label: category.name,
                value: category._id,
                children: category.childern.length > 0 && renderCategories(category.childern)
            }
            );
        }

        return myCategories;

    }
    const createCategoryList = (categories, options = []) => {

        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type
            });
            if (category.childern.length > 0) {
                createCategoryList(category.childern, options);
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories)
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value)
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value)
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log(checkedArray);
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCategoriesForm = () => {

        const form = new FormData();
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        dispatch(updateCategories(form))
        setUpdateCategoryModal(false);
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory());
                    }
                })
        }
        setDeleteCategoryModal(false);
    }

    return (
        <div>
            <Layout sidebar />
            <div style={{ marginLeft: '260px' }}>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Category</h3>
                                <div className="actionBtnContainer">
                                    <span className='Bold'>Actions : </span>
                                    <button onClick={handleShow}><IoIosAdd /> <span>Add</span></button>
                                    <button onClick={deleteCategory}><IoIosTrash /> <span>Delete</span></button>
                                    <button onClick={updateCategory}><MdOutlineEdit /> <span>Edit</span></button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <CheckboxTree
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <IoIosCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckboxOutline />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />,
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
                <UpdateCategoriesModal
                    show={updateCategoryModal}
                    handleClose={updateCategoriesForm}
                    hide={setUpdateCategoryModal}
                    checkedArray={checkedArray}
                    handleCategoryInput={handleCategoryInput}
                    categoryList={createCategoryList(category.categories)}
                />
                <AddCategoryModal
                    show={show}
                    handleClose={handleClose}
                    hide={setShow}
                    handleCategoryImage={handleCategoryImage}
                    categoryName={categoryName}
                    setCategoryName={setCategoryName}
                    parentCategoryId={parentCategoryId}
                    setParentCategoryId={setParentCategoryId}
                    categoryList={createCategoryList(category.categories)}
                />
                <DeleteCategoryModal
                    show={deleteCategoryModal}
                    handleClose={deleteCategories}
                    hide={setDeleteCategoryModal}
                    checkedArray={checkedArray}
                />
            </div>
        </div>
    )

}