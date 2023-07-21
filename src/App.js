import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateGroup from './pages/CreateGroup';
import AddMembers from './pages/AddMembers';
import ExpenseMain from './pages/ExpenseMain';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<CreateGroup />} />
          <Route path="/members" element={<AddMembers />} />
          <Route path="/expense" element={<ExpenseMain />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
