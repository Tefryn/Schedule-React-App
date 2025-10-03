import { useTitle } from "../state/TitleContext";

const Banner = () => {
  const {title} = useTitle();
  return (
  <h1>
    { title }
  </h1>
  );
};

export default Banner;