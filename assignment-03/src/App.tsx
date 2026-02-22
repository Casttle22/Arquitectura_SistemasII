import "./App.css";

export default function App() {
  return (
    <div className="page">
      <header className="header">
        <div className="brand">
          <span className="brandMark" aria-hidden="true">
            ⛅
          </span>
          <div className="brandText">
            <div className="brandTitle">Assignment 03</div>
            <div className="brandSubtitle">Vite + React + Docker + Beanstalk</div>
          </div>
        </div>

        <nav className="nav" aria-label="Navegación principal">
          <a href="#features">Características</a>
          <a href="#about">Acerca</a>
          <a href="#deploy">Despliegue</a>
        </nav>

        <a className="pill" href="#deploy">
          Ver despliegue
        </a>
      </header>

      <main className="main">
        <section className="hero" aria-label="Sección principal">
          <div className="heroContent">
            <h1>Aplicación estática, bonita y lista para Beanstalk.</h1>
            <p>
              Este proyecto está pensado para cumplir con la práctica: build con Vite, dockerización con Nginx,
              secretos con Doppler y despliegue automatizado con GitHub Actions.
            </p>

            <div className="heroActions">
              <a className="btn primary" href="#features">
                Explorar features
              </a>
              <a className="btn" href="#about">
                Leer about
              </a>
            </div>

            <div className="heroMeta">
              <span className="badge">UI estática</span>
              <span className="badge">Docker</span>
              <span className="badge">CI/CD</span>
              <span className="badge">AWS EB</span>
            </div>
          </div>

          <div className="heroCard" role="note" aria-label="Resumen rápido">
            <div className="heroCardTitle">Resumen</div>
            <ul className="checklist">
              <li>Vite + React (TypeScript)</li>
              <li>Build genera dist/</li>
              <li>Docker multi-stage + Nginx</li>
              <li>Deploy a Elastic Beanstalk</li>
            </ul>

            <div className="heroCardHint">
              Tip: esta UI es totalmente estática, ideal para despliegue por contenedor.
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="sectionHeader">
            <h2>Características</h2>
          </div>

          <div className="grid">
            <article className="card">
              <h3>Build</h3>
              <p>
                Vite genera la carpeta <code>dist/</code> lista para producción.
              </p>
              <div className="cardFooter">
                <span className="tag">vite</span>
                <span className="tag">dist</span>
              </div>
            </article>

            <article className="card">
              <h3>Docker</h3>
              <p>
                Imagen multi-stage: construida con Node y servida con Nginx.
              </p>
              <div className="cardFooter">
                <span className="tag">docker</span>
                <span className="tag">nginx</span>
              </div>
            </article>

            <article className="card">
              <h3>Husky</h3>
              <p>
                Antes de cada commit, validamos estilo/format para mantener calidad.
              </p>
              <div className="cardFooter">
                <span className="tag">husky</span>
                <span className="tag">lint</span>
              </div>
            </article>

            <article className="card">
              <h3>Beanstalk</h3>
              <p>
                Pipeline construye imagen, la publica y actualiza el environment.
              </p>
              <div className="cardFooter">
                <span className="tag">aws</span>
                <span className="tag">eb</span>
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="about">
          <div className="sectionHeader">
            <h2>Acerca de</h2>
          </div>

          <div className="panel">
            <p>
              El objetivo es mantener el frontend simple (estático) para que el despliegue sea robusto:
              al final, lo único que debe existir en producción es el contenido de <code>dist/</code>
              servido por Nginx dentro de un contenedor.
            </p>

            <p>
              Con Husky aseguramos que haya consistencia antes de commitear, y con Doppler evitamos el exponer credenciales
              en el repositorio. El pipeline lo automatiza todo: build → imagen → deploy.
            </p>
          </div>
        </section>

        <section className="section" id="deploy">
          <div className="sectionHeader">
            <h2>Despliegue</h2>
            <p>Checklist rápido para cuando ya tengas Beanstalk configurado.</p>
          </div>

          <div className="panel">
            <ol className="steps">
              <li>Pipeline construye la imagen Docker.</li>
              <li>Se publica en el registry (ej. ECR).</li>
              <li>Elastic Beanstalk actualiza el environment con la nueva versión.</li>
              <li>La URL de Beanstalk queda pública para verificación.</li>
            </ol>
            <div className="note">
              Cuando tengas tu URL de Beanstalk, la puedes colocar en el README (y aquí también si quieres).
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footerInner">
          <span>© {new Date().getFullYear()} · Arquitectura de Sistemas II</span>
          <span className="dot" aria-hidden="true">
            •
          </span>
          <span>Assignment-03</span>
        </div>
      </footer>
    </div>
  );
}