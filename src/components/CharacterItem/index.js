import React from "react";
import PropTypes from "prop-types";
import StarComponent from "../Star/Star";
import { CharacterItemDiv } from "./CharacterItem.style";
import CartIcon from "../../assets/images/cart.png";
import AddCharacterIcon from "../../assets/images/add-square.png";
import DeleteCharacterIcon from "../../assets/images/delete.png";

const CharacterItem = ({ character }) => {
	const { avatar, name, uid, warpaintColor, warpaint, hairColor, star } =
		character;
	return (
		<CharacterItemDiv>
			<div className="slider-info">
				<div className="slider-info__action">
					<ul>
						<li>
							<a>
								<img src={CartIcon} width="30" />
							</a>
						</li>
						<li>
							<a>
								<img src={AddCharacterIcon} width="30" />
							</a>
						</li>
						<li>
							<a>
								<img src={DeleteCharacterIcon} width="30" />
							</a>
						</li>
					</ul>
				</div>
				<div className="slider-info__character">
					<img src={avatar} alt="charterAvatar" />
				</div>
				<div className="slider-info__details">
					<div>
						<span>UID :</span>
						<span>{uid}</span>
					</div>
					<div>
						<span>Name :</span>
						<span>{name}</span>
					</div>
					<div>
						<span>Rating :</span>
						<StarComponent numberOfStars={star} />
					</div>
					<div>
						<span>Warpaint Color :</span>
						<span>{warpaintColor}</span>
					</div>
					<div>
						<span>Warpaint :</span>
						<span>{warpaint}</span>
					</div>
					<div>
						<span>Hair Color :</span>
						<span>{hairColor}</span>
					</div>
				</div>
			</div>
		</CharacterItemDiv>
	);
};

const propTypes = {
	character: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		uid: PropTypes.string.isRequired,
		warpaintColor: PropTypes.string.isRequired,
		warpaint: PropTypes.string.isRequired,
		hairColor: PropTypes.string.isRequired,
		avatar: PropTypes.string.isRequired,
		start: PropTypes.string,
	}),
};

const defaultProps = {
	character: {
		star: "0",
	},
};

CharacterItem.propTypes = propTypes;
CharacterItem.defaultProps = defaultProps;

export default CharacterItem;
