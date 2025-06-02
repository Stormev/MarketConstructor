import './input.css'

// Второстепенный компонент ==============================================
export default function InputFieldSmall({text='', type="text", placeholder='', name='', value="", onChange="", min="", max="", }) {
    return(
        <div className='inputSmall-body'>
            <label className='inputSmall-title'>{text}</label>
            <input className='inputSmall-field' type={type} placeholder={placeholder} minLength={min} maxLength={max} name={name} defaultValue={value} onChange={onChange}/>
        </div>
    )
}