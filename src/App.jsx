import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import BorrowerDetail from "./pages/BorrowerDetail";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  return (
    <Provider store={store}>
      {selectedBorrower ? (
        <BorrowerDetail
          borrower={selectedBorrower}
          onBack={() => setSelectedBorrower(null)}
        />
      ) : (
        <Dashboard onSelectBorrower={setSelectedBorrower} />
      )}
    </Provider>
  );
}

export default App;
