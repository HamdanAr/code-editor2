import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import Split from "react-split";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onChangeHandler = (value: any) => {
    setInput(value);
  };

  const onClickHandler = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Split>
      <div>
        <CodeEditor onChange={onChangeHandler} initialValue="const a = 1;" />
        <textarea value={input} onChange={(e) => setInput(e.target.value)} />
        <div>
          <button onClick={onClickHandler}>Submit</button>
        </div>
        <Preview code={code}></Preview>
      </div>
    </Split>
  );
};

export default CodeCell;

{
  /* <div>
<CodeEditor onChange={onChangeHandler} initialValue="const a = 1;" />
<textarea value={input} onChange={(e) => setInput(e.target.value)} />
<div>
  <button onClick={onClickHandler}>Submit</button>
</div>
<Preview code={code}></Preview>
</div> */
}
