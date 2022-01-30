
import { useState } from 'react';

import '../Input/Form.css';
import Input from '../Input/Input';
import { Select } from '../Select/Select';
import './PetForm.css';

export default function PetForm({handleSubmit, petData, btnText}) {
  const [ pet, setPet ] = useState(petData || {});
  const [ preview, setPreview ] = useState([])
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

  function handleColor(e) {
    setPet({...pet, [e.target.name]: e.target.options[e.target.selectedIndex].text})
  }

  function handleFileChange(e) {
    setPreview(Array.from(e.target.files));
    setPet({...pet, image: [...e.target.files]});

  }

  function handleChange(e) {
    setPet({...pet, [e.target.name]: e.target.value});
  }

  function submit(e) {
    e.preventDefault();

    handleSubmit(pet);
  }

  return (
    <form className='form-container' onSubmit={submit}>
      <div className='image-container'>
        {preview.length > 0
        ? preview.map((image, index) => (
          <img 
          src={URL.createObjectURL(image)} 
          alt={pet.name} 
          key={`${pet.name} + ${index}`} />
        ))
        : pet.image && 
          pet.image.map((image, index) => (
            <img 
            src={`${process.env.REACT_APP_API}/images/pets/${image}`} 
            alt={pet.name} 
            key={`${pet.name} + ${index}`} />
        ))
        }
      </div>
      <Input
      text="Imagens do Pet"
      type="file"
      name="image"
      handleOnChange={handleFileChange}
      multiple={true}
      />
      <Input
      text="Nome do pet"
      type="text"
      name="name"
      handleOnChange={handleChange}
      placeholder="Digite o nome do pet"
      value={pet.name || ''}
      />
      <Input
      text="Idade do pet"
      type="text"
      name="age"
      handleOnChange={handleChange}
      placeholder="Digite a idade do pet"
      value={pet.age || ''}
      />
      <Input
      text="Peso"
      type="number"
      name="weight"
      handleOnChange={handleChange}
      placeholder="Digite o peso do pet"
      value={pet.weight || ''}
      />
      <Select 
      name="color"
      text="Selecione a cor"
      options={colors}
      handleOnChange={handleColor}
      value={pet.color || ''}
      />
      <input type="submit" value={btnText} />
    </form>
  )
}