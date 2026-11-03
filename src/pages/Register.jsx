import { useState } from "react";
import { Link } from "react-router-dom";
import { event } from "../data/content";
import Logo from "../components/ui/Logo";
import ApplyLink from "../components/ui/ApplyLink";

/* Tally's own embed URL, not the /r/ share link — /r/ renders the full
   standalone page inside the frame, chrome and all.
   No parameters on purpose, so the form renders exactly as it does
   standalone: Tally's centred, max-width column with the title in place.
   · alignLeft would flush the text to the left edge and let it run the
     full width of the frame
   · hideTitle would drop the form's heading
   · dynamicHeight would grow the frame to the whole form height, which
     fights the viewport-sized box below — without it the form scrolls
     inside its own frame and Tally's widget script is unnecessary, so
     the iframe carries a real src and cannot fail to appear if that
     script is blocked
   · transparentBackground would put the form's dark text on our dark
     background — the form is themed light, so it keeps its own white */
const TALLY_SRC = "https://tally.so/embed/PRjoOd";

export default function Register() {
  const [ready, setReady] = useState(false);

  return (
    <div className="reg">
      <header className="nav nav--scrolled reg__nav">
        <div className="nav__inner">
          <Link to="/" className="nav__brand">
            <Logo name="t-for-teaching" alt="T for Teaching" height={42} />
          </Link>
          <ApplyLink to="/" label="Back home" icon="back" iconFirst className="link-apply--back" />
        </div>
      </header>

      <div className="reg__frame">
        {!ready && <p className="reg__loading">Loading form…</p>}

        <iframe
          src={TALLY_SRC}
          title={`${event.name} application form`}
          onLoad={() => setReady(true)}
          style={{ opacity: ready ? 1 : 0 }}
        />
      </div>
    </div>
  );
}
