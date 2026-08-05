import { ArrowUpRight } from "lucide-react";

const amazon = (query: string) => `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;

const books = [
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    topic: "Human evolution",
    note: "How one unremarkable ape came to run the planet through shared fictions: money, nations, and rights. It reframes what we call natural.",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    topic: "Cognition",
    note: "A map of fast intuition, slow deliberation, and the biases that quietly shape ordinary decisions.",
  },
  {
    title: "Thinking in Systems",
    author: "Donella Meadows",
    topic: "Systems theory",
    note: "The clearest primer I know on stocks, flows, feedback loops, and the leverage points that change a system.",
  },
  {
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    topic: "Evolution",
    note: "A gene-centred view of life that changes the scale at which cooperation, competition, and survival make sense.",
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    topic: "Judgment",
    note: "Specific knowledge, leverage, long games, and a compact set of ideas about building wealth without losing a life to it.",
  },
  {
    title: "Behave",
    author: "Robert Sapolsky",
    topic: "Neurobiology",
    note: "A single behaviour traced backward through seconds, years, and evolutionary time. The fullest tour of why humans do what they do.",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    topic: "Stoic philosophy",
    note: "Private notes on duty, mortality, and staying steady. Two thousand years later, the advice still survives a hard Monday.",
  },
  {
    title: "The Yoga Sutras of Patanjali",
    author: "Patanjali",
    topic: "Yoga philosophy",
    note: "Yoga as a disciplined study of the mind, and the source I return to while writing my sutra essays.",
  },
];

export default function BookshelfClient() {
  return (
    <div>
      <header className="site-shell section-space">
        <p className="path-label"><span>~/library</span>/index</p>
        <h1 className="page-title mt-5">Ideas worth returning to.</h1>
        <p className="lead mt-8">
          Books on evolution, cognition, systems, philosophy, and practice, with the note I kept from each one.
        </p>
      </header>

      <main className="border-y border-[var(--line)] bg-[var(--ink-soft)]">
        <ol className="site-shell editorial-list section-space border-t-0">
          {books.map((book, index) => (
            <li key={book.title} className="editorial-row">
              <span className="editorial-index">{String(index + 1).padStart(2, "0")}</span>
              <article>
                <div className="meta-line"><span>{book.topic}</span></div>
                <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.4rem)] leading-none">{book.title}</h2>
                <p className="mt-2 text-sm text-[var(--orange)]">{book.author}</p>
                <p className="mt-5 max-w-3xl text-[var(--paper-dim)]">{book.note}</p>
              </article>
              <a
                href={amazon(`${book.title} ${book.author}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-link md:mt-0"
              >
                Find the book <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
