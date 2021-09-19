import React from 'react';
import PropTypes from 'prop-types';

// Routing
import {Link} from 'react-router-dom';

// Styles
import { Image} from './Thumb.styles';



const Thumb = ({ image, movieId,clickable}) => {

    const link = "/" + movieId;

    return ( 
      <div>
        {
          clickable ? 
            <Link to={link}>
              <Image src={image} alt='movie-thumb'/>
            </Link>
            :
            (
              <Image src={image} alt='movie-nolink-thumb'/>
            )
        }

     </div>
    )
  };

  Thumb.propTypes = {
    image: PropTypes.string,
    movieId: PropTypes.number,
    clickable: PropTypes.bool

  };

  
export default Thumb;