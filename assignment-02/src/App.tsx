import "./App.css";

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="brand">Arquitectura de Sistemas II</div>
        <nav className="nav">
          <a href="#features">Características</a>
          <a href="#about">Acerca</a>
        </nav>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Assignment 02</h1>
          <p>
            Aplicación estática construida con <b>Vite + React</b> y desplegada
            con <b>AWS S3 + CloudFront</b>.
          </p>
          <div className="ctaRow">
            <a className="btn" href="#features">Ver detalles</a>
            <a className="btn ghost" href="#about">Cómo funciona</a>
          </div>
        </section>

        <section className="grid" id="features">
          <article className="card">
            <h3>Build</h3>
            <p>Vite genera <code>dist/</code> lista para producción.</p>
          </article>
          <article className="card">
            <h3>Upload</h3>
            <p>GitHub Actions sube el contenido a un bucket S3.</p>
          </article>
          <article className="card">
            <h3>Invalidate</h3>
            <p>Se invalida CloudFront para reflejar cambios al instante.</p>
          </article>
        </section>

        <section className="panel" id="about">
          <h2>Acerca de</h2>
          <p>
            Los secretos del despliegue se gestionan con <b>Doppler</b> y se
            sincronizan automáticamente a <b>GitHub Secrets</b>.
          </p>
        </section>
      </main>

      <footer className="footer">© {new Date().getFullYear()} Casttle22</footer>
    </div>
  );
}