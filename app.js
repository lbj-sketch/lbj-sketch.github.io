/* 个人网站 - 渲染逻辑：从 data.js 的 SITE 对象读取内容并填充页面 */
"use strict";

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s == null ? "" : s)
  .replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- 内联SVG图标 ---------- */
const ICONS = {
  email: '<svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.24-8 5.03-8-5.03V6.29l8 5.03 8-5.03v1.95z"/></svg>',
  wechat: '<svg viewBox="0 0 24 24"><path d="M8.69 3.5C4.98 3.5 2 6.05 2 9.2c0 1.77.94 3.35 2.4 4.4l-.6 1.9 2.1-1.13c.63.19 1.3.3 2 .32-.13-.44-.2-.9-.2-1.37 0-2.98 2.86-5.4 6.4-5.4.22 0 .44.01.66.03C14.1 5.5 11.63 3.5 8.69 3.5zM6.6 7.3a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7zm4.3 0a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7zM15.1 9.2c-3.02 0-5.5 2.03-5.5 4.53s2.48 4.53 5.5 4.53c.55 0 1.08-.07 1.58-.2l1.82.98-.5-1.6c1.25-.83 2.05-2.1 2.05-3.55 0-2.5-2.43-4.69-4.95-4.69zm-1.9 2.35a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm3.8 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/></svg>',
  github: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.26-.45-1.28.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.36.2 2.38.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path d="M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6.1 8H7c-1.71 0-3.1-1.39-3.1-3.1S5.29 8.9 7 8.9h3.9V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h3.9v-1.9zM8 13h8v-2H8v2z"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
};

/* ---------- 主题 ---------- */
function initTheme() {
  const saved = localStorage.getItem("theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = saved;
  $("themeBtn").textContent = saved === "dark" ? "☀️" : "🌙";
  $("themeBtn").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    $("themeBtn").textContent = next === "dark" ? "☀️" : "🌙";
  });
}

/* ---------- 渲染 ---------- */
function render() {
  const S = window.SITE || {};
  document.title = S.name ? `${S.name} · 个人网站` : "个人网站";
  $("navBrand").textContent = S.name || "个人网站";
  $("heroName").textContent = S.name || "你的名字";
  $("heroTitle").textContent = S.title || "";
  $("heroTagline").textContent = S.tagline || "";
  if (S.location) {
    $("heroLocation").style.display = "";
    $("heroLocation").innerHTML = `${ICONS.pin} ${esc(S.location)}`;
  }

  // 头像
  const av = $("avatar");
  if (S.avatarUrl) av.innerHTML = `<img src="${esc(S.avatarUrl)}" alt="头像">`;
  else av.textContent = S.avatarText || (S.name || "你").slice(0, 1);

  // 关于我
  const about = (S.about || []).filter(Boolean);
  if (about.length) $("aboutBody").innerHTML = about.map(p => `<p>${esc(p)}</p>`).join("");
  else $("about").style.display = "none";

  // 技能
  const skills = (S.skills || []).filter(s => s && s.name);
  if (skills.length) {
    $("skillsGrid").innerHTML = skills.map(s => `
      <div class="skill reveal">
        <div class="skill-head"><b>${esc(s.name)}</b><span>${Number(s.level) || 0}%</span></div>
        <div class="skill-bar"><i data-level="${Math.min(Math.max(Number(s.level) || 0, 0), 100)}"></i></div>
      </div>`).join("");
  } else $("skills").style.display = "none";

  // 经历
  const exp = (S.experience || []).filter(e => e && (e.org || e.role));
  if (exp.length) {
    $("timeline").innerHTML = exp.map(e => `
      <div class="tl-item reveal">
        <div class="tl-period">${esc(e.period)}</div>
        <div class="tl-org">${esc(e.org)}</div>
        <div class="tl-role">${esc(e.role)}</div>
        ${e.desc ? `<div class="tl-desc">${esc(e.desc)}</div>` : ""}
      </div>`).join("");
  } else $("experience").style.display = "none";

  // 项目
  const projects = (S.projects || []).filter(p => p && (p.name || p.desc));
  if (projects.length) {
    $("projectsGrid").innerHTML = projects.map(p => `
      <div class="project-card reveal">
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.desc)}</p>
        ${(p.tags || []).length ? `<div class="project-tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
        ${p.link ? `<a class="project-link" href="${esc(p.link)}" target="_blank" rel="noopener">查看详情 →</a>` : ""}
      </div>`).join("");
  } else $("projects").style.display = "none";

  // 联系方式
  const c = S.contact || {};
  const cards = [];
  if (c.email) cards.push({ icon: ICONS.email, k: "邮箱", v: c.email, href: `mailto:${c.email}` });
  if (c.wechat) cards.push({ icon: ICONS.wechat, k: "微信", v: c.wechat, href: "" });
  if (c.github) cards.push({ icon: ICONS.github, k: "GitHub", v: c.github.replace(/^https?:\/\/(github\.com\/)?/i, ""), href: c.github });
  if (c.blog) cards.push({ icon: ICONS.link, k: "主页 / 博客", v: c.blog.replace(/^https?:\/\//i, ""), href: c.blog });
  if (cards.length) {
    $("contactGrid").innerHTML = cards.map(x => `
      <a class="contact-card" ${x.href ? `href="${esc(x.href)}" target="_blank" rel="noopener"` : ""}>
        ${x.icon}<span><span class="cc-k">${esc(x.k)}</span><br><span class="cc-v">${esc(x.v)}</span></span>
      </a>`).join("");
  } else $("contact").style.display = "none";

  // 社交快捷入口（首屏）
  const social = [];
  if (c.github) social.push(`<a href="${esc(c.github)}" target="_blank" rel="noopener">${ICONS.github} GitHub</a>`);
  if (c.email) social.push(`<a href="mailto:${esc(c.email)}">${ICONS.email} 邮箱</a>`);
  if (c.blog) social.push(`<a href="${esc(c.blog)}" target="_blank" rel="noopener">${ICONS.link} 主页</a>`);
  if (social.length) $("socials").innerHTML = social.join("");

  $("footer").textContent = S.footer || "";
}

/* ---------- 滚动渐入 + 技能条动画 ---------- */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add("visible");
      en.target.querySelectorAll(".skill-bar i").forEach(bar => {
        bar.style.width = bar.dataset.level + "%";
      });
      io.unobserve(en.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal, .skills-grid .skill").forEach(el => io.observe(el));
}

initTheme();
render();
initReveal();
