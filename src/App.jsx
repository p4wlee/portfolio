import StarField from "./components/StarField";
import useActiveSection from "./hooks/useActiveSection";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
function App() {
  const activeSectionId = useActiveSection();
  return (
    <>
      <StarField />
      <Navbar activeSectionId={activeSectionId} />
      <main className="content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;
