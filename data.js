// All site content lives in this file. To update the portfolio, edit the text
// here and rebuild; you never need to touch the components.
//
// Adding a project: copy one object in `projects`, give it a new `id` (short,
// lowercase, no spaces; it becomes the link, e.g. yoursite/#engine), import
// its photos below, and fill in the fields. Optional fields can be left out.

// ---------- photos ----------
import standHero from './assets/stand-hero.jpg'
import standPhone from './assets/stand-phone.jpg'
import standHerringbone from './assets/stand-herringbone.jpg'
import standHand from './assets/stand-hand.jpg'
import standCad from './assets/stand-cad.jpg'

import engineIso from './assets/engine-iso.jpg'
import engineFront from './assets/engine-front.jpg'

import flowerPrint from './assets/flower-print.jpg'
import flowerParts from './assets/flower-parts.jpg'
import flowerCad from './assets/flower-cad.jpg'
import flowerCloseup from './assets/flower-closeup.jpg'
import flowerBevel from './assets/flower-bevel.jpg'
import flowerFiles from './assets/flower-files.jpg'

import kettleSketch from './assets/kettle-sketch.jpg'
import kettleMatlab from './assets/kettle-matlab.jpg'
import kettleTinkercad from './assets/kettle-tinkercad.jpg'
import kettleRedesign from './assets/kettle-redesign.jpg'

import reacherP01 from './assets/reacher-p01.jpg'
import reacherP02 from './assets/reacher-p02.jpg'
import reacherP07 from './assets/reacher-p07.jpg'
import reacherP14 from './assets/reacher-p14.jpg'
import reacherP16 from './assets/reacher-p16.jpg'

import arduinoTop from './assets/arduino-top.jpg'
import arduinoAngle from './assets/arduino-angle.jpg'
import arduinoOverhead from './assets/arduino-overhead.jpg'
import arduinoBoard from './assets/arduino-board.jpg'

import swordWelding from './assets/sword-welding.jpg'
import sword from './assets/sword.jpg'

import gameSelect from './assets/game-select.png'
import gameLevel1 from './assets/game-level1.png'
import gameLevel2 from './assets/game-level2.png'
import gameLevel3 from './assets/game-level3.png'

// ---------- about me ----------
export const player = {
  name: 'Aaron Udho',
  program: 'Mechanical Engineering',
  minor: 'Minor in Mathematics',
  school: 'Toronto Metropolitan University',
  year: 'Year 2',
  grad: 'Expected Apr 2030',
  location: 'Toronto, ON',
  email: 'audho@torontomu.ca',
  linkedin: 'https://www.linkedin.com/in/aaronudho',
  linkedinLabel: 'linkedin.com/in/aaronudho',
  // Paste your GitHub profile link here once you have it, e.g.
  // github: 'https://github.com/your-username', githubLabel: 'github.com/your-username'
  github: '',
  githubLabel: '',
  seeking:
    'Summer 2027 internships and 4, 8 or 12 to 16 month co-ops in mechanical design, manufacturing or automotive, anywhere in the GTA.',
}

// Project filters. `cats` on each project uses these ids.
export const categories = [
  { id: 'all', label: 'All' },
  { id: 'cad', label: 'CAD' },
  { id: 'print', label: '3D printing' },
  { id: 'code', label: 'Code & electronics' },
  { id: 'shop', label: 'Welding & shop' },
]

// ---------- projects (shown in this order) ----------
export const projects = [
  {
    id: 'phone-stand',
    featured: true,
    interactive: true, // shows the playable stand model on the project page
    title: 'Herringbone Gear Phone Stand',
    short: 'A phone stand that tilts through 180° on a herringbone gear train. Designed in SolidWorks and printed 15+ times to get the mesh right.',
    status: 'Complete',
    when: 'Winter 2026',
    team: 'Solo',
    cats: ['cad', 'print'],
    cover: standHero,
    coverPos: '50% 55%',
    stats: [
      { value: '180°', label: 'Tilt range' },
      { value: '15+', label: 'Test prints' },
      { value: '0.2 mm', label: 'Gear clearance' },
    ],
    summary:
      'Designed from scratch in SolidWorks and 3D printed on Bambu Lab and Prusa printers. Pull the locking pin, turn the knob, and a herringbone pinion drives a curved herringbone gear that tilts the phone to any angle across 180°. I still use it every day.',
    did: [
      'Designed the herringbone gear train in SolidWorks, from gear math to final assembly',
      'Printed 15+ test iterations, adjusting gear tolerances and print orientation until it ran smoothly at 0.2 mm clearance',
      'Routed a charging-cable channel through the body so the phone charges while it tilts',
      'Added speaker ports after version 1 muffled the phone’s audio',
    ],
    lesson:
      'Version 1 gears were too tight and only ran smoothly after wearing in. Now I design the clearance in from the start.',
    tools: ['SolidWorks', 'Gear design', 'Tolerancing', 'FDM printing', 'Bambu Lab', 'Prusa'],
    photos: [
      { src: standHero, caption: 'Final build with spare test gears', alt: 'Finished phone stand with the curved white herringbone gear, red knob and spare test gears beside it' },
      { src: standPhone, caption: 'In use, charging while tilted', alt: 'Phone stand holding a phone upright with the charging cable running through the base' },
      { src: standHerringbone, caption: 'Herringbone teeth meshing', alt: 'Rear view showing the chevron teeth of the herringbone gear meshing with the black pinion' },
      { src: standHand, caption: 'Knob, pinion and curved gear', alt: 'Phone stand held in hand showing the knob, pinion and curved gear' },
      { src: standCad, caption: 'SolidWorks gear model', alt: 'SolidWorks model of the herringbone pinion and spur gears' },
    ],
  },
  {
    id: 'engine',
    title: 'Four-Cylinder Engine Assembly',
    short: 'A 25+ part SolidWorks assembly with the pistons, connecting rods and crankshaft mated to move together.',
    status: 'Complete',
    when: '2026',
    team: 'Solo',
    cats: ['cad'],
    cover: engineIso,
    coverPos: '50% 45%',
    stats: [
      { value: '25+', label: 'Parts modelled' },
      { value: '10+', label: 'Mates' },
      { value: '4', label: 'Cylinders' },
    ],
    summary:
      'A four-cylinder engine modelled part by part in SolidWorks, then assembled so the crankshaft, connecting rods and pistons move through the slider-crank motion together.',
    did: [
      'Modelled 25+ parts, including pistons with ring grooves, connecting rods, crankshaft, valves and engine block',
      'Assembled them with 10+ mates to animate the slider-crank motion',
      'Checked the assembly with interference detection and tolerance analysis',
    ],
    tools: ['SolidWorks', 'Assemblies', 'Mates', 'Motion analysis', 'Interference detection'],
    photos: [
      { src: engineIso, caption: 'Isometric view: crankshaft, rods and pistons', alt: 'SolidWorks render of a crankshaft with four gold connecting rods and red pistons, seen from an angle' },
      { src: engineFront, caption: 'Front view of all four cylinders', alt: 'Front view of four red pistons on gold connecting rods above a grey crankshaft' },
    ],
  },
  {
    id: 'flower',
    title: 'Mechanical Flower',
    short: 'A 3D printed flower I designed from scratch in SolidWorks. Six petals, custom pins and links, and a bevel gear on the drawing board.',
    status: 'In progress',
    when: '2026',
    team: 'Solo',
    cats: ['cad', 'print'],
    cover: flowerPrint,
    coverPos: '50% 62%',
    stats: [
      { value: '6', label: 'Petals' },
      { value: 'v2', label: 'Petals and pins' },
    ],
    summary:
      'A flower that opens using gears, designed from scratch in SolidWorks and 3D printed. The current build has a fluted base with a threaded centre post, a hub with clevis joints, connecting links, pins and six curved petals. It took a lot of failed prints to get here.',
    did: [
      'Modelled every part in SolidWorks: base, connecting pieces, pins, pin caps, ring cap and petals',
      'Reworked parts after failed prints, fixing printing errors, tolerances, infill density and material choice',
      'Now on version 2.0 of both the petals and the pins',
      'Drafting a bevel gear to turn rotation into a different plane, the next step toward a fully gear-driven flower',
    ],
    lesson:
      'Failed prints taught me that tolerance, infill density and material type all change how printed parts fit and move.',
    tools: ['SolidWorks', '3D printing', 'Tolerancing', 'Mechanisms', 'Bevel gears'],
    photos: [
      { src: flowerPrint, caption: 'Printed flower with six petals', alt: 'Printed flower with six red and pink petals spread around a teal hub' },
      { src: flowerParts, caption: 'Base, centre post and loose petals from test prints', alt: 'Hand holding a blue and green fluted base with a threaded post, next to loose orange petals and a ruler' },
      { src: flowerCad, caption: 'SolidWorks assembly', alt: 'SolidWorks assembly of a green fluted base, threaded post, red hub and one curved petal' },
      { src: flowerCloseup, caption: 'Close-up: hub, clevis joints, link and petal', alt: 'Close-up of the red hub with clevis joints, a grey connecting link and a curved red petal' },
      { src: flowerBevel, caption: 'Bevel gear rough draft', alt: 'SolidWorks model of a rough bevel gear ring' },
      { src: flowerFiles, caption: 'Part files for the build', alt: 'Folder of SolidWorks part files named base, connecting piece, pins, pin cap, ring cap and flower petal' },
    ],
  },
  {
    id: 'kettle',
    title: 'Assistive Kettle Redesign',
    short: 'Reverse-engineered a kettle for an elderly user and backed our redesign with MATLAB force and torque analysis.',
    status: 'Complete',
    when: '2025',
    team: 'Team of 8',
    cats: ['cad', 'code'],
    cover: kettleSketch,
    coverPos: '50% 30%',
    stats: [
      { value: '41%', label: 'Lower button force vs baseline' },
      { value: '45°', label: 'Optimal handle angle' },
      { value: '10', label: 'Parts in the BOM' },
    ],
    summary:
      'Our team reverse-engineered an electric kettle for an elderly man who had trouble pouring, then redesigned it for limited wrist mobility. We documented the original with a dimensioned sketch and bill of materials, modelled the forces in MATLAB, and prototyped the redesign in Tinkercad.',
    did: [
      'Documented the kettle with a dimensioned sketch and a 10-item bill of materials listing each part’s material and function',
      'Built a MATLAB model comparing button push force and wrist torque for elderly users: the redesigned button came out 41% below the baseline',
      'Swept handle angles in MATLAB and found 45° gave the lowest wrist torque (1.56 N·m)',
      'Prototyped the redesign in Tinkercad and sketched the final concept',
    ],
    tools: ['MATLAB', 'Tinkercad', 'SolidWorks', 'Reverse engineering', 'Bill of materials'],
    photos: [
      { src: kettleSketch, caption: 'Dimensioned sketch and bill of materials', alt: 'Hand-drawn front, side and top views of a kettle with dimensions, next to a bill of materials table' },
      { src: kettleMatlab, caption: 'MATLAB force and torque analysis', alt: 'MATLAB bar chart of button push forces and a curve of wrist force against handle angle, with printed results' },
      { src: kettleTinkercad, caption: 'Tinkercad prototype', alt: 'Blue kettle model in Tinkercad with reference planes' },
      { src: kettleRedesign, caption: 'Redesign sketch', alt: 'Shaded sketch of the redesigned kettle with a textured grip handle' },
    ],
  },
  {
    id: 'trunk-reacher',
    title: 'Elephant Trunk Reacher',
    short: 'An 18-entry engineering notebook for a trunk-like arm that can grab any object, regular or irregular.',
    status: 'Complete',
    when: 'Fall 2025',
    team: 'Solo',
    cats: ['cad', 'print'],
    cover: reacherP02,
    coverPos: '50% 12%',
    stats: [
      { value: '18', label: 'Notebook entries' },
      { value: '15+', label: 'Design iterations' },
    ],
    summary:
      'A gripper inspired by an elephant’s trunk, meant to help people, especially elderly users with less muscle strength, pick up objects of any shape. Over 18 notebook entries I sketched concepts, weighed pros and cons, and ran first-pass physics on each idea.',
    did: [
      'Compared claw designs entry by entry, listing pros and cons to go from gripping on one axis to reaching 180°',
      'Explored a silicone tip filled with a non-Newtonian fluid, temperature-controlled viscosity and granular jamming for gripping odd shapes',
      'Ran first-pass calculations, such as water pressure at 5 m depth (about 150 kPa) for an underwater version',
      'Logged 15+ design iterations and prototyped in PLA with TPU fingertips',
    ],
    tools: ['Engineering notebook', 'Concept sketching', 'Autodesk Inventor', 'PLA', 'TPU'],
    links: [{ label: 'Read the full notebook (PDF)', href: './elephant-trunk-reacher-notebook.pdf' }],
    photos: [
      { src: reacherP01, caption: 'Entry 1: objective and first concept', alt: 'Handwritten notebook page with the objective, a sketch of the trunk arm, sensor and base' },
      { src: reacherP02, caption: 'Entry 2: trunk concepts', alt: 'Handwritten page with sketches of a segmented trunk wrapping around objects' },
      { src: reacherP07, caption: 'Entry 7: claw iterations with pros and cons', alt: 'Handwritten page comparing four claw designs with pros and cons' },
      { src: reacherP14, caption: 'Entry 14: granular jamming', alt: 'Handwritten page explaining granular jamming for the gripper tip' },
      { src: reacherP16, caption: 'Entry 16: waterproofing and pressure at depth', alt: 'Handwritten page on waterproofing with a pressure calculation at 5 metres depth' },
    ],
  },
  {
    id: 'arduino-lcd',
    title: 'Arduino LCD Message Display',
    short: 'A breadboard circuit that shows a message line by line on a 16×2 LCD, with LEDs and a buzzer. Built as a Valentine’s Day gift.',
    status: 'Complete',
    when: 'Personal',
    team: 'Solo',
    cats: ['code'],
    cover: arduinoTop,
    coverPos: '50% 60%',
    stats: [
      { value: '16×2', label: 'LCD' },
      { value: '6', label: 'LEDs' },
    ],
    summary:
      'Made as a Valentine’s Day gift, and it is where I learned Arduino, breadboarding and circuit basics. An Elegoo UNO R3 drives a 16×2 LCD that shows a message one line at a time, with red LEDs and a buzzer on the same breadboard, powered by a 9 V battery.',
    did: [
      'Wired a 16×2 LCD, 6 LEDs with resistors, a buzzer and a potentiometer on a breadboard',
      'Programmed the Arduino to show the message line by line',
      'Learned breadboard layout, Arduino pin connections and basic circuits along the way',
    ],
    tools: ['Arduino', 'Breadboarding', 'Circuits', 'LCD'],
    photos: [
      { src: arduinoTop, caption: 'Full circuit, top view', alt: 'Elegoo UNO board wired to a breadboard with a blue 16 by 2 LCD, red LEDs, resistors, a buzzer and a potentiometer' },
      { src: arduinoAngle, caption: 'Running on a 9 V battery', alt: 'Angled view of the lit circuit with a 9 volt battery in the background' },
      { src: arduinoOverhead, caption: 'LEDs and LCD lit', alt: 'Overhead view of the circuit with red LEDs glowing beside the LCD' },
      { src: arduinoBoard, caption: 'Wiring into the UNO', alt: 'Close-up of jumper wires plugged into the Elegoo UNO R3 headers' },
    ],
  },
  {
    id: 'welded-sword',
    title: 'Welded Sword',
    short: 'My first time welding: a sword built from stacked steel discs during my automotive co-op.',
    status: 'Complete',
    when: 'High school co-op',
    team: 'Solo',
    cats: ['shop'],
    cover: swordWelding,
    coverPos: '50% 30%',
    summary:
      'The first thing I ever welded, made at Speedy Auto Service during my high school automotive co-op. I stacked steel discs into the shape of a blade and welded them together.',
    did: [
      'Welded stacked steel discs into a sword, my first time holding a welder',
      'Learned shop safety and welding basics in a working auto shop',
    ],
    tools: ['Welding', 'Metalwork', 'Shop safety'],
    photos: [
      { src: swordWelding, caption: 'Welding the sword at the shop', alt: 'Aaron in a welding helmet welding the sword in a vise, sparks flying, cars on lifts behind' },
      { src: sword, caption: 'Finished sword', alt: 'Sword made of stacked welded steel discs standing upright in a bench vise' },
    ],
  },
  {
    id: 'js-game',
    title: 'World’s Easiest Game',
    short: 'A three-level browser game written in JavaScript: dodge the dots, grab the trophies, reach the green zone.',
    status: 'Complete',
    when: 'High school',
    team: 'Solo',
    cats: ['code'],
    cover: gameLevel2,
    coverPos: '50% 50%',
    stats: [{ value: '3', label: 'Levels' }],
    summary:
      'A top-down game built entirely with JavaScript graphics. Move with W, A, S and D, collect the trophies and reach the green zone without touching the yellow dots.',
    did: [
      'Programmed WASD movement, collision detection against the obstacles and a death counter',
      'Built 3 levels with different goals: grab the trophy, collect every trophy, or cross to the other side',
      'Added a level-select screen with locked levels and 3-star ratings',
    ],
    tools: ['JavaScript', 'Game logic', 'Collision detection', 'Graphics'],
    // Add a link to the code once it's on GitHub, e.g.
    // links: [{ label: 'View the code', href: 'https://github.com/...' }],
    photos: [
      { src: gameSelect, caption: 'Level select with locked levels', alt: 'Level select screen with three levels, two locked with padlocks, and star ratings' },
      { src: gameLevel1, caption: 'Level 1: get the trophy and make it to green', alt: 'Red play area with rows of yellow dots, a trophy in the corner and a green goal' },
      { src: gameLevel2, caption: 'Level 2: collect every trophy', alt: 'Diamond-shaped red level crossed by two lines of yellow dots, with a trophy on each side' },
      { src: gameLevel3, caption: 'Level 3: get to the other side', alt: 'Two long red corridors lined with yellow dots, connected by green safe zones' },
    ],
  },
]

// Numbers on the title screen. Each one opens the project it comes from.
export const highScores = [
  { value: '180°', label: 'Tilt range', note: 'Phone stand', project: 'phone-stand' },
  { value: '15+', label: 'Test prints', note: 'Phone stand', project: 'phone-stand' },
  { value: '25+', label: 'Parts modelled', note: 'Engine assembly', project: 'engine' },
  { value: '18', label: 'Notebook entries', note: 'Trunk reacher', project: 'trunk-reacher' },
]

// ---------- experience ----------
export const experience = [
  {
    role: 'Ride Operator',
    org: 'Canada’s Wonderland',
    place: 'Vaughan, ON',
    dates: 'Feb 2026 – Sep 2026',
    points: [
      'Managed ride safety for 5,000+ guests per shift',
      'Certified on 4 rides: Drop Tower, Wild Beast, Wilde Knight Mares and Dragon Fire',
      'Ran pre-operation equipment inspections and enforced ride-specific safety protocols',
    ],
  },
  {
    role: 'Automotive Service Co-op Student',
    org: 'Speedy Auto Service',
    place: 'Brampton, ON',
    dates: 'Oct 2023 – Feb 2024',
    points: [
      'Performed oil changes, tire rotations, brake inspections and basic diagnostics, 2 to 3 vehicles per shift',
      '180-hour Ontario Youth Apprenticeship Program (OYAP) placement',
    ],
    project: { id: 'welded-sword', label: 'See the sword I welded here' },
  },
]

// ---------- skills ----------
export const skills = [
  {
    group: 'CAD & design',
    items: [
      { tag: 'SW', name: 'SolidWorks' },
      { tag: 'IV', name: 'Autodesk Inventor' },
      { tag: 'TC', name: 'Tinkercad' },
      { tag: 'SK', name: 'Technical sketching' },
    ],
  },
  {
    group: 'Engineering',
    items: [
      { tag: 'GR', name: 'Gear design' },
      { tag: '±', name: 'Tolerancing' },
      { tag: 'MO', name: 'Motion analysis' },
      { tag: 'RE', name: 'Reverse engineering' },
      { tag: 'PR', name: 'Prototyping' },
    ],
  },
  {
    group: 'Build',
    items: [
      { tag: '3D', name: 'FDM 3D printing' },
      { tag: 'WD', name: 'Welding' },
      { tag: 'GC', name: 'Grinding & cutting' },
      { tag: 'HT', name: 'Hand & power tools' },
      { tag: 'AU', name: 'Automotive service' },
    ],
  },
  {
    group: 'Code & electronics',
    items: [
      { tag: 'ML', name: 'MATLAB' },
      { tag: 'PY', name: 'Python' },
      { tag: 'JS', name: 'JavaScript' },
      { tag: 'JV', name: 'Java' },
      { tag: 'C', name: 'C' },
      { tag: 'AR', name: 'Arduino' },
      { tag: 'BB', name: 'Breadboarding' },
    ],
  },
]

// ---------- achievements ----------
// unlocked: true = earned, false = in progress
export const achievements = [
  { title: '3D Printer Training', detail: 'Bambu Lab and Prusa · TMU Library DME Lab', unlocked: true },
  { title: 'CSWA', detail: 'Certified SOLIDWORKS Associate', unlocked: false },
  { title: 'Google Data Analytics', detail: 'Professional Certificate', unlocked: false },
  { title: 'IBM RAG and Agentic AI', detail: 'Professional Certificate', unlocked: false },
]
