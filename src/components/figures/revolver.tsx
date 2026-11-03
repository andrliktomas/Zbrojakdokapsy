// Revolver s výklopným válcem, pohled zleva (ústí vlevo). Vlastní obecná kresba.

import { TONE, tint, url, type DrawingProps } from "./primitives";

const R = {
  barrel: "M40 116 L44 116 L44 108 L262 108 L262 170 L82 170 Q66 170 64 160 L64 150 L40 150 Z",
  frontSight: "M48 108 L58 93 L70 93 L72 108 Z",
  frame: "M262 104 L452 104 Q476 106 488 128 L504 176 L476 188 Q446 196 430 214 L404 224 L262 224 Z",
  rearSight: "M434 104 L436 98 L450 98 L452 104 Z",
  cylinder: "M290 120 L422 120 Q428 120 428 126 L428 202 Q428 208 422 208 L290 208 Q284 208 284 202 L284 126 Q284 120 290 120 Z",
  fluteMid: "M316 156 L396 156 A8 8 0 0 1 396 172 L316 172 A8 8 0 0 1 316 156 Z",
  fluteTop: "M308 121 Q312 133 324 133 L388 133 Q400 133 404 121",
  fluteBottom: "M308 207 Q312 195 324 195 L388 195 Q400 195 404 207",
  crane: "M256 156 L288 156 L288 214 Q288 226 276 226 L264 226 Q256 226 256 218 Z",
  thumbpiece: "M438 134 L462 134 Q468 134 468 140 L468 145 Q468 150 462 150 L438 150 Z",
  hammer: "M446 112 L456 100 C466 86 480 76 498 74 Q507 74 504 82 C490 88 480 98 474 114 L468 134 L448 134 Z",
  guard: "M344 224 C338 266 360 288 392 288 C422 288 436 266 434 216 L422 220 C424 258 412 277 392 277 C368 277 352 260 356 224 Z",
  trigger: "M392 224 C398 240 396 254 386 268 L378 264 C386 252 386 238 380 224 Z",
  grip: "M430 214 C438 234 446 250 446 274 C446 304 452 336 454 360 Q457 386 482 386 L534 386 Q559 384 557 358 C555 314 546 270 530 236 C520 214 512 196 504 176 L476 188 Q446 196 430 214 Z",
};

export function Revolver({ hl, uid }: DrawingProps) {
  const grip = tint(hl, "pazbicka", TONE.wood);
  return (
    <g>
      <path d={R.grip} fill={grip} strokeWidth="2.2" />
      <path d={R.grip} fill={url(uid, "grain")} stroke="none" />
      <circle cx="502" cy="286" r="5.5" fill={TONE.steel} strokeWidth="1.4" />
      <path d={R.frontSight} fill={tint(hl, "hlaven", TONE.dark)} />
      <path d={R.barrel} fill={tint(hl, "hlaven", TONE.steel)} strokeWidth="2.2" />
      <path d="M44 116 L44 150 M64 150 L262 150" fill="none" strokeWidth="1.2" strokeOpacity="0.5" />
      <path d="M70 126 L256 126" stroke={TONE.white} strokeWidth="4" strokeOpacity="0.6" />
      <path d={R.rearSight} fill={TONE.dark} />
      <path d={R.frame} fill={tint(hl, "ram", TONE.steelD)} strokeWidth="2.2" />
      <path d="M284 120 L428 120 M284 208 L428 208" fill="none" strokeWidth="1.2" />
      <path d={R.cylinder} fill={tint(hl, "valec", TONE.steel)} strokeWidth="2.2" />
      <path d={R.fluteMid} fill={tint(hl, "valec", TONE.steelD)} strokeWidth="1.6" />
      <path d={`${R.fluteTop} ${R.fluteBottom}`} fill="none" strokeWidth="1.6" />
      <path d="M294 122 L294 206 M418 122 L418 206" fill="none" strokeWidth="1" strokeOpacity="0.45" />
      <path d={R.crane} fill={tint(hl, "konzole", TONE.steelL)} strokeWidth="2" />
      <circle cx="272" cy="170" r="3.5" fill={TONE.dark} strokeWidth="1" />
      <path d={R.thumbpiece} fill={TONE.dark} strokeWidth="1.4" />
      <path d={R.hammer} fill={tint(hl, "kohout", TONE.dark)} />
      <path d="M484 82 L489 89 M490 79 L495 86 M496 77 L500 83" fill="none" stroke={TONE.white} strokeWidth="1.4" strokeOpacity="0.7" />
      <path d={R.guard} fill={tint(hl, "lucik", TONE.steelD)} fillRule="evenodd" strokeWidth="2" />
      <path d={R.trigger} fill={tint(hl, "spoust", TONE.dark)} />
    </g>
  );
}
