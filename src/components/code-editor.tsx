import MonacoEditor from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { useRef } from "react";
import "./code-editor.css";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: String): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onChangeHandler = (monacoEditor: any, event: any) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(editorRef.current.getValue());
    });
    // onChange(value);
  };

  const onClickHandler = () => {
    const unformatted = editorRef.current.getValue();

    const formatted = prettier.format(unformatted, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });

    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onClickHandler}
      >
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        language="javascript"
        theme="vs-dark"
        height="500px"
        onMount={onChangeHandler}
        // onChange={onChangeHandler}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      ></MonacoEditor>
    </div>
  );
};

export default CodeEditor;
