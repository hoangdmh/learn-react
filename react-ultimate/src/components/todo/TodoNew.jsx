import { useState } from 'react';


const TodoNew = (props) => {
  const [valueInput, setValueInput] = useState("");

  const { addNewTodo } = props;

  const handleClick = () => {
    console.log('handleClick');
    addNewTodo(valueInput);
    setValueInput("");
  }

  const handleOnChange = (value) => {
    console.log('valueChanged', value);
    setValueInput(value);
  }

  return (
    <div className="todo-new">
      <input type="text" onChange={(event) => handleOnChange(event.target.value)} value={valueInput} />
      <button onClick={handleClick}>Add</button>
      My input: {valueInput}
    </div>
  );
};

export default TodoNew;
