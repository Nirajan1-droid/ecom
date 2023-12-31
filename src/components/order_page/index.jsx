
import React, { useContext } from 'react'
import { useEffect } from 'react';
import Navbar from '../common/navbar';
import Footer from '../common/footer';
import Earbud from "../../img/earbud/buy_earbud.png"
import { useLocation } from 'react-router-dom'
import "./style.css"
import "./mobile.css"
import axios from 'axios';
import { Context } from '../context/Context';
export default function OrderPage(props) 
{
	const {user} = useContext(Context);
	
	 
	const location = useLocation();
	let from, amount;
	if(location.state)
	{
		from = location.state.from;
		amount = location.state.amount;
		console.log(from, amount);
	}
let original = 2999;
	let actualPrice = 2799;
	let price 
	if(!props.amount){
		
		price = 1 * actualPrice;
	}
	else{
		price = props.amount * actualPrice;
	}
	let deliveryCharge = 110;
	let total = price + deliveryCharge;
	useEffect(()=>
	{
		props.updateOrder(amount);
	}, []);
	useEffect(( )=>
	{	 
		let orderBtn = document.querySelector(".place__order--btn");
		let addressInput = document.querySelector(".new__address--input");
		//#############################################
		let emailInput = document.querySelector(".new__email--input");

		let phoneInput = document.querySelector(".new__phone--input");
		
		async function submitOrder(e)
		{
			if(addressInput.value && phoneInput.value && emailInput.value)
			{
				await axios.post("/api/v1/placeorder",{
					Delivery:addressInput.value,
					Phone:phoneInput.value,
					numberofearbud:props.amount,
					total:total,
					userEmail:emailInput.value,
						  }).then((res)=>{
							  
  							alert("Order has been sucessfully placed");
							 
							}).catch((err)=>{
								if(err.statusCode === 400){

									alert("Order Limit reached, Please call our customer care for more information")
								}

								
								
							});
							// ********** Order can be done Now **********
			}
						else
						{
							// ********** Order can't be done **********
							alert("Provide Necessary Information")
							console.log("Order Failed!");
						}
					};
				 
		orderBtn.addEventListener("click", submitOrder);

		return(()=>
		{
			orderBtn.removeEventListener("click", submitOrder);
		});
	}, [props.amount]);
	function increment() {
		if (props.amount < 10) {
			props.updateQty(true);
		}
	}
	function decrement() {
		if (props.amount > 1) {
			props.updateQty(false);
		}
	}
	
	return (
		<div id='order__id' className="order__page--container flex__col">
			
			<Navbar/>
			<div className="order__page--box flex__row">
				<div className="order__page--info flex__col flex__center">
					<div className="add__address--title flex__row flex__center medium__paragraph--text">Add Delivery Address and Contact</div>
					<div className="new__address flex__row flex__center">
						<input type="text" className="new__address--input" placeholder='Delivery Address *' required/>
						<input type="number" className="new__phone--input" placeholder='Phone Number *' required/>
						<input type="text" className="new__email--input" placeholder='Email Address *' required/>
						{/* ############################################################### */}
					</div>
					<div className="order__page--product flex__row">
						<img src={Earbud} alt="Earbud Front View" className="order__page--image" />
						<div className="order__page--product--name medium__paragraph--text">Unicorn Earbud</div>
						<div className="buy__page--quantity flex__row">
							<div className="quantity__title medium__paragraph--text">Qty:</div>
							<div class="qty__wrapper">
								<span class="minus" onClick={decrement}>
									-
								</span>
								<span class="num">{props.amount? props.amount : 1}</span>
								<span class="plus" onClick={increment}>
									+
								</span>
							</div>
					
				</div>

        <div class="order__page--price medium__paragraph--text">
      
Rs. 2999       


</div>


								
				
				</div>
				</div>
				<div className="order__page--invoice flex__col">
					<div className="order__summary medium__paragraph--text flex__row flex__center">Order Summary</div>
					<div className="order__calculation">
						<div className="order__price flex__row">
<div className="order__calculation--key nav__heading--text">Actual Product Price</div>

                                                        <div className="order__calculation--value nav__heading--text">{`Rs. ${original}`}</div>

                                                </div>
<br/><br/> 
<div className="order__price flex__row">						

<div className="order__calculation--key nav__heading--text">OFFER PRICE</div>
                                                        
							<div className="order__calculation--value nav__heading--text">{`Rs. ${price}`}</div>
						</div>
						<div className="order__delivery--charge flex__row">
							<div className="order__calculation--key nav__heading--text">Min. Delivery Fee</div>
							<div className="order__calculation--value nav__heading--text">{`Rs. ${deliveryCharge}`}</div>
						</div>
						<div className="order__total flex__row">
							<div className="order__calculation--key nav__heading--text">Total Amount</div>
							<div className="order__calculation--value nav__heading--text">{`Rs. ${total}`}</div>
						</div>
					</div>
					<button className="place__order--btn">Place Order</button>
				</div>
			</div>
			<Footer/>
		</div>
	);
}
