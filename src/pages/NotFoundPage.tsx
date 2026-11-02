import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section>
      <h1>404 — Page not found</h1>
      <p>There is nothing at this address.</p>
      <Link to="/">Go to the champion catalog</Link>
    </section>
  );
}

export default NotFoundPage;
