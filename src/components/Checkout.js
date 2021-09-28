import React from "react";
import"./Checkout.css";
import voucher from './images/voucher.png';

function Checkout() {
    return (
       <div className="checkout">
           <div className="checkout__orders">
                <img className="voucher" src ={voucher} alt="voucher" />
            <div>
                <h2 className="checkout__title"> Your shopping basket</h2>
                {/* BasketItem */}
                {/* BasketItem */}
                {/* BasketItem */}
            </div>
           </div>

           <div className="checkout__total">
                <h2>total Puchase</h2>
           </div>
       </div>
    );
}

export default Checkout;