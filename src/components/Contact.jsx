import useReveal from "../hooks/useReveal";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const ref = useReveal();
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    emailjs
      .send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus("success");
        setForm({ name: "", surname: "", email: "", message: "" });
        console.log("Mail inviata!");
        setTimeout(() => setStatus(null), 4000);
      })
      .catch((error) => {
        setStatus("error");
        console.error("Errore durante l'invio del messaggio:", error);
        setTimeout(() => setStatus(null), 4000);
      });
  }

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <section id="contact" ref={ref} className="section contact">
      <h2> Contact</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nome" required />
        <input type="text" name="surname" value={form.surname} onChange={handleChange} placeholder="Cognome" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Scrivi qui un messaggio..." required></textarea>
        <button type="submit">Invia</button>
      </form>
      {status && <p className={status === "success" ? "form-success" : "form-error"}>{status === "success" ? "Messaggio inviato con successo!" : "Errore durante l'invio. Riprova."}</p>}
    </section>
  );
}
