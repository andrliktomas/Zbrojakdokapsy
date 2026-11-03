// Dlouhé zbraně: kozlice vs. dvojka, brokovnice s lůžkovým závěrem, opakovací kulovnice.
// Vlastní obecné kresby (nejde o konkrétní modely zbraní).

import { FadeLeft, INK, TONE, breakPath, tint, url, type DrawingProps } from "./primitives";

/* ------------------------------------------------------------------ */
/* Kozlice a dvojka – celé siluety + pohled na ústí                     */
/* ------------------------------------------------------------------ */

const OU = {
  stock:
    "M176 41 L162 43 C150 45 142 49 132 49 L30 56 Q22 57 22 64 L24 111 Q25 118 33 117 L116 92 C126 89 134 93 140 101 Q145 108 154 106 C160 98 168 86 176 76 Z",
  receiver: "M176 39 L210 39 Q216 39 216 45 L216 68 Q216 76 208 76 L176 76 Z",
  rib: "M216 37 L500 41 L500 43.5 L216 40 Z",
  top: "M216 40 L500 43.5 L500 54 L216 56 Z",
  bottom: "M216 56 L500 54 L500 64 L216 71 Z",
  forend: "M222 66 L320 63 Q332 63 331 70 L327 77 Q324 81 314 81 L232 82 Q222 82 221 75 Z",
  guard: "M181 76 C179 90 186 95 196 95 C206 95 212 89 211 76",
  trigger: "M194 76 Q196 83 200 88",
};

const SXS = {
  stock: "M176 43 L162 44 C150 46 142 49 132 49 L30 56 Q22 57 22 64 L24 111 Q25 118 33 117 L176 72 Z",
  receiver: "M176 41 L208 41 Q214 41 214 47 L214 64 Q214 72 206 72 L176 72 Z",
  rib: "M214 39 L500 42.5 L500 45 L214 42 Z",
  barrel: "M214 42 L500 45 L500 56 L214 58 Z",
  lower: "M214 58 L500 56 L500 58.5 L214 62 Z",
  forend: "M218 61 L292 59 Q300 59 299 64 L297 69 L220 70 Z",
  guard: "M179 72 C177 88 184 93 194 93 C204 93 210 87 209 72",
  triggers: "M188 72 Q190 79 193 84 M199 72 Q201 79 204 84",
};

function MuzzlePanel({ ou, fill, y }: { ou: boolean; fill: string; y: number }) {
  return (
    <g transform={`translate(0 ${y})`}>
      <rect x="524" y="14" width="96" height="112" rx="12" fill={TONE.white} strokeWidth="1.2" strokeOpacity="0.35" />
      {ou ? (
        <g>
          <rect x="567" y="25" width="10" height="6" fill={TONE.dark} strokeWidth="1.2" />
          <circle cx="572" cy="51" r="19" fill={fill} />
          <circle cx="572" cy="89" r="19" fill={fill} />
          <circle cx="572" cy="51" r="12.5" fill={TONE.dark} />
          <circle cx="572" cy="89" r="12.5" fill={TONE.dark} />
        </g>
      ) : (
        <g>
          <rect x="567" y="44" width="10" height="7" fill={TONE.dark} strokeWidth="1.2" />
          <circle cx="552" cy="70" r="19" fill={fill} />
          <circle cx="592" cy="70" r="19" fill={fill} />
          <circle cx="552" cy="70" r="12.5" fill={TONE.dark} />
          <circle cx="592" cy="70" r="12.5" fill={TONE.dark} />
        </g>
      )}
    </g>
  );
}

export function KozliceDvojka({ hl, uid }: DrawingProps) {
  const ouFill = tint(hl, "kozlice", TONE.steel);
  const sxsFill = tint(hl, "dvojka", TONE.steel);
  return (
    <g>
      {/* 1 kozlice – hlavně nad sebou */}
      <g transform="translate(0 30)">
        <path d={OU.stock} fill={TONE.wood} />
        <path d={OU.stock} fill={url(uid, "grain")} stroke="none" />
        <path d={OU.guard} fill="none" strokeWidth="3" />
        <path d={OU.trigger} fill="none" strokeWidth="2.6" />
        <path d={OU.forend} fill={TONE.wood} />
        <path d={OU.rib} fill={TONE.dark} strokeWidth="1.2" />
        <path d={OU.top} fill={ouFill} />
        <path d={OU.bottom} fill={ouFill} />
        <path d="M222 48 L494 49 M222 63 L494 59.5" stroke={TONE.white} strokeWidth="2.5" strokeOpacity="0.6" />
        <path d={OU.receiver} fill={TONE.steelL} />
      </g>
      <MuzzlePanel ou fill={ouFill} y={10} />
      <line x1="20" y1="150" x2="620" y2="150" strokeWidth="1" strokeDasharray="4 6" strokeOpacity="0.35" />
      {/* 2 dvojka – hlavně vedle sebe */}
      <g transform="translate(0 190)">
        <path d={SXS.stock} fill={TONE.wood} />
        <path d={SXS.stock} fill={url(uid, "grain")} stroke="none" />
        <path d={SXS.guard} fill="none" strokeWidth="3" />
        <path d={SXS.triggers} fill="none" strokeWidth="2.6" />
        <path d={SXS.forend} fill={TONE.wood} />
        <path d={SXS.rib} fill={TONE.dark} strokeWidth="1.2" />
        <path d={SXS.barrel} fill={sxsFill} />
        <path d={SXS.lower} fill={TONE.steelD} strokeWidth="1.2" />
        <path d="M222 49 L494 50" stroke={TONE.white} strokeWidth="2.5" strokeOpacity="0.6" />
        <path d={SXS.receiver} fill={TONE.steelL} />
      </g>
      <MuzzlePanel ou={false} fill={sxsFill} y={160} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Brokovnice s lůžkovým závěrem a sklopným hlavňovým svazkem            */
/* ------------------------------------------------------------------ */

const BK = {
  stock: `M300 84 L266 86 C246 89 232 100 214 106 C200 110 186 112 172 112 L26 124 ${breakPath(26, 124, 26, 230, 7)} L196 184 C208 182 218 186 226 194 C236 204 242 210 254 208 C266 206 272 196 280 184 C286 174 292 164 300 157 Z`,
  grip: "M226 132 L268 128 L276 168 L250 196 L224 182 Z",
  receiver: "M300 82 L390 82 Q398 82 398 90 L398 140 Q398 157 381 157 L300 157 Z",
  lever: "M270 86 C274 76 288 71 304 73 L318 79 L318 84 Z",
  safety: "M246 92 Q246 85 252 84 L260 84 Q266 84 266 89 Z",
  guard: "M372 157 C376 182 362 194 338 194 C318 194 306 184 302 170 L311 166 C314 178 324 185 338 185 C356 185 364 176 363 157 Z",
  trigger: "M336 157 C340 168 342 176 348 184 L342 187 C334 178 330 168 328 157 Z",
  rib: "M398 77 L622 81 L622 86 L398 83 Z",
  top: `M398 83 L622 86 ${breakPath(622, 86, 622, 113, 3)} L398 114 Z`,
  bottom: `M398 114 L622 113 ${breakPath(622, 113, 622, 140, 3)} L398 146 Z`,
  forend: "M404 136 L560 132 Q574 132 572 144 L566 162 Q562 170 550 170 L420 172 Q404 172 402 160 Z",
  forendGrip: "M450 142 L532 140 L528 160 L452 162 Z",
};

const HINGE = { x: 388, y: 147 };

function arrowHead(x: number, y: number, dx: number, dy: number, size = 6) {
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const bx = x - ux * size * 1.7;
  const by = y - uy * size * 1.7;
  return `M${x.toFixed(1)} ${y.toFixed(1)} L${(bx - uy * size).toFixed(1)} ${(by + ux * size).toFixed(1)} L${(bx + uy * size).toFixed(1)} ${(by - ux * size).toFixed(1)} Z`;
}

const ROT = (() => {
  const r = 222;
  const a1 = (-9 * Math.PI) / 180;
  const a2 = (9 * Math.PI) / 180;
  const p1 = { x: HINGE.x + r * Math.cos(a1), y: HINGE.y + r * Math.sin(a1) };
  const p2 = { x: HINGE.x + r * Math.cos(a2), y: HINGE.y + r * Math.sin(a2) };
  return {
    arc: `M${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A${r} ${r} 0 0 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`,
    head: arrowHead(p2.x, p2.y, -Math.sin(a2), Math.cos(a2)),
  };
})();

export function Brokovnice({ hl, uid }: DrawingProps) {
  const barrels = tint(hl, "svazek", TONE.steel);
  return (
    <g>
      {/* naznačení sklopeného hlavňového svazku */}
      <g transform={`rotate(12 ${HINGE.x} ${HINGE.y})`} fill="none" strokeWidth="1.3" strokeDasharray="6 5" strokeOpacity="0.4">
        <path d={`${BK.rib} ${BK.top} ${BK.bottom}`} />
        <path d={BK.forend} />
      </g>
      <path d={ROT.arc} fill="none" strokeWidth="1.8" strokeOpacity="0.75" />
      <path d={ROT.head} fill={INK} fillOpacity="0.75" stroke="none" />
      {/* pažba */}
      <FadeLeft uid={uid} name="stock" x0={24} x1={130}>
        <path d={BK.stock} fill={tint(hl, "pazba", TONE.wood)} strokeWidth="2.2" />
        <path d={BK.stock} fill={url(uid, "grain")} stroke="none" />
      </FadeLeft>
      <path d={BK.grip} fill={url(uid, "dots")} stroke="none" />
      <path d={BK.guard} fill={tint(hl, "lucik", TONE.steelD)} strokeWidth="1.8" />
      <path d={BK.trigger} fill={tint(hl, "spoust", TONE.dark)} />
      <path d={BK.safety} fill={tint(hl, "pojistka", TONE.dark)} strokeWidth="1.4" />
      {/* hlavně a předpažbí */}
      <path d={BK.rib} fill={tint(hl, "svazek", TONE.dark)} strokeWidth="1.4" />
      <path d={BK.top} fill={barrels} />
      <path d={BK.bottom} fill={barrels} />
      <path d="M424 97 L616 98.5 M424 128 L616 125" stroke={TONE.white} strokeWidth="4" strokeOpacity="0.55" />
      <path d="M426 84 L426 145" fill="none" strokeWidth="1.2" strokeOpacity="0.5" />
      <path d={BK.forend} fill={tint(hl, "predpazbi", TONE.wood)} strokeWidth="2.2" />
      <path d={BK.forend} fill={url(uid, "grain")} stroke="none" />
      <path d={BK.forendGrip} fill={url(uid, "dots")} stroke="none" />
      {/* lůžkový závěr a temenní klička */}
      <path d={BK.receiver} fill={tint(hl, "zaver", TONE.steelL)} strokeWidth="2.2" />
      <path d="M306 146 L372 146 Q388 146 390 128 L390 90" fill="none" strokeWidth="1.2" strokeOpacity="0.45" />
      <path d="M306 92 L360 92" stroke={TONE.white} strokeWidth="4" strokeOpacity="0.7" />
      <circle cx={HINGE.x} cy={HINGE.y} r="4.5" fill={TONE.steel} strokeWidth="1.6" />
      <path d={BK.lever} fill={tint(hl, "klicka", TONE.dark)} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Opakovací kulovnice (malorážka) – střední část                        */
/* ------------------------------------------------------------------ */

const KS = {
  stock: `M622 124 L446 128 L240 131 C226 133 212 140 196 140 C182 140 170 134 156 134 L20 140 ${breakPath(20, 140, 20, 226, 7)} L186 184 C198 182 208 188 216 198 C224 208 230 214 242 212 C254 210 262 196 270 182 C274 174 278 170 284 167 L422 162 L622 152 ${breakPath(622, 152, 622, 124, 4)} Z`,
  grip: "M214 148 L256 150 L262 176 L240 200 L212 184 Z",
  receiver: "M262 102 L436 102 L436 131 L262 131 Z",
  ring: "M432 100 L446 100 L446 132 L432 132 Z",
  port: "M334 105 L396 105 L396 126 L334 126 Z",
  boltBody: "M214 107 L262 107 L262 127 L214 127 Z",
  shroud: "M196 109 L214 109 L214 125 L202 125 Q196 125 196 119 Z",
  handle: "M243 115 L255 115 C255 132 251 146 244 156 L234 154 C241 143 245 131 243 115 Z",
  safety: "M182 129 L204 128 Q207 128 207 131 L207 136 Q207 139 204 139 L184 140 Z",
  guard: "M336 165 C338 186 326 200 304 200 C288 200 278 191 274 177 L282 173 C286 185 294 191 304 191 C320 191 328 181 328 165 Z",
  trigger: "M302 165 C306 176 308 184 314 192 L308 195 C300 186 296 176 294 165 Z",
  floor: "M356 161 L412 160 L412 172 Q412 176 408 176 L360 177 Q356 177 356 173 Z",
  barrel: `M446 106 L622 108 ${breakPath(622, 108, 622, 122, 3)} L446 124 Z`,
  sightBase: "M484 107 L512 107.4 L510 101 L487 100.6 Z",
  sightLeaf: "M494 101 L496 91 L503 91 L504 101 Z",
};

export function KulovniceStred({ hl, uid }: DrawingProps) {
  return (
    <g>
      <path d={KS.barrel} fill={tint(hl, "hlaven", TONE.steel)} strokeWidth="2.2" />
      <path d="M452 113 L616 114" stroke={TONE.white} strokeWidth="3.5" strokeOpacity="0.6" />
      <path d={`${KS.sightBase} ${KS.sightLeaf}`} fill={tint(hl, "hledi", TONE.dark)} strokeWidth="1.4" />
      <path d={KS.receiver} fill={tint(hl, "pouzdro", TONE.steel)} strokeWidth="2.2" />
      <path d={KS.ring} fill={tint(hl, "pouzdro", TONE.steel)} strokeWidth="2" />
      <path d="M268 109 L428 109" stroke={TONE.white} strokeWidth="4" strokeOpacity="0.55" />
      <path d={KS.port} fill={tint(hl, "vyhozne", TONE.steelL)} strokeWidth="2.2" />
      {hl !== "vyhozne" && <path d="M336 108.5 L394 108.5" stroke={TONE.dark} strokeWidth="4" />}
      <FadeLeft uid={uid} name="stock" x0={18} x1={120}>
        <path d={KS.stock} fill={tint(hl, "pazba", TONE.wood)} strokeWidth="2.2" />
        <path d={KS.stock} fill={url(uid, "grain")} stroke="none" />
      </FadeLeft>
      <path d={KS.grip} fill={url(uid, "dots")} stroke="none" />
      <path d={KS.floor} fill={tint(hl, "dno", TONE.dark)} />
      <path d={KS.guard} fill={tint(hl, "lucik", TONE.steelD)} strokeWidth="1.8" />
      <path d={KS.trigger} fill={tint(hl, "spoust", TONE.dark)} />
      <path d={KS.boltBody} fill={tint(hl, "zaver", TONE.steelL)} />
      <path d={KS.shroud} fill={tint(hl, "zaver", TONE.steelD)} />
      <path d={KS.safety} fill={tint(hl, "pojistka", TONE.dark)} strokeWidth="1.4" />
      <path d={KS.handle} fill={tint(hl, "klika", TONE.steel)} strokeWidth="1.8" />
      <circle cx="238" cy="162" r="11" fill={tint(hl, "klika", TONE.steel)} strokeWidth="2" />
    </g>
  );
}
