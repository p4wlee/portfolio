import useReveal from "../hooks/useReveal";

export default function About() {
  const ref = useReveal();
  return (
    <section id="about" ref={ref} className="section about reveal-slide-left">
      <div className="about-card">
        <h2> About me </h2>
        <p>
          Mi chiamo Davide Paulicelli e sto costruendo il mio percorso come Junior Back-End Developer. Ho scelto il back-end perché è la parte che mi appassiona di più. È il cuore pulsante di
          un'applicazione, quello che l'utente non vede ma che fa funzionare tutto. Mi piace ragionare sulla logica dietro a un progetto, su come sono organizzati i dati, su come si progettano le API
          e i database, e tengo molto a scrivere codice ordinato e mantenibile.
        </p>
        <p>
          Sono arrivato a questa scelta con consapevolezza. Mi sono formato come sviluppatore mentre continuavo a lavorare a tempo pieno nel retail, e questi anni si sono rivelati una palestra
          importante. Ho imparato a organizzare il lavoro, a gestire processi e persone, a prendermi le mie responsabilità. Sono competenze che oggi mi porto dietro anche nello sviluppo. Non è stato
          il percorso più semplice, ma per me era quello giusto.
        </p>
        <p>Quello che posso dare a un team è affidabilità, precisione e voglia di adattarmi. Voglio contribuire fin da subito con codice pulito e crescere insieme alle persone con cui lavoro.</p>
      </div>
    </section>
  );
}
