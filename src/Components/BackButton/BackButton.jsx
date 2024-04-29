import { useNavigate } from "react-router-dom";
import Buttons from "../Button/Buttons";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Buttons
      type={"back"}
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Buttons>
  );
}
