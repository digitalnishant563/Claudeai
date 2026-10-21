# JSDB Brand Film — Edit Prompt (reference-style)

How to use (Step 4 of the Claude Editing Prompt Sheet):
open a new chat with Claude Opus 5.5 and attach

1. all clips from the two Drive folders ("JSDB Shoot" and "Jsdb Office Shoot"),
2. the voiceover file `ElevenLabs_2026-10-16T08_46_46_Sia_-_Warm__Real_Companion_pvc_sp100_s67_sb56_v4_1_1.mp3`,
3. the JSDB logo (PNG/SVG, transparent background),
4. a licensed instrumental music track (optional, but the edit is designed around one),

then paste everything between the two COPY markers.

Before you paste, check the four values marked CONFIRM inside the prompt: brand spelling, the WhatsApp number on the final title, "40+ branches" (the voiceover says 40, the earlier written script said 30), and "flat 20% off on MRP".

----- COPY FROM HERE -----

You are a senior short-form video editor and motion designer. Edit the attached Jan Sewa Dawa Bazaar (JSDB) footage into a 2:02 vertical brand film. It must follow the attached voiceover and copy, exactly, the editing language of a reference reel I'm describing below: documentary/UGC realism, two-font captions in the lower-middle, a warm light-leak white-flash transition, a Bebas Neue title block that rises in line by line, and a white logo end card. You will not see that reference reel. Everything you need from it is written into this prompt as rules. Follow the numbers exactly. Where I give a choice, follow the priority order.

Work in this order: (1) log the footage (section 4), (2) build the cut on the voiceover timeline (section 5), (3) grade (section 3), (4) add captions, stat blocks, flashes, title and end card (sections 6–10), (5) mix (section 11), (6) run the QA list (section 14), (7) send me the outputs listed in section 1.

=== 0. INPUTS ===
- VOICEOVER: the attached ElevenLabs file "...Sia_-_Warm__Real_Companion...mp3". 119.33 s, mono, 44.1 kHz, 128 kbps, integrated loudness -22.6 LUFS, true peak -4.9 dBFS. Pure voice, no music. Female, warm, Hinglish. The first word ("Dilli.") starts at 0.00, so place the file at timeline 0.00 and never slide it. Every time in this prompt is measured from the start of this file.
- FOOTAGE: every clip from two folders. "JSDB Shoot" is store/branch footage. "Jsdb Office Shoot" is iPhone footage (IMG_xxxx.MOV) of the JSDB office and team. Expect mixed orientations, frame rates (25/29.97/30/50/60) and colour spaces (iPhone HDR/HLG is possible).
- LOGO: the attached JSDB logo file. Use it as supplied. Never redraw it or invent one.
- MUSIC: the attached instrumental track, if any. If no music file is attached, build and preview everything with VO only, and ask me for a track before the final render.

=== 1. DELIVERABLE ===
- 1080x1920, 9:16, 25 fps constant, progressive, Rec.709, yuv420p. H.264 High, CRF 16 (or 16–20 Mbps VBR), AAC 320 kbps, 48 kHz stereo, -movflags +faststart.
- Duration: 122.08 s video (3052 frames, f0–f3051). The audio runs 0.15 s past the last frame (122.23 s).
- Hard start on frame 0: no fade-in from black and no pre-roll. The VO, the music and shot 1 all start on frame 0.
- Send me: (a) the final MP4; (b) a shot log table (shot # | in–out | source filename | source timecode in–out | bucket | notes); (c) a list of anything you substituted or couldn't find, and any blur you applied for privacy.

=== 2. STYLE DNA, REFERENCE → THIS EDIT ===
The reference was a 20.7 s retreat reel cut to a song with no voiceover. This film is 2:02 and driven by the voiceover. Here is how each element carries over:
- Documentary/UGC realism: real, unposed moments. Here that means real pharmacists, real customers, real stock rooms, the real office team. Nothing staged-looking where a candid take exists.
- Camera-source mix: in the reference, the first shots looked cinematic (35–50 mm, f/1.8–2.8, shallow depth of field, gimbal) and the rest looked like smartphone footage (wide, handheld, deeper focus). Here Act 1 (shots 1–10) uses the most cinematic, shallow-depth-of-field takes, and Acts 2–3 can be iPhone/handheld documentary.
- Hard cuts everywhere, except the light-leak white flash. The reference used one flash. A 2-minute film gets three, one at each chapter door: after the hook, on the brand reveal, and into the benefits act. There is no other transition anywhere.
- Two-font captions: a white Baskerville-style serif plus one golden-yellow signature-script phrase per caption, with a soft black shadow, no animation, popping on and off on the cut. The first caption (the hook) is bigger. Here the captions follow the voiceover word for word.
- Bebas Neue line-by-line mask-rise block: the reference used it only for the final title. Here it is also used three times for numbers (15,000+ / FLAT 20% / 40+). When a stat block is on screen there is no caption.
- White logo end card: about 12 frames, a hard cut in and no animation. The video ends on it.
- Grade: bright, warm, airy, soft contrast, slightly lifted shadows, gentle highlight bloom. Here it is adapted to "clean, caring pharmacy" (section 3).
- Colour scheme: the white serif and the golden-yellow script stay as they are. Golden yellow means "value/savings" and reads on both clinical white and green/blue packaging. The light leak changes from the reference's magenta-pink/orange to amber-gold/peach with a hint of the JSDB brand colour (section 8). The end-card wordmark colour comes from the JSDB logo itself.

=== 3. OVERALL LOOK & GRADE ===
Mood: bright, clean and warm-neutral. "Trusted and caring", never cold-clinical, never yellow.
- White balance: pharmacy LED/tube lighting usually adds a green/cyan cast. Remove it (about +3 to +6 magenta tint). Shelves, coats and walls must read as clean white with a whisper of warmth, never blue and never cream.
- Exposure: bright. Whites at 88–94 IRE with a soft roll-off and no hard clipping on faces or labels. Lift the shadows to about 5–8 IRE (no crushed blacks). Contrast is soft to medium with a gentle S-curve.
- Highlight bloom: gentle glow on lit signage, ceiling lights, windows and the refrigerator light (threshold about 85 %, radius about 40 px, mix 10–15 %). It is subtle, not dreamy.
- Skin: warm and natural for Indian skin tones. Protect skin with a qualifier so it never goes orange, grey or green.
- Saturation: overall -5 %. Pull loud packaging reds/cyans/magentas back by 10–15 % so the captions stay the brightest colours on screen. Keep JSDB brand colours on signage true.
- Exteriors: daylight is warm afternoon. Dusk/night is amber streetlight plus the warm glow of the store (the "candlelight" equivalent of the reference's night scene).
- Matching: iPhone clips usually have more contrast and sharpening, so soften contrast and reduce sharpening to sit next to camera footage. Normalize HDR/HLG clips to Rec.709 first. Shots that sit next to each other must not jump in colour temperature.
- People: Indian adults of all ages. Pharmacists in white coats or JSDB uniforms, customers (elderly couples, parents, working adults), office staff, delivery riders. Candid and warm. Nobody looks into the lens except in the final group shot.

=== 4. STEP 1 — LOG THE FOOTAGE BEFORE YOU CUT ===
1. Probe every clip and list: filename, duration, resolution, orientation, fps, codec/colour space, whether it is HDR, whether it has audio.
2. Make a contact sheet per clip (1 frame per second) and review all of it.
3. Tag each usable range with one or more buckets and a quality score from 1 to 5 (focus, exposure, stability, expressions, how clean the background is):
   A  City/NCR establishing: streets, markets, traffic, the storefront from across the road, aerial/high wides
   B  Brand hero: JSDB signage, illuminated board, logo on glass or uniform, entrance
   C  Store interior wides: counters, aisles, staff and customers in one frame
   D  Pharmacist–customer interaction at the counter: handing over, explaining, smiling
   E  Prescriptions: parchi in hand, pharmacist reading or verifying (blur personal data)
   F  Product extreme close-ups (ECUs): strips, boxes, seals, MRP print, batch/Mfg/Exp print, Rx/Schedule H label
   G  Shelves and categories: long aisles, category labels, "wall of medicines"
   H  Stock room/warehouse: cartons, racks, unloading, stacking, separating stock
   I  Cold storage: pharma refrigerator, insulin/vaccines, temperature display
   J  Billing: barcode scan, billing screen, printer, printed bill
   K  Office team (Office Shoot): desks, screens, meetings, phone/WhatsApp orders, leadership
   L  Delivery: rider, JSDB bag, two-wheeler, doorstep handover
   M  Human warmth: elderly customers, families, staff laughing, thank-you/namaste moments
   N  Team group/finale: the whole team together, founders
4. For each shot in section 5, pick the best range from the Primary bucket. Use the Fallback bucket only if Primary has nothing of score 3 or higher. Never leave a gap, never use stock footage without asking me, and never use the same take twice. Two different sections of one long take are fine if the framing clearly differs.
5. Orientation: prefer vertical sources. For 16:9 sources, use a static 9:16 crop framed on the subject (scale up only as far as the source holds sharpness; 4K sources crop cleanly, 1080p landscape becomes soft, so use those only for wides). Never letterbox, never use a blurred-background fill, never animate the crop.
6. Framing for captions: keep faces and key action in the upper ~58 % of the frame (y 250–1100). Keep y 1130–1350 visually calm because the captions and blocks live there.
7. Speed: play everything at real time. Conform 50/60 fps to 25 fps at 1x (drop frames, no slow motion, no frame blending). Stabilization is allowed; a gentle drift should still feel handheld.
8. Privacy: blur (Gaussian, motion-tracked) patient names, phone numbers and addresses on prescriptions, bills, screens and delivery labels. Blur any visible competitor branding.

=== 5. EDIT TIMELINE — SHOT BY SHOT ===
Format: shot) in–out seconds [frames] | VO under it | what to show (Primary → Fallback bucket). Every boundary is a hard cut on that exact frame unless it says FLASH. Each cut sits 1–2 frames before the next spoken phrase, so the captions switch on the cut. Total: 56 shots plus the end card. That is about a 2.2 s average and mirrors the reference's 2.5 s rhythm.

--- ACT 1 · NEED & ORIGIN (0.00–21.60) · cinematic, shallow depth of field, emotional ---
1) 0.00–4.52 [f0–113] | "Dilli. Aur uske aas-paas phailta hua NCR." | HOOK: the single most striking wide in all the footage (A → B). Delhi/NCR street life around a JSDB branch: a busy market road, autos and two-wheelers, people crossing, shop signs. Use a drone or high-angle wide if one exists. Otherwise use the JSDB storefront seen from across the street with traffic passing in the foreground. Prefer a take with one slow, continuous camera move (gimbal glide or a slow orbit to the right, like the reference opener). Light leak #1 starts in the last 0.44 s.
2) 4.52–7.20 [f113–180] | "Yahan har mohalle mein, har din," | Emerges from the white flash. Neighbourhood life: a customer walking up to or into the pharmacy, a greeting at the door (A/C → M). Medium shot, handheld, slight push-in from the camera's real movement. Bright and human; a smile if possible.
3) 7.20–8.92 [f180–223] | "ek zaroorat common hai —" | A relatable customer at the counter asking for medicine, medium close-up in profile or three-quarter view (D → M).
4) 8.92–10.04 [f223–251] | "dawai." | Insert extreme close-up: a medicine strip or box set down on the counter or passed hand to hand. Shallow depth of field and crisp (F). The cut lands on the word.
5) 10.04–11.80 [f251–295] | "Lekin dawai jo genuine ho," | Close-up: a sealed pack, hologram or brand name being checked, or the pharmacist turning a box to read it (F → E).
6) 11.80–13.88 [f295–347] | "aur jo doctor ne prescribe ki ho," | A prescription changing hands over the counter, or the pharmacist reading it. Close-medium side profile with very shallow depth of field, like the reference's emotional profile shot (E → D). Blur personal data.
7) 13.88–15.92 [f347–398] | "wo bhi achhe discount par ho —" | Price moment: a finger on the MRP of a pack, a bill being torn off, or a customer looking at the bill (F/J → D).
8) 15.92–17.60 [f398–440] | "ye thoda mushkil hai." | A quiet, empathetic human beat: an elderly customer or a parent waiting or thinking. Soft, not sad (M → C).
9) 17.60–18.56 [f440–464] | "Isi zaroorat se" | Movement toward the JSDB storefront or signage: walking toward the entrance, or a tilt up to the sign (B → A). Light leak #2 builds over the last 0.44 s.
10) 18.56–21.60 [f464–540] | "Jan Sewa Dawa Bazaar ki shuruaat hui." | BRAND REVEAL out of the white: the cleanest, most beautiful JSDB brand shot. That could be the illuminated board, the logo on the glass door, or the whole bright store interior (B → C). Hold it steady. The music swells here.

--- ACT 2 · HOW IT WORKS (21.60–84.08) · documentary, handheld/phone feel welcome, still human ---
11) 21.60–24.92 [f540–623] | "Jan Sewa Dawa Bazaar ek retail pharmacy chain hai." | Store interior wide: counters, staff, customers. A wide (0.5x) handheld walk forward through the store, like the reference's walk into the dance but calmer (C).
12) 24.92–26.60 [f623–665] | "Company prescription medicines" | Rows of prescription medicine shelves behind the counter, with a lateral slide (G).
13) 26.60–29.72 [f665–743] | "aur healthcare products ka retail distribution karti hai" | Healthcare products (BP monitors, glucometers, supplements, baby care): a customer picking one off the shelf, or staff handing over a bag (G → C).
14) 29.72–31.92 [f743–798] | "Delhi NCR aur Gurugram mein" | A different branch exterior from shot 1, to prove there are several locations. If only one branch was shot, use a clearly different angle (A/B).
15) 31.92–33.76 [f798–844] | "phaile apne branch network ke through." | Office: a screen showing a branch list, map or dashboard, or the team coordinating. A third storefront also works (K → B). Blur sensitive data.
16) 33.76–36.76 [f844–919] | "Har dawai ka safar stock room se shuru hota hai." | Stock room: a door opening onto racks of cartons, or staff walking down the racks. Handheld (H).
17) 36.76–38.88 [f919–972] | "Procurement seedha manufacturers" | Cartons with manufacturer branding being unloaded or delivered: on a trolley, being stacked (H).
18) 38.88–40.88 [f972–1022] | "aur authorised distributors se hota hai," | Back office: staff checking an invoice or purchase order against cartons, or typing at a computer (K → J).
19) 40.88–42.36 [f1022–1059] | "bulk quantity mein." | A wide, slightly high angle of stacked cartons or full racks, showing volume (H).
20) 42.36–46.08 [f1059–1152] | "Har incoming consignment ka batch number," | Extreme close-up of a batch number printed on a carton or strip, with a finger tracing it. Focus is sharp on the print (F → H).
21) 46.08–48.92 [f1152–1223] | "manufacturing date aur expiry entry ke samay record hoti hai." | Staff entering details into the computer or register, over the shoulder. An extreme close-up of the Mfg/Exp print also works (J/K → F).
22) 48.92–51.16 [f1223–1279] | "Stock rakhne ke apne niyam hain." | Neatly organized storage: staff arranging boxes into labelled bins or racks (H → G).
23) 51.16–53.28 [f1279–1332] | "Temperature-sensitive products alag," | A pharma refrigerator door opening onto insulin or vaccine boxes, in cool light (I).
24) 53.28–55.40 [f1332–1385] | "controlled storage mein rakhe jaate hain." | Extreme close-up of the fridge temperature display (2–8 °C) or a thermometer, or a hand placing a box inside (I).
25) 55.40–58.32 [f1385–1458] | "Near-expiry stock shelf tak pahunchne se pehle" | Staff checking expiry dates on packs, close-medium (F/H).
26) 58.32–59.80 [f1458–1495] | "alag kar diya jaata hai." | A box being moved into a separate, ideally labelled, tray, bin or area (H).
27) 59.80–62.52 [f1495–1563] | "Har shelf category-wise arrange hota hai —" | A long aisle with category labels and a lateral tracking move (G).
28–33) CATEGORY MONTAGE: one shot per word, all at the same distance and moving the same direction, so it plays as a rhythmic run. Frame the shelf label where one exists (G → F).
28) 62.52–63.28 [f1563–1582] | "cardiac," | Cardiac/BP medicine section or a BP monitor.
29) 63.28–64.24 [f1582–1606] | "diabetes," | Glucometer, insulin pens or the diabetes shelf.
30) 64.24–65.08 [f1606–1627] | "thyroid," | Thyroid medicine packs or the shelf label.
31) 65.08–66.04 [f1627–1651] | "dermatology," | Creams and ointment tubes.
32) 66.04–66.92 [f1651–1673] | "orthopaedic," | Knee/back supports or the ortho shelf.
33) 66.92–67.96 [f1673–1699] | "paediatric." | Kids' syrups or baby care.
34) 67.96–72.12 [f1699–1803] | "Lagbhag pandrah hazaar se zyada SKUs, har branch par." | The widest "wall of medicines": floor-to-ceiling shelves, densely stocked, with a slow lateral move or a walk back (G → C). STAT BLOCK 1 rises over it.
35) 72.12–73.64 [f1803–1841] | "Counter par har prescription" | Counter wide: pharmacist and customer across the counter, the prescription changing hands (D).
36) 73.64–76.16 [f1841–1904] | "registered pharmacist verify karta hai." | Close-up of the pharmacist (white coat, ID) carefully verifying the prescription, with focus on the face and eyes (D/E). A licence or registration certificate on the wall can be a 1-second insert inside this shot's window, but only if it is in the footage.
37) 76.16–77.28 [f1904–1932] | "Scheduled medicines" | Extreme close-up of a Schedule H/H1 or "Rx" label on a pack (F).
38) 77.28–79.84 [f1932–1996] | "sirf valid prescription par issue hoti hain." | The pharmacist matching the prescription to the medicine and handing it over (D/E).
39) 79.84–80.88 [f1996–2022] | "Billing ke samay" | Barcode scan at the billing counter (J).
40) 80.88–84.08 [f2022–2102] | "har item ka batch aur expiry dobara check hota hai." | The billing screen with items (batch/expiry columns), or staff re-checking a pack before the bill prints (J). Light leak #3 builds over the last 0.44 s.

--- ACT 3 · WHAT IT MEANS FOR YOU (84.08–122.08) · warm, people-first, uplifting ---
41) 84.08–85.72 [f2102–2143] | "Direct procurement se" | From the white: cartons going from the delivery vehicle straight into the store or onto the shelf (H → L).
42) 85.72–88.96 [f2143–2224] | "distribution chain ki beech ki layers kam ho jaati hain." | Staff placing stock directly onto shelves in one continuous action (H/G → K).
43) 88.96–90.32 [f2224–2258] | "Is structure ki saving" | A cashier handing over a bill, or a close-up of the printed bill (J).
44) 90.32–92.40 [f2258–2310] | "company pricing mein pass karti hai —" | A customer receiving the bill and medicines, smiling or nodding (D/M).
45) 92.40–93.68 [f2310–2342] | "printed MRP par" | A sharp extreme close-up of the printed MRP on a pack (F).
46) 93.68–95.32 [f2342–2383] | "flat bees percent." | The warm payoff: a happy customer with the bill or bag, or a pharmacist smiling while handing over (M/D → J). STAT BLOCK 2.
47) 95.32–98.76 [f2383–2469] | "Aaj ye system 40 se zyada branches par chalta hai." | A wide of the busiest branch, or a storefront at dusk with the lights on, with a slow drift (A/B/C). STAT BLOCK 3.
48) 98.76–101.24 [f2469–2531] | "Aur jo customer store tak nahi aa sakte," | Staff taking a phone or WhatsApp order (screen blurred), or an elderly person at home if that was shot (K/L → M).
49) 101.24–103.96 [f2531–2599] | "un tak order home delivery ke through pahunchta hai." | A delivery rider leaving with a JSDB bag on a two-wheeler, or handing over a package at a doorstep (L).
50) 103.96–107.44 [f2599–2686] | "Aur bahut jald ye branches ek sau se zyada hongi," | Office team energy: a huddle or meeting, leadership at a whiteboard or map. Forward-looking (K → N).
51) 107.44–110.60 [f2686–2765] | "jisse service har ghar tak aasaan ho jaayegi." | A doorstep handover to a family or an elder, with a smile (L/M).
52) 110.60–112.24 [f2765–2806] | "Company ka vision network ko" | A founder/leadership portrait in the office or store, looking off-camera with calm confidence (K/N).
53) 112.24–114.68 [f2806–2867] | "dheere-dheere aage badhaane ka hai —" | A forward-walking gimbal or handheld move through the store or office; the movement reads as progress (C/K).
54) 114.68–117.08 [f2867–2927] | "taaki sahi dawai, kam kharch par," | The pharmacist handing medicine to a customer with a genuine smile, warm close-medium (D/M).
55) 117.08–119.12 [f2927–2978] | "aur zyada parivaaron tak pahunch sake." | The warmest human moment in the footage: an elderly couple or family smiling, a thank-you or namaste (M).
56) 119.12–121.60 [f2978–3040] | (music only) | FINALE: the JSDB team together in front of the store or at the counter, smiling. Looking at the camera or waving is allowed here only. Handheld with a slight drift (N → M). Keep y 990–1425 uncluttered for the title block.
57) 121.60–122.08 [f3040–3052] | END CARD (section 10).

=== 6. CAPTIONS ===
Style (identical to the reference):
- Base words: a classic Baskerville-style serif, pure white #FFFFFF. Font priority: Libre Baskerville Regular → Cormorant Garamond SemiBold → Lora Regular.
- One highlighted phrase per caption: a bold, slanted, handwritten signature/brush script in warm golden yellow #EBD24A. Font priority: Amsterdam Four → Brittany Signature → Hurricane → Allison (the last two are free on Google Fonts). The script is larger than the serif and shares its baseline, so its ascenders and descenders overlap the line above or below. That overlap is intended.
- Shadow on both fonts: black at 65 % opacity, 9 px blur, x 0 / y +2 px. No outline, box or background plate.
- Layout: centered at x = 540. Two lines: line 1 baseline y = 1200, line 2 baseline y = 1280. Serif 56 px, script 85 px. One-line captions sit on baseline y = 1240. Aim for a block width of about 70 % of the frame (≤ 760 px); the hard limit is 820 px, to stay clear of the Instagram buttons. If a line runs over, scale that caption's two fonts down together (no lower than 90 %). If it still doesn't fit, move the line break to the nearest natural phrase boundary. Never drop or change a word.
- HOOK (C1) is bigger: serif 64 px, script about 2x the normal size (glyphs about 170 px tall), line 1 baseline y ≈ 1235, line 2 baseline y ≈ 1325.
- Animation: none. Each caption pops on and off instantly on the frame given. No fades, typewriter, karaoke, bounce or scale.
- Spacing: one normal serif word space on each side of a script phrase. Default tracking on both fonts. Hinglish in Roman script exactly as written below, including punctuation. No Devanagari and no emojis.
- On-times: every caption switches on its shot's cut, except at the three flashes, where the new caption appears on the white frame (as in the reference).

Caption timeline ([brackets] = yellow script phrase, " / " = line break):
C1  0.00–4.72    HOOK  "[Dilli.] Aur uske" / "aas-paas phailta hua NCR."
C2  4.72–7.20    "Yahan har mohalle mein," / "[har din,]"           (appears on the white of flash #1)
C3  7.20–8.92    "ek [zaroorat]" / "common hai —"
C4  8.92–10.04   "[dawai.]"                                          (one line)
C5  10.04–11.80  "Lekin dawai jo" / "[genuine] ho,"
C6  11.80–13.88  "aur jo doctor ne" / "[prescribe] ki ho,"
C7  13.88–15.92  "wo bhi achhe" / "[discount] par ho —"
C8  15.92–17.60  "ye thoda" / "[mushkil] hai."
C9  17.60–18.76  "Isi [zaroorat] se"                                 (one line)
C10 18.76–21.60  "[Jan Sewa Dawa Bazaar]" / "ki shuruaat hui."      (appears on the white of flash #2)
C11 21.60–24.92  "Jan Sewa Dawa Bazaar" / "ek retail [pharmacy chain] hai."
C12 24.92–26.60  "Company" / "[prescription medicines]"
C13 26.60–29.72  "aur healthcare products ka" / "retail [distribution] karti hai"
C14 29.72–31.92  "Delhi NCR aur" / "[Gurugram] mein"
C15 31.92–33.76  "phaile apne" / "[branch network] ke through."
C16 33.76–36.76  "Har dawai ka safar [stock room]" / "se shuru hota hai."
C17 36.76–38.88  "Procurement seedha" / "[manufacturers]"
C18 38.88–40.88  "aur [authorised distributors]" / "se hota hai,"
C19 40.88–42.36  "[bulk quantity] mein."                             (one line)
C20 42.36–46.08  "Har incoming consignment ka" / "[batch number,]"
C21 46.08–48.92  "manufacturing date aur [expiry]" / "entry ke samay record hoti hai."
C22 48.92–51.16  "Stock rakhne ke" / "[apne niyam] hain."
C23 51.16–53.28  "[Temperature-sensitive]" / "products alag,"
C24 53.28–55.40  "[controlled storage] mein" / "rakhe jaate hain."
C25 55.40–58.32  "[Near-expiry] stock" / "shelf tak pahunchne se pehle"
C26 58.32–59.80  "[alag kar diya] jaata hai."                        (one line)
C27 59.80–62.52  "Har shelf [category-wise]" / "arrange hota hai —"
C28 62.52–63.28  "[cardiac,]"                                        (one line, one word per cut)
C29 63.28–64.24  "[diabetes,]"
C30 64.24–65.08  "[thyroid,]"
C31 65.08–66.04  "[dermatology,]"
C32 66.04–66.92  "[orthopaedic,]"
C33 66.92–67.96  "[paediatric.]"
    67.96–72.12  NO CAPTION: STAT BLOCK 1
C34 72.12–73.64  "[Counter] par" / "har prescription"
C35 73.64–76.16  "[registered pharmacist]" / "verify karta hai."
C36 76.16–77.28  "[Scheduled medicines]"                             (one line)
C37 77.28–79.84  "sirf [valid prescription] par" / "issue hoti hain."
C38 79.84–80.88  "[Billing] ke samay"                                (one line)
C39 80.88–84.28  "har item ka batch aur expiry" / "[dobara check] hota hai."
C40 84.28–85.72  "[Direct procurement] se"                           (one line; appears on the white of flash #3)
C41 85.72–88.96  "distribution chain ki beech ki" / "[layers] kam ho jaati hain."
C42 88.96–90.32  "Is structure ki [saving]"                          (one line)
C43 90.32–92.40  "company pricing mein" / "[pass] karti hai —"
C44 92.40–93.68  "printed [MRP] par"                                 (one line)
    93.68–98.76  NO CAPTION: STAT BLOCKS 2 and 3
C45 98.76–101.24  "Aur jo customer store tak" / "[nahi aa sakte,]"
C46 101.24–103.96 "un tak order [home delivery]" / "ke through pahunchta hai."
C47 103.96–107.44 "Aur bahut jald ye branches" / "[ek sau se zyada] hongi,"
C48 107.44–110.60 "jisse service [har ghar tak]" / "aasaan ho jaayegi."
C49 110.60–112.24 "Company ka [vision]" / "network ko"
C50 112.24–114.68 "dheere-dheere" / "[aage badhaane] ka hai —"
C51 114.68–117.08 "taaki [sahi dawai,]" / "kam kharch par,"
C52 117.08–119.12 "aur zyada [parivaaron] tak" / "pahunch sake."
    119.12 onward: no captions (title block, then end card)

CONFIRM, brand spelling: use whatever spelling the JSDB logo/signage uses ("Jan Sewa" or "Jan Seva") everywhere: captions C10/C11 and the title. The default above follows the script.

=== 7. STAT BLOCKS — BEBAS NEUE LINE-BY-LINE MASK RISE ===
Typography (same as the reference title): Bebas Neue, all caps, centered at x = 540, tight leading (~0.95), subtle shadow (black 40 %, y +3 px, 6 px blur). White lines are #FFFFFF; the bottom accent line is yellow #F2D81E. Fit each line to its target width (the font size follows from the width). Keep the stack's vertical centre at about y = 1240, the same zone as the captions.
Animation: each line sits inside its own invisible mask exactly the height of the line and slides up from 100 % below its baseline into place. Strong ease-out (easeOutExpo, or cubic-bezier(0.16, 1, 0.3, 1)). No fade, no blur, no overshoot, no scale. Each block holds perfectly still once settled and disappears with a hard cut on the next shot's cut, with no exit animation.

STAT 1 (over shot 34): t0 = 68.36 (0.40 s after the cut, the reference's title offset)
- L1 "LAGBHAG", white, ~26 % width: rises 68.36→68.64
- L2 "15,000+ SKUs", white, ~78 % width: rises 68.48→68.74 (starts last, so the number arrives as the VO says "pandrah hazaar" at 68.56)
- L3 "HAR BRANCH PAR", yellow, ~40 % width: rises 68.36→68.62
- Gaps: 18 px between L1 and L2, 26 px between L2 and L3. Holds until the cut at 72.12.

STAT 2 (over shot 46): t0 = 93.72 (1 frame after the cut, locked to "flat" at 93.75)
- L1 "FLAT 20% OFF", white, ~78 % width: rises 93.72→94.00
- L2 "PRINTED MRP PAR", yellow, ~44 % width: rises 93.72→93.98
- Gap 26 px. Holds until the cut at 95.32.

STAT 3 (over shot 47): t0 = 95.72 (0.40 s after the cut; "40" is spoken at about 96.36)
- L1 "40+ BRANCHES", white, ~78 % width: rises 95.72→96.00
- L2 "DELHI NCR · GURUGRAM", yellow, ~52 % width: rises 95.72→95.98
- Gap 26 px. Holds until the cut at 98.76.
CONFIRM: "40+" (the VO says 40) and "FLAT 20% OFF … PRINTED MRP" (as spoken).

=== 8. TRANSITIONS — LIGHT-LEAK WHITE FLASH (exactly three; every other cut is hard) ===
The recipe is identical each time. Only the timings below move.
Leak colours (adapted from the reference's hot magenta-pink → orange-red with a violet hint): warm amber-gold #FFB547 flowing into soft coral-peach #FF8A65, with a faint hint of the JSDB brand primary colour sampled from the logo in the top-left corner (if the brand colour is red/orange or unclear, use pale mint #A8E6CF). Blend mode Screen. Build it from 2–3 soft radial gradients drifting slowly inward from the left and bottom-left edges, plus a full-frame white solid for the blow-out.
Phases (times relative to the cut C):
- C-0.44: the leak creeps in from the left and bottom-left edges (Screen blend, about 0.15 s to establish).
- C-0.28 → C-0.04: the leak spreads, the whole frame turns warm peach-gold, and highlights bloom.
- C: hard cut to the next shot underneath the leak.
- C+0.08 → C+0.16: blows out to almost pure white (white solid 0 → 97 % over 2 frames).
- C+0.16 → C+0.36: holds near-white for 5 frames. The next caption appears on the white at C+0.20.
- C+0.36 → C+0.64: the white recedes (ease-in-out) and leaves a peach-gold glow on the left edge that fades out. The image is clean by C+0.64.

FLASH #1, after the hook, C = 4.52 [f113]: leak 4.08, spread 4.24–4.48, cut 4.52, blow-out 4.60–4.68, white hold 4.68–4.88, C2 on at 4.72, recede 4.88–5.16, clean by 5.16.
FLASH #2, brand reveal, C = 18.56 [f464]: leak 18.12, spread 18.28–18.52, cut 18.56, blow-out 18.64–18.72, white hold 18.72–18.92, C10 on at 18.76, recede 18.92–19.20, clean by 19.20. The VO says "Jan Sewa Dawa Bazaar" at 18.84 as the white clears.
FLASH #3, into Act 3, C = 84.08 [f2102]: leak 83.64, spread 83.80–84.04, cut 84.08, blow-out 84.16–84.24, white hold 84.24–84.44, C40 on at 84.28, recede 84.44–84.72, clean by 84.72.
Captions C1, C9 and C39 stay up through the blow-out until the next caption replaces them on the white, as in the reference.

=== 9. FINAL TITLE BLOCK (over shot 56, 119.52 → hold until 121.60) ===
Font and shadow: same as section 7 (Bebas Neue, tight leading ~0.95, black 40 % / y +3 px / 6 px blur). Centered. It forms a pyramid like the reference:
- L1 "JAN SEWA DAWA BAZAAR": white, fit to ~82 % width (about 125–135 px), top at y ≈ 990
- L2 "FLAT 20% OFF ON MRP": white, fit to ~69 % width
- L3 "40+ BRANCHES · DELHI NCR": white, fit to ~58 % width
- (gap about 45 px)
- L4 "WHATSAPP 93191 99318": yellow #F2D81E, fit to ~48 % width, bottom at y ≈ 1425
Animation (the reference's exact offsets): the same mask rise, strong ease-out, no fade/blur/overshoot.
- L1 119.52→119.80
- L2 119.56→119.82
- L4 119.52→119.78
- L3 119.64→119.88 (starts last)
Everything has settled by 119.90. The block then holds perfectly still until a hard cut at 121.60.
CONFIRM, L4: the WhatsApp number comes from JSDB's August 2026 reel scripts. If I give you a different CTA, use mine. The alternative is "VISIT JSDB.IN".

=== 10. END CARD (121.60–122.08, 12 frames) ===
Pure white #FFFFFF background, hard cut in, no animation, and the video ends on it. The JSDB logo is centered horizontally, with its visual centre slightly below the middle (about 52 % down, y ≈ 1000). It is ~84 % of the frame width if the logo is a wide/horizontal lockup, or ~60 % width if it is stacked or square. Use the logo's native colours. If the logo has white parts, use its on-white version. Add nothing else: no tagline, no URL, no social icons. If no logo file is attached, stop and ask me for it. Never draw a substitute.

=== 11. AUDIO ===
- The VO is the spine. Place it at 0.00 untouched in time. Processing chain: high-pass at 80 Hz → gentle de-ess → compressor 2:1 at about -20 dBFS with 2–3 dB gain reduction → about +8.5 dB makeup → limiter at -1.0 dBTP. Target: VO at about -15 LUFS short-term, clear and close.
- Music (if supplied): an emotional, uplifting Indian acoustic/piano instrumental (no vocals, so it never fights the VO). It runs the full length from frame 0 with no fade-in. It starts sparse and gentle, swells into fuller instrumentation (strings/pads) on the brand reveal at 18.56–18.84, gains soft percussion (claps/tabla/kick) from flash #3 at 84.08, hits a lift or accent on "FLAT 20%" at 93.68–93.75, warms under the vision lines, and rises to full level once the VO ends at 119.12 for the title. The final chord rings into the end card, and the audio runs 0.15 s past the last frame (to 122.23).
- Music level: sit it about 12 LU under the VO (around -27 LUFS while the VO speaks), with sidechain ducking of 4–6 dB (150 ms attack, 400 ms release). Let it breathe up a little in the VO gaps of 0.4 s or more. From 119.12 it comes up to about -16 LUFS.
- The cut is locked to the VO. To make the music's phrase changes land on the anchors (18.56, 84.08, 93.68, 119.12), shift the music's start offset or edit the music at a bar line. Never move the picture cuts.
- No sound effects, no whooshes on the flashes, no source/ambient audio from the clips.
- Final mix: -14 LUFS integrated, ≤ -1.0 dBTP, 48 kHz stereo, VO centered.

=== 12. DO NOT ===
- No zooms or punch-ins of any kind (digital push-ins, Ken Burns, scale animations). The only movement is the camera's real movement.
- No speed ramps, no slow motion, no reversed clips.
- No borders, frames, letterboxing, blurred-background fills or split screens.
- No grain or texture overlays, no vignettes beyond the subtle grade.
- No fade-in at the start, no fade to black at the end, no dissolves, wipes, glitches or whip-pan effects. The only transitions allowed are the three light-leak flashes. A natural whip already inside the footage can serve as a cut point.
- No caption animation, no extra text, lower-thirds, emojis, stickers, icons, arrows, progress bars, a logo bug or a watermark during the film.
- No sound effects.
- Don't change, translate, shorten or reorder the VO words in the captions.

=== 13. BUILD NOTES (how to implement precisely) ===
- Conform: transcode every source to 1080x1920 25p CFR Rec.709 mezzanine files first (ProRes 422 or high-bitrate H.264), grade, then cut on a 25 fps timeline. All times above are multiples of 0.04 s (1 frame), so use the frame numbers.
- Captions: render each caption as a transparent 1080x1920 overlay. HTML/CSS rendered in Chromium (Playwright) or Remotion is easiest for mixed-font baseline alignment. Use inline spans for the serif and script runs on one shared baseline, with line-height set so the baselines land at y = 1200/1280 (1240 for one-line captions, 1235/1325 for the hook). Apply CSS text-shadow: 0 2px 9px rgba(0,0,0,0.65) to both runs. Check the rendered pixel baselines against the spec before compositing.
- Mask rise: for each line, overflow: hidden on a box exactly the line's height, with the text translated from translateY(100 %) to 0 using cubic-bezier(0.16, 1, 0.3, 1). Equivalent formula: y = H·(1 − ease(t)), ease(t) = 1 − 2^(−10t).
- Light leak: generate it procedurally (animated radial gradients with Screen blend plus a white solid with the opacity curve in section 8), or use a real film-burn clip recoloured to the section 8 palette. Composite above the footage and below the captions.
- Composite order (bottom to top): graded footage → light leak/white → captions/stat/title → end card.
- Export: x264 -preset slow -crf 16 -profile:v high -pix_fmt yuv420p -r 25 -movflags +faststart, AAC 320k 48 kHz.

=== 14. QA CHECKLIST (do all of these before you send) ===
- Total length 122.08 s video / 122.23 s audio; frame 0 is picture plus VO with no black frame.
- Spot-check every cut against section 5 frame numbers; every caption against section 6 on its exact on/off frames.
- No caption line wider than 820 px. No caption overlapping a face. Script phrases are yellow #EBD24A and the serif is white with the shadow present.
- C2, C10 and C40 first appear on a white flash frame. Images are clean by 5.16, 19.20 and 84.72.
- Stat blocks and the title: mask rise only (no fade), all lines settled on the frames given, hard cuts out.
- End card: white, logo at about 52 % down, 12 frames, nothing else.
- Loudness -14 LUFS integrated, true peak ≤ -1 dBTP; VO intelligible over the music everywhere.
- Personal data blurred on every prescription, bill, screen and label.
- Watch the whole film once at 100 % on a phone-sized preview with the Instagram Reels UI overlay in mind: nothing important within 250 px of the top, 380 px of the bottom, or 140 px of the right edge (the captions and blocks already sit inside this).

=== APPENDIX A — VO TRANSCRIPT WITH TIMINGS (measured from the audio file) ===
0.00–0.83     Dilli.
1.27–4.27     Aur uske aas-paas phailta hua NCR.
4.90–6.88     Yahan har mohalle mein, har din,
7.26–8.44     ek zaroorat common hai —
8.99–9.40     dawai.
10.09–13.58   Lekin dawai jo genuine ho, aur jo doctor ne prescribe ki ho,
13.93–15.68   wo bhi achhe discount par ho —
15.98–17.06   ye thoda mushkil hai.
17.65–18.55   Isi zaroorat se
18.84–21.00   Jan Sewa Dawa Bazaar ki shuruaat hui.
21.66–24.56   Jan Sewa Dawa Bazaar ek retail pharmacy chain hai.
24.99–29.32   Company prescription medicines aur healthcare products ka retail distribution karti hai —
29.79–33.26   Delhi NCR aur Gurugram mein phaile apne branch network ke through.
33.82–36.36   Har dawai ka safar stock room se shuru hota hai.
36.84–40.62   Procurement seedha manufacturers aur authorised distributors se hota hai,
40.96–41.95   bulk quantity mein.
42.41–48.52   Har incoming consignment ka batch number, manufacturing date aur expiry entry ke samay record hoti hai.
48.98–50.80   Stock rakhne ke apne niyam hain.
51.23–52.99   Temperature-sensitive products alag,
53.35–55.07   controlled storage mein rakhe jaate hain.
55.46–59.43   Near-expiry stock shelf tak pahunchne se pehle alag kar diya jaata hai.
59.86–62.13   Har shelf category-wise arrange hota hai —
62.60–67.50   cardiac (62.60), diabetes (63.35), thyroid (64.30), dermatology (65.16), orthopaedic (66.12), paediatric (67.00).
68.02–70.66   Lagbhag pandrah hazaar se zyada SKUs,
70.95–71.78   har branch par.
72.19–75.83   Counter par har prescription (72.19) registered pharmacist verify karta hai (73.70).
76.24–79.49   Scheduled medicines sirf valid prescription par issue hoti hain.
79.90–84.04   Billing ke samay har item ka batch aur expiry dobara check hota hai.
84.42–88.65   Direct procurement se distribution chain ki beech ki layers kam ho jaati hain.
89.09–91.99   Is structure ki saving company pricing mein pass karti hai —
92.45–94.99   printed MRP par (92.45) flat bees percent (93.75).
95.41–98.33   Aaj ye system 40 se zyada branches par chalta hai.
98.82–101.01  Aur jo customer store tak nahi aa sakte,
101.31–103.64 un tak order home delivery ke through pahunchta hai.
104.04–110.22 Aur bahut jald ye branches ek sau se zyada hongi, jisse service har ghar tak aasaan ho jaayegi.
110.67–114.29 Company ka vision network ko dheere-dheere aage badhaane ka hai —
114.74–115.76 taaki sahi dawai,
116.02–116.91 kam kharch par,
117.16–119.05 aur zyada parivaaron tak pahunch sake.

----- COPY UNTIL HERE -----
