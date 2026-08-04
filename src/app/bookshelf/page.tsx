import type { Metadata } from "next";
import BookshelfClient from "./BookshelfClient";

export const metadata: Metadata = {
  title: "Bookshelf | Saloni Dabgar",
  description:
    "The books that shaped how I think — evolution, systems, cognition, and philosophy. An interactive shelf you can browse, with links to read each one.",
  alternates: { canonical: "https://salonidabgar.com/bookshelf" },
  openGraph: {
    type: "website",
    url: "https://salonidabgar.com/bookshelf",
    siteName: "Saloni Dabgar",
    title: "Bookshelf | Saloni Dabgar",
    description: "The books that shaped how I think — an interactive shelf.",
  },
};

export default function BookshelfPage() {
  return <BookshelfClient />;
}
