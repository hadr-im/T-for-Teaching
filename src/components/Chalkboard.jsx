import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { destinations } from "../data/content";

const CYCLE_MS = 5200;
const EASE = [0.16, 1, 0.3, 1];
// Erasing is a swipe, not a settle — even in, even out, and quicker
// than the writing.
const WIPE = 0.55;
const WIPE_EASE = [0.45, 0, 0.3, 1];

/* "SRI LANKA" -> "Sri Lanka": the board is handwriting, not signage. */
const titleCase = (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * The hero chalkboard.
 *
 * One placement at a time, written on in chalk left to right, held, then
 * wiped away by a duster as the next is written. Both the write-on and
 * the wipe are clip-path insets: the text is uncovered and then covered,
 * never faded, which is what makes it read as a hand moving across slate.
 *
 * The keyed element is a motion.div, not a plain div — AnimatePresence
 * can only orchestrate exits on a motion child, and the variant labels
 * propagate from it down to the lines and the duster.
 */
export default function Chalkboard({ play = true }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!play || reduced) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % destinations.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [play, reduced]);

  const lesson = destinations[index];

  // Reduced motion: no wipe, no write — just swap the text.
  const line = (delay, duration) =>
    reduced
      ? {
          enter: { opacity: 0 },
          center: { opacity: 1, transition: { duration: 0.3 } },
          exit: { opacity: 0, transition: { duration: 0.2 } },
        }
      : {
          enter: { clipPath: "inset(-14% 100% -14% 0)" },
          center: {
            clipPath: "inset(-14% 0% -14% 0)",
            transition: { duration, ease: EASE, delay },
          },
          exit: {
            clipPath: "inset(-14% 0 -14% 100%)",
            transition: { duration: WIPE, ease: WIPE_EASE },
          },
        };

  /* Same duration and easing as the erase above, so the smudge stays
     locked to the clip edge instead of trailing it. The duster element
     is full-width with the smudge painted mid-band, so -52% -> 52%
     carries it right across — see the note in index.css. */
  const duster = {
    enter: { x: "-52%", opacity: 0 },
    center: { x: "-52%", opacity: 0 },
    exit: {
      x: "52%",
      opacity: [0, 1, 1, 0],
      transition: { duration: WIPE, ease: WIPE_EASE },
    },
  };

  return (
    <motion.div
      className="chalk"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={play ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
    >
      <div className="chalk__head">
        <span>Today&rsquo;s lesson</span>
        <motion.i
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={play ? { scaleX: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
        />
      </div>

      <div className="chalk__stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={lesson.city} initial="enter" animate="center" exit="exit">
            <motion.p className="chalk__line" variants={line(0, 1.15)}>
              Teach {lesson.subject} in {titleCase(lesson.city)}
            </motion.p>

            <motion.p className="chalk__sub" variants={line(0.32, 0.9)}>
              {lesson.level} &middot; {lesson.weeks} &middot;{" "}
              {lesson.status === "open" ? "places open" : "filling fast"}
            </motion.p>

            {!reduced && (
              <motion.span className="chalk__duster" aria-hidden="true" variants={duster} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="chalk__ledge" aria-hidden="true" />
    </motion.div>
  );
}
