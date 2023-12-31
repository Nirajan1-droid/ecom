import React from 'react'
import "./style.css"
import "./mobile.css"
import Earbud from "../../../img/earbud/hero_bud.png"
import { HashLink as Link } from "react-router-hash-link";


export default function Hero()
{
	return (
		<div className="hero__container flex__row">
			<div className="hero__content flex__col flex__center">
				<div className="hero__heading heading__title--text">Wireless Unicorn Earbuds</div>
				<div className="hero__subheading subheading__title--text">Stay Ahead. Stay Unstoppable.</div>
				<div className="hero__details mini__heading--text">
Experience the unparalleled quality, trust, and innovation of our proudly Nepalese Wireless Unicorn Earbuds. Immerse yourself in a mesmerizing soundscape, enveloped in crystal-clear audio, while enjoying seamless connectivity and durability tailored for your dynamic lifestyle.
</div>
				<Link
					to={`/buy_page#buy__id`}
					className="linker nav__item--g"
				>
					<div className="hero__buy--btn paragraph--text">Buy</div>
				</Link>
			</div>
			<div className="hero__image--container">
				<img src={Earbud} alt="unicorn earbud with brand" className="hero__image" />
			</div>
		</div>
	);
}
