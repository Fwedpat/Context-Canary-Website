const samples = {
  healthy: { checked: 13, followed: 13, missed: '0', streak: 0,
    line: 'Copilot\'s last reply still followed the instruction.' },
  fading: { checked: 14, followed: 13, missed: '1 (first at reply 14)', streak: 1,
    line: 'Copilot\'s last 1 reply ignored the instruction.',
    toast: 'Canary: Fading. Copilot\'s last reply ignored the canary instruction. Long chats can lose early instructions.' },
  dying: { checked: 15, followed: 13, missed: '2 (first at reply 14)', streak: 2,
    line: 'Copilot\'s last 2 replies ignored the instruction.',
    toast: 'Canary: Dying. Copilot\'s last 2 replies ignored the canary instruction. Its early context is likely being lost; consider a new chat.' }
};
const demo = document.getElementById('demo');

function show(state) {
  const sample = samples[state];
  const label = state.charAt(0).toUpperCase() + state.slice(1);
  const fields = { state: label, ...sample };
  for (const [name, value] of Object.entries(fields)) {
    demo.querySelectorAll(`[data-field="${name}"]`).forEach(el => { el.textContent = value; });
  }
  demo.dataset.state = state;
  demo.querySelectorAll('[data-chat]').forEach(el => { el.hidden = el.dataset.chat !== state; });
  demo.querySelector('[data-bird]').setAttribute('href', state === 'dying' ? '#bird-dying' : '#bird');
  demo.querySelector('[data-toast] p').textContent = sample.toast ?? '';
  document.getElementById('demo-summary').textContent = `Canary: ${label}. ${sample.line}`;
  document.querySelectorAll('.demo-controls button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.state === state));
  });
}

document.querySelectorAll('.demo-controls button').forEach(button => {
  button.addEventListener('click', () => show(button.dataset.state));
});
