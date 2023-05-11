import CheckboxSelect from "./components/CheckboxSelect";

function App() {
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "watermelon", label: "Watermelon" },
  ];
  return (
    <div className="App">
      <CheckboxSelect options={options} label={"Filtro"} />
    </div>
  );
}

export default App;
