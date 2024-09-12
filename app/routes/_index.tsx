import type { MetaFunction } from "@netlify/remix-runtime";
import { LinksFunction } from "@remix-run/node";
import styles from "~/styles/main.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "Ryan Santos Portfolio" },
    {
      name: "description",
      content: "A portfolio site showcasing the works of Ryan Santos",
    },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
    },
  ];
};

export default function Index() {
  return (
    <div>
      {/* Hero */}
      {/* Works */}
      {/* Blog */}
      {/* Contact */}
    </div>
  );
}
