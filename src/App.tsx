import { useEffect, useState } from "react";
import "./App.css";

enum status {
  hidden,
  correct,
  wrong,
}

function App() {
  const [color, setColor] = useState("");
  const [options, setOptions] = useState([""]);
  const [feedback, setFeedback] = useState(status.hidden);

  const randonHexadecimal = () => {
    const hexadecimal = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return "#" + hexadecimal;
  };

  useEffect(() => {
    setColor(randonHexadecimal());
  }, []);

  useEffect(() => {
    const options = [color, randonHexadecimal(), randonHexadecimal()];
    setOptions(shuffle(options));
  }, [color]);

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = e.target as HTMLElement;
    if (element.innerText === color.toUpperCase()) {
      setFeedback(status.correct);
    } else {
      setFeedback(status.wrong);
    }
  };

  const renderSwitch = (status: status) => {
    switch (status) {
      case 0:
        return <h2 className="hidden">HIDDEN</h2>;
      case 1:
        return <h2 className="correctAnswer">CORRETO</h2>;
      case 2:
        return <h2 className="wrongAnswer">ERRADO</h2>;
    }
  };

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setColor(randonHexadecimal());
    setFeedback(status.hidden);
  };

  return (
    <div className="main">
      <button className="reloadButton" onClick={handleResetClick}>
        Reiniciar
      </button>
      <div className="colorDisplay" style={{ backgroundColor: `${color}` }} />
      <div className="optionsContainer">
        {options &&
          options.map((option, index) => {
            return (
              <button key={index} onClick={handleClick}>
                {option.toUpperCase()}
              </button>
            );
          })}
      </div>
      <div className="resultContainer">{renderSwitch(feedback)}</div>
    </div>
  );
}

export default App;
