import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import BorrowerDetail from './pages/BorrowerDetail';

function App() {
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  return (
    <>
      {selectedBorrower ? (
        <BorrowerDetail
          borrower={selectedBorrower}
          onBack={() => setSelectedBorrower(null)}
        />
      ) : (
        <Dashboard onSelectBorrower={setSelectedBorrower} />
      )}
    </>
  );
}

export default App;
