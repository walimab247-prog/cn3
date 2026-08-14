# Crypto Coins News (CCN)

A static, informational cryptocurrency news website. All content is neutral and educational — no financial advice, no profit promises.

## Structure

- `index.html` — Home (hero, trending stories, metrics, sources, FAQ)
- `news.html` — News hub with category filter and 8 articles
- `markets.html` — Market analysis hub
- `about.html`, `contact.html` — About & contact (form + editorial email)
- `news-*.html`, `markets-*.html` — Individual article pages (sources, dates, author, disclaimer on each)
- `editorial-policy.html`, `advertising-disclosure.html`, `risk-disclaimer.html`, `privacy-policy.html`, `terms.html`, `cookie-policy.html`, `404.html`
- `assets/css/main.css` — shared stylesheet (template design system + site components)
- `assets/js/main.js` — navigation menu, FAQ accordion, smooth scroll, news filter, contact form, text fitting
- `assets/img/` — images

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```
