

import './paymentpage.scss'
import { Context } from '../../components/UseContext/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import Notification from '../../components/Notification'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import imageSuccess from './image-removebg-preview.png'

function PaymentPage({products, user1}) {

    const [user, setUser] = useState(null)
    const [isload,setIsLoad] = useContext(Context);
    const [nof, setNof] = useState({status : 'none', message : 'none'})
    let {id, color, size,  price, quantity} = useParams()
    const [product, setProduct] = useState(null)
    const [colorsize, setColorsize] = useState(null)
    const navigate = useNavigate()

    const handleCheckInput = () => {
        let txtname = document.querySelector('#payment-page .txt-name').value
        let txtphone = document.querySelector('#payment-page .txt-phone').value
        let txtemail = document.querySelector('#payment-page .txt-email').value
        let txtaddress = document.querySelector('#payment-page .txt-address').value
        if (txtname == '') {
            setNof({status : 'none', message : ""})
            setTimeout(() => {setNof({status : 'fail', message : 'Please Enter Name'})}, 50);
            return false;
        }
        if (txtphone == '') {
            setNof({status : 'none', message : ""})
            setTimeout(() => {setNof({status : 'fail', message : 'Please Enter Phone'})}, 50);
            return false;
        }
        if (txtemail == '') {
            setNof({status : 'none', message : ""})
            setTimeout(() => {setNof({status : 'fail', message : 'Please Enter Email'})}, 50);
            return false;
        }
        if (txtaddress == '') {
            setNof({status : 'none', message : ""})
            setTimeout(() => {setNof({status : 'fail', message : 'Please Enter Address'})}, 50);
            return false;
        }
        if (!document.querySelector('input[name="payment"]:checked')) {
            setNof({status : 'none', message : ""})
            setTimeout(() => {setNof({status : 'fail', message : 'Please Enter Choose Payment Method'})}, 50);
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (user1 != null) {
            setUser(user1)
            document.querySelector('#payment-page .txt-name').value = user1.name
            document.querySelector('#payment-page .txt-phone').value = user1.phonenumber
            document.querySelector('#payment-page .txt-email').value = user1.email
            document.querySelector('#payment-page .txt-address').value = user1.address
        }
    }, [user1])

    useEffect(() => {
        products.forEach(p => {
            if (p.id == id) {
                setProduct(p)
            }
        })
    }, [products])

    useEffect(() => {
        axios.get(`/colors-sizes/get-color-size-by-color-and-size?color=${color}&size=${size}`, {headers : {'Content-Type': 'application/json'}})
        .then(res => {
            setColorsize(res.data)
        })
    },[products])    

    const handleOrderWithAccount = () => {
        if (!handleCheckInput()) return
        if (colorsize != null) {
            let note = document.querySelector('#payment-page .txt-note').value
            let method = document.querySelector('input[name="payment"]:checked').value
            let quantity1  = quantity
            let colorsize1 = colorsize;
            colorsize1.quantity = colorsize1.quantity - quantity1
            if (user) {
                let user_id = user.id
                axios.post('/payment/order-from-client',{note : note, method : method, user_id : user_id, colorsize : colorsize1, quantity : quantity1},{headers : {'Content-Type': 'application/json'}})
                    .then(res => {
                        if (res.data == true) {
                            handleCongratulations()
                        }
                    })
            } else {
                let txtname = document.querySelector('#payment-page .txt-name').value
                let txtphone = document.querySelector('#payment-page .txt-phone').value
                let txtemail = document.querySelector('#payment-page .txt-email').value
                let txtaddress = document.querySelector('#payment-page .txt-address').value
                axios.post('/payment/order-from-guest',
                    {note : note, method : method, address : txtaddress, name : txtname, email : txtemail, phone : txtphone, colorsize : colorsize1, quantity : quantity1},
                    {headers : {'Content-Type': 'application/json'}})
                    .then(res => {
                        if (res.data == true) {
                            handleCongratulations()
                        }
                    })
            }
        }
    }

    const handleCongratulations = () => {
        const form = document.querySelector('.form-congratulation')
        const opa = document.querySelector('#payment-page .opa')
        setIsLoad(!isload)
        setNof({status : 'none', message : ""})
        setTimeout(() => {setNof({status : 'success', message : 'Order successful, if you have any other comments, please contact 0902491471'})}, 50);
        opa.style.display = 'block'
        form.style.top = '150px'
    }

    const handleCloseForm = () => {
        const form = document.querySelector('.form-congratulation')
        const opa = document.querySelector('#payment-page .opa')
        opa.style.display = 'none'
        form.style.top = '-500px'
    }


    return (
        <div id='payment-page' className='col-lg-12'>
            <Notification status={nof.status} message={nof.message}/>
            <Link to={'/categories/sneakers/vans'}><div className='opa' onClick={() => handleCloseForm()}></div></Link>
            <div className='form-congratulation'>
                <div className='title'>Thank you {document.querySelector('#payment-page .txt-name') ? document.querySelector('#payment-page .txt-name').value : ''} for your successful order !!!</div>
                <img width={'50%'} src={imageSuccess}/>
                <div className='message'>We will call you soon. But if you have any questions, please contact us by phone number 0902491471</div>
                <div><Link to={'/categories/sneakers/vans'}>See more other products</Link></div>
            </div>
            <div className='col-lg-7 bill-info'>
                <h4 className='col-lg-12'>Billing Information</h4>
                <div className='col-lg-12 form-input'>
                    <label>Name *</label>
                    <input type="text" className="form-control txt-name" placeholder='Your Name' />
                </div>
                <div className='col-lg-6 form-input'>
                    <label>Phone Number *</label>
                    <input type="text" className="form-control txt-phone" placeholder='Your Phone Number' />
                </div>
                <div className='col-lg-6 form-input'>
                    <label>Email Address *</label>
                    <input type="text" className="form-control txt-email" placeholder='Your Email Address' />
                </div>
                <div className='col-lg-6 form-input'>
                    <label>Address *</label>
                    <input type="text" className="form-control txt-address" placeholder='Your Address' />
                </div>
                <div className='col-lg-6 form-input'></div>
                <div className='col-lg-6 form-input'>
                    <label>Payment Methods *</label>
                    <table>
                        <tr>
                            <td><input type="radio" id="pay-cash" name="payment" value="Cash"/><label htmlFor="pay-cash">Cash</label></td>
                            <td><input type="radio" id="pay-bank" name="payment" value="Bank Transfer"/><label htmlFor="pay-bank">Bank Transfer</label></td>
                            <td><input type="radio" id="pay-credit" name="payment" value="Credit and Debit Cards"/><label htmlFor="pay-credit">Credit and Debit Cards</label></td>
                        </tr>
                    </table>
                </div>
                <div className='col-lg-12 form-input'>
                    <label>Note</label>
                    <textarea className="form-control txt-note" rows="4"></textarea>
                </div>
            </div>
            <div className='col-lg-5'>
                <div className='col-lg-12 order-info'>
                    <h4 className='col-lg-12'>Your Order</h4>
                    <h6 className='col-lg-6' style={{textAlign : 'start', paddingLeft: "10px"}}>Product</h6>
                    <h6 className='col-lg-6' style={{textAlign : 'end', paddingRight: "10px"}}>Provisional</h6>
                    <div className='col-lg-12 products-area'>
                        <div className='col-lg-12 product-item'>
                            <div className='name col-lg-10'>
                                {product ? <>
                                    <img width={"40px"} src={product.images[0].image} style={{marginRight : '8px'}} /> {product.name.toUpperCase()} -- <b style={{margin : "0 5px"}}>Size {size}</b> -- <b style={{margin : "0 5px"}}>Color</b> <div className='color' style={{backgroundColor : color}}/> <b style={{margin : "0 5px"}}>x {quantity}</b>
                                </> : <></>}
                            </div>
                            <div className='price col-lg-2'>
                                $ {price}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-12 total-area'>
                        <h6 className='col-lg-10' style={{textAlign : 'start', paddingLeft: "10px"}}>Total</h6>
                        <h6 className='col-lg-2' style={{textAlign : 'end', paddingRight: "10px"}}>$ {parseFloat(price * quantity)}</h6>
                    </div>
                    <button onClick={() => handleOrderWithAccount()} type="button" className="btn btn-success">Order Now !!!</button>
                    <p style={{textAlign : 'start', lineHeight : '25px', margin : '10px 0'}}>Your personal information will be used to process orders, enhance your website experience, and for other specific purposes described in our privacy policy.</p>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;