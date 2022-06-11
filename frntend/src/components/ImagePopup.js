import React, { useEffect } from 'react'

function ImagePopup({card, onClose, isOpen}) {

  React.useEffect(() => {

    function hadleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose()
      }
    }

    function handleClickOver(evt) {
      if (Array.from(evt.target.classList).includes('popup_opened')) onClose()
    }

    if (isOpen){
      document.addEventListener('keydown', hadleEscClose)
      document.addEventListener('click', handleClickOver)
    }

    return () => {
      document.removeEventListener('keydown', hadleEscClose)
      document.removeEventListener('click', handleClickOver)
    }
  }, [isOpen])

    return (
      <div className={`popup popup_type_image ${card.name ? 'popup_opened' : ''}`}>
        <div className="popup__wrap">
          <img src={card.link} alt={card.alt} className="popup__image" />
          <p className="popup__title-image">{card.name}</p>
          <button type="button" className="popup__button-close" onClick={onClose} />
        </div>
      </div>
    )
  }
  
  export default ImagePopup