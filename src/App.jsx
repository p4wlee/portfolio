import StarField from "./components/StarField";
import useActiveSection from "./hooks/useActiveSection";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
function App() {
  const activeSectionId = useActiveSection();
  return (
    <>
      <StarField />
      <Navbar activeSectionId={activeSectionId} />
      <main className="content">
        <Hero />
        <About />
      </main>
    </>
  );
}

export default App;
