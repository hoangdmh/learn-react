const TodoData = (props) => {
  const { todoList, handleDelete } = props;

  return (
    <div className="todo-data">
      {todoList &&
        todoList.length > 0 &&
        todoList.map((item) => (
          <div className="todo-item" key={item.id}>
            <div> {item.name}</div>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default TodoData;
