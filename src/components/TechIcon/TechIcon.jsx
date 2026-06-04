const techLogos = {
  'C#': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#68217A"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">C#</text>
    </svg>
  ),
  'ASP.NET': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#512BD4"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">.NET</text>
    </svg>
  ),
  'ASP.NET MVC': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#512BD4"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">MVC</text>
    </svg>
  ),
  'SQL Server': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#CC2927"/>
      <text x="16" y="14" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">SQL</text>
      <text x="16" y="24" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif">Server</text>
    </svg>
  ),
  'SQL Server Management Studio (SSMS)': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#CC2927"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">SSMS</text>
    </svg>
  ),
  'HTML/CSS': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#E44D26"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">HTML</text>
    </svg>
  ),
  'Bootstrap': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#7952B3"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">B</text>
    </svg>
  ),
  'IIS': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#0078D4"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">IIS</text>
    </svg>
  ),
  'PHP': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#777BB4"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">PHP</text>
    </svg>
  ),
  'JavaScript': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#F7DF1E"/>
      <text x="16" y="22" textAnchor="middle" fill="#323330" fontSize="9" fontWeight="bold" fontFamily="sans-serif">JS</text>
    </svg>
  ),
  'Python': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#3776AB"/>
      <text x="16" y="22" textAnchor="middle" fill="#FFD43B" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Py</text>
    </svg>
  ),
  'Dart': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#0175C2"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Dart</text>
    </svg>
  ),
  'MySQL': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#4479A1"/>
      <text x="16" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">My</text>
      <text x="16" y="24" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif">SQL</text>
    </svg>
  ),
  'PostgreSQL': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#336791"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">PG</text>
    </svg>
  ),
  'Redis': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#DC382D"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">R</text>
    </svg>
  ),
  'Laravel': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#FF2D20"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">L</text>
    </svg>
  ),
  'React': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#20232A"/>
      <circle cx="16" cy="16" r="3" fill="#61DAFB"/>
      <ellipse cx="16" cy="16" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
      <ellipse cx="16" cy="16" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 16 16)"/>
    </svg>
  ),
  'Flutter': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#02569B"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">F</text>
    </svg>
  ),
  'GitHub': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#181717"/>
      <path d="M16 6C10.48 6 6 10.48 6 16c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0116 9.69c.85.004 1.71.12 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0026 16c0-5.52-4.48-10-10-10z" fill="white"/>
    </svg>
  ),
  'Docker': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#2496ED"/>
      <path d="M8 18h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2zm-6-3h2v2H8zm3 0h2v2h-2zm3-3h2v2h-2zm3 3h2v2h-2zm3 0h2v2h-2zm-3 3h2v2h-2zm3 0h2v2h-2z" fill="white"/>
    </svg>
  ),
  'Docker Compose': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#2496ED"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">DC</text>
    </svg>
  ),
  'Linux Ubuntu': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#E95420"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Lx</text>
    </svg>
  ),
  'VPS': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#00843D"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">VPS</text>
    </svg>
  ),
  'S3 MinIO': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#C72E49"/>
      <text x="16" y="14" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">S3</text>
      <text x="16" y="24" textAnchor="middle" fill="white" fontSize="6" fontFamily="sans-serif">MinIO</text>
    </svg>
  ),
  'Postman': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#FF6C37"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">P</text>
    </svg>
  ),
  'NLP': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#00B4D8"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">NLP</text>
    </svg>
  ),
  'TF-IDF': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#6C63FF"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">TF</text>
    </svg>
  ),
  'Cosine Similarity': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#00D4AA"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">cos</text>
    </svg>
  ),
  'Figma': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#F24E1E"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Fi</text>
    </svg>
  ),
  'HTML': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#E44D26"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">HTML</text>
    </svg>
  ),
  'CSS': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#264DE4"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">CSS</text>
    </svg>
  ),
  'SQL': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#CC2927"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">SQL</text>
    </svg>
  ),
  'Blade': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#FF2D20"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Bl</text>
    </svg>
  ),
  'Git': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#F05032"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Git</text>
    </svg>
  ),
  'MongoDB': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#47A248"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">MG</text>
    </svg>
  ),
  'SQLite': (
    <svg viewBox="0 0 32 32" width="20" height="20" fill="none">
      <rect width="32" height="32" rx="6" fill="#003B57"/>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">SL</text>
    </svg>
  ),
};

export default function TechIcon({ name, size = 20 }) {
  const icon = techLogos[name];
  if (!icon) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          borderRadius: 4,
          background: 'var(--color-primary-glow)',
          color: 'var(--color-primary-light)',
          fontSize: size * 0.45,
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
        }}
      >
        {name.charAt(0)}
      </span>
    );
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', width: size, height: size }}>
      {icon}
    </span>
  );
}
