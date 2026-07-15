import useReveal from "../hooks/useReveal";
import { useState } from "react";

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({
    name: "",
    surname: "",
    message: "",
  });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <section id="contact" ref={ref} className="section contact">
      <h2> Contact</h2>
      <form>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nome" required />
        <input type="text" name="surname" value={form.surname} onChange={handleChange} placeholder="Cognome" required />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Scrivi qui un messaggio..." required></textarea>
        <button type="submit">Invia</button>
      </form>
    </section>
  );
}
