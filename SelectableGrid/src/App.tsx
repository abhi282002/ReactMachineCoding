import SelectableGrid from "./components/SelectableGrid";

function App() {
  return (
    <div
      style={{
        width: "100vh",
        height: "100vh",
        border: "1px solid gray",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <h1 style={{ margin: "20px" }}>Selectable Grid</h1>
      <SelectableGrid rows={10} columns={10} />
    </div>
  );
}

export default App;
