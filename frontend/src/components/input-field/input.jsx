import './input.css'
import { useRef, useEffect } from 'react'

// Главный копонент ==============================================
export default function InputField({text, type="text", placeholder='', name='', onChange=(()=>{}), autocomplete="", defaultValue="", value=""}) {
    return(
        <div>
            {text && <p className='input-title'>{text}</p>}

            {value ?
                <input className='input-field' type={type} placeholder={placeholder} name={name} onChange={onChange} autoComplete={autocomplete} value={value}/>
            :
                <input className='input-field' type={type} placeholder={placeholder} name={name} onChange={onChange} autoComplete={autocomplete} defaultValue={defaultValue || ""}/>
            }
            
        </div>
    )
}