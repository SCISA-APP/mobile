import { useEffect, useState } from "react";

export const useRandomQuote = () => {
  const [quote, setQuote] = useState<{ q: string; a: string } | null>(null);

  useEffect(() => {
    fetch("https://zenquotes.io/api/random")
      .then(res => res.json())
      .then(data => setQuote(data[0]))
      .catch(console.error);
  }, []);

  return quote;
};
