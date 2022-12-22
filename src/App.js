import "./App.css";
import AddressList from "./components/AddressList";
import AddressMap from "./components/AddressMap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <AddressList></AddressList>
      <AddressMap></AddressMap>
    </div>
  );
}

export default App;
