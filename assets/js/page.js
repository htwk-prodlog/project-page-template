// project-page-template: video rows, full-size player and copy buttons on code blocks.
(function () {
  var dialog = document.querySelector('.video-dialog');
  var player = dialog.querySelector('video');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var visible = new Set();
  var opener = null;

  // ---------- previews: only play videos that are on screen ----------

  function syncPlayback() {
    document.querySelectorAll('.video-open video').forEach(function (video) {
      if (visible.has(video) && !reducedMotion.matches && !dialog.open && !document.hidden) {
        video.play().catch(function () {});
      } else {
        video.pause();
      }
    });
  }

  var observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var video = entry.target.querySelector('video');
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) visible.add(video);
          else visible.delete(video);
        });
        syncPlayback();
      }, { threshold: [0, 0.5] })
    : null;

  document.querySelectorAll('.video-open').forEach(function (button) {
    var video = button.querySelector('video');
    video.muted = true;
    if (observer) observer.observe(button);
    else visible.add(video);

    // ---------- full-size player ----------
    button.addEventListener('click', function () {
      opener = button;
      dialog.setAttribute('aria-label', button.dataset.title || 'Video');
      player.src = button.dataset.src;
      dialog.showModal();
      document.body.classList.add('dialog-open');
      syncPlayback();
      player.play().catch(function () {});
    });
  });

  dialog.querySelector('.dialog-close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) {
    if (event.target !== dialog) return;
    var box = dialog.getBoundingClientRect();
    var outside = event.clientX < box.left || event.clientX > box.right ||
                  event.clientY < box.top || event.clientY > box.bottom;
    if (outside) dialog.close();
  });
  dialog.addEventListener('close', function () {
    player.pause();
    player.removeAttribute('src');
    player.load();
    document.body.classList.remove('dialog-open');
    if (opener) opener.focus({ preventScroll: true });
    syncPlayback();
  });
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', syncPlayback);

  // ---------- carousels (rows with more than three videos) ----------

  document.querySelectorAll('.video-row.is-carousel').forEach(function (row) {
    var track = row.querySelector('.video-track');
    var cards = Array.prototype.slice.call(track.querySelectorAll('.video-card'));
    var previous = row.querySelector('.video-arrow.previous');
    var next = row.querySelector('.video-arrow.next');

    function offsets() {
      return cards.map(function (card) { return card.offsetLeft - cards[0].offsetLeft; });
    }
    function current() {
      var list = offsets();
      return list.reduce(function (best, value, i) {
        return Math.abs(value - track.scrollLeft) < Math.abs(list[best] - track.scrollLeft) ? i : best;
      }, 0);
    }
    function go(index) {
      var list = offsets();
      index = Math.max(0, Math.min(index, cards.length - 1));
      track.scrollTo({ left: list[index], behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
    function update() {
      previous.disabled = track.scrollLeft < 3;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 3;
    }

    previous.addEventListener('click', function () { go(current() - 1); });
    next.addEventListener('click', function () { go(current() + 1); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  // ---------- copy buttons on code blocks (not on plain-text blocks such as diagrams) ----------

  // icons: GitHub Octicons copy-16 and check-16 (MIT)
  var COPY_ICON = '<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>';
  var CHECK_ICON = '<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>';

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    var area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
    return Promise.resolve();
  }

  document.querySelectorAll('.content div.highlighter-rouge:not(.language-plaintext)').forEach(function (block) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-button';
    button.setAttribute('aria-label', 'Copy code');
    button.title = 'Copy';
    button.innerHTML = COPY_ICON;
    button.addEventListener('click', function () {
      copyText(block.querySelector('code').innerText.replace(/\n$/, '')).then(function () {
        button.innerHTML = CHECK_ICON;
        button.classList.add('copied');
        button.setAttribute('aria-label', 'Copied');
        button.title = 'Copied!';
        setTimeout(function () {
          button.innerHTML = COPY_ICON;
          button.classList.remove('copied');
          button.setAttribute('aria-label', 'Copy code');
          button.title = 'Copy';
        }, 2000);
      });
    });
    block.appendChild(button);
  });
})();
