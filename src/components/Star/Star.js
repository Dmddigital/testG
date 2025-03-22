import { React } from "react";
import StarImg from "./../../assets/images/star.png";

const StarComponent = ({ numberOfStars }) => {
	return (
		<span>
			{[...Array(+numberOfStars).keys()].map((n) => (
				<img key={n + 1} src={StarImg} alt="star" />
			))}
		</span>
	);
};
export default StarComponent;
