import React from 'react';

const colorMap = {
    labour: "#ff5733",
    labouring: "#ff5733",
    water: "#4955FA",
    came: "#493b39",
    first: "#F092D0",
    remember: "#ffcc33",
    "c-section": "#B6A09F",
    broken: "#B39E25",
    broke: "#B39E25",
    midwife: "#F09275",
    baby: "#F0F68F",
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
    aware: "#FF6347",
    hated: "#0c0f0a",
    back: "#4682B4",
    required: "#FFD700",
    actually: "#32CD32",
    every: "#BA55D3",
    day: "#40E0D0",
    lay: "#FF4500",
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
    wanting: "#E67E22",
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
    people: "#4682B4",
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
    calm: "#e1e5f2",
    partner: "#373d20",
    help: "#ba181b",
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
    paed: "#618985",
    struggling: "#2a0800",
    readmitted: "#8fcb9b",
    able: "#FF5733",
    week: "#33FF57",
    blue: "#3357FF",
    "couldn't": "#FF33A6",
    need: "#33FFF6",
    probably: "#FFB533",
    kept: "#9933FF",
    wanted: "#FF8C00",
    trying: "#33FFB5",
    never: "#FF33E1",
    overwhelmed: "#3375FF",
    "can't": "#FF5733",
    believe: "#33D4FF",
    emotional: "#FF3386",
    keep: "#FF8C33",
    hear: "#338CFF",
    morphine: "#FF338C",
    room: "#B0C4DE",
    work: "#DAA520",
    new: "#FF6347",
    hard: "#B22222",
    feeling: "#FF8C00",
    arrived: "#4682B4",
    working: "#FFD700",
    nurse: "#48D1CC",
    found: "#8A2BE2",
    older: "#FF4500",
    full: "#4682B4",
    giving: "#FF69B4",
    school: "#32CD32",
    pregnant: "#FF1493",
    year: "#008080",
    daughter: "#FFB6C1",
    soon: "#FF7F50",
    taking: "#CD5C5C",
    enjoyed: "#9370DB",
    spent: "#DA70D6",
    took: "#FF4500",
    long: "#D2691E",
    point: "#7FFF00",
    check: "#20B2AA",
    right: "#2E8B57",
    know: "#FF00FF",
    far: "#7B68EE",
    completely: "#E9967A",
    support: "#00FA9A",
    bath: "#4682B4",
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
    shortly: "#FF6347",
    approximately: "#87CEEB",
    inflatable: "#00CED1",
    amount: "#DC143C",
    climbing: "#FF4500",
    during: "#DDA0DD",
    fairly: "#F5DEB3",
    living: "#FF6347",
    tiny: "#FF69B4",
    apartment: "#FFE4B5",
    slowly: "#2F4F4F",
    sat: "#B8860B",
    brought: "#C71585",
    straight: "#4682B4",
    assistant: "#D8BFD8",
    hold: "#CD5C5C",
    someone: "#DA70D6",
    switched: "#87CEFA",
    put: "#4682B4",
    ice: "#00CED1",
    son: "#40E0D0",
    next: "#FF8C00",
    delivered: "#FF6347",
    reason: "#FF1493",
    loved: "#FF4500",
    given: "#FFD700",
    top: "#7B68EE",
    listening: "#DB7093",
    everyone: "#7FFF00",
    least: "#CD853F",
    find: "#FF00FF",
    started: "#00BFFF",
    exercise: "#A52A2A",
    chickenpox: "#FFD700",
    together: "#DC143C",
    whatever: "#4682B4",
    give: "#FF4500",
    expensive: "#B22222",
    waiting: "#87CEEB",
    primary: "#FF6347",
    taken: "#DAA520",
    bad: "#8B0000",
    want: "#FF8C00",
    figure: "#7FFF00",
    set: "#4682B4",
    second: "#D2691E",
    sure: "#4682B4",
    house: "#8B4513",
    prepped: "#DA70D6",
    seemed: "#87CEEB",
    incredibly: "#FF6347",
    private: "#C71585",
    where: "#4169E1",
    holding: "#7FFF00",
    anything: "#4682B4",
    heard: "#8A2BE2",
    anaesthetic: "#FF4500",
    immediately: "#FF6347",
    physically: "#00FA9A",
    returned: "#32CD32",
    short: "#FFD700",
    delivery: "#FF1493",
    fully: "#FF00FF",
    expect: "#CD5C5C",
    childcare: "#7FFFD4",
    start: "#B22222",
    worked: "#FFD700",
    move: "#32CD32",
    big: "#FF4500",
    return: "#8B4513",
    risk: "#FF6347",
    sensation: "#FF69B4",
    doctor: "#4682B4",
    unit: "#32CD32",
    care: "#FF6347",
    covid: "#556B2F",
    family: "#4682B4",
    boy: "#1E90FF",
    surgery: "#8B4513",
    experience: "#D2691E",
    alive: "#32CD32",
    alone: "#696969",
    old: "#CD853F",
    safe: "#7CFC00",
    contraction: "#B22222",
    present: "#FFD700",
    endure: "#8A2BE2",
    thought: "#FF8C00",
    fast: "#FF4500",
    best: "#7FFF00",
    cry: "#FF1493",
    tearing: "#8B0000",
    later: "#F08080",
    early: "#FF7F50",
    trauma: "#DC143C",
    cried: "#FF69B4",
    visit: "#4682B4",
    stay: "#FF6347",
    surreal: "#9370DB",
    side: "#FFB6C1",
    easy: "#87CEEB",
    turn: "#FF4500",
    breech: "#A52A2A",
    hand: "#CD853F",
    shoulder: "#FFD700",
    walk: "#32CD32",
    drug: "#8A2BE2",
    push: "#FF4500",
    ward: "#4682B4",
    really: "#FF6347",
    life: "#32CD32",
    beautiful: "#FF69B4"
  };
  


export default colorMap;