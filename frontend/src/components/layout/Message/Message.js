import './Message.css';
import { useState, useEffect } from 'react'; // useEffect permite que a gente observe o evento só quando ele é renderizado
import bus from '../../../utils/bus'

export default function Message() {
  const [ visibility, setVisibility ] = useState(false);
  const [ message, setMessage ] = useState('')
  const [ type, setType ] = useState('');

  useEffect(() => {

    bus.addListener('flash', ({message, type}) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisibility(false);
      }, 3000);
    })

  }, []);

  return (
    visibility && (
      <div className={`message ${type}`}>
        <p>{message}</p>
      </div>
    )
    
  )
}