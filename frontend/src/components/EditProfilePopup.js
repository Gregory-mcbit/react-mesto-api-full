import React from 'react'
import PopupWithForm from './PopupWithForm'
import {currentUserContext} from '../contexts/userContext'

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('')
  const [description, setDescription ] = React.useState('')

  const currentUser = React.useContext(currentUserContext)

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault()
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    })
  } 

  return (
    <PopupWithForm 
        name="edit"
        title="Редактировать профиль"
        isOpen={isOpen}
        onClose={onClose}
        submitButton={'Сохранить'}
        handleSubmit={handleSubmit}>
          <input minLength="2" maxLength="40" type="text" className="popup__input popup__input_name_name" name="name" 
          id="name-input" placeholder="Имя" onChange={(evt) => setName(evt.target.value)} required value={name || ""} />
          <span className='popup__input-error popup__input-error_active' id='name-input-error' />
          <input minLength="2" maxLength="200" type="text" className="popup__input popup__input_name_profession" name="profession" 
          placeholder="Вид деятельности" id="profession-input" onChange={(evt) => setDescription(evt.target.value)} required value={description || ""} />
          <span className='popup__input-error popup__input-error_active' id='profession-input-error' />
        </PopupWithForm>
  )
}

export default EditProfilePopup