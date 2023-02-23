import "bulmaswatch/superhero/bulmaswatch.min.css";
import CodeCell from "./components/code-cell";
import ReactDOM from "react-dom";
import Split from "react-split";

const App = () => {
  return (
    <Split direction="vertical">
      <CodeCell></CodeCell>
      <CodeCell></CodeCell>
    </Split>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
