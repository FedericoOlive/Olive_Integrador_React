import {useState, useRef, useEffect} from "react";
import "./Dropdown.css";

export default function Dropdown({label = "Seleccionar", options = [], onSelect})
{
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const ref = useRef(null);
    
    useEffect(() =>
              {
                  const handleClickOutside = (event) =>
                  {
                      if (ref.current && !ref.current.contains(event.target))
                          setOpen(false);
                  };

                  document.addEventListener("mousedown", handleClickOutside);

                  return () => document.removeEventListener("mousedown", handleClickOutside);
              }, []);


    const handleSelect = (option) =>
    {
        setSelected(option);
        setOpen(false);
        if (onSelect != null)
            onSelect(option);
    };
    
    return (
        <div className = "dropdown" ref = {ref}>
            <button
                className = {`dropdown-toggle ${open ? "open" : ""}`}
                onClick = {() => setOpen(!open)}
            >
                {selected ? selected.label : label}
                <span className = "arrow">{open ? "▲" : "▼"}</span>
            </button>

            {open && (
                <ul className = "dropdown-menu">
                    {options.map((opt) => (
                        <li
                            key = {opt.value}
                            className = {`dropdown-item ${
                                selected?.value === opt.value ? "selected" : ""
                            }`}
                            onClick = {() =>
                            {
                                //console.log("Dropdown Seleccionado ", opt)
                                handleSelect(opt)
                            }}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}