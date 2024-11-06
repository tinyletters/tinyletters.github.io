import React from "react";

const colorMap = {
  labour: "#ff5733",
  labouring: "#ff5733",
  water: "#4955FA",
  came: "#493b39",
  first: "#F092D0",
  remember: "#ffcc33",
  "c-section": "#B6A09F",
  caesar: "#B6A09F",
  broken: "#B39E25",
  broke: "#B39E25",
  midwife: "#F09275",
  child: "#F000FF",
  one: "#3E1E70",
  body: "#532c1e",
  feel: "#bcb8b1",
  husband: "#D35400",
  thing: "#76D7C4",
  felt: "#bcb8b1",
  even: "#3498DB",
  see: "#48C9B0",
  pain: "#E74C3C",
  coming: "#493b39",
  say: "#7FB3D5",
  due: "#AF7AC5",
  still: "#c0dfa1",
  tried: "#F39C12",
  moment: "#85C1E9",
  birth: "#D98880",
  everything: "#E59866",
  down: "#6C3483",
  hospital: "#7B68EE",
  aware: "#00f5d4",
  hated: "#0c0f0a",
  back: "#fde4cf",
  required: "#FFD700",
  actually: "#32CD32",
  every: "#BA55D3",
  day: "#40E0D0",
  lay: "#4c1036",
  horrible: "#DC143C",
  brave: "#FF1493",
  natural: "#228B22",
  kind: "#FF69B4",
  pretty: "#FFB6C1",
  blood: "#8B0000",
  caesarian: "#B6A09F",
  children: "#F000FF",
  matter: "#1ABC9C",
  gynae: "#8E44AD",
  lucky: "#F7DC6F",
  wanting: "#FF8C00",
  mother: "#EC7063",
  sense: "#7DCEA0",
  month: "#5499C7",
  almost: "#48C9B0",
  thinking: "#AAB7B8",
  think: "#AAB7B8",
  birthing: "#E74C3C",
  literally: "#F5B041",
  op: "#ddded0",
  nothing: "#34495E",
  nobody: "#34495E",
  two: "#DC7633",
  mum: "#9B59B6",
  read: "#2980B9",
  emergency: "#E74C3C",
  book: "#F39C12",
  complication: "#8E44AD",
  checked: "#27AE60",
  situation: "#F5B041",
  time: "#1ABC9C",
  happening: "#766153",
  pregnancy: "#947c51",
  open: "#74C2E1",
  nice: "#FFCC66",
  miracle: "#20fa83",
  music: "#7B68EE",
  dream: "#9370DB",
  little: "#FFB6C1",
  people: "#6f4518",
  sound: "#1E90FF",
  home: "#8B4513",
  way: "#32CD32",
  planned: "#008080",
  crash: "#DC143C",
  aftermath: "#696969",
  style: "#FF69B4",
  green: "#3CB371",
  anaesthetist: "#87CEEB",
  six: "#f4a261",
  physical: "#faedcd",
  looked: "#240046",
  looking: "#240046",
  left: "#414833",
  filled: "#f95738",
  liquid: "#2c7da0",
  state: "#240046",
  part: "#c17c74",
  abandoned: "#495057",
  knew: "#ff8600",
  realm: "#d1ffc6",
  breastfeeding: "#faf3dd",
  breastfeed: "#faf3dd",
  calm: "#e1e5f2",
  partner: "#373d20",
  help: "#ba181b",
  helped: "#ba181b",
  breathed: "#3e5c76",
  falling: "#adb5bd",
  health: "#e5383b",
  different: "#6f2dbd",
  supportive: "#d8e2dc",
  night: "#1f1d2a",
  feed: "#ede7e3",
  formula: "#f2efea",
  lactation: "#fff8d6",
  consultant: "#062710",
  happy: "#ffe548",
  dropped: "#1dd3b0",
  pump: "#d4c7c8",
  pumped: "#d4c7c8",
  paed: "#618985",
  struggling: "#2a0800",
  readmitted: "#8fcb9b",
  able: "#6d0c39",
  week: "#33FF57",
  blue: "#3357FF",
  "couldn't": "#FF33A6",
  need: "#33FFF6",
  probably: "#FFB533",
  kept: "#9933FF",
  wanted: "#FF8C00",
  trying: "#33FFB5",
  never: "#e9ff70",
  overwhelmed: "#3375FF",
  "can't": "#FF5733",
  believe: "#33D4FF",
  emotional: "#FF3386",
  keep: "#247b7b",
  hear: "#338CFF",
  morphine: "#FF338C",
  room: "#B0C4DE",
  work: "#DAA520",
  new: "#FF6347",
  hard: "#B22222",
  feeling: "#cfbaf0",
  arrived: "#902923",
  working: "#DAA520",
  nurse: "#48D1CC",
  found: "#8A2BE2",
  older: "#CD853F",
  full: "#f95738",
  giving: "#FF69B4",
  school: "#32CD32",
  pregnant: "#FF1493",
  year: "#008080",
  daughter: "#FFB6C1",
  soon: "#FF7F50",
  taking: "#CD5C5C",
  enjoyed: "#9370DB",
  spent: "#DA70D6",
  took: "#ccff33",
  long: "#D2691E",
  longer: "#D2691E",
  point: "#7FFF00",
  check: "#20B2AA",
  right: "#2E8B57",
  know: "#FF00FF",
  far: "#7B68EE",
  completely: "#E9967A",
  support: "#00FA9A",
  bath: "#a2d6f9",
  bed: "#8B4513",
  hour: "#4169E1",
  feeding: "#FF69B4",
  vaginal: "#B22222",
  low: "#556B2F",
  light: "#F0E68C",
  arrival: "#D2B48C",
  entered: "#8FBC8F",
  maternity: "#C71585",
  straightforward: "#778899",
  shortly: "#ab87ff",
  approximately: "#87CEEB",
  inflatable: "#00CED1",
  amount: "#DC143C",
  climbing: "#283618",
  during: "#DDA0DD",
  fairly: "#F5DEB3",
  living: "#cdb4db",
  tiny: "#FF69B4",
  apartment: "#FFE4B5",
  slowly: "#2F4F4F",
  sat: "#B8860B",
  brought: "#C71585",
  straight: "#072ac8",
  assistant: "#D8BFD8",
  hold: "#CD5C5C",
  someone: "#DA70D6",
  switched: "#87CEFA",
  put: "#78290f",
  ice: "#00CED1",
  son: "#40E0D0",
  next: "#FF8C00",
  delivered: "#dfd9e2",
  reason: "#FF1493",
  loved: "#f28482",
  given: "#f5ffc6",
  top: "#b9fbc0",
  listening: "#DB7093",
  everyone: "#b2ff9e",
  least: "#CD853F",
  find: "#FF00FF",
  started: "#00BFFF",
  exercise: "#A52A2A",
  chickenpox: "#f5cb5c",
  together: "#DC143C",
  whatever: "#ff85a1",
  give: "#f5ffc6",
  expensive: "#B22222",
  waiting: "#87CEEB",
  wait: "#87CEEB",
  primary: "#d00000",
  taken: "#f8ffe5",
  bad: "#8B0000",
  want: "#FF8C00",
  figure: "#2c1a1d",
  set: "#ffdc5e",
  second: "#D2691E",
  sure: "#f26df9",
  house: "#8B4513",
  prepped: "#DA70D6",
  seemed: "#87CEEB",
  incredibly: "#f9ada0",
  private: "#C71585",
  where: "#4169E1",
  holding: "#6c584c",
  anything: "#d5c67a",
  heard: "#8A2BE2",
  anaesthetic: "#87CEEB",
  immediately: "#ccff00",
  physically: "#00FA9A",
  returned: "#32CD32",
  short: "#abe188",
  delivery: "#FF1493",
  fully: "#FF00FF",
  expect: "#CD5C5C",
  childcare: "#7FFFD4",
  start: "#B22222",
  worked: "#DAA520",
  move: "#32CD32",
  big: "#b5179e",
  return: "#8B4513",
  risk: "#d90429",
  sensation: "#FF69B4",
  doctor: "#4682B4",
  dr: "#4682B4",
  unit: "#32CD32",
  care: "#fbf8cc",
  covid: "#556B2F",
  family: "#5e60ce",
  boy: "#1E90FF",
  surgery: "#8B4513",
  experience: "#D2691E",
  alive: "#32CD32",
  alone: "#696969",
  old: "#CD853F",
  safe: "#7CFC00",
  contraction: "#B22222",
  present: "#F0F68F",
  endure: "#8A2BE2",
  thought: "#FF8C00",
  fast: "#f85e00",
  best: "#adc178",
  cry: "#FF1493",
  tearing: "#8B0000",
  later: "#F08080",
  early: "#FF7F50",
  trauma: "#DC143C",
  cried: "#FF69B4",
  visit: "#c36f09",
  stay: "#f78e69",
  surreal: "#9370DB",
  side: "#FFB6C1",
  easy: "#87CEEB",
  turn: "#FF4500",
  turned: "#FF4500",
  breech: "#A52A2A",
  hand: "#CD853F",
  shoulder: "#e39774",
  walk: "#32CD32",
  drug: "#8A2BE2",
  push: "#3a5a40",
  ward: "#fafaff",
  really: "#222725",
  life: "#32CD32",
  beautiful: "#FF69B4",
  enough: "#FF8C00",
  sleep: "#6A5ACD",
  sleeping: "#6A5ACD",
  slept: "#6A5ACD",
  born: "#FFB6C1",
  strong: "#228B22",
  needed: "#124e78",
  painful: "#B22222",
  huge: "#8B4513",
  told: "#f4e285",
  milk: "#F5DEB3",
  leave: "#5a189a",
  recovery: "#32CD32",
  pumping: "#d4c7c8",
  numb: "#9a8c98",
  scared: "#04052e",
  strange: "#8A2BE2",
  lovely: "#FF69B4",
  pushing: "#5f0f40",
  blessing: "#ff5e5b",
  recover: "#32CD32",
  quiet: "#87CEEB",
  something: "#FF8C00",
  whole: "#6c534e",
  pushed: "#5f0f40",
  better: "#32CD32",
  usual: "#ffcfd2",
  leaving: "#FF7F50",
  wake: "#7a6c5d",
  office: "#cad2c5",
  bottle: "#dce0d9",
  happened: "#8B4513",
  decided: "#fee440",
  centre: "#7B68EE",
  caused: "#D2691E",
  share: "#FF8C00",
  pressure: "#DC143C",
  lack: "#696969",
  ready: "#ff6b6b",
  walking: "#32CD32",
  tell: "#f4e285",
  front: "#1e2749",
  other: "#444433",
  saw: "#48C9B0",
  realised: "#FF8C00",
  travel: "#1E90FF",
  weird: "#8A2BE2",
  hair: "#CD853F",
  suddenly: "#f7a072",
  place: "#32CD32",
  possibly: "#1c7c54",
  relieved: "#2c1a1d",
  opening: "#74C2E1",
  fire: "#c1121f",
  dragon: "#132a13",
  healthy: "#e5383b",
  change: "#9a8c98",
  dilated: "#edafb8",
  scan: "#d9d9d9",
  close: "#002855",
  peace: "#b7e4c7",
  force: "#450920",
  round: "#f7c59f",
  breathe: "#3e5c76",
  end: "#ffffff",
  induction: "#ccc9dc",
  induced: "#ccc9dc",
  floor: "#595959",
  placenta: "#d11149",
  doula: "#83781b",
  vagina: "#B22222",
  result: "#ccdbdc",
  heart: "#ef233c",
  perfect: "#000000",
  mind: "#1e88e5",
  throat: "#6d0c39",
  allowed: "#555b6e",
  asked: "#588157",
  issue: "#274c77",
  case: "#88546e",
  naturally: "#228B22",
  world: "#90caf9",
  forgot: "#cccccc",
  speak: "#727d71",
  leg: "#a9927d",
  policy: "#6c757d",
  last: "#000814",
  scheduled: "#f4f1de",
  brother: "#00bbf9",
  quickly: "#f85e00",
  medical: "#70a9a1",
  possible: "#1c7c54",
  done: "#d4a373",
  throughout: "#3f37c9",
  tired: "#babd8d",
  sick: "#839788",
  stuck: "#5e503f",
  journey: "#71a9f7",
  lockdown: "#565264",
  convinced: "#dd2d4a",
  exactly: "#f1c0e8",
  else: "#8eecf5",



};

export default colorMap;
