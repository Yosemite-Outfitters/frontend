import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const StylePicker = (props) => {

  const styles = props.styles;
  const currentStyle = props.currentStyle;
  const changeStyle = props.changeStyle;

  const renderStyles = () => {
    return styles.map((style) => {
      const index = styles.indexOf(style);
      if (index === currentStyle) {

        return <div key={index} className="selected-style"><FontAwesomeIcon className="checked" icon={faCheck} /> <img onClick={changeStyle} data-index={index} className="style-thumbnail selected-style" src={ style.photos[0].thumbnail_url }></img></div>

      } else {

        return <div><img key={index} onClick={changeStyle} data-index={index} className="style-thumbnail" src={ style.photos[0].thumbnail_url }></img></div>

      }
    })
  }

  return(
    <div id="style-picker">
      { props.styles[0].photos[0].url && renderStyles() }
    </div>
  )
}

export default StylePicker;
