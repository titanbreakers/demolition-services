# AI Image Generation Prompts for TitanBreakers

## 🎨 Professional Prompts for Hand Demolition Images

Use these prompts with **Midjourney**, **DALL-E 3**, **Stable Diffusion**, or **Adobe Firefly**.

---

## 1. HERO IMAGE (Main Banner)

**Recommended Tool:** Midjourney v6 or DALL-E 3
**Aspect Ratio:** 16:9 (1920x1080)

### Prompt Option A - Professional Worker:

```
Professional construction worker wearing hard hat and safety vest, using sledgehammer to carefully demolish interior wall, dust particles in air, dramatic side lighting, residential renovation setting, exposed brick and wooden beams, photorealistic, 8k quality, cinematic composition, shallow depth of field --ar 16:9 --style raw
```

### Prompt Option B - Action Shot:

```
Close-up of hands holding demolition hammer striking interior plaster wall, debris flying, construction gloves, dramatic lighting from window, professional renovation work, detailed textures, photorealistic, Unreal Engine 5 render quality --ar 16:9 --v 6.0
```

### Prompt Option C - Wide Angle:

```
Wide angle shot of professional demolition team working inside residential home, removing kitchen cabinets and tiles, hard hats and safety equipment, natural window lighting, scattered tools and debris, documentary photography style, photorealistic, highly detailed --ar 16:9
```

**Save as:** `hero-demolition.jpg`

---

## 2. PROJECT IMAGES (Portfolio)

**Recommended Tool:** Midjourney or DALL-E 3
**Aspect Ratio:** 4:3 (800x600)

### Project 1 - Kitchen Demolition:

```
Residential kitchen demolition in progress, removed cabinets and countertops, exposed wall studs, worker using crowbar, ceramic tile debris on floor, dust protection sheets, natural daylight from window, documentary style photography, photorealistic --ar 4:3
```

**Save as:** `project-1.jpg`

### Project 2 - Bathroom Strip-out:

```
Bathroom renovation demolition, removed bathtub and toilet, exposed plumbing pipes, broken ceramic tiles, worker with hammer removing wall tiles, waterproofing visible, construction site lighting, professional photography, detailed textures --ar 4:3
```

**Save as:** `project-2.jpg`

### Project 3 - Interior Wall Removal:

```
Interior wall demolition in apartment, creating open concept space, exposed brick and wooden studs, two workers carefully removing drywall, electrical wiring visible, dust in air, residential setting, photojournalistic style --ar 4:3
```

**Save as:** `project-3.jpg`

---

## 3. SERVICE IMAGES

**Aspect Ratio:** 4:3 (800x600)

### Service: Manual Demolition

```
Close-up professional shot of construction worker using sledgehammer on concrete wall, safety helmet and goggles, motion blur on hammer, debris particles frozen in air, dramatic lighting, construction site, highly detailed, photorealistic --ar 4:3
```

**Save as:** `service-manual.jpg`

### Service: Interior Demolition

```
Professional interior strip-out of office space, removed ceiling panels and drywall, exposed metal framing, worker on ladder removing fixtures, fluorescent lighting, commercial renovation, wide angle, documentary photography --ar 4:3
```

**Save as:** `service-interior.jpg`

### Service: Selective Demolition

```
Precision demolition work, worker carefully removing single brick from wall without damaging surrounding structure, chisel and hammer, close-up macro shot, shallow depth of field, craftsmanship detail, professional lighting --ar 4:3
```

**Save as:** `service-selective.jpg`

### Service: Kitchen & Bathroom

```
Split view of kitchen and bathroom demolition, left side shows cabinet removal with power tools, right side shows tile removal with hammer, residential home, natural lighting, before renovation state, photorealistic --ar 4:3
```

**Save as:** `service-kitchen-bathroom.jpg`

---

## 4. ABOUT PAGE IMAGE

**Aspect Ratio:** 16:9 or 4:3

### Team/Company Image:

```
Professional team photo of 3-4 demolition workers in company uniforms and hard hats, standing in front of renovation site, holding tools, confident poses, early morning lighting, construction site background, corporate photography style, sharp focus --ar 16:9
```

**Save as:** `about-team.jpg`

---

## 🛠️ Alternative: Using AI Image APIs

### Option 1: OpenAI DALL-E 3 (Paid)

```bash
# You would need an OpenAI API key
# Cost: ~$0.04-0.08 per image
```

### Option 2: Stability AI (Stable Diffusion)

```bash
# More affordable option
# Cost: ~$0.002-0.01 per image
```

### Option 3: Midjourney (Subscription)

```bash
# Best quality but requires Discord
# $10-60/month subscription
```

---

## 📋 Quick Generation Checklist

**For each image you need:**

1. ✅ Copy the prompt above
2. ✅ Paste into your AI tool (Midjourney/DALL-E/etc.)
3. ✅ Generate 2-3 variations
4. ✅ Pick the best one
5. ✅ Download in high resolution
6. ✅ Save to `/public` folder with correct filename
7. ✅ Run `pnpm seed:all` to upload to CMS

**Total images needed:** 8

- 1 Hero image
- 3 Project images
- 3 Service images
- 1 About/Team image

---

## 💡 Pro Tips for Best Results

### For Midjourney:

- Add `--style raw` for photorealistic results
- Use `--ar 16:9` for hero, `--ar 4:3` for projects
- Add `--v 6.0` for latest version
- Use `--no machinery,excavator,equipment` to avoid heavy machinery

### For DALL-E 3:

- Start with "Professional photograph of..."
- Be very specific about tools (hammer, not excavator)
- Mention lighting (natural window light, soft shadows)
- Specify indoor/residential setting

### For Stable Diffusion:

- Use negative prompts: "heavy machinery, excavator, bulldozer, crane, outdoor"
- Add "indoor, residential, hand tools, craftsmanship"
- Use ControlNet for pose consistency

---

## 🆓 Free AI Image Resources

If you don't want to pay:

1. **Bing Image Creator** (DALL-E powered) - Free
2. **Leonardo.ai** - Free tier available
3. **Playground AI** - Free tier available
4. **Adobe Firefly** - Free tier available

---

## 🎯 Important Keywords to Include

**ALWAYS include these:**

- "hand tools" (not machinery)
- "interior" / "indoor" / "residential"
- "hammer" / "crowbar" / "chisel"
- "renovation" / "demolition"
- "photorealistic" / "professional photography"

**NEVER include these:**

- "excavator" / "bulldozer" / "crane"
- "heavy machinery" / "construction equipment"
- "outdoor" / "industrial site"
- "explosion" / "implosion"

---

**Once you generate the images:**

1. Save them to `/public` folder
2. Run: `pnpm seed:all`
3. Images will be uploaded to Payload CMS
4. Refresh your website to see them!

**Need help?** The prompts above should give you excellent results with any AI image generator!
