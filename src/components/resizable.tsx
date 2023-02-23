import Split from "react-split";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = (direction, children) => {
  return <Split>{children}</Split>;
};

export default Resizable;
