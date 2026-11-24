// Efecto máquina de escribir con cursor parpadeante
function typewriter(el, speed = 100) {
  const text = el.textContent.trim();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Separa por caracteres visibles (los emojis como 🇨🇴 no se parten)
  const chars = [...new Intl.Segmenter().segment(text)].map((s) => s.segment);

  const typed = document.createElement('span');
  const cursor = document.createElement('span');
  cursor.className = 'hero__cursor';
  cursor.textContent = '|';
  cursor.setAttribute('aria-hidden', 'true');

  el.setAttribute('aria-label', text); // lectores de pantalla leen el texto completo
  el.textContent = '';
  el.append(typed, cursor);

  if (reduceMotion) {
    typed.textContent = text;
    return;
  }

  let i = 0;
  const timer = setInterval(() => {
    typed.textContent += chars[i];
    i++;
    if (i >= chars.length) clearInterval(timer);
  }, speed);
}

document.querySelectorAll('.hero__cargo').forEach((el) => typewriter(el));
