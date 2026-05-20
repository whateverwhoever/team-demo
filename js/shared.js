// shared.js — 通用组件与工具

window.AnxinHome = window.AnxinHome || {};

// ========== Topbar ==========
AnxinHome.renderTopbar = function (activeNav) {
  const navs = [
    { key: 'home', label: '我的项目', href: 'index.html' },
    { key: 'workspace', label: '工作台', href: 'modeling.html' },
    { key: 'furniture', label: '家具库', href: 'furniture.html' },
    { key: 'tips', label: '避坑百科', href: 'tips.html' },
  ];
  return `
    <header class="topbar">
      <a class="brand" href="index.html">
        <img class="brand-icon" src="assets/logo.png" alt="安心家" width="32" height="32">
        <div>安心家
          <span class="brand-tag">装修不慌,AI 兜底</span>
        </div>
      </a>
      <nav class="nav">
        ${navs.map(n => `<a href="${n.href}" class="${n.key === activeNav ? 'active' : ''}">${n.label}</a>`).join('')}
      </nav>
      <div class="right">
        <button class="btn btn-ghost btn-sm">📤 分享</button>
        <button class="btn btn-soft btn-sm">💾 保存</button>
        <div class="avatar">林</div>
      </div>
    </header>
  `;
};

// ========== Workflow Progress ==========
AnxinHome.renderProgress = function (currentStep) {
  const steps = [
    { key: 'modeling', label: '基础建模', href: 'modeling.html' },
    { key: 'global', label: '整体设计', href: 'global-design.html' },
    { key: 'refinement', label: '局部微调', href: 'refinement.html' },
    { key: 'delivery', label: '成品交付', href: 'delivery.html' },
  ];
  const currentIdx = steps.findIndex(s => s.key === currentStep);
  return `
    <div class="workflow-progress">
      ${steps.map((s, i) => {
        const cls = i < currentIdx ? 'done' : i === currentIdx ? 'active' : '';
        const dotContent = i < currentIdx ? '✓' : (i + 1);
        const stepHtml = `
          <a href="${s.href}" class="workflow-step ${cls}">
            <div class="dot">${dotContent}</div>
            <span>${s.label}</span>
          </a>
        `;
        const conn = i < steps.length - 1
          ? `<div class="workflow-connector ${i < currentIdx ? 'done' : ''}"></div>`
          : '';
        return stepHtml + conn;
      }).join('')}
    </div>
  `;
};

// ========== Toast ==========
AnxinHome.toast = function ({ type = 'warn', title, msg, duration = 5500 }) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { warn: '⚠️', danger: '🚨', info: '💡', success: '✅' };
  const node = document.createElement('div');
  node.className = `toast ${type}`;
  node.innerHTML = `
    <div class="icon">${icons[type] || '💡'}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
    <button class="close-btn">×</button>
  `;
  node.querySelector('.close-btn').onclick = () => node.remove();
  container.appendChild(node);
  if (duration > 0) {
    setTimeout(() => {
      node.style.opacity = '0';
      node.style.transition = '0.3s';
      setTimeout(() => node.remove(), 300);
    }, duration);
  }
};

// ========== Modal (Checklist) ==========
AnxinHome.showChecklist = function ({ title, sub, items, onClose }) {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = `
    <div class="modal" onclick="event.stopPropagation()">
      <h3 class="modal-title">${title}</h3>
      <p class="modal-sub">${sub}</p>
      <div class="checklist">
        ${items.map((it, i) => `
          <div class="checklist-item" data-i="${i}">
            <div class="check-box"></div>
            <div>
              <div style="font-weight:600;color:var(--color-deep);">${it.title}</div>
              <div style="color:var(--color-mute);font-size:12px;margin-top:2px;">${it.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="flex gap-2" style="justify-content:flex-end;">
        <button class="btn btn-ghost" id="checklist-skip">稍后再看</button>
        <button class="btn btn-primary" id="checklist-done">我都检查了</button>
      </div>
    </div>
  `;
  backdrop.onclick = () => backdrop.remove();
  backdrop.querySelectorAll('.checklist-item').forEach(el => {
    el.onclick = () => el.classList.toggle('checked');
  });
  backdrop.querySelector('#checklist-skip').onclick = () => backdrop.remove();
  backdrop.querySelector('#checklist-done').onclick = () => {
    backdrop.remove();
    AnxinHome.toast({ type: 'success', title: '已记录', msg: '本区域检查项已记录到提醒清单。' });
    if (onClose) onClose();
  };
  document.body.appendChild(backdrop);
};

// ========== Chat helpers ==========
AnxinHome.appendBubble = function (container, { role, text, html, withTyping = false }) {
  if (withTyping) {
    const typing = document.createElement('div');
    typing.className = `bubble ${role}`;
    typing.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
    return typing;
  }
  const bubble = document.createElement('div');
  bubble.className = `bubble ${role}`;
  if (role === 'ai') {
    bubble.innerHTML = `<div class="ai-tag">🤖 AI 助手</div>${html || text}`;
  } else if (role === 'system') {
    bubble.innerHTML = html || text;
  } else {
    bubble.innerHTML = html || text;
  }
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  return bubble;
};

AnxinHome.appendOptions = function (container, options, onSelect) {
  const wrap = document.createElement('div');
  wrap.className = 'option-cards';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-card';
    btn.textContent = opt.label;
    btn.onclick = () => {
      wrap.querySelectorAll('.option-card').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      onSelect && onSelect(opt);
    };
    wrap.appendChild(btn);
  });
  container.appendChild(wrap);
  container.scrollTop = container.scrollHeight;
  return wrap;
};

// ========== Utility: delay ==========
AnxinHome.delay = (ms) => new Promise(r => setTimeout(r, ms));

// ========== Mount helpers ==========
AnxinHome.mount = function (selector, html) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = html;
};
