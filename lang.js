/* docs/lang.js
   Markdown rendering + code copy buttons + TOC generation for ASC docs.
*/
(function () {

    /* Parse markdown source into the article element */
    function render() {
        if (typeof marked === 'undefined') {
            setTimeout(render, 60);
            return;
        }

        var source = document.getElementById('md');
        var article = document.getElementById('article');
        if (!source || !article) return;

        var md = source.textContent;
        if (md && md.trim()) {
            article.innerHTML = marked.parse(md);
        }

        enhanceCodeBlocks();
        renderMermaid();
        generateTOC();
        setupScrollSpy();
    }

    /* Add copy buttons to code blocks */
    function enhanceCodeBlocks() {
        document.querySelectorAll('#article pre').forEach(function (pre) {
            if (pre.querySelector('.code-header')) return;

            var code = pre.querySelector('code');
            if (!code) return;

            var lang = '';
            var cls = code.className || '';
            var m = cls.match(/language-(\w+)/);
            if (m) lang = m[1];

            var header = document.createElement('div');
            header.className = 'code-header';

            var langTag = document.createElement('span');
            langTag.className = 'lang-tag';
            langTag.textContent = lang || 'code';

            var copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg> Copy';

            copyBtn.addEventListener('click', function () {
                var text = code.textContent;
                navigator.clipboard.writeText(text).then(function () {
                    copyBtn.classList.add('copied');
                    copyBtn.innerHTML = '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg> Copied';
                    setTimeout(function () {
                        copyBtn.classList.remove('copied');
                        copyBtn.innerHTML = '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg> Copy';
                    }, 2000);
                });
            });

            header.appendChild(langTag);
            header.appendChild(copyBtn);
            pre.insertBefore(header, code);
        });
    }

    /* Generate right-side TOC from article headings */
    function generateTOC() {
        var tocList = document.querySelector('.toc-list') || document.getElementById('toc');
        if (!tocList) return;

        var article = document.getElementById('article');
        if (!article) return;

        var headings = article.querySelectorAll('h2, h3');
        tocList.innerHTML = '';

        headings.forEach(function (h, i) {
            if (!h.id) {
                h.id = 'heading-' + i + '-' + h.textContent.trim().toLowerCase()
                    .replace(/[^\w一-鿿]+/g, '-')
                    .replace(/^-|-$/g, '');
            }

            var a = document.createElement('a');
            a.href = '#' + h.id;
            a.textContent = h.textContent;
            if (h.tagName === 'H3') {
                a.style.paddingLeft = '12px';
                a.style.fontSize = '12px';
            }
            tocList.appendChild(a);
        });
    }

    /* Render Mermaid code blocks as diagrams */
    function renderMermaid() {
        if (typeof mermaid === 'undefined') return;

        var mermaidBlocks = document.querySelectorAll('#article code.language-mermaid');
        if (mermaidBlocks.length === 0) return;

        mermaid.initialize({
            startOnLoad: false,
            theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default',
            securityLevel: 'loose',
            flowchart: { useMaxWidth: true, htmlLabels: true },
            sequence: { useMaxWidth: true },
            gantt: { useMaxWidth: true }
        });

        mermaidBlocks.forEach(function (code, i) {
            var pre = code.parentElement;
            if (!pre || pre.tagName !== 'PRE') return;

            var container = document.createElement('div');
            container.className = 'mermaid';
            container.textContent = code.textContent;
            container.setAttribute('data-index', i);

            pre.replaceWith(container);
        });

        try {
            mermaid.run();
        } catch (e) {
            console.warn('Mermaid render error:', e);
        }
    }

    /* Scroll spy for TOC */
    function setupScrollSpy() {
        var tocLinks = document.querySelectorAll('.toc-list a, #toc a');
        if (tocLinks.length === 0) return;

        var headings = [];
        tocLinks.forEach(function (link) {
            var id = link.getAttribute('href').slice(1);
            var el = document.getElementById(id);
            if (el) headings.push({ el: el, link: link });
        });

        if (headings.length === 0) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    tocLinks.forEach(function (l) { l.classList.remove('active'); });
                    var match = headings.find(function (h) { return h.el === entry.target; });
                    if (match) match.link.classList.add('active');
                }
            });
        }, { rootMargin: '-80px 0px -60% 0px' });

        headings.forEach(function (h) { observer.observe(h.el); });
    }

    /* Init */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
