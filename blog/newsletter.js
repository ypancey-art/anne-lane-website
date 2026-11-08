// Newsletter signup (Formspree + Cloudflare Turnstile), shared by the blog article pages.
// Mirrors the form on blog/index.html.
var turnstileWidgetId = null;

function resetNewsletterButton() {
  var btn = document.querySelector('#newsletter-form button[type="submit"]');
  if (btn) { btn.disabled = false; btn.textContent = 'Subscribe'; }
}

function onTurnstileLoad() {
  turnstileWidgetId = window.turnstile.render('#newsletter-turnstile', {
    sitekey: '0x4AAAAAACnu5xH4Fr1bIbHc',
    callback: function (token) { submitNewsletterForm(token); },
    'expired-callback': resetNewsletterButton,
    'error-callback': function () {
      resetNewsletterButton();
      alert('Verification failed. Please try again.');
    }
  });
}

async function submitNewsletterForm(token) {
  var form = document.getElementById('newsletter-form');
  var btn = form.querySelector('button[type="submit"]');
  try {
    var data = new FormData(form);
    data.append('cf-turnstile-response', token);
    var response = await fetch('https://formspree.io/f/mvzbbwqa', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      document.getElementById('newsletter-success').style.display = 'block';
      form.reset();
      btn.style.display = 'none';
    } else {
      resetNewsletterButton();
      if (turnstileWidgetId !== null) window.turnstile.reset(turnstileWidgetId);
      alert('Something went wrong. Please try again.');
    }
  } catch (e) {
    resetNewsletterButton();
    if (turnstileWidgetId !== null) window.turnstile.reset(turnstileWidgetId);
    alert('Something went wrong. Please try again.');
  }
}

window.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Subscribing…';
    if (turnstileWidgetId !== null) {
      window.turnstile.execute(turnstileWidgetId);
    } else {
      resetNewsletterButton();
      alert('Verification not ready. Please try again.');
    }
  });
});
