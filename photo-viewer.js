(function () {
  'use strict';
  var viewer = document.getElementById('photo-viewer');
  if (!viewer || typeof viewer.showModal !== 'function') return;
  var image = document.getElementById('photo-viewer-image');
  var opener;
  document.querySelectorAll('.photo-open').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      viewer.showModal();
      document.documentElement.classList.add('photo-viewer-open');
    });
  });
  document.getElementById('photo-viewer-close').addEventListener('click', function () {
    viewer.close();
  });
  viewer.addEventListener('click', function (event) {
    var bounds = viewer.getBoundingClientRect();
    if (event.target === viewer && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) viewer.close();
  });
  viewer.addEventListener('close', function () {
    document.documentElement.classList.remove('photo-viewer-open');
    if (opener) opener.focus({ preventScroll: true });
  });
})();
