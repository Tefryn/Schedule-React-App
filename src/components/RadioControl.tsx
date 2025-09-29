import type RadioControlProps from "../types/RadioControlProps";

const RadioControl = ({ name, options, selected, setSelected }: RadioControlProps) => (
  <div className="flex justify-center gap-1">
    { options.map(option  => (
        <div key={option}>
          <input type="radio" name={name} id={option} value={option}
                 checked={option === selected}
                 onChange={() => setSelected(option)}
          />
          <label className="ml-1 mr-1" htmlFor={option}>
            {option}
          </label>
        </div>
      ))
    }
  </div>
);

export default RadioControl;