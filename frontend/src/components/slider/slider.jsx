import './slider.css'

export default function Slider({className="", min="0", max="0", id="", name="", defaultValue="", onChange=""}){
    return(
        <div className='slider-body'>
            <input type="range" className={`slider ${className}`} min={min} max={max} name={name} id={id} defaultValue={defaultValue} onChange={onChange}/>
        </div>
    )
}
