function App() {
  return (
    <div className="app-general">
      <div className="logo">
        <h1>Toodlidoo</h1>
      </div>
      <div className="title">
        <h4>Your Tasks</h4>
      </div>

      <div className="todos">
        <div className="todo">
          <div className="checkbox"></div>
          <div className="text">Dummy todo</div>
          <div className="delete-todo">x</div>
        </div>
        <div className="todo completed">
          <div className="checkbox"></div>
          <div className="text">Dummy todo 2</div>
          <div className="delete-todo">x</div>
        </div>
      </div>

    </div>
  );
}

export default App;
