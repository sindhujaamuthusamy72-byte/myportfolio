/**
 * Sindhuja Muthusamy - Portfolio Interactions
 * Human-First, Lightweight, Accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initAboutNotebook();
  initJourneyBooks();
  initProjectFilters();
  initCopyEmail();
  initModals();
  initQuickNoteForm();
});

function initAboutNotebook() {
  const notebook = document.querySelector('.about-editorial');
  if (!notebook) return;

  if (!('IntersectionObserver' in window)) {
    notebook.classList.add('is-visible');
    return;
  }

  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    notebook.classList.add('is-visible');
    observer.disconnect();
  }, { threshold: 0.2 });

  observer.observe(notebook);
}

/* --- 1. Theme Toggle (Warm Paper / Midnight Ink) --- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('sindhuja_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
    updateThemeIcon(storedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('sindhuja_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const sunIcon = document.querySelector('.icon-sun');
  const moonIcon = document.querySelector('.icon-moon');
  if (!sunIcon || !moonIcon) return;

  if (theme === 'dark') {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}

/* --- 2. Mobile Navigation --- */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.innerHTML = isOpen
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });
  });
}

/* --- 3. Academic Journey Books --- */
function initJourneyBooks() {
  const books = document.querySelectorAll('[data-journey-book]');
  const reader = document.getElementById('journey-reader');
  if (!books.length || !reader) return;

  const bookPages = {
    'grade-10': {
      title: '10th Grade',
      year: '2023',
        pages: [
          { kicker: 'The first chapter', title: '10th Grade', text: 'This was a good year academically, but I was still imagining a very different future for myself.', paragraphs: ['I scored 488/500 and finished 3rd in my school, including a centum in Science. The result mattered to me because it showed that the effort I was putting into school was beginning to come together.'], bullets: ['The Way to Success examination took me beyond the classroom: I became a finalist and travelled to Trichy for the final stage.', 'At that point, I was still imagining myself becoming a cardiologist.'], closing: 'I had not started thinking about computer science yet; that came later.' },
          { kicker: 'A small turning point', title: 'Looking back', text: 'The academic results were one part of the year. The other part was simply being at an age where my plans still felt open.', paragraphs: ['Becoming a finalist and travelling for the examination gave me a glimpse of opportunities outside my usual school routine. It was memorable without needing to become a dramatic turning point.'], bullets: ['488/500 and 3rd place in school.', 'Centum in Science.', 'Finalist in the Way to Success examination.'], closing: 'The future I pictured then was different from the one I am building now.' }
      ]
    },
    'grade-11': {
      title: '11th Grade',
      year: '2024',
      pages: [
        { kicker: 'A change in direction', title: '11th Grade', text: 'I chose the Computer Science + IIT-oriented path in 11th grade. The decision came after circumstances made me rethink the path I had originally imagined, and I gradually began exploring a different direction.', paragraphs: ['It was not a decision I arrived at instantly. I was still working out what made sense for me, rather than treating the change as a single dramatic moment.'], closing: 'The direction changed, but the work of figuring it out continued.' },
        { kicker: 'The year', title: 'Keeping up with the work', text: 'Academically, 11th grade was a strong year. I scored 586/600 and finished 2nd in both my school and at the district level.', bullets: ['I scored 586/600 and finished 2nd in my school.', 'I also secured 2nd place at the district level.', 'I was the only student among 700+ students to score a centum in Physics.'], closing: 'The results gave the new direction some confidence, even though I was still learning what it meant.' }
      ]
    },
    'grade-12': {
      title: '12th Grade',
      year: '2025',
      pages: [
        { kicker: 'The final school year', title: '12th Grade', text: 'By 12th grade, the new direction felt more settled. I finished 1st in my school with 594/600.', paragraphs: ['There was a lot to balance that year, but the result gave a clear ending to my school journey and a starting point for the decisions that came next.'], bullets: ['594/600 and 1st in my school.', '198 in the TNEA cutoff.'], closing: 'The next question was where to take that result.' },
        { kicker: 'A small memory', title: 'Slightly too late', text: 'I scored 92 percentile in JEE Main and missed qualifying for JEE Advanced by just one mark.', paragraphs: ['My marks improved after revaluation, but by the time the function where I could have met CM Vijay had ended, the updated total had already come through. I missed it by timing.'], bullets: ['92 percentile in JEE Main.', 'Missed JEE Advanced qualification by one mark.', 'The revaluation result arrived after the function.'], closing: 'It is still one of the more unexpectedly funny details from that period.' }
      ]
    },
    'rec-year-one': {
      title: '1st Year — REC',
      year: '2025–26',
      pages: [
        { kicker: 'Starting college', title: '1st Year — REC', text: 'I chose Rajalakshmi Engineering College for my Computer Science & Engineering degree. Many people questioned why I chose REC instead of colleges such as CEG, MIT or SSN.', paragraphs: ['For me, the decision was also about reducing the financial burden on my parents. I chose to study at REC with a full fee waiver for all four years. It was a practical decision that mattered to my family.'], closing: 'Once I arrived, I gave myself time to explore.' },
        { kicker: 'Finding my direction', title: 'Trying things out', text: 'My first year became less about choosing one career immediately and more about exploring different areas of Computer Science.', paragraphs: ['Eventually, I found myself drawn towards frontend development. I have always imagined things visually, and building interfaces gave me a way to turn those ideas into something people could actually see and use.'], closing: 'That was the first area that felt especially natural to me.' },
        { kicker: 'The year', title: 'A few things I carried forward', text: 'I finished the year with a 9.6 CGPA. I also won a Tamil quiz conducted by Yaazh Tamil Mandram, REC, and received a ₹1,000 cash prize.', bullets: ['The CGPA reflected the work I put into my first year.', 'The quiz was a different kind of achievement, and a fun one to take home.'], closing: 'By the end of first year, I had a clearer interest but still plenty left to learn.' }
      ]
    },
    'rec-year-two': {
      title: '2nd Year',
      year: '2026–present',
      pages: [
        { kicker: 'An ongoing chapter', title: '2nd Year', text: 'This is where the journey started becoming more hands-on. I began taking problem solving, coding and building things more seriously.', paragraphs: ['I started my LeetCode journey and have now solved 200+ problems with 120+ active days. The numbers are useful markers, but the bigger change has been making practice part of my routine.'], closing: 'I also started participating more actively in hackathons.' },
        { kicker: 'Working with teams', title: 'Hackathons', text: 'Hackathons gave me a way to work on ideas with other people and make decisions within a limited amount of time.', bullets: ['At SRM Designathon, my team became a finalist and finished in the Top 10 among 80+ teams.', 'At REC’s SIH Internal Hackathon 2026, we qualified through the internal hackathon among 500+ participating teams.'], closing: 'This chapter is still being written.' }
      ]
    }
  };

  const journeyLibrary = document.getElementById('journey-library');
  const readerTitle = document.getElementById('journey-reader-title');
  const readerYear = document.getElementById('journey-reader-year');
  const pageFrame = document.getElementById('journey-page-frame');
  const pageContent = document.getElementById('journey-page-content');
  const pageNumber = document.getElementById('journey-page-number');
  const pageCount = document.getElementById('journey-page-count');
  const previousBtn = document.getElementById('journey-prev');
  const nextBtn = document.getElementById('journey-next');
  const closeBtn = document.getElementById('journey-reader-close');
  let activeBook = null;
  let activeCover = null;
  let currentPage = 0;
  let touchStartX = 0;
  let isPageAnimating = false;

  function pageMarkup(page) {
    const title = page.title ? `<h4>${page.title}</h4>` : '';
    const text = page.text ? `<p class="page-lede">${page.text}</p>` : '';
    const paragraphs = page.paragraphs ? page.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('') : '';
    const bullets = page.bullets ? `<ul>${page.bullets.map(item => `<li>${item}</li>`).join('')}</ul>` : '';
    const closing = page.closing ? `<p class="page-closing">${page.closing}</p>` : '';
    return `<div class="page-kicker">${page.kicker}</div>${title}<div class="page-rule" aria-hidden="true"></div>${text}${paragraphs}${bullets}${closing}`;
  }

  function renderPage(direction) {
    const pages = bookPages[activeBook].pages;
    pageCount.textContent = `${String(currentPage + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`;

    previousBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= pages.length - 1;

    function updatePageContent() {
      pageContent.innerHTML = pageMarkup(pages[currentPage]);
      pageNumber.textContent = String(currentPage + 1).padStart(2, '0');
    }

    if (!direction) {
      updatePageContent();
      return;
    }

    isPageAnimating = true;
    pageFrame.classList.remove('is-changing-next', 'is-changing-previous');
    void pageFrame.offsetWidth;
    pageFrame.classList.add(direction === 'next' ? 'is-changing-next' : 'is-changing-previous');

    window.setTimeout(() => {
      updatePageContent();
    }, 90);

    window.setTimeout(() => {
      pageFrame.classList.remove('is-changing-next', 'is-changing-previous');
      isPageAnimating = false;
    }, 300);
  }

  function openBook(bookId, cover) {
    const data = bookPages[bookId];
    if (!data) return;

    activeBook = bookId;
    activeCover = cover;
    currentPage = 0;
    reader.setAttribute('data-book-theme', bookId);
    readerTitle.textContent = data.title;
    readerYear.textContent = data.year;
    journeyLibrary.hidden = true;
    reader.hidden = false;
    document.body.style.overflow = 'hidden';
    pageFrame.hidden = false;
    renderPage();
    closeBtn.focus();
  }

  function closeBook() {
    reader.hidden = true;
    journeyLibrary.hidden = false;
    document.body.style.overflow = '';
    activeBook = null;
    reader.removeAttribute('data-book-theme');
    if (activeCover) activeCover.focus();
    activeCover = null;
  }

  function movePage(direction) {
    if (!activeBook || isPageAnimating) return;
    const pages = bookPages[activeBook].pages;
    const nextPage = currentPage + (direction === 'next' ? 1 : -1);
    if (nextPage < 0 || nextPage >= pages.length) return;
    currentPage = nextPage;
    renderPage(direction);
  }

  books.forEach(book => {
    const cover = book.querySelector('.book-cover');
    const bookId = book.getAttribute('data-journey-book');
    if (!cover || !bookPages[bookId]) return;
    cover.setAttribute('aria-expanded', 'false');
    cover.addEventListener('click', () => openBook(bookId, cover));
  });

  previousBtn.addEventListener('click', () => movePage('previous'));
  nextBtn.addEventListener('click', () => movePage('next'));
  closeBtn.addEventListener('click', closeBook);

  pageFrame.addEventListener('touchstart', event => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  pageFrame.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) < 45) return;
    movePage(distance < 0 ? 'next' : 'previous');
  }, { passive: true });

  document.addEventListener('keydown', event => {
    if (reader.hidden) return;
    if (event.key === 'Escape') closeBook();
    if (event.key === 'ArrowRight') movePage('next');
    if (event.key === 'ArrowLeft') movePage('previous');
  });

  window.addEventListener('resize', () => {
    if (!reader.hidden && pageFrame && !pageFrame.hidden) renderPage();
  });
}

/* --- 4. Project Filter Tabs --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardStatus = card.getAttribute('data-status');
        if (filter === 'all' || cardStatus === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 5. Copy Email Helper --- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const feedback = document.getElementById('copy-feedback');
  const email = 'msindhujaa1@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      if (feedback) {
        feedback.style.display = 'inline';
        setTimeout(() => {
          feedback.style.display = 'none';
        }, 2500);
      }
    } catch (err) {
      // Fallback
      window.location.href = `mailto:${email}`;
    }
  });
}

/* --- 6. Interactive Modals (Article Reader & Project Deep-Dives) --- */
const modalContentMap = {
  'beyond-chatgpt-detail': {
    title: 'Beyond ChatGPT: 11 AI Tools Every College Student Should Explore in 2026',
    content: `
      <div class="article-reading-container">
        <p class="lead"><em>By Sindhuja Muthusamy • Published on <a href="https://thestudentstacktech.blogspot.com/" target="_blank" rel="noopener">The Student Stack</a></em></p>
        <p>When people talk about AI tools, they often focus purely on asking ChatGPT a question and receiving an answer. But in 2026, AI has evolved into specialized, purpose-built tools that solve specific college challenges: organizing complex research, visualizing difficult algorithms, and automating repetitive tasks.</p>

        <h2>11 High-Impact AI Tools for Students:</h2>
        <ul>
          <li><strong>1. NotebookLM (Google):</strong> An AI research assistant grounded exclusively in your own uploaded lecture notes, textbook chapters, and research papers — generating citations and study guides without generic hallucinations.</li>
          <li><strong>2. Napkin AI:</strong> Instantly transforms walls of text or complex explanations into clean, visual diagrams, flowcharts, and mind maps for visual revision.</li>
          <li><strong>3. n8n:</strong> Visual, node-based workflow automation allowing you to connect web services, APIs, and AI agents without building custom backends.</li>
          <li><strong>4. Apify:</strong> Web scraping and data extraction cloud platform to collect real-world datasets for academic research and college projects.</li>
          <li><strong>5. Google Antigravity:</strong> An advanced agentic AI development environment where agents assist in planning, coding, running, and testing full-stack software applications.</li>
          <li><strong>6. Wolfram Alpha:</strong> Computational engine for exact mathematics, differential equations, physics, and engineering problem verification.</li>
          <li><strong>7. Quizlet AI:</strong> Adaptive flashcards and spaced repetition study sets generated from course syllabi.</li>
          <li><strong>8. StealthWriter:</strong> Refines AI-assisted drafts into natural, human phrasing to eliminate robotic repetition.</li>
          <li><strong>9. Grok:</strong> Real-time conversational search and multi-perspective topic exploration.</li>
          <li><strong>10. Rufus (Amazon):</strong> AI shopping assistant to compare laptops, tech accessories, and college gear.</li>
          <li><strong>11. ChatGPT Plus / Claude:</strong> Broad foundational brainstorming and contextual synthesis.</li>
        </ul>

        <h2>The True Superpower: Combining Tools into Workflows</h2>
        <p>You don't need to learn all 11 at once. The real advantage comes from chaining two complementary tools together:</p>
        <ul>
          <li><strong>Visual Exam Prep:</strong> NotebookLM (synthesize lecture PDFs) → Napkin AI (convert concepts into diagrams) → Revise visually.</li>
          <li><strong>Data Extraction & Automation:</strong> Apify (extract web data) → n8n (process and pipe into Google Sheets or Firebase).</li>
          <li><strong>End-to-End Project Development:</strong> Antigravity (plan and build full-stack code) → n8n (automate backend notification webhooks).</li>
        </ul>

        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
          <a href="https://thestudentstacktech.blogspot.com/2026/09/beyond-chatgpt-11-ai-tools-every-college-student-must-explore-in-2026.html#more" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
            <span>Read full article on Blogger</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    `
  },
  'article-web-journey': {
    title: 'What Really Happens When You Open a Website? The Journey From Browser to Database',
    content: `
      <div class="article-reading-container">
        <p class="lead"><em>By Sindhuja Muthusamy • Published on <a href="https://thestudentstacktech.blogspot.com/" target="_blank" rel="noopener">The Student Stack</a></em></p>
        <p>When you type an address like <code>google.com</code> into your browser and press Enter, something remarkable happens behind the scenes in a fraction of a second. As a computer science student, breaking down this exact journey helped me understand how the entire internet ties together.</p>
        
        <h2>1. The Address Book of the Internet (DNS Resolution)</h2>
        <p>Computers don't communicate using names like "google.com"; they communicate using numeric IP addresses (like <code>142.250.190.46</code>). The very first step is looking up that address.</p>
        <p>Your browser first checks its local cache. If it doesn't find it, it asks your operating system, then your ISP's recursive DNS resolver, and if needed, root name servers and Top-Level Domain (TLD) servers until the exact IP address is resolved.</p>

        <h2>2. Establishing the Handshake (TCP / TLS)</h2>
        <p>Now that the browser knows where to reach the server, it can't just blurt out data. It establishes a reliable connection through the TCP 3-way handshake:</p>
        <ul>
          <li><strong>SYN:</strong> Browser sends "Can we talk?"</li>
          <li><strong>SYN-ACK:</strong> Server responds "Yes, I'm ready!"</li>
          <li><strong>ACK:</strong> Browser confirms "Great, here I come."</li>
        </ul>
        <p>If you're using HTTPS (which almost every modern site does), a TLS/SSL cryptographic handshake occurs right after, negotiating encryption keys to ensure no one eavesdrops on your traffic.</p>

        <h2>3. The Request & The Server Response (HTTP)</h2>
        <p>Once the secure pipeline is open, your browser sends an HTTP GET request. A web server (like Nginx, Apache, or a cloud edge server) receives it, determines routing, and may query a database (SQL or NoSQL) to fetch dynamic user data.</p>

        <h2>4. The Browser Engine at Work (Parsing & Rendering)</h2>
        <p>The server replies with raw HTML bytes. Your browser engine transforms them:</p>
        <ul>
          <li><strong>HTML to DOM:</strong> Converts HTML tags into a Document Object Model tree.</li>
          <li><strong>CSS to CSSOM:</strong> Converts stylesheets into CSS Object Model rules.</li>
          <li><strong>Render Tree:</strong> Combines DOM and CSSOM to calculate which elements are visible.</li>
          <li><strong>Layout (Reflow):</strong> Calculates the exact geometric coordinates of each element on the viewport.</li>
          <li><strong>Paint:</strong> Fills pixels with colors, borders, shadows, and text onto layers.</li>
          <li><strong>Compositing:</strong> Renders layers onto your screen in proper order.</li>
        </ul>

        <h2>Final Reflection</h2>
        <p>All of this happens in 200–500 milliseconds. Every web developer should know this sequence, because performance bottlenecks, security flaws, and caching opportunities all live inside these four stages.</p>

        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
          <a href="https://thestudentstacktech.blogspot.com/2026/09/what-really-happens-when-you-open-a-website.html#more" target="_blank" rel="noopener" class="btn btn-primary btn-sm">
            <span>Read full article on Blogger</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    `
  },
  'rakshanet-detail': {
    title: 'RakshaNet — SIH 2026 Internal Hackathon',
    content: `
      <div>
        <p class="lead"><strong>Problem Statement ID:</strong> 26043</p>
        <p><strong>Problem Statement:</strong> <em>"A digital platform to crowdsource societal challenges and facilitate collaborative problem solving through universities and industry partnership."</em></p>
        <h3>Project Status</h3>
        <p>Currently in active development as part of the Smart India Hackathon (SIH) 2026 Internal Hackathon at Rajalakshmi Engineering College.</p>
        <h3>Core Vision</h3>
        <p>RakshaNet acts as a unified digital bridge where local communities, non-governmental bodies, and public stakeholders can report real-world societal problems. Universities (faculty and student researchers) and industry mentors can adopt these problems, form cross-functional teams, and build viable prototypes.</p>
        <h3>Key Architectural Focus Areas</h3>
        <ul>
          <li>Crowdsourced challenge submission with media attachments and geo-tagging.</li>
          <li>Transparent review and validation pipeline for university faculty.</li>
          <li>Collaborative problem workspace connecting student teams to industry advisors.</li>
          <li>Milestone verification and open-access solution repository.</li>
        </ul>
      </div>
    `
  },
  'debug-diary-detail': {
    title: 'Debug Diary AI — Intelligent Debugging Journal',
    content: `
      <div>
        <p class="lead"><em>"Things I broke. Things I learned. Things I built."</em></p>
        <p>As a student learning programming and problem solving, I quickly realized that the bugs you struggle with for hours teach you far more than the code that runs on the first try. However, most developers solve an issue and move on, forgetting the exact fix when the same bug reappears months later.</p>
        <h3>Proposed Features</h3>
        <ul>
          <li><strong>Error Snapshot & Log Analyzer:</strong> Upload error traces and document the debugging hypotheses tested.</li>
          <li><strong>Personalized Learning Insights:</strong> Identifies recurring logical or syntactical blindspots over time.</li>
          <li><strong>Consistency & Streak Tracker:</strong> Encourages daily problem solving and reflection.</li>
          <li><strong>Nearby Hackathon & Opportunity Radar:</strong> Recommends student competitions matching skills currently being practiced.</li>
        </ul>
        <p>This project is deeply personal because it reflects my own journey of documenting every mistake as a stepping stone.</p>
      </div>
    `
  },
  'rec-voice-detail': {
    title: 'REC Voice — Anonymous Student Feedback Portal',
    content: `
      <div>
        <p class="lead">Improving constructive communication between students and college management at Rajalakshmi Engineering College.</p>
        <h3>Why REC Voice?</h3>
        <p>Students often hesitate to share candid feedback regarding campus facilities, lab infrastructure, or cafeteria services due to hesitation or fear of identification. REC Voice solves this through verified anonymous submissions.</p>
        <h3>Key Capabilities</h3>
        <ul>
          <li><strong>Anonymous Complaints & Suggestions:</strong> Secure reporting without revealing student identities.</li>
          <li><strong>Thumbs-Up Community Voting:</strong> Allows students to upvote shared concerns to highlight collective urgency.</li>
          <li><strong>Priority Classification:</strong> High, Medium, and Low severity categorization for administrators.</li>
          <li><strong>Transparent Status Workflow:</strong> Tracks issues from <em>Pending</em> to <em>Under Review</em> to <em>Approved / Resolved</em>.</li>
          <li><strong>Clean Responsive Layout:</strong> Accessible across mobile and desktop.</li>
        </ul>
      </div>
    `
  }
};

function initModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modalOverlay || !modalTitle || !modalBody || !closeBtn) return;

  // Open modal trigger
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetKey = trigger.getAttribute('data-modal-target');
      const data = modalContentMap[targetKey];

      if (data) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --- 7. Quick Note Form --- */
function initQuickNoteForm() {
  const noteForm = document.getElementById('quick-note-form');
  const noteStatus = document.getElementById('note-status');

  if (!noteForm) return;

  noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const noteInput = document.getElementById('note-message');
    const message = noteInput ? noteInput.value.trim() : '';

    if (message) {
      // Create friendly mailto fallback
      const subject = encodeURIComponent('Hi Sindhuja! (From your portfolio)');
      const body = encodeURIComponent(`${message}\n\nSent from portfolio quick note`);
      window.location.href = `mailto:msindhujaa1@gmail.com?subject=${subject}&body=${body}`;

      if (noteStatus) {
        noteStatus.textContent = 'Opening your email client... Thank you for reaching out!';
        noteStatus.style.display = 'block';
        setTimeout(() => {
          noteStatus.style.display = 'none';
          noteForm.reset();
        }, 5000);
      }
    }
  });
}
