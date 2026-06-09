(function () {
  "use strict";

  const DATA = window.GAME_DATA;
  const STORAGE_KEY = "cyberquest_ops_save_v1";
  const XP_PER_LEVEL = 500;
  const TIP_LIBRARY = [
    { title: "Scope before skills", text: "Before touching any target, ask: is it allowed, written in scope, and safe to test?", tags: ["core", "ethics", "choice", "dashboard"] },
    { title: "Evidence wins missions", text: "Do not guess. Collect one clear clue, write it down, then make your decision.", tags: ["terminal", "notebook", "soc", "network"] },
    { title: "One path is enough", text: "You do not need to master every district today. Pick one path and clear the next mission.", tags: ["paths", "map", "dashboard"] },
    { title: "Web hacker habit", text: "For web missions, think in this order: request, session, authorization, data, fix.", tags: ["web", "patch", "report"] },
    { title: "Network explorer habit", text: "In network missions, map the system first. Services, ports, and rules tell the story.", tags: ["network", "terminal"] },
    { title: "Blue team mindset", text: "A defender builds a timeline: what happened first, what changed, what should be contained?", tags: ["soc", "report"] },
    { title: "WordPress guardian move", text: "For WordPress cases, check roles, nonces, plugin logic, file permissions, and backups.", tags: ["wordpress", "patch"] },
    { title: "Cloud safety move", text: "Cloud security often starts with least privilege: give identities only what they need.", tags: ["cloud", "patch"] },
    { title: "Report like a pro", text: "A good finding explains scope, evidence, impact, and a fix a developer can actually apply.", tags: ["report", "capstone"] },
    { title: "Hints are training wheels", text: "Use mentor hints when stuck. The goal is not speed; the goal is building repeatable thinking.", tags: ["mission", "choice", "terminal"] },
    { title: "Fix after finding", text: "CyberQuest rewards both discovery and repair. Every weakness should end with a safer design.", tags: ["patch", "web", "wordpress", "cloud"] },
    { title: "Stay simulated", text: "Everything here is fictional training. Never test real websites, networks, or accounts without permission.", tags: ["core", "ethics", "mission"] }
  ];

  let state = loadState();
  let currentView = "dashboard";
  let currentMissionId = null;
  let tipCounter = 0;
  let lastTipText = "";
  let tipTimer = null;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function defaultState() {
    const pathXp = {};
    DATA.paths.forEach((path) => { pathXp[path.id] = 0; });
    return {
      alias: "Rookie",
      xp: 0,
      credits: 150,
      ethics: 100,
      reputation: 0,
      completed: {},
      badges: [],
      evidence: [],
      reports: [],
      pathXp,
      activeMission: null,
      missionProgress: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return migrateState(parsed);
    } catch (error) {
      console.warn("Failed to load save. Starting fresh.", error);
      return defaultState();
    }
  }

  function migrateState(save) {
    const base = defaultState();
    const merged = Object.assign(base, save || {});
    merged.completed = merged.completed || {};
    merged.badges = Array.isArray(merged.badges) ? merged.badges : [];
    merged.evidence = Array.isArray(merged.evidence) ? merged.evidence : [];
    merged.reports = Array.isArray(merged.reports) ? merged.reports : [];
    merged.pathXp = Object.assign(base.pathXp, merged.pathXp || {});
    merged.missionProgress = merged.missionProgress || {};
    merged.ethics = clamp(Number(merged.ethics || 100), 0, 100);
    merged.credits = Math.max(0, Number(merged.credits || 0));
    merged.xp = Math.max(0, Number(merged.xp || 0));
    return merged;
  }

  function saveState(showToast) {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (showToast) toast("Game saved", "Your progress is stored in this browser.");
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function textToHtml(value) {
    return escapeHtml(value).replace(/\n/g, "<br>");
  }

  function getLevel() {
    return Math.floor(state.xp / XP_PER_LEVEL) + 1;
  }

  function levelProgress() {
    const currentBase = (getLevel() - 1) * XP_PER_LEVEL;
    const nextBase = getLevel() * XP_PER_LEVEL;
    const current = state.xp - currentBase;
    return {
      current,
      next: XP_PER_LEVEL,
      percent: clamp((current / XP_PER_LEVEL) * 100, 0, 100),
      nextTotal: nextBase
    };
  }

  function getRank() {
    const level = getLevel();
    let rank = DATA.rankNames[0].rank;
    DATA.rankNames.forEach((entry) => {
      if (level >= entry.level) rank = entry.rank;
    });
    return rank;
  }

  function getPath(id) {
    return DATA.paths.find((path) => path.id === id);
  }

  function getMission(id) {
    return DATA.missions.find((mission) => mission.id === id);
  }

  function getMissionsForPath(pathId) {
    return DATA.missions.filter((mission) => mission.path === pathId);
  }

  function isCompleted(missionId) {
    return Boolean(state.completed[missionId]);
  }

  function completedCount() {
    return Object.keys(state.completed).length;
  }

  function isMissionUnlocked(mission) {
    if (!mission || isCompleted(mission.id)) return true;
    const unlock = mission.unlock || {};
    if (unlock.level && getLevel() < unlock.level) return false;
    if (unlock.completed && unlock.completed.some((id) => !isCompleted(id))) return false;
    if (unlock.completedAny && !unlock.completedAny.some((id) => isCompleted(id))) return false;
    if (unlock.completedCount && completedCount() < unlock.completedCount) return false;
    return true;
  }

  function missionStatus(mission) {
    if (isCompleted(mission.id)) return "done";
    if (!isMissionUnlocked(mission)) return "locked";
    return "available";
  }

  function unlockText(mission) {
    const unlock = mission.unlock || {};
    const pieces = [];
    if (unlock.level) pieces.push(`Reach level ${unlock.level}`);
    if (unlock.completed && unlock.completed.length) {
      pieces.push(`Complete ${unlock.completed.map((id) => getMission(id)?.title || id).join(", ")}`);
    }
    if (unlock.completedAny && unlock.completedAny.length) {
      pieces.push(`Complete one of: ${unlock.completedAny.map((id) => getMission(id)?.title || id).join(", ")}`);
    }
    if (unlock.completedCount) pieces.push(`Complete ${unlock.completedCount} missions`);
    return pieces.length ? pieces.join(". ") : "Available now";
  }

  function initials(name) {
    const parts = String(name || "Rookie").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "R";
    return parts.slice(0, 2).map((part) => part[0].toUpperCase()).join("");
  }

  function tipCandidates(context) {
    const tags = [];
    const ctx = context || {};
    if (ctx.view) tags.push(ctx.view);
    if (ctx.path) tags.push(ctx.path);
    if (ctx.type) tags.push(ctx.type);
    if (Array.isArray(ctx.missionTags)) ctx.missionTags.forEach((tag) => tags.push(tag));

    const matched = TIP_LIBRARY.filter((tip) => (tip.tags || []).some((tag) => tags.includes(tag)));
    return matched.length ? matched : TIP_LIBRARY;
  }

  function hashString(value) {
    return String(value || "tip").split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  }

  function pickRandomTip(context) {
    const pool = tipCandidates(context);
    let tip = pool[Math.floor(Math.random() * pool.length)] || TIP_LIBRARY[0];
    if (pool.length > 1 && tip.text === lastTipText) {
      tip = pool[(pool.indexOf(tip) + 1) % pool.length];
    }
    lastTipText = tip.text;
    return tip;
  }

  function pickDeterministicTip(context, seed) {
    const pool = tipCandidates(context);
    return pool[hashString(seed) % pool.length] || TIP_LIBRARY[0];
  }

  function showTip(context, animate) {
    const title = $("#tipTitle");
    const text = $("#tipText");
    const banner = $("#tipBanner");
    if (!title || !text || !banner) return null;
    const tip = pickRandomTip(context);
    title.textContent = tip.title;
    text.textContent = tip.text;
    if (animate) {
      banner.classList.remove("pulse");
      void banner.offsetWidth;
      banner.classList.add("pulse");
    }
    return tip;
  }

  function maybeToastTip(context, force) {
    tipCounter += 1;
    if (!force && tipCounter % 3 !== 0) return;
    const tip = pickRandomTip(context);
    toast(`Tip: ${tip.title}`, tip.text);
  }

  function mentorTipHtml(mission, step, stepIndex) {
    const tip = pickDeterministicTip({
      path: mission.path,
      type: step.type,
      missionTags: mission.tags || []
    }, `${mission.id}:${stepIndex}:${step.type}`);
    return `
      <aside class="mentor-tip-card">
        <div class="mentor-avatar" aria-hidden="true">💬</div>
        <div>
          <p class="eyebrow">Mentor Tip</p>
          <h4>${escapeHtml(tip.title)}</h4>
          <p>${escapeHtml(tip.text)}</p>
        </div>
      </aside>
    `;
  }

  function init() {
    bindGlobalEvents();
    renderAll();
    showView("dashboard");
    showTip({ view: "dashboard" }, true);
    if (tipTimer) clearInterval(tipTimer);
    tipTimer = setInterval(() => {
      const mission = currentMissionId ? currentMission() : null;
      showTip({ view: currentView, path: mission ? mission.path : null });
    }, 28000);
  }

  function bindGlobalEvents() {
    $$(".nav-link").forEach((button) => {
      button.addEventListener("click", () => showView(button.dataset.view));
    });

    $("#hamburger").addEventListener("click", () => {
      $("#sidebar").classList.toggle("open");
    });

    document.addEventListener("click", (event) => {
      const actionTarget = event.target.closest("[data-action]");
      if (!actionTarget) return;
      const action = actionTarget.dataset.action;
      if (action === "goto-map") showView("map");
      if (action === "open-first-mission") openMission(firstAvailableMissionId() || "core-01");
      if (action === "close-mission") closeMission();
    });

    $("#quickSaveBtn").addEventListener("click", () => saveState(true));
    $("#continueBtn").addEventListener("click", () => {
      const next = state.activeMission || firstAvailableMissionId();
      if (next) openMission(next);
    });
    $("#activeCaseBtn").addEventListener("click", () => {
      const next = state.activeMission || firstAvailableMissionId();
      if (next) openMission(next);
    });

    $("#missionBackBtn").addEventListener("click", missionBack);
    $("#missionNextBtn").addEventListener("click", missionNext);
    $("#missionHintBtn").addEventListener("click", useMissionHint);
    $("#newTipBtn").addEventListener("click", () => {
      const mission = currentMissionId ? currentMission() : null;
      const tip = showTip({ view: currentView, path: mission ? mission.path : null }, true);
      if (tip) toast("Fresh mentor tip", tip.text);
    });

    $("#clearEvidenceBtn").addEventListener("click", () => {
      if (!state.evidence.length) return toast("Notebook already empty", "Collect evidence during missions to fill it.");
      if (confirm("Clear all evidence notes from this browser save?")) {
        state.evidence = [];
        saveState();
        renderNotebook();
        toast("Notebook cleared", "Evidence notes were removed from this local save.");
      }
    });

    $("#exportReportsBtn").addEventListener("click", exportReports);
    $("#exportSaveBtn").addEventListener("click", exportSave);
    $("#importSaveInput").addEventListener("change", importSave);
    $("#resetGameBtn").addEventListener("click", resetGame);
    $("#saveAliasBtn").addEventListener("click", saveAlias);
    $("#aliasInput").addEventListener("keydown", (event) => {
      if (event.key === "Enter") saveAlias();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !$("#missionModal").hidden) closeMission();
    });
  }

  function showView(view) {
    currentView = view;
    $$(".view").forEach((section) => section.classList.remove("active"));
    const target = $(`#view-${view}`);
    if (target) target.classList.add("active");
    $$(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
    const titles = {
      dashboard: "Command Center",
      map: "City Mission Map",
      paths: "Career Paths",
      skilltree: "Skill Tree",
      notebook: "Evidence Notebook",
      reports: "Reports",
      settings: "Settings"
    };
    $("#viewTitle").textContent = titles[view] || "CyberQuest Ops";
    $("#sidebar").classList.remove("open");
    showTip({ view }, true);

    if (view === "map") renderMap();
    if (view === "paths") renderPaths();
    if (view === "skilltree") renderSkillTree();
    if (view === "notebook") renderNotebook();
    if (view === "reports") renderReports();
    if (view === "settings") renderSettings();
    if (view === "dashboard") renderDashboard();
  }

  function renderAll() {
    updateStats();
    renderDashboard();
    renderMap();
    renderPaths();
    renderSkillTree();
    renderNotebook();
    renderReports();
    renderSettings();
  }

  function updateStats() {
    const level = getLevel();
    const rank = getRank();
    const progress = levelProgress();
    const alias = state.alias || "Rookie";

    $("#sidebarAlias").textContent = alias;
    $("#sidebarLevel").textContent = `Level ${level}`;
    $("#sidebarRank").textContent = rank;
    $("#sidebarXpBar").style.width = `${progress.percent}%`;

    $("#playerAlias").textContent = alias;
    $("#playerRank").textContent = rank;
    $("#avatarInitials").textContent = initials(alias);
    $("#statLevel").textContent = level;
    $("#statXp").textContent = state.xp;
    $("#statCredits").textContent = state.credits;
    $("#statEthics").textContent = state.ethics;
    $("#xpBar").style.width = `${progress.percent}%`;
    $("#nextLevelText").textContent = `${progress.current} / ${XP_PER_LEVEL} XP`;
  }

  function renderDashboard() {
    updateStats();
    renderRecommendedMissions();
    renderBadges();
    renderActiveCase();
  }

  function renderRecommendedMissions() {
    const container = $("#recommendedMissions");
    const missions = DATA.missions
      .filter((mission) => !isCompleted(mission.id) && isMissionUnlocked(mission))
      .slice(0, 5);

    if (!missions.length) {
      container.innerHTML = `<div class="empty-state">All current missions are complete. Open Capstone or reset the game to replay.</div>`;
      return;
    }

    container.innerHTML = missions.map((mission) => missionRowHtml(mission)).join("");
    $$('[data-start-mission]', container).forEach((button) => {
      button.addEventListener("click", () => openMission(button.dataset.startMission));
    });
  }

  function missionRowHtml(mission) {
    const path = getPath(mission.path);
    const status = missionStatus(mission);
    return `
      <div class="mission-row">
        <div>
          <span class="status-pill ${status}">${statusLabel(status)}</span>
          <h4>${escapeHtml(mission.title)}</h4>
          <p class="muted">${escapeHtml(mission.summary)}</p>
          <div class="tags">
            <span class="tag">${escapeHtml(path.shortName)}</span>
            <span class="tag">XP ${mission.xp}</span>
            <span class="tag">Difficulty ${mission.difficulty}</span>
          </div>
        </div>
        <button class="${status === "locked" ? "ghost-btn" : "primary-btn"}" data-start-mission="${mission.id}" ${status === "locked" ? "disabled" : ""}>${status === "done" ? "Replay" : status === "locked" ? "Locked" : "Start"}</button>
      </div>
    `;
  }

  function statusLabel(status) {
    if (status === "done") return "Complete";
    if (status === "locked") return "Locked";
    return "Available";
  }

  function renderBadges() {
    const container = $("#badgeList");
    const unlocked = DATA.badges.filter((badge) => state.badges.includes(badge.id));
    if (!unlocked.length) {
      container.innerHTML = `<div class="empty-state">No badges yet. Complete The White Hat Oath to unlock your first badge.</div>`;
      return;
    }
    container.innerHTML = unlocked.map((badge) => `
      <div class="badge">
        <div class="badge-icon">${escapeHtml(badge.icon)}</div>
        <div>
          <strong>${escapeHtml(badge.name)}</strong>
          <p class="muted">${escapeHtml(badge.description)}</p>
        </div>
      </div>
    `).join("");
  }

  function renderActiveCase() {
    const active = state.activeMission ? getMission(state.activeMission) : null;
    if (active && !isCompleted(active.id)) {
      $("#activeCaseTitle").textContent = active.title;
      $("#activeCaseSummary").textContent = active.summary;
      $("#activeCaseBtn").textContent = "Continue Mission";
      return;
    }
    const next = getMission(firstAvailableMissionId());
    if (next) {
      $("#activeCaseTitle").textContent = next.title;
      $("#activeCaseSummary").textContent = next.summary;
      $("#activeCaseBtn").textContent = "Start Recommended Mission";
    } else {
      $("#activeCaseTitle").textContent = "Campaign complete";
      $("#activeCaseSummary").textContent = "You cleared all current missions. Add more missions in assets/js/data.js.";
      $("#activeCaseBtn").textContent = "Open Map";
    }
  }

  function firstAvailableMissionId() {
    const mission = DATA.missions.find((item) => !isCompleted(item.id) && isMissionUnlocked(item));
    return mission ? mission.id : DATA.missions[0]?.id;
  }

  function renderMap() {
    const container = $("#cityMap");
    container.innerHTML = DATA.paths.map((path) => {
      const missions = getMissionsForPath(path.id);
      const complete = missions.filter((mission) => isCompleted(mission.id)).length;
      const total = missions.length;
      return `
        <article class="district ${escapeHtml(path.cityClass)}">
          <div class="district-head">
            <div>
              <p class="eyebrow">${escapeHtml(path.district)}</p>
              <h3>${escapeHtml(path.name)}</h3>
              <p class="muted">${escapeHtml(path.description)}</p>
            </div>
            <span class="status-pill available">${complete}/${total}</span>
          </div>
          <div class="district-missions">
            ${missions.map((mission) => missionChipHtml(mission)).join("")}
          </div>
        </article>
      `;
    }).join("");

    $$('[data-start-mission]', container).forEach((button) => {
      button.addEventListener("click", () => openMission(button.dataset.startMission));
    });
  }

  function missionChipHtml(mission) {
    const status = missionStatus(mission);
    const lockedReason = status === "locked" ? unlockText(mission) : mission.summary;
    return `
      <div class="mission-chip ${status}" title="${escapeHtml(lockedReason)}">
        <span class="mission-dot"></span>
        <div>
          <strong>${escapeHtml(mission.title)}</strong>
          <p class="muted">${status === "locked" ? escapeHtml(unlockText(mission)) : `XP ${mission.xp} - ${escapeHtml(mission.location)}`}</p>
        </div>
        <button class="${status === "locked" ? "ghost-btn" : "secondary-btn"}" data-start-mission="${mission.id}" ${status === "locked" ? "disabled" : ""}>${status === "done" ? "Replay" : status === "locked" ? "Locked" : "Play"}</button>
      </div>
    `;
  }

  function renderPaths() {
    const container = $("#pathGrid");
    container.innerHTML = DATA.paths.map((path) => {
      const missions = getMissionsForPath(path.id);
      const complete = missions.filter((mission) => isCompleted(mission.id)).length;
      const available = missions.filter((mission) => !isCompleted(mission.id) && isMissionUnlocked(mission)).length;
      const percent = missions.length ? Math.round((complete / missions.length) * 100) : 0;
      return `
        <article class="path-card">
          <div class="path-top">
            <div class="path-icon">${escapeHtml(path.icon)}</div>
            <span class="status-pill ${available ? "available" : percent === 100 ? "done" : "locked"}">${percent}%</span>
          </div>
          <p class="eyebrow">${escapeHtml(path.district)}</p>
          <h4>${escapeHtml(path.name)}</h4>
          <p class="muted">${escapeHtml(path.description)}</p>
          <div class="tags">
            <span class="tag">${complete}/${missions.length} complete</span>
            <span class="tag">${available} available</span>
            <span class="tag">${state.pathXp[path.id] || 0} XP</span>
          </div>
          <div class="bar"><span style="width:${percent}%"></span></div>
        </article>
      `;
    }).join("");
  }

  function renderSkillTree() {
    const container = $("#skillTree");
    container.innerHTML = DATA.paths.map((path) => {
      const missions = getMissionsForPath(path.id);
      const complete = missions.filter((mission) => isCompleted(mission.id)).length;
      const available = missions.some((mission) => isMissionUnlocked(mission));
      const percent = missions.length ? Math.round((complete / missions.length) * 100) : 0;
      return `
        <article class="skill-node ${available ? "" : "locked"}">
          <p class="eyebrow">${available ? "Unlocked" : "Locked"}</p>
          <h4>${escapeHtml(path.shortName)} Mastery</h4>
          <p class="muted">${escapeHtml(path.capstone)}</p>
          <div class="skill-meter"><span style="width:${percent}%"></span></div>
          <div class="tags">
            <span class="tag">${percent}% mastery</span>
            <span class="tag">${complete}/${missions.length} missions</span>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderNotebook() {
    const container = $("#evidenceList");
    if (!state.evidence.length) {
      container.innerHTML = `<div class="empty-state">No evidence yet. Complete terminal tasks to collect notes here.</div>`;
      return;
    }
    container.innerHTML = state.evidence.slice().reverse().map((item) => `
      <article class="evidence-card">
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.text)}</p>
        <small>${escapeHtml(item.missionTitle)} - ${new Date(item.time).toLocaleString()}</small>
      </article>
    `).join("");
  }

  function renderReports() {
    const container = $("#reportList");
    if (!state.reports.length) {
      container.innerHTML = `<div class="empty-state">No reports submitted yet. Web and boss missions include report challenges.</div>`;
      return;
    }
    container.innerHTML = state.reports.slice().reverse().map((report) => `
      <article class="report-card">
        <h4>${escapeHtml(report.title)}</h4>
        <p class="muted">${escapeHtml(report.finding)}</p>
        <div class="tags">
          <span class="tag">Score ${report.score}/100</span>
          <span class="tag">${escapeHtml(report.missionTitle)}</span>
          <span class="tag">${new Date(report.time).toLocaleDateString()}</span>
        </div>
        <details>
          <summary>Read report</summary>
          <p><strong>Summary:</strong> ${escapeHtml(report.summary)}</p>
          <p><strong>Impact:</strong> ${escapeHtml(report.impact)}</p>
          <p><strong>Evidence:</strong> ${escapeHtml(report.evidence)}</p>
          <p><strong>Fix:</strong> ${escapeHtml(report.fix)}</p>
        </details>
      </article>
    `).join("");
  }

  function renderSettings() {
    $("#aliasInput").value = state.alias || "Rookie";
  }

  function openMission(missionId) {
    const mission = getMission(missionId);
    if (!mission) return toast("Mission not found", "The mission data does not exist.");
    if (!isMissionUnlocked(mission)) {
      return toast("Mission locked", unlockText(mission));
    }
    currentMissionId = missionId;
    state.activeMission = missionId;
    ensureMissionProgress(missionId);
    saveState();
    renderMission();
    $("#missionModal").hidden = false;
    showTip({ path: mission.path, type: "mission", missionTags: mission.tags || [] }, true);
    maybeToastTip({ path: mission.path, type: "mission", missionTags: mission.tags || [] }, true);
  }

  function closeMission() {
    $("#missionModal").hidden = true;
    currentMissionId = null;
    renderAll();
  }

  function ensureMissionProgress(missionId) {
    if (!state.missionProgress[missionId]) {
      state.missionProgress[missionId] = {
        stepIndex: 0,
        completedSteps: {},
        terminalTasks: {},
        terminalOutput: {},
        choices: {},
        hintsUsed: {},
        penalties: {},
        reports: {}
      };
    }
    return state.missionProgress[missionId];
  }

  function currentMission() {
    return getMission(currentMissionId);
  }

  function currentProgress() {
    return ensureMissionProgress(currentMissionId);
  }

  function renderMission() {
    const mission = currentMission();
    if (!mission) return;
    const progress = currentProgress();
    const stepIndex = clamp(progress.stepIndex || 0, 0, mission.steps.length - 1);
    progress.stepIndex = stepIndex;
    const step = mission.steps[stepIndex];
    const path = getPath(mission.path);

    $("#missionPathLabel").textContent = `${path.name} - ${mission.location}`;
    $("#missionTitle").textContent = mission.title;
    $("#missionMeta").textContent = `Difficulty ${mission.difficulty} - Reward ${mission.xp} XP + ${mission.credits} credits`;
    $("#missionStepText").textContent = `Step ${stepIndex + 1} of ${mission.steps.length}`;
    $("#missionProgressBar").style.width = `${((stepIndex + 1) / mission.steps.length) * 100}%`;

    const body = $("#missionBody");
    if (step.type === "briefing") body.innerHTML = renderBriefingStep(step);
    if (step.type === "choice") body.innerHTML = renderChoiceStep(step, stepIndex);
    if (step.type === "terminal") body.innerHTML = renderTerminalStep(step, stepIndex);
    if (step.type === "patch") body.innerHTML = renderPatchStep(step, stepIndex);
    if (step.type === "report") body.innerHTML = renderReportStep(step, stepIndex);
    body.insertAdjacentHTML("beforeend", mentorTipHtml(mission, step, stepIndex));

    if (step.type === "choice" || step.type === "patch") bindChoiceButtons(step, stepIndex);
    if (step.type === "terminal") bindTerminal(step, stepIndex);
    if (step.type === "report") bindReport(step, stepIndex);

    $("#missionBackBtn").disabled = stepIndex === 0;
    const last = stepIndex === mission.steps.length - 1;
    const complete = isStepComplete(stepIndex);
    $("#missionNextBtn").disabled = step.type !== "briefing" && !complete;
    $("#missionNextBtn").textContent = last ? (complete || step.type === "briefing" ? "Complete Mission" : "Complete Step") : (step.type === "briefing" ? "Accept Briefing" : "Next");
    $("#missionHintBtn").disabled = Boolean(progress.hintsUsed[stepIndex]);
    saveState();
  }

  function renderBriefingStep(step) {
    return `
      <div class="lesson-card">
        <p class="eyebrow">Briefing</p>
        <h3>${escapeHtml(step.title)}</h3>
        <p class="muted">${textToHtml(step.body)}</p>
        <h4>Objectives</h4>
        <ul class="objective-list">
          ${(step.objectives || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
        <div class="feedback good">This game uses safe simulations and fictional systems. Treat every mission as if a real client trusted you to behave professionally.</div>
      </div>
    `;
  }

  function renderChoiceStep(step, stepIndex) {
    const progress = currentProgress();
    const selected = progress.choices[stepIndex]?.selected;
    const result = progress.choices[stepIndex];
    return `
      <div class="challenge-card lesson-card">
        <p class="eyebrow">Decision Point</p>
        <h3>${escapeHtml(step.title)}</h3>
        <p>${escapeHtml(step.question)}</p>
        <div class="choice-grid">
          ${step.options.map((option) => {
            const chosen = selected === option.id;
            const cls = chosen ? (option.correct ? "correct" : "wrong") : "";
            return `<button class="choice-option ${cls}" data-choice="${option.id}">${escapeHtml(option.text)}</button>`;
          }).join("")}
        </div>
        ${result ? `<div class="feedback ${result.correct ? "good" : "bad"}">${escapeHtml(result.explanation)}</div>` : ""}
      </div>
    `;
  }

  function renderPatchStep(step, stepIndex) {
    const progress = currentProgress();
    const selected = progress.choices[stepIndex]?.selected;
    const result = progress.choices[stepIndex];
    return `
      <div class="challenge-card lesson-card">
        <p class="eyebrow">Fix the Weakness</p>
        <h3>${escapeHtml(step.title)}</h3>
        <p class="muted">${escapeHtml(step.body)}</p>
        <pre class="code-box"><code>${escapeHtml(step.code || "")}</code></pre>
        <div class="choice-grid">
          ${step.options.map((option) => {
            const chosen = selected === option.id;
            const cls = chosen ? (option.correct ? "correct" : "wrong") : "";
            return `<button class="choice-option ${cls}" data-choice="${option.id}">${escapeHtml(option.text)}</button>`;
          }).join("")}
        </div>
        ${result ? `<div class="feedback ${result.correct ? "good" : "bad"}">${escapeHtml(result.explanation)}</div>` : ""}
      </div>
    `;
  }

  function bindChoiceButtons(step, stepIndex) {
    $$('[data-choice]', $("#missionBody")).forEach((button) => {
      button.addEventListener("click", () => chooseOption(step, stepIndex, button.dataset.choice));
    });
  }

  function chooseOption(step, stepIndex, optionId) {
    const progress = currentProgress();
    if (isStepComplete(stepIndex)) return;
    const option = step.options.find((item) => item.id === optionId);
    if (!option) return;
    progress.choices[stepIndex] = {
      selected: option.id,
      correct: Boolean(option.correct),
      explanation: option.explanation || ""
    };

    const penaltyKey = `${stepIndex}:${option.id}`;
    if (typeof option.ethicsDelta === "number" && !progress.penalties[penaltyKey]) {
      state.ethics = clamp(state.ethics + option.ethicsDelta, 0, 100);
      progress.penalties[penaltyKey] = true;
    }

    if (option.correct) {
      markStepComplete(stepIndex);
      toast("Correct decision", option.explanation || "Good work.");
      maybeToastTip({ path: currentMission().path, type: step.type, missionTags: currentMission().tags || [] });
    } else {
      toast("Try again", option.explanation || "Review the mission briefing and choose again.");
      maybeToastTip({ path: currentMission().path, type: step.type, missionTags: currentMission().tags || [] }, true);
    }
    renderMission();
    renderDashboard();
  }

  function renderTerminalStep(step, stepIndex) {
    const progress = currentProgress();
    if (!progress.terminalOutput[stepIndex]) {
      progress.terminalOutput[stepIndex] = [step.initial || "Training console ready."];
    }
    const doneMap = progress.terminalTasks[stepIndex] || {};
    return `
      <div class="terminal-wrap">
        <div class="terminal">
          <div class="terminal-top"><span class="term-dot"></span><span class="term-dot"></span><span class="term-dot"></span><span>safe-simulated-console</span></div>
          <div class="terminal-output" id="terminalOutput">${terminalOutputHtml(progress.terminalOutput[stepIndex])}</div>
          <div class="terminal-input-row">
            <span class="prompt">cq$</span>
            <input class="terminal-input" id="terminalInput" autocomplete="off" spellcheck="false" placeholder="type command, for example: help" />
            <button class="secondary-btn" id="terminalRunBtn">Run</button>
          </div>
        </div>
        <aside class="lesson-card">
          <p class="eyebrow">Console Tasks</p>
          <h3>${escapeHtml(step.title)}</h3>
          <p class="muted">${escapeHtml(step.body)}</p>
          <div class="task-list">
            ${(step.tasks || []).map((task) => `
              <div class="task-item ${doneMap[task.id] ? "done" : ""}">
                <strong>${doneMap[task.id] ? "Done: " : "Task: "}${escapeHtml(task.label)}</strong>
                <span class="muted">${doneMap[task.id] ? "Evidence collected." : "Use a relevant training command."}</span>
              </div>
            `).join("")}
          </div>
        </aside>
      </div>
    `;
  }

  function terminalOutputHtml(lines) {
    return (lines || []).map((line) => `<div>${escapeHtml(line)}</div>`).join("");
  }

  function bindTerminal(step, stepIndex) {
    const input = $("#terminalInput");
    const button = $("#terminalRunBtn");
    const run = () => runTerminalCommand(step, stepIndex);
    button.addEventListener("click", run);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") run();
    });
    setTimeout(() => input.focus(), 20);
    const output = $("#terminalOutput");
    output.scrollTop = output.scrollHeight;
  }

  function runTerminalCommand(step, stepIndex) {
    const input = $("#terminalInput");
    const command = (input.value || "").trim();
    if (!command) return;
    input.value = "";

    const progress = currentProgress();
    const output = progress.terminalOutput[stepIndex] || [];
    output.push(`cq$ ${command}`);

    const normalized = command.toLowerCase().replace(/\s+/g, " ").trim();

    if (normalized === "clear") {
      progress.terminalOutput[stepIndex] = [step.initial || "Training console ready."];
      saveState();
      renderMission();
      return;
    }

    if (normalized === "evidence") {
      const mission = currentMission();
      const missionEvidence = state.evidence.filter((item) => item.missionId === mission.id);
      output.push(missionEvidence.length ? missionEvidence.map((item, index) => `${index + 1}. ${item.text}`).join("\n") : "No evidence collected for this mission yet.");
      saveState();
      renderMission();
      return;
    }

    if (normalized === "status") {
      const done = Object.keys(progress.terminalTasks[stepIndex] || {}).length;
      const total = (step.tasks || []).length;
      output.push(`Mission terminal progress: ${done}/${total} tasks complete.`);
      saveState();
      renderMission();
      return;
    }

    const tasks = step.tasks || [];
    let matchedTask = null;
    for (const task of tasks) {
      const commands = task.commands || [];
      if (commands.map((cmd) => cmd.toLowerCase()).includes(normalized)) {
        matchedTask = task;
        break;
      }
    }

    if (matchedTask) {
      if (!progress.terminalTasks[stepIndex]) progress.terminalTasks[stepIndex] = {};
      output.push(matchedTask.response || "Task complete.");
      if (!progress.terminalTasks[stepIndex][matchedTask.id]) {
        progress.terminalTasks[stepIndex][matchedTask.id] = true;
        addEvidence(currentMission(), matchedTask.label, matchedTask.evidence || matchedTask.response || "Evidence collected.");
        toast("Evidence collected", matchedTask.label);
        maybeToastTip({ path: currentMission().path, type: "terminal", missionTags: currentMission().tags || [] });
      } else {
        output.push("This task was already completed. Evidence is already in your notebook.");
      }
    } else if (normalized === "help") {
      output.push(defaultHelp(step));
    } else {
      output.push("Command not recognized in this simulation. Type help, status, evidence, or use a command related to a task. No real system was contacted.");
      output.push("Tip: Check the task card on the right. It usually hints at the exact safe training command you need.");
    }

    const doneMap = progress.terminalTasks[stepIndex] || {};
    const allDone = tasks.length > 0 && tasks.every((task) => doneMap[task.id]);
    if (allDone) markStepComplete(stepIndex);

    saveState();
    renderMission();
  }

  function defaultHelp(step) {
    const examples = (step.tasks || []).slice(0, 3).map((task) => task.commands && task.commands[0]).filter(Boolean);
    const exampleText = examples.length ? ` Try: ${examples.join(", ")}.` : "";
    return `Safe simulated commands only. Useful commands: help, status, evidence, clear.${exampleText}`;
  }

  function addEvidence(mission, title, text) {
    const evidence = {
      id: `ev-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      missionId: mission.id,
      missionTitle: mission.title,
      title,
      text,
      time: new Date().toISOString()
    };
    state.evidence.push(evidence);
    if (state.evidence.length > 300) state.evidence = state.evidence.slice(-300);
  }

  function renderReportStep(step, stepIndex) {
    const progress = currentProgress();
    const submitted = progress.reports[stepIndex];
    if (submitted) {
      return `
        <div class="lesson-card">
          <p class="eyebrow">Report Submitted</p>
          <h3>${escapeHtml(step.title)}</h3>
          <p class="muted">${escapeHtml(step.finding)}</p>
          <div class="report-score">
            <div><strong>${submitted.score}</strong><span>Score</span></div>
            <div><strong>${submitted.keywordHits}</strong><span>Keywords</span></div>
            <div><strong>${submitted.wordCount}</strong><span>Words</span></div>
            <div><strong>Pass</strong><span>Status</span></div>
          </div>
          <div class="feedback good">Your report is saved in the Reports page.</div>
        </div>
      `;
    }

    return `
      <div class="lesson-card">
        <p class="eyebrow">Professional Report</p>
        <h3>${escapeHtml(step.title)}</h3>
        <p class="muted">Finding to explain: ${escapeHtml(step.finding)}</p>
        <form class="report-form" id="reportForm">
          <div>
            <label class="field-label" for="reportSummary">Summary</label>
            <textarea class="textarea" id="reportSummary" placeholder="What happened? Include scope and affected fictional system."></textarea>
          </div>
          <div>
            <label class="field-label" for="reportImpact">Impact</label>
            <textarea class="textarea" id="reportImpact" placeholder="Why does it matter to the client or users?"></textarea>
          </div>
          <div>
            <label class="field-label" for="reportEvidence">Evidence</label>
            <textarea class="textarea" id="reportEvidence" placeholder="What evidence did you collect in the lab?"></textarea>
          </div>
          <div>
            <label class="field-label" for="reportFix">Recommended Fix</label>
            <textarea class="textarea" id="reportFix" placeholder="How should the issue be fixed or prevented?"></textarea>
          </div>
          <button class="primary-btn" type="submit">Submit Report</button>
        </form>
        <div class="feedback" id="reportFeedback">Required ideas: ${escapeHtml((step.required || []).join(", "))}. Minimum total length: ${step.minLength || 80} characters.</div>
      </div>
    `;
  }

  function bindReport(step, stepIndex) {
    const form = $("#reportForm");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      submitReport(step, stepIndex);
    });
  }

  function submitReport(step, stepIndex) {
    const mission = currentMission();
    const summary = $("#reportSummary").value.trim();
    const impact = $("#reportImpact").value.trim();
    const evidence = $("#reportEvidence").value.trim();
    const fix = $("#reportFix").value.trim();
    const combined = `${summary}\n${impact}\n${evidence}\n${fix}`.toLowerCase();
    const wordCount = combined.split(/\s+/).filter(Boolean).length;
    const charCount = combined.length;
    const required = step.required || [];
    const hits = required.filter((keyword) => combined.includes(keyword.toLowerCase()));
    const structureScore = [summary, impact, evidence, fix].filter((value) => value.length >= 20).length * 10;
    const keywordScore = required.length ? Math.round((hits.length / required.length) * 40) : 40;
    const lengthScore = charCount >= (step.minLength || 80) ? 20 : Math.round((charCount / (step.minLength || 80)) * 20);
    const score = clamp(structureScore + keywordScore + lengthScore, 0, 100);

    const feedback = $("#reportFeedback");
    const missing = required.filter((keyword) => !combined.includes(keyword.toLowerCase()));
    if (score < 70 || missing.length) {
      feedback.className = "feedback bad";
      feedback.textContent = `Report needs improvement. Score: ${score}/100. Missing ideas: ${missing.join(", ") || "none"}. Add clear scope, impact, evidence, and fix details.`;
      return;
    }

    const report = {
      id: `rp-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      missionId: mission.id,
      missionTitle: mission.title,
      title: step.title,
      finding: step.finding,
      summary,
      impact,
      evidence,
      fix,
      score,
      keywordHits: hits.length,
      wordCount,
      time: new Date().toISOString()
    };

    state.reports.push(report);
    unlockBadge("report-writer");
    const progress = currentProgress();
    progress.reports[stepIndex] = { score, keywordHits: hits.length, wordCount };
    markStepComplete(stepIndex);
    saveState();
    toast("Report accepted", `Score: ${score}/100. Saved to Reports.`);
    renderMission();
    renderReports();
  }

  function markStepComplete(stepIndex) {
    const progress = currentProgress();
    progress.completedSteps[stepIndex] = true;
    saveState();
  }

  function isStepComplete(stepIndex) {
    const progress = currentProgress();
    return Boolean(progress.completedSteps[stepIndex]);
  }

  function missionBack() {
    const progress = currentProgress();
    progress.stepIndex = Math.max(0, progress.stepIndex - 1);
    renderMission();
  }

  function missionNext() {
    const mission = currentMission();
    const progress = currentProgress();
    const stepIndex = progress.stepIndex;
    const step = mission.steps[stepIndex];

    if (step.type === "briefing") markStepComplete(stepIndex);
    if (!isStepComplete(stepIndex)) {
      toast("Step not complete", "Finish the current challenge before moving forward.");
      return;
    }

    if (stepIndex >= mission.steps.length - 1) {
      completeMission(mission);
      return;
    }

    progress.stepIndex += 1;
    saveState();
    renderMission();
    maybeToastTip({ path: mission.path, type: mission.steps[progress.stepIndex].type, missionTags: mission.tags || [] });
  }

  function useMissionHint() {
    const mission = currentMission();
    const progress = currentProgress();
    const stepIndex = progress.stepIndex;
    const step = mission.steps[stepIndex];
    if (progress.hintsUsed[stepIndex]) return;
    progress.hintsUsed[stepIndex] = true;
    state.credits = Math.max(0, state.credits - 10);

    let hint = "Review the scope, read the objective, and choose the answer that protects users and follows permission.";
    if (step.type === "terminal") {
      const undone = (step.tasks || []).find((task) => !(progress.terminalTasks[stepIndex] || {})[task.id]);
      if (undone && undone.commands && undone.commands.length) hint = `Try a safe simulated command like: ${undone.commands[0]}`;
    }
    if (step.type === "report") {
      hint = `Mention these ideas clearly: ${(step.required || []).join(", ")}. Include scope, impact, evidence, and fix.`;
    }
    if ((step.type === "choice" || step.type === "patch") && step.options) {
      const correct = step.options.find((option) => option.correct);
      if (correct) hint = `Think about this principle: ${correct.explanation}`;
    }

    saveState();
    renderDashboard();
    renderMission();
    toast("Hint used", `${hint} (-10 credits)`);
  }

  function completeMission(mission) {
    if (isCompleted(mission.id)) {
      toast("Mission replay complete", "You already collected this mission reward earlier.");
      closeMission();
      return;
    }

    state.completed[mission.id] = {
      time: new Date().toISOString(),
      xp: mission.xp,
      credits: mission.credits
    };
    state.xp += mission.xp;
    state.credits += mission.credits;
    state.reputation += Math.max(1, mission.difficulty);
    state.pathXp[mission.path] = (state.pathXp[mission.path] || 0) + mission.xp;
    state.activeMission = firstAvailableAfter(mission.id);

    if (mission.badge) unlockBadge(mission.badge);
    if (mission.path === "capstone") unlockBadge("boss-clear");

    saveState();
    toast("Mission complete", `+${mission.xp} XP, +${mission.credits} credits. New rank: ${getRank()}.`);
    maybeToastTip({ path: mission.path, type: "report", missionTags: mission.tags || [] }, true);
    closeMission();
  }

  function firstAvailableAfter(currentId) {
    const available = DATA.missions.find((mission) => mission.id !== currentId && !isCompleted(mission.id) && isMissionUnlocked(mission));
    return available ? available.id : null;
  }

  function unlockBadge(badgeId) {
    if (!badgeId || state.badges.includes(badgeId)) return;
    state.badges.push(badgeId);
    const badge = DATA.badges.find((item) => item.id === badgeId);
    if (badge) toast("Badge unlocked", badge.name);
  }

  function saveAlias() {
    const value = $("#aliasInput").value.trim().slice(0, 32) || "Rookie";
    state.alias = value;
    saveState(true);
    renderAll();
  }

  function exportSave() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    downloadBlob(blob, `cyberquest-save-${Date.now()}.json`);
    toast("Save exported", "Keep the JSON file as a backup.");
  }

  function exportReports() {
    if (!state.reports.length) return toast("No reports yet", "Submit a report mission first.");
    const text = state.reports.map((report) => {
      return [
        `# ${report.title}`,
        `Mission: ${report.missionTitle}`,
        `Score: ${report.score}/100`,
        `Date: ${report.time}`,
        "",
        "## Finding",
        report.finding,
        "",
        "## Summary",
        report.summary,
        "",
        "## Impact",
        report.impact,
        "",
        "## Evidence",
        report.evidence,
        "",
        "## Recommended Fix",
        report.fix,
        "",
        "---",
        ""
      ].join("\n");
    }).join("\n");
    const blob = new Blob([text], { type: "text/markdown" });
    downloadBlob(blob, `cyberquest-reports-${Date.now()}.md`);
    toast("Reports exported", "Downloaded as a Markdown portfolio file.");
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function importSave(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}"));
        state = migrateState(parsed);
        saveState();
        renderAll();
        toast("Save imported", "Your imported progress is now active.");
      } catch (error) {
        toast("Import failed", "The selected file is not valid CyberQuest save JSON.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  function resetGame() {
    if (!confirm("Reset all local progress for CyberQuest Ops?")) return;
    state = defaultState();
    saveState();
    renderAll();
    toast("Game reset", "A fresh save has been created.");
  }

  function toast(title, message) {
    const stack = $("#toastStack");
    const item = document.createElement("div");
    item.className = "toast";
    item.innerHTML = `<strong>${escapeHtml(title)}</strong><p>${escapeHtml(message || "")}</p>`;
    stack.appendChild(item);
    setTimeout(() => {
      item.style.opacity = "0";
      item.style.transform = "translateY(8px)";
      setTimeout(() => item.remove(), 260);
    }, 4200);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
