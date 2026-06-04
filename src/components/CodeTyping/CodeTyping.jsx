import { useState, useEffect, useRef } from 'react';
import './CodeTyping.css';

const codeLines = [
  { text: 'using ASP.NET.Mvc;', indent: 0 },
  { text: '', indent: 0 },
  { text: 'namespace Portfolio.Controllers', indent: 0 },
  { text: '{', indent: 0 },
  { text: 'public class HomeController', indent: 1 },
  { text: '  : Controller', indent: 1 },
  { text: '{', indent: 1 },
  { text: 'public IActionResult Index()', indent: 2 },
  { text: '{', indent: 2 },
  { text: 'var dev = new Developer', indent: 3 },
  { text: '{', indent: 3 },
  { text: 'Name = "Ghazali",', indent: 4 },
  { text: 'Role = "Full Stack Dev"', indent: 4 },
  { text: '};', indent: 3 },
  { text: '', indent: 0 },
  { text: 'return View(dev);', indent: 3 },
  { text: '}', indent: 2 },
  { text: '}', indent: 1 },
  { text: '}', indent: 0 },
];

function getFlatCode() {
  return codeLines.map((l) => '  '.repeat(l.indent) + l.text).join('\n');
}

function highlightLine(line) {
  return line
    .replace(/\/\/.*/g, '<span class="code-comment">$&</span>')
    .replace(/"(?:[^"\\]|\\.)*"/g, '<span class="code-string">$&</span>')
    .replace(/\b(using|namespace|public|class|new|var|return)\b/g, '<span class="code-keyword">$&</span>')
    .replace(/\b(string|int|bool|void|Developer|HomeController|Controller|IActionResult)\b/g, '<span class="code-type">$&</span>')
    .replace(/\b(Index|Name|Role|View)\b/g, '<span class="code-function">$&</span>');
}

export default function CodeTyping() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || currentLine >= codeLines.length) return;

    const lineText = '  '.repeat(codeLines[currentLine].indent) + codeLines[currentLine].text;
    if (currentChar < lineText.length) {
      const timer = setTimeout(() => setCurrentChar((c) => c + 1), 25);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [started, currentLine, currentChar]);

  const displayedLines = codeLines.slice(0, currentLine).map((l) => {
    const full = '  '.repeat(l.indent) + l.text;
    return { raw: full, highlighted: highlightLine(full) };
  });

  if (currentLine < codeLines.length) {
    const currentFull = '  '.repeat(codeLines[currentLine].indent) + codeLines[currentLine].text;
    const partial = currentFull.slice(0, currentChar);
    displayedLines.push({ raw: partial, highlighted: highlightLine(partial), typing: true });
  }

  const totalLines = codeLines.length;

  return (
    <div className="code-editor" ref={ref}>
      <div className="code-editor__header">
        <div className="code-editor__dots">
          <span className="code-editor__dot code-editor__dot--red" />
          <span className="code-editor__dot code-editor__dot--yellow" />
          <span className="code-editor__dot code-editor__dot--green" />
        </div>
        <span className="code-editor__title">Program.cs</span>
        <span className="code-editor__lang">C#</span>
      </div>
      <div className="code-editor__body">
        <div className="code-editor__lines">
          {Array.from({ length: totalLines }, (_, i) => (
            <span key={i} className={i < currentLine || (i === currentLine && currentChar > 0) ? 'line-active' : ''}>
              {i + 1}
            </span>
          ))}
        </div>
        <pre className="code-editor__code">
          {displayedLines.map((line, i) => (
            <div key={i} className="code-line">
              <code dangerouslySetInnerHTML={{ __html: line.highlighted || '&nbsp;' }} />
              {line.typing && <span className="code-cursor" />}
            </div>
          ))}
        </pre>
      </div>
      <div className="code-editor__footer">
        <span className="code-editor__status">
          <span className="code-editor__status-dot" />
          Ready
        </span>
        <span className="code-editor__encoding">UTF-8</span>
      </div>
    </div>
  );
}
