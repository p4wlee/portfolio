import StarField from "./components/StarField";
import useActiveSection from "./hooks/useActiveSection";
import Navbar from "./components/Navbar";
function App() {
  const activeSectionId = useActiveSection();
  return (
    <>
      <StarField />
      <Navbar activeSectionId={activeSectionId} />
    </>
  );
}

export default App;
