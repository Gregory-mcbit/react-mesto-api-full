import React, { useEffect } from 'react'

function PopupWithForm({name, title, children, isOpen, onClose, handleSubmit, submitButton}) {

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
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
          <div className="popup__container">
            <h4 className="popup__title">{title}</h4>
            <form className="popup__form" name={name} onSubmit={handleSubmit}>
              {children}
              <button type="submit" className="popup__button-save" value={submitButton} name="submit">{submitButton}</button>
            </form>
            <button type="button" className="popup__button-close" onClick={onClose} />
          </div>
        </div>
    )
  }
  
  export default PopupWithForm