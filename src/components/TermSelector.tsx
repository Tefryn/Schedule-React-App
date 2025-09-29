import type RadioControlProps from "../types/RadioControlProps";
import RadioControl from "./RadioControl";

const TermSelector = (props: RadioControlProps) => (
  <div className="text-center">
    <h1>Terms</h1>
    <RadioControl {...props}/>
  </div>
);

export default TermSelector;