import StarField from "./components/StarField";
import useActiveSection from "./hooks/useActiveSection";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
function App() {
  const activeSectionId = useActiveSection();
  return (
    <>
      <StarField />
      <Navbar activeSectionId={activeSectionId} />
      <main className="content">
        <Hero />
      </main>
    </>
  );
}

export default App;
