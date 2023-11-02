

import './paymentpage.scss'
import {Context} from '../UseContext/ThemeContext'
import { useContext, useEffect, useState } from 'react';
import Notification from '../Notification';
import { useParams } from 'react-router-dom';

function PaymentPage({products}) {

    const [isload,setIsLoad,user] = useContext(Context);
    const [nof, setNof] = useState({status : 'none', message : 'none'})
    let {id, color, size,  price, quantity} = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        products.forEach(p => {
            if (p.id == id) {
                setProduct(p)
            }
        })
        if (user != null) {
            document.querySelector('#payment-page .txt-name').value = user.name
            document.querySelector('#payment-page .txt-phone').value = user.phonenumber
            document.querySelector('#payment-page .txt-email').value = user.email
            document.querySelector('#payment-page .txt-address').value = user.address
        }
    }, [products])


    return (
        <div id='payment-page' className='col-lg-12'>
            {console.log(product, user)}
            <Notification status={nof.status} message={nof.message}/>
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
                            <td><input type="radio" id="pay-cash" name="payment" value="pay-cash"/><label htmlFor="pay-cash">Cash</label></td>
                            <td><input type="radio" id="pay-bank" name="payment" value="pay-bank"/><label htmlFor="pay-bank">Bank Transfer</label></td>
                            <td><input type="radio" id="pay-credit" name="payment" value="pay-credit"/><label htmlFor="pay-credit">Credit and Debit Cards</label></td>
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
                    <button type="button" className="btn btn-success">Order Now !!!</button>
                    <p style={{textAlign : 'start', lineHeight : '25px', margin : '10px 0'}}>Your personal information will be used to process orders, enhance your website experience, and for other specific purposes described in our privacy policy.</p>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;