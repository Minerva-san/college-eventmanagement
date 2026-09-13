const Footer = () => {
  return (
    <footer style={{ background: '#f5f5f5', padding: '2rem 1.5rem', marginTop: '2rem', borderTop: '1px solid #e0e0e0', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gap: '0.5rem', textAlign: 'center' }}>
        <p style={{ margin: 0, fontWeight: 600, color: '#1f2937' }}>
          School of Computational and Physical Sciences
        </p>

        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#111827' }}>
          Department of Computer Science
        </h4>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.95rem' }}>
          <a href="mailto:computeracademy@alphauniversity.com" style={{ color: '#1d4ed8', textDecoration: 'none' }}>
            computeracademy@alphauniversity.com
          </a>
          <span style={{ color: '#6b7280' }}>|</span>
          <a
            href="https://maps.google.com/?q=Kristu+Jayanti+College+Bangalore"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#1d4ed8', textDecoration: 'none' }}
          >
            K. Narayanapura, Bengaluru
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;