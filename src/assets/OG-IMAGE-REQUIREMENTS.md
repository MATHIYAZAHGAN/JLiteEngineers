# Open Graph Image Requirements for JLITE Engineers

## 📐 Specifications

### Image Name:
`og-image.jpg`

### Dimensions:
- **Width:** 1200px
- **Height:** 630px
- **Aspect Ratio:** 1.91:1
- **Format:** JPG or PNG (JPG recommended for smaller size)

### File Size:
- Target: Under 300KB
- Maximum: 8MB (but smaller is better)

### Color Profile:
- sRGB

## 🎨 Design Guidelines

### Must Include:
1. **JLITE Logo** (prominent, top-left or center)
2. **Brand Name:** "JLITE Engineers" in large, clear font
3. **Tagline:** "Premium Electrical Solutions" or "ISO Certified Electrical Components"
4. **Key Products:** Visual representation of MCB, LED lights, or switchgear
5. **Certifications:** ISI, CE badges if possible

### Design Elements:
- **Background:** Navy blue gradient (matching brand)
- **Accent Color:** Gold (#FFD700, #B8860B) for highlights
- **Text:** White or light colors for contrast
- **Professional Look:** Clean, modern, industrial feel

### Text to Include:
```
JLITE Engineers
Premium Electrical Solutions

✓ MCB & MCCB  ✓ LED Lighting  ✓ Switchgear
ISO Certified | 5-Year Warranty | Trusted by 50,000+ Contractors
www.jliteengineers.com
```

## 📝 Design Template Ideas

### Layout 1: Product Showcase
```
┌─────────────────────────────────────────┐
│  JLITE ENGINEERS                        │
│  [Logo]        Premium Electrical       │
│               Solutions                  │
│                                         │
│  [MCB Image]  [LED Image]  [Switch]    │
│                                         │
│  ✓ ISO Certified  ✓ 5-Year Warranty    │
│  www.jliteengineers.com                │
└─────────────────────────────────────────┘
```

### Layout 2: Professional Banner
```
┌─────────────────────────────────────────┐
│                                         │
│    [JLITE LOGO - Large]                │
│                                         │
│    ENGINEERS                            │
│    Premium Electrical Components        │
│                                         │
│    MCB • MCCB • LED • Switchgear       │
│    Trusted by 50,000+ Contractors       │
│                                         │
└─────────────────────────────────────────┘
```

## 🛠️ Tools to Create

### Online Tools (Free):
1. **Canva** - https://www.canva.com
   - Template: Facebook Cover → Resize to 1200x630
   - Easy drag-and-drop interface

2. **Figma** - https://www.figma.com
   - Professional design tool
   - Create custom frame 1200x630px

3. **Adobe Express** - https://www.adobe.com/express
   - Quick templates
   - Custom sizing available

### Design Software:
- Photoshop (Professional)
- GIMP (Free alternative)
- Affinity Designer

## 📊 Testing

After creating, test your OG image:

1. **Facebook Debugger:**
   - https://developers.facebook.com/tools/debug/
   - Enter: https://www.jliteengineers.com
   - Check if image appears correctly

2. **Twitter Card Validator:**
   - https://cards-dev.twitter.com/validator
   - Verify Twitter preview

3. **LinkedIn Post Inspector:**
   - https://www.linkedin.com/post-inspector/
   - Check LinkedIn sharing

## ✅ Checklist

Before uploading `og-image.jpg` to `src/assets/`:

- [ ] Dimensions are exactly 1200x630px
- [ ] File size under 300KB
- [ ] JLITE logo is clearly visible
- [ ] Brand name "JLITE Engineers" is readable
- [ ] Tagline or key products mentioned
- [ ] Website URL included
- [ ] Colors match brand (navy + gold)
- [ ] Professional and modern design
- [ ] Text is legible at smaller sizes
- [ ] Saved as `og-image.jpg` (not og-image-final.jpg or similar)

## 📍 Where to Place

Save the file as:
```
src/assets/og-image.jpg
```

The file is already referenced in:
- `src/index.html` (meta tags)
- `seo.service.ts` (default image)
- `structured-data.service.ts` (schema.org)

## 🎨 Brand Colors Reference

### Primary Colors:
- **Navy Blue:** #001f54, #0a3d80
- **Gold:** #FFD700, #B8860B, #F0C040
- **White:** #FFFFFF
- **Slate:** #475569

### Usage:
- Background: Navy gradient
- Highlights/Accents: Gold
- Text: White
- Secondary text: Light slate

## 💡 Quick Tips

1. **Keep it Simple:** Don't overcrowd with too much text
2. **High Contrast:** Navy background + white text = easy to read
3. **Logo Prominence:** Make JLITE logo the hero
4. **Mobile Preview:** Image should look good in small thumbnails too
5. **Consistent Branding:** Match website's premium look and feel

## 🖼️ Example Text Hierarchy

### Large (Primary):
- "JLITE ENGINEERS" (72-96px)

### Medium (Secondary):
- "Premium Electrical Solutions" (36-48px)
- Product names (24-32px)

### Small (Tertiary):
- Certifications, warranty info (18-24px)
- Website URL (16-20px)

---

**After creating the image:**
1. Save as `og-image.jpg`
2. Place in `src/assets/`
3. Rebuild: `npm run build:ssr`
4. Test with Facebook Debugger
5. Deploy to production

**Current Status:** ⏳ Placeholder - Create and add `og-image.jpg`
