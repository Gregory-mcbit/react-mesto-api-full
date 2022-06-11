import PopupWithForm from './PopupWithForm'
import React from 'react'

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const titleInput = React.useRef()
  const linkInput = React.useRef()

  React.useEffect(() => {
    if (isOpen) {
      titleInput.current.value = ''
      linkInput.current.value = ''
    }
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: titleInput.current.value,
      link: linkInput.current.value
    })
  }

  return (
    <PopupWithForm 
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      submitButton={'Создать'}
      handleSubmit={handleSubmit}>
        <input minLength="1" maxLength="30" type="text" placeholder="Название" className="popup__input popup__input_name_title-card" name="title-card" id="title-input" required ref={titleInput} />
        <span className='popup__input-error' id='title-input-error'>Вы пропустили это поле.</span>
        <input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_name_link-card" name="link-card" id="link-input" required ref={linkInput} />
        <span className='popup__input-error' id='link-input-error'>Вы пропустили это поле.</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup