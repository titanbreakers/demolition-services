# AI Image Generation Prompts for TitanBreakers

Generate these 14 images and save them to `/public` folder with the specified filenames.

---

## 🏠 HERO IMAGE (1920x1080)

**Filename:** `hero-demolition.jpg`

**Prompt:**

```
Professional construction worker wearing orange hard hat and yellow safety vest, using sledgehammer to carefully demolish interior drywall, wood studs and insulation visible, dust particles in air catching side lighting, residential home renovation setting, exposed brick wall in background, photorealistic, 8k quality, cinematic composition, shallow depth of field focusing on worker, documentary photography style, no heavy machinery, hand tools only --ar 16:9 --style raw --v 6.0
```

---

## 🔧 SERVICE IMAGES (800x600 each)

### 1. Manual Demolition

**Filename:** `service-manual.jpg`

**Prompt:**

```
Close-up of hands wearing work gloves holding demolition hammer striking concrete wall, debris and dust flying, detailed texture of concrete breaking, indoor residential setting, natural window lighting from left side, professional craftsmanship, photorealistic, no machinery visible, hand tool demolition work --ar 4:3 --style raw
```

### 2. Interior Demolition

**Filename:** `service-interior.jpg`

**Prompt:**

```
Wide shot of living room interior demolition in progress, removed drywall exposing wooden studs, worker carefully removing baseboards with pry bar, drop cloths protecting floor, residential apartment setting, natural daylight from large window, renovation work in progress, hand tools scattered, photorealistic documentary style --ar 4:3
```

### 3. Selective Demolition

**Filename:** `service-selective.jpg`

**Prompt:**

```
Precision demolition work, worker using chisel and hammer to carefully remove single brick from interior wall without damaging surrounding structure, close-up macro shot showing craftsmanship, shallow depth of field, clean work area, partially demolished wall showing layers, professional hand tool work, photorealistic detail --ar 4:3
```

### 4. Asbestos Removal

**Filename:** `service-asbestos.jpg`

**Prompt:**

```
Professional worker in full white hazmat suit with respirator mask, carefully removing asbestos ceiling tiles in commercial building, plastic containment barriers visible, warning signs, specialized removal tools, strict safety protocols, indoor industrial setting, professional documentation photography, photorealistic --ar 4:3
```

### 5. Kitchen & Bathroom Demolition

**Filename:** `service-kitchen-bathroom.jpg`

**Prompt:**

```
Split composition showing kitchen demolition on left and bathroom demolition on right, left side: worker removing kitchen cabinets and countertop with crowbar, right side: worker removing bathroom tiles with hammer, both residential settings, natural lighting, hand tools visible, renovation debris, photorealistic documentary style --ar 4:3
```

### 6. Property Clearing

**Filename:** `service-property-clearing.jpg`

**Prompt:**

```
Empty residential room after complete interior strip-out, exposed subfloor and wall studs, worker carrying out debris in wheelbarrow, bare room ready for renovation, natural window lighting, construction cleanup in progress, before renovation state, photorealistic wide angle shot --ar 4:3
```

---

## 📁 PROJECT IMAGES (800x600 each)

### 1. Kitchen Renovation Amsterdam

**Filename:** `project-1.jpg`

**Prompt:**

```
Dutch residential kitchen demolition in Amsterdam apartment, removed upper cabinets exposing wall, worker using pry bar to remove lower cabinet, ceramic tile floor partially removed, dust protection sheets covering adjacent areas, typical Amsterdam canal house interior with large window, natural daylight, hand tools visible, photorealistic renovation photography --ar 4:3
```

### 2. Bathroom Demolition Utrecht

**Filename:** `project-2.jpg`

**Prompt:**

```
Small Dutch bathroom complete strip-out, removed toilet and sink, exposed plumbing pipes on wall, worker removing wall tiles with hammer and chisel, ceramic tile debris in corner, white bathroom tiles partially removed showing concrete, Dutch residential apartment, natural light from frosted window, photorealistic documentary style --ar 4:3
```

### 3. Office Strip-out Rotterdam

**Filename:** `project-3.jpg`

**Prompt:**

```
Modern office space interior demolition, removed ceiling panels exposing metal framework and wiring, worker on ladder removing light fixtures, carpet tiles stacked in corner, glass office partitions still intact, commercial building interior, professional work environment, selective demolition preserving structure, photorealistic --ar 4:3
```

### 4. Property Clearing Eindhoven

**Filename:** `project-4.jpg`

**Prompt:**

```
1970s Dutch house complete interior clearing, living room with exposed wooden floorboards and wall studs, removed all furniture and fixtures, worker carrying out old wooden door, typical Dutch row house interior, natural light from front window, renovation before state, photorealistic wide shot --ar 4:3
```

### 5. Apartment Renovation The Hague

**Filename:** `project-5.jpg`

**Prompt:**

```
Dutch apartment interior in The Hague, worker carefully demolishing interior partition wall between living room and kitchen, exposed brick on one side, gypsum board on other, dust in air, neighboring apartments visible through open doorway, typical Dutch flat interior, natural window lighting, precision hand demolition work --ar 4:3
```

### 6. Retail Space Stripping

**Filename:** `project-6.jpg`

**Prompt:**

```
Empty retail shop interior demolition, removed shelving units and display cases, exposed concrete floor, worker removing floor tiles with jackhammer, large storefront windows, city street visible outside, commercial space renovation, hand tools and equipment, photorealistic commercial photography --ar 4:3
```

---

## 👥 ABOUT PAGE IMAGE (800x600)

### Team Photo

**Filename:** `about-team.jpg`

**Prompt:**

```
Professional team photo of 4 demolition workers standing together at renovation site, wearing matching company work clothes with TitanBreakers logo, orange hard hats, holding various hand tools (hammer, crowbar, chisel), confident poses, partially demolished residential interior background, natural early morning lighting, professional corporate photography, sharp focus on faces, photorealistic --ar 4:3
```

---

## 🎨 GENERATION INSTRUCTIONS

### For Midjourney:

1. Copy the prompt
2. Add `--ar 16:9` for hero, `--ar 4:3` for others
3. Add `--style raw` for photorealism
4. Add `--v 6.0` for best quality
5. Generate 4 variations, pick best

### For DALL-E 3:

1. Use exact prompt as-is
2. Specify aspect ratio in prompt: "16:9 aspect ratio" or "4:3 aspect ratio"
3. Generate and download

### For Stable Diffusion:

1. Use prompt with these settings:
   - Steps: 30-50
   - CFG Scale: 7-9
   - Sampler: DPM++ 2M Karras
2. Negative prompt: "excavator, bulldozer, crane, heavy machinery, outdoor construction site, explosion"

### For Leonardo.ai or Adobe Firefly:

1. Paste full prompt
2. Select "PhotoReal" or "Cinematic" style
3. Set aspect ratio accordingly

---

## ✅ QUALITY CHECKLIST

**Each image MUST show:**

- ✅ Hand tools only (hammer, chisel, crowbar, pry bar)
- ✅ Indoor/residential or commercial interior setting
- ✅ Professional workers with safety gear
- ✅ Renovation/demolition work in progress
- ✅ NO heavy machinery (excavators, bulldozers, cranes)
- ✅ NO outdoor construction sites

**Save all images as:**

- Format: JPG
- Quality: High (80-100%)
- Location: `/public/` folder
- Filenames: Must match exactly as specified above

---

## 🚀 AFTER GENERATING

Once you have all 14 images in `/public/media` folder:

```bash
# Clear old data (optional)
pnpm clear-db

# Upload all images to Payload CMS
pnpm seed:all
```

**The seed script will:**

1. Upload all 14 images to Payload CMS Media collection
2. Assign service images to corresponding services
3. Assign project images to corresponding projects
4. Set hero image on homepage
5. Set about image on about page

---

## ⚠️ MISSING IMAGES TO GENERATE

The following images are needed but not yet in `/public/media/`:

### Project Images Missing:

- ❌ `project-4.webp` - Property Clearing Eindhoven
- ❌ `project-5.webp` - Apartment Renovation The Hague
- ❌ `project-6.webp` - Retail Space Stripping

### Service Images Missing:

- ❌ `service-asbestos.webp` - Asbestos Removal
- ❌ `service-property-clearing.webp` - Property Clearing

**Note:** Current files use `.webp` format (better compression). Save new images as `.webp` in `/public/media/` folder.

### Image Mapping:

| Content               | Expected File                    | Status         |
| --------------------- | -------------------------------- | -------------- |
| Hero                  | `hero-demolition.webp`           | ✅ Exists      |
| Project 1             | `project-1.webp`                 | ✅ Exists      |
| Project 2             | `project-2.webp`                 | ✅ Exists      |
| Project 3             | `project-3.webp`                 | ✅ Exists      |
| Project 4             | `project-4.webp`                 | ❌ **MISSING** |
| Project 5             | `project-5.webp`                 | ❌ **MISSING** |
| Project 6             | `project-6.webp`                 | ❌ **MISSING** |
| Service: Manual       | `service-manual.webp`            | ✅ Exists      |
| Service: Interior     | `interior-demolishion.webp`      | ✅ Exists      |
| Service: Selective    | `service-selective.webp`         | ✅ Exists      |
| Service: Asbestos     | `service-asbestos.webp`          | ❌ **MISSING** |
| Service: Kitchen/Bath | `service-kitchen-bathroom.webp`  | ✅ Exists      |
| Service: Property     | `service-property-clearing.webp` | ❌ **MISSING** |
| About Team            | `about-team.webp`                | ✅ Exists      |

**Total: 10/14 images present (71% complete)**

---

## 💡 TIPS FOR BEST RESULTS

**If images show heavy machinery:**

- Add to negative prompt: "excavator, bulldozer, crane, machinery, equipment"
- Emphasize: "hand tools only, manual work, precision"

**If images look too artificial:**

- Add: "documentary photography style, photojournalistic, natural lighting"
- Use `--style raw` in Midjourney

**If composition is wrong:**

- Be more specific about camera angle: "wide angle shot", "close-up", "medium shot"
- Describe lighting: "natural window light from left", "soft shadows"

---

**Need 14 total images:**
1 Hero + 6 Services + 6 Projects + 1 About = 14 images

Generate them all and your website will look professional! 🎉
