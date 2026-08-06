/* =========================================================
   RealMC Network — script.js
   ========================================================= */
(function () {
/* ==========================================================
   RealMC Network — main script
   ========================================================== */
(() => {
  "use strict";

  /* ------------------ CONFIG ------------------ */
  var CONFIG = {
    ip: "play.realmc.lol",
    upi: "freefireavijit1234@oksbi",
    payeeName: "RealMC Network",
    // Telemetry endpoint (hidden from the UI). Frontend is API-ready:
    // expected JSON: { online, players, maxPlayers, tps, cpu, ram, disk, uptime }
    apiBase: "http://3.7.252.252:25584",
    apiPath: "/api/status",
    pollMs: 5000
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ------------------ DATA ------------------ */
  var MODES = [
    { i: "❤️", n: "Lifesteal", t: "HARDCORE", d: "Steal hearts from your enemies. Lose them all and you're banned until you buy back in." },
    { i: "🌾", n: "Survival",  t: "CLASSIC",  d: "Vanilla+ survival with land claims, player shops, jobs and a living economy." },
    { i: "🪙", n: "Token",     t: "ECONOMY",  d: "Grind tokens, trade on the market and unlock insane endgame upgrades." },
    { i: "⚔️", n: "PvP",       t: "COMBAT",   d: "Practice arenas, ranked duels, kits and 1v1s with instant matchmaking." },
    { i: "🛏️", n: "BedWars",   t: "TEAMS",    d: "Solo, doubles and squads. Defend your bed, rush the enemy, take the win." },
    { i: "🧱", n: "OneBlock",  t: "SKYBLOCK", d: "One block, infinite phases. Build your island from literally nothing." }
  ];

  var RANKS = [
    { n: "VIP",      p: 50,  perks: ["/kit vip weekly", "Coloured chat", "2 extra homes", "VIP tag in tab"] },
    { n: "REAL",     p: 160, perks: ["Everything in VIP", "/fly in lobby", "5 homes", "/nick access", "Queue priority"] },
    { n: "TITAN",    p: 160, perks: ["Everything in REAL", "/heal & /feed", "8 homes", "Titan cosmetics", "Monthly crate"], hot: true },
    { n: "XAVIEN",   p: 190, perks: ["Everything in TITAN", "/enderchest anywhere", "12 homes", "Custom join message"] },
    { n: "XAVIEN+",  p: 210, perks: ["Everything in XAVIEN", "Unlimited homes", "/god in survival", "Exclusive pet", "Top tab priority"], best: true }
  ];

  var KEYS = [
    { n: "Vote Key",  p: 5,  i: "🗳️", d: "Daily rewards, food and starter gear." },
    { n: "Party Key", p: 20, i: "🎉", d: "Event loot, fireworks and rare cosmetics." },
    { n: "Mango Key", p: 25, i: "🥭", d: "Enchanted tools and sweet economy boosts." },
    { n: "Hoody Key", p: 27, i: "🧥", d: "The rarest cosmetics and endgame armour." }
  ];

  var LAND = [
    { n: "Starter Claim", b: 500,   p: 5,   d: "Perfect for a first base." },
    { n: "Builder Claim", b: 2500,  p: 25,  d: "Room for a full village." },
    { n: "Empire Claim",  b: 10000, p: 100, d: "Lock down an entire biome.", hot: true },
    { n: "Kingdom Claim", b: 25000, p: 220, d: "Max-tier territory control." }
  ];

  /* ------------------ LOADER ------------------ */
  var pct = 0;
  var fill = $("#loaderFill"), pctEl = $("#loaderPct"), loader = $("#loader");
  var loadTimer = setInterval(function () {
    pct = Math.min(100, pct + Math.random() * 14 + 4);
    if (fill) fill.style.width = pct + "%";
    if (pctEl) pctEl.textContent = Math.round(pct) + "%";
    if (pct >= 100) {
      clearInterval(loadTimer);
      setTimeout(function () { if (loader) loader.classList.add("done"); }, 350);
  const UPI_ID = "freefireavijit1234@oksbi";
  const PAYEE = "RealMC Network";
  const SERVER_IP = "play.realmc.lol";
  const API_BASE = "http://3.7.252.252:25584";
  const REFRESH_MS = 10000;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- toast ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    toastEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  /* ---------- clipboard ---------- */
  async function copy(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
      }
      toast(`Copied: ${text}`);
    } catch { toast("Copy failed — select manually"); }
  }
