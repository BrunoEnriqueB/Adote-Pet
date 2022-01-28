import './Select.css';

export function Select({text, name, options, handleOnChange, value}) {
  return (
    <div className="form_control">
      <label htmlFor="">{text}</label>
      <select
      name={name} 
      id={name}
      onChange={handleOnChange}
      value={value || ''}
      >
        <option>Selecione uma Opção</option>
        {options.map(option => (
          <option value={option} key={option}>{option}</option>
        )
        )}
      </select>
    </div>
  )
}