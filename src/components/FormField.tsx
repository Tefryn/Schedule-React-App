interface FormFieldProps {
    name: string;
    label: string;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}
const FormField = (({name, label, value, onChange}: FormFieldProps) => (
    <label className="block">
      <p className="text-lg font-bold">{label}</p>
      <input type="text" id={name} name={name} value={value} onChange={(evt) => onChange(evt.target.value)}
        className={`w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-80`}
      />
    </label>
))

export default FormField