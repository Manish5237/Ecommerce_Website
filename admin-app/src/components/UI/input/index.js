import React from 'react'
import { Form } from 'react-bootstrap'

/**
* @author
* @function Input
**/

export const Input = (props) => {

    let input = null;
    switch (props.type) {
        // case 'select':
        //     input =
        //         <Form.Group className="mb-3" controlId="formBasicEmail">
        //             {/* <Form.Group className="mb-3"> */}
        //             {props.label && <Form.Label>{props.label}</Form.Label>}
        //             <select
        //                 className='form-control form-control-sm'
        //                 value={props.value}
        //                 onChange={props.onChange}
        //             >
        //                 <option>{props.placeholder}</option>
        //                 {
        //                     props.options.label > 0 ?
        //                         props.options.map((option, index) =>
        //                             <option key={index} value={option.value}>{option.name}</option>
        //                         ) : null
        //                 }
        //             </select>
        //         </Form.Group>
        //     break;
        case 'text':
            break;
        default:
            input =
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    {/* <Form.Group className="mb-3"> */}
                    {props.label && <Form.Label>{props.label}</Form.Label>}
                    <Form.Control
                        type={props.type}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                    />
                    <Form.Text className="text-muted">
                        {props.errorMessage}
                    </Form.Text>
                </Form.Group>
    }

    return input;
}