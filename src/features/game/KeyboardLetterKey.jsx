import { useSelector } from "react-redux";
import Letter from "./Letter";
import { selectLetterStatus } from "./gameSlice";

function KeyboardLetterKey({ keyboardKey }) {
  const status = useSelector((state) => selectLetterStatus(state, keyboardKey));

  return (
    <Letter type="keyboard" $status={status} data-key={keyboardKey}>
      {keyboardKey}
    </Letter>
  );
}

export default KeyboardLetterKey;
