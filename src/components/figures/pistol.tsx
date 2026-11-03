// Samonabíjecí pistole: pohled zprava a rozložení na pět základních dílů.
// Vlastní obecná kresba (nejde o konkrétní model zbraně).

import { ACCENT, INK, PAPER, TONE, tint, url, type DrawingProps } from "./primitives";

const P = {
  slide: "M140 92 L148 80 L570 80 L590 96 L590 150 L140 150 Z",
  port: "M328 80 L412 80 L412 120 L328 120 Z",
  hood: "M344 80 L410 80 L410 117 L344 117 Z",
  rearSight: "M166 80 L169 66 L196 66 L200 80 Z",
  frontSight: "M548 80 L550 68 L561 68 L563 80 Z",
  muzzle: "M590 102 L599 102 L599 138 L590 138 Z",
  frame:
    "M150 150 L584 150 L584 176 L418 178 L416 230 Q414 246 398 246 L322 246 C302 246 293 228 292 206 L236 398 L96 398 L144 204 C148 188 140 170 124 163 L127 155 Q133 150 150 150 Z",
  guardHole: "M306 186 L404 186 L403 226 Q402 236 390 236 L330 236 C316 236 307 224 306 206 Z",
  guardRing:
    "M418 180 L416 230 Q414 246 398 246 L322 246 C302 246 293 228 292 206 L306 206 C307 224 316 236 330 236 L390 236 Q402 236 403 226 L404 180 Z",
  trigger: "M346 186 C352 200 356 214 362 228 L354 230 C346 216 340 202 336 186 Z",
  gripTexture: "M154 222 L273 222 L230 372 L117 372 Z",
  magazine: "M112 398 L160 172 L266 172 L222 398 Z",
  floorPlate: "M98 398 L234 398 L232 409 Q231 414 224 414 L106 414 Q99 414 98 408 Z",
  magCatch: "M293 190 L305 190 L305 204 L291 204 Z",
  slideStop: "M330 152 L374 152 L374 159 L336 162 Z",
  takedown: "M422 156 L436 156 L436 166 L422 166 Z",
};

const SERRATIONS = Array.from({ length: 6 }, (_, i) => `M${167 + i * 11} 90 L${161 + i * 11} 142`).join(" ");

function Slide({ hl, withBarrel }: { hl?: string; withBarrel: boolean }) {
  return (
    <g>
      <path d={P.rearSight} fill={tint(hl, "hledi", TONE.dark)} />
      <path d={P.frontSight} fill={tint(hl, "muska", TONE.dark)} />
      <path d={P.slide} fill={tint(hl, "zaver", TONE.steel)} strokeWidth="2.2" />
      <path d={SERRATIONS} fill="none" strokeWidth="1.8" />
      <path d="M150 140 L586 140" fill="none" strokeWidth="1" strokeOpacity="0.35" />
      <path d={P.port} fill={hl === "vyhozne" ? ACCENT : TONE.dark} />
      {withBarrel && (
        <g>
          <path d={P.hood} fill={tint(hl, "hlaven", TONE.steelL)} />
          <path d="M350 90 L404 90" stroke={TONE.white} strokeWidth="4" strokeOpacity="0.7" />
        </g>
      )}
      {hl === "vyhozne" && <path d={P.port} fill="none" stroke={ACCENT} strokeWidth="5" />}
    </g>
  );
}

function Frame({ hl, uid, withMagazine }: { hl?: string; uid: string; withMagazine: boolean }) {
  const body = tint(hl, "telo", TONE.poly);
  return (
    <g>
      <path d={P.frame} fill={body} strokeWidth="2.2" />
      <path d={P.gripTexture} fill={url(uid, "dots")} stroke="none" />
      <path d={P.gripTexture} fill="none" strokeWidth="1" strokeOpacity="0.4" />
      {withMagazine && (
        <path
          d={P.magazine}
          fill={hl === "zasobnik" ? ACCENT : "none"}
          fillOpacity="0.9"
          strokeWidth="1.5"
          strokeDasharray="7 5"
          strokeOpacity={hl === "zasobnik" ? 1 : 0.75}
        />
      )}
      <path d="M430 166 L584 166 M466 166 L466 177 M496 166 L496 177 M526 166 L526 177 M556 166 L556 177" fill="none" strokeWidth="1.2" strokeOpacity="0.6" />
      {hl === "lucik" && <path d={P.guardRing} fill={ACCENT} />}
      <path d={P.guardHole} fill={PAPER} />
      <path d={P.trigger} fill={tint(hl, "spoust", TONE.dark)} />
      <path d={P.magCatch} fill={TONE.dark} strokeWidth="1.4" />
      <path d={P.slideStop} fill={TONE.dark} strokeWidth="1.4" />
      <path d={P.takedown} fill={TONE.dark} strokeWidth="1.4" />
    </g>
  );
}

/** Sestavená pistole, pohled zprava (ústí vpravo). */
export function Pistole({ hl, uid }: DrawingProps) {
  return (
    <g>
      <Frame hl={hl} uid={uid} withMagazine />
      <path d={P.floorPlate} fill={tint(hl, "zasobnik", TONE.dark)} />
      <path d={P.muzzle} fill={tint(hl, ["hlaven", "usti"], TONE.steelL)} />
      <Slide hl={hl} withBarrel />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Rozložená pistole                                                    */
/* ------------------------------------------------------------------ */

const K = 0.8;
const SLIDE_T = `translate(90 -20) scale(${K})`;
const FRAME_T = `translate(-24 160) scale(${K})`;
const MAG_T = `translate(380 154) scale(${K})`;

const BARREL = {
  chamber: "M340 155 L412 155 L412 189 L340 189 Z",
  tube: "M412 161 L567 161 L567 183 L412 183 Z",
  lugs: "M418 161 L418 153 L428 153 L428 161 Z M436 161 L436 153 L446 153 L446 161 Z",
  cam: "M348 189 L392 189 L386 212 Q384 217 377 217 L360 217 Q352 216 351 209 Z",
};

function springPath(x1: number, x2: number, y: number, amp: number, pitch: number) {
  let d = `M${x1} ${y}`;
  let up = true;
  for (let x = x1 + pitch / 2; x < x2; x += pitch / 2) {
    d += ` L${x.toFixed(1)} ${up ? y - amp : y + amp}`;
    up = !up;
  }
  return d + ` L${x2} ${y}`;
}

export function PistoleRozlozena({ hl, uid }: DrawingProps) {
  const barrel = tint(hl, "hlaven", TONE.steelL);
  const spring = hl === "pruzina" ? ACCENT : INK;
  return (
    <g>
      {/* 1 závěr */}
      <g transform={SLIDE_T}>
        <Slide hl={hl} withBarrel={false} />
      </g>
      {/* 2 hlaveň s uzamykacími ozuby a odemykací kulisou */}
      <g>
        <path d={BARREL.cam} fill={tint(hl, ["hlaven", "kulisa"], TONE.steelL)} />
        <path d="M358 197 L380 207" fill="none" stroke={INK} strokeWidth="6" />
        <path d={BARREL.lugs} fill={tint(hl, ["hlaven", "ozuby"], TONE.steelL)} />
        <path d={BARREL.tube} fill={barrel} />
        <path d={BARREL.chamber} fill={barrel} />
        <path d="M418 167 L562 167 M346 163 L406 163" stroke={TONE.white} strokeWidth="3" strokeOpacity="0.7" />
        <path d="M567 164 L567 180" strokeWidth="1" />
      </g>
      {/* 3 vratná pružina s vodítkem */}
      <g>
        <path d="M380 247 L566 247 L566 253 L380 253 Z" fill={tint(hl, "pruzina", TONE.steelD)} strokeWidth="1.6" />
        <path d="M372 238 L382 238 L382 262 L372 262 Z" fill={tint(hl, "pruzina", TONE.steelD)} strokeWidth="1.6" />
        <path d={springPath(386, 556, 250, 10, 13)} fill="none" stroke={spring} strokeWidth="2.4" />
      </g>
      {/* 4 tělo */}
      <g transform={FRAME_T}>
        <Frame hl={hl} uid={uid} withMagazine={false} />
      </g>
      {/* 5 zásobník */}
      <g transform={MAG_T}>
        <path d="M160 172 L160 156 L232 156 L232 172 Z" fill={TONE.brass} strokeWidth="2" />
        <path d="M232 156 L244 156 C255 156 262 162 264 172 L232 172 Z" fill={TONE.steel} strokeWidth="2" />
        <path d={P.magazine} fill={tint(hl, "zasobnik", TONE.steel)} strokeWidth="2.4" />
        <path d="M152 172 L266 172 L262 188 L148 188 Z" fill={tint(hl, "zasobnik", TONE.steelD)} strokeWidth="1.6" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={152 - i * 10.2} cy={230 + i * 46} r="5" fill={TONE.dark} strokeWidth="1.2" />
        ))}
        <path d={P.floorPlate} fill={tint(hl, "zasobnik", TONE.dark)} />
      </g>
    </g>
  );
}
