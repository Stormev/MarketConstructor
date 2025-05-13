import './input.css'

export default function InputField({text, type="text", placeholder='', name='', onChange=(()=>{}), autocomplete=""}) {
    return(
        <div>
            {text && <p className='input-title'>{text}</p>}
            <input className='input-field' type={type} placeholder={placeholder} name={name} onChange={onChange} autoComplete={autocomplete}/>
        </div>
    )
}