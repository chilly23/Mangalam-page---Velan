/* ═══════════════════════════════════════════════════════════
   script.js — Mangalam HDPE Pipes Product Page
   Handles: sticky header, hero carousel + zoom, FAQ accordion,
            process tabs, industry carousel, mobile menu
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. STICKY HEADER
     Slides in when user scrolls past the hero section.
     Slides out when scrolling back to top.
  ───────────────────────────────────────── */
  const stickyBar = document.getElementById('stickyBar');
  const hero      = document.getElementById('hero');
  const mainNav   = document.getElementById('mainNav');

  if (stickyBar && hero) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when hero is no longer visible
        if (!entry.isIntersecting) {
          stickyBar.classList.add('visible');
          stickyBar.removeAttribute('aria-hidden');
        } else {
          stickyBar.classList.remove('visible');
          stickyBar.setAttribute('aria-hidden', 'true');
        }
      },
      { threshold: 0.05 }  // trigger when 95% of hero has scrolled past
    );
    heroObserver.observe(hero);
  }

  // Add shadow to main nav on scroll
  if (mainNav) {
    window.addEventListener('scroll', () => {
      mainNav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }


  /* ─────────────────────────────────────────
     2. MOBILE MENU TOGGLE
  ───────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden', String(!open));
    });
  }


  /* ─────────────────────────────────────────
     3. HERO IMAGE CAROUSEL
     Prev/Next arrows + thumbnail click navigation.
  ───────────────────────────────────────── */
  const carouselImages = [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80',
    'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  ];

  const carouselHiRes = carouselImages.map(url =>
    url.replace('w=600', 'w=1200').replace('q=80', 'q=90')
  );

  let currentIdx = 0;

  const mainImg      = document.getElementById('carouselMainImg');
  const thumbButtons = document.querySelectorAll('.thumb');
  const prevBtn      = document.getElementById('carouselPrev');
  const nextBtn      = document.getElementById('carouselNext');

  /** Update carousel to show slide at given index */
  function goToSlide(idx) {
    currentIdx = (idx + carouselImages.length) % carouselImages.length;

    if (mainImg) {
      mainImg.style.opacity = '0.5';
      mainImg.src = carouselImages[currentIdx];
      mainImg.onload = () => { mainImg.style.opacity = '1'; };
    }

    // Update zoom preview source
    const zoomPreviewImg = document.getElementById('zoomPreviewImg');
    if (zoomPreviewImg) zoomPreviewImg.src = carouselHiRes[currentIdx];

    // Update active thumbnail
    thumbButtons.forEach((btn, i) => {
      btn.classList.toggle('thumb--active', i === currentIdx);
      btn.setAttribute('aria-selected', String(i === currentIdx));
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIdx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIdx + 1));

  thumbButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => goToSlide(i));
  });

  // Keyboard navigation on carousel
  document.getElementById('heroCarousel')?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  goToSlide(currentIdx - 1);
    if (e.key === 'ArrowRight') goToSlide(currentIdx + 1);
  });

  // Initialise zoom preview src
  const zoomPreviewImg = document.getElementById('zoomPreviewImg');
  if (zoomPreviewImg) zoomPreviewImg.src = carouselHiRes[0];


  // /* ─────────────────────────────────────────
  //    4. HERO IMAGE ZOOM (lens + preview panel)
  //    Magnifies image on mouse hover, showing a
  //    zoomed view in a panel to the right.
  // ───────────────────────────────────────── */
  // const imgWrap    = document.querySelector('.carousel-main-img-wrap');
  // const zoomLens   = document.getElementById('zoomLens');
  // const zoomPreview = document.getElementById('zoomPreview');
  // const zoomImg    = document.getElementById('zoomPreviewImg');

  // const ZOOM_FACTOR = 2.5;  // magnification level

  // if (imgWrap && zoomLens && zoomPreview && zoomImg) {

  //   imgWrap.addEventListener('mousemove', (e) => {
  //     const rect   = imgWrap.getBoundingClientRect();
  //     const lensW  = zoomLens.offsetWidth;
  //     const lensH  = zoomLens.offsetHeight;

  //     // Cursor position relative to image
  //     let x = e.clientX - rect.left;
  //     let y = e.clientY - rect.top;

      // Clamp lens position so it stays inside image
    //   const lensX = Math.max(lensW / 2, Math.min(x, rect.width  - lensW / 2)) - lensW / 2;
    //   const lensY = Math.max(lensH / 2, Math.min(y, rect.height - lensH / 2)) - lensH / 2;

    //   // Move the lens
    //   zoomLens.style.left = `${lensX}px`;
    //   zoomLens.style.top  = `${lensY}px`;

    //   // Calculate background offset for zoomed preview
    //   const previewW = zoomPreview.offsetWidth;
    //   const previewH = zoomPreview.offsetHeight;

    //   // The zoomed image inside the preview panel is ZOOM_FACTOR × original
    //   const zoomedW = rect.width  * ZOOM_FACTOR;
    //   const zoomedH = rect.height * ZOOM_FACTOR;

    //   // We want the portion under the lens to appear centred in the preview
    //   const bgX = -((lensX / rect.width)  * zoomedW - previewW / 2);
    //   const bgY = -((lensY / rect.height) * zoomedH - previewH / 2);

    //   zoomImg.style.width  = `${zoomedW}px`;
    //   zoomImg.style.height = `${zoomedH}px`;
    //   zoomImg.style.left   = `${bgX}px`;
    //   zoomImg.style.top    = `${bgY}px`;
    // });

    // Touch: hide zoom on touch (mobile)
  //   imgWrap.addEventListener('touchstart', () => {
  //     zoomLens.style.display   = 'none';
  //     zoomPreview.style.display = 'none';
  //   }, { passive: true });
  // }


  /* ─────────────────────────────────────────
     5. FAQ ACCORDION
     Clicking a question opens / closes the answer.
  ───────────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon   = item.querySelector('.faq-icon');

    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-item--open');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('faq-item--open');
          other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('faq-item--open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));

      // Swap icon direction
      if (icon) {
        icon.innerHTML = !isOpen
          ? '<path d="M18 15l-6-6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
          : '<path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
      }
    });
  });


  /* ─────────────────────────────────────────
     6. MANUFACTURING PROCESS TABS
     Clicking a tab shows its corresponding pane.
  ───────────────────────────────────────── */
  const processTabs  = document.querySelectorAll('.process-tab');
  const processPanes = document.querySelectorAll('.process-pane');

  processTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tab active state
      processTabs.forEach(t => {
        t.classList.toggle('process-tab--active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });

      // Show matching pane
      processPanes.forEach(pane => {
        pane.classList.toggle('process-pane--active', pane.dataset.pane === target);
      });
    });
  });


  /* ─────────────────────────────────────────
     7. INDUSTRIES CAROUSEL
     Left/right arrow buttons scroll the card track.
  ───────────────────────────────────────── */
  const industryTrack = document.getElementById('industryTrack');
  const industryPrev  = document.getElementById('industryPrev');
  const industryNext  = document.getElementById('industryNext');

  let industryOffset = 0;
  const CARD_WIDTH   = 280; // card width + gap

  function getMaxOffset() {
    if (!industryTrack) return 0;
    const trackWidth    = industryTrack.scrollWidth;
    const containerWidth = industryTrack.parentElement.offsetWidth;
    return Math.max(0, trackWidth - containerWidth - 24);
  }

  function updateIndustryArrows() {
    if (industryPrev) industryPrev.style.opacity = industryOffset <= 0 ? '0.4' : '1';
    if (industryNext) industryNext.style.opacity = industryOffset >= getMaxOffset() ? '0.4' : '1';
  }

  industryPrev?.addEventListener('click', () => {
    industryOffset = Math.max(0, industryOffset - CARD_WIDTH);
    industryTrack.style.transform = `translateX(-${industryOffset}px)`;
    updateIndustryArrows();
  });

  industryNext?.addEventListener('click', () => {
    industryOffset = Math.min(getMaxOffset(), industryOffset + CARD_WIDTH);
    industryTrack.style.transform = `translateX(-${industryOffset}px)`;
    updateIndustryArrows();
  });

  updateIndustryArrows();

  // Touch/swipe support for industry carousel
  let touchStartX = 0;
  industryTrack?.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  industryTrack?.addEventListener('touchend', e => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) industryNext?.click();
      else           industryPrev?.click();
    }
  }, { passive: true });


  /* ─────────────────────────────────────────
     8. INDUSTRY CARD ZOOM HOVER
     On hover, shows an enlarged (zoom-in) overlay
  //    on each industry card image.
  // ───────────────────────────────────────── */
  // const zoomCards = document.querySelectorAll('.zoom-card');

  // zoomCards.forEach(card => {
  //   const imgWrapEl  = card.querySelector('.industry-card__img-wrap');
  //   const overlay    = card.querySelector('.zoom-overlay');
  //   const overlayImg = card.querySelector('.zoom-overlay img');
  //   const baseImg    = card.querySelector('.industry-card__img-wrap > img');

  //   if (!imgWrapEl || !overlay || !overlayImg || !baseImg) return;

  //   imgWrapEl.addEventListener('mousemove', (e) => {
  //     const rect = imgWrapEl.getBoundingClientRect();
  //     const x = (e.clientX - rect.left) / rect.width;
  //     const y = (e.clientY - rect.top)  / rect.height;

  //     // Move the zoomed image so cursor point stays centred
  //     const translateX = -(x * 100 - 25);
  //     const translateY = -(y * 100 - 25);
  //     overlayImg.style.transform = `translate(${translateX}%, ${translateY}%)`;
  //   });
  // });


  /* ─────────────────────────────────────────
     9. SMOOTH SCROLL for anchor links
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        // Offset for sticky nav
        const offset = mainNav ? mainNav.offsetHeight + 12 : 80;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

}); // end DOMContentLoaded
