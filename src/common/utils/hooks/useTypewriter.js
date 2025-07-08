import { useEffect, useState } from "react";

export function useTypewriter(
  titles = [],
  typingSpeed = 120,
  deletingSpeed = 40,
  pauseTime = 1000
) {
  const [text, setText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];

    const handleTyping = () => {
      if (!isDeleting && text.length < currentTitle.length) {
        setText(currentTitle.slice(0, text.length + 1));
      } else if (isDeleting && text.length > 0) {
        setText(currentTitle.slice(0, text.length - 1));
      } else if (!isDeleting && text.length === currentTitle.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      } else if (isDeleting && text.length === 0) {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
        return;
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, titleIndex]);

  return text;
}
