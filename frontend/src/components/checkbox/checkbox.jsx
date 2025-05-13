import './checkbox.css'

export default function CheckBox({text='', name="", confid=false, className="", checked=false, onChange=(()=>{})}){
    return(
        <div className='check-box-box'>
            {confid ? <input type="checkbox" className={`check-box ${className}`} id={name} name={name} defaultChecked={checked} onChange={onChange} required/>
            : <input type="checkbox" className={`check-box ${className}`} id={name} name={name} defaultChecked={checked} onChange={onChange} />}

            {confid ? <label className='check-box-label' htmlFor={name}>я соглашаюсь с <br/> <a href="/privacy">конфиденциальностью</a></label> 
            : <label className='check-box-label' htmlFor={name}>{text}</label>}
        </div>
    )
}