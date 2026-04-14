# /projectmaker Skill

**Generate complete, production-ready project blueprints with HTML examples, quiz design, and launch checklists.**

## What It Does

`/projectmaker` is a Claude skill that generates a **complete PDF blueprint** for your product/business idea by:

1. **Asking 8-10 interactive questions** about your product, audience, pain point, pricing, and brand
2. **Generating a 20-30 page PDF** that includes:
   - Executive summary
   - 4 customer personas (tailored to your product)
   - 12 quiz questions + scoring algorithm
   - **Ready-to-use HTML code examples** for:
     - Landing page (with your pain point validation)
     - Quiz page (with your questions)
     - Results page (showing customer personas)
     - Checkout page (with your pricing)
   - Project architecture and folder structure
   - Copy templates and headlines
   - 20-item pre-launch checklist
   - Expected metrics and conversion funnel
3. **You download the PDF** and use it to build your actual project

## How to Use It

### Trigger the Skill

Tell Claude you want to create a project:
```
"Help me build a sales funnel for my supplement business on sleep"
"Create a project blueprint for my coaching program"
"Design a sales funnel for [my product]"
```

### Answer Questions

The skill will ask you:
1. **What's your product/service?** (e.g., supplement, coaching, digital product, app)
2. **What pain point does it solve?** (the core problem you're addressing)
3. **Who's your ideal customer?** (age, profession, location, lifestyle)
4. **Pricing Strategy** (pick ONE):
   - **Option A**: "I want to charge €249" (you give me the exact price)
   - **Option B**: "Help me figure it out" (you describe your offering, I suggest 3 scenarios: economy/standard/premium)
5. **What's your brand tone?** (premium, energetic, casual, professional, etc.)
6. **What colors/visual style?** (modern, minimal, bold, pastel, etc.)
7. **What's your unique angle/differentiation?** (why are you different from competitors?)
8. **Any specific use cases or customer stories?** (real examples of how the product helps)
9. **What's your timeline to launch?** (ASAP, 30 days, 60 days, etc.)
10. **(Optional) Any existing competition?** (what alternatives exist?)

### The Pricing Question (In Detail)

When I ask "What's your price point?" you have two options:

**OPTION A: You know your price**
```
You: "€249"
Me: I'll use €249 in every section of the blueprint — 
    checkout HTML, metrics, revenue projections, etc.
```

**OPTION B: You want me to suggest pricing**
```
You: "I'm not sure what to charge"
Me: I'll ask you:
    - What does your product deliver? (e.g., "a 12-week supplement program")
    - How much value does it create? (e.g., "solves skin issues for people who've spent $5k on dermatology")
    - How many customers can you handle? (e.g., "100-500 first year")
    
Then I suggest:
    1. ECONOMY: €99 (high volume, thin margins)
    2. STANDARD: €249 (best for B2C supplements, healthy 60% margin)
    3. PREMIUM: €499 (niche audience, maximum margin)

You: "I like the standard at €249"
Me: I build the entire blueprint with €249 throughout
```

**The key point**: There are NO hardcoded prices in the skill. Whatever you tell me (or pick from my suggestions) gets integrated into EVERY section of the PDF:
- ✅ Checkout page HTML
- ✅ Metrics table (revenue projections)
- ✅ Financial assumptions
- ✅ Conversion rate targets
- ✅ Customer acquisition cost (CAC) calculations

### Get Your PDF

The skill generates a PDF file that includes **actual HTML code** you can copy-paste and customize:

```html
<!-- Example of what you'll get -->
<!DOCTYPE html>
<html>
<head>
    <title>Your Product - Landing Page</title>
    <style>
        /* Ready-to-use CSS */
    </style>
</head>
<body>
    <!-- Hero section with YOUR pain point -->
    <!-- Your persona validation -->
    <!-- Your CTA -->
</body>
</html>
```

## Output: What's in the PDF

| Section | What You Get |
|---------|-------------|
| Executive Summary | 1-page overview of your product + strategy |
| The 4 Personas | 4 customer segments + scoring triggers |
| Quiz Design | 12 actual questions + scoring algorithm |
| HTML Examples | Copy-paste code for 4 key pages |
| Project Architecture | Folder structure + tech stack requirements |
| Copy Templates | Headlines, CTAs, email flows |
| Launch Checklist | 20-item pre-launch verification |
| Metrics | Expected conversion rates + timeline |

## File Structure

```
projectmaker/
├── SKILL.md                          # Skill definition + instructions
├── scripts/
│   └── generate_project_blueprint.py # PDF generation engine
├── evals/
│   └── evals.json                   # Test cases for validation
└── README.md                         # This file
```

## How It Works Behind the Scenes

1. **You answer questions** → Skill captures product info
2. **Skill processes your answers** → Generates personas, quiz questions, HTML based on IDERMA framework
3. **Python script creates PDF** → Using ReportLab, includes formatted text + code examples
4. **You download PDF** → Ready to customize and build from

## When to Use This Skill

✅ **GOOD FIT:**
- Launching a supplement/wellness product
- Building a digital coaching program
- Creating a B2C service with lead capture
- Validating a business idea before building
- Creating a diagnostic/assessment-based sales funnel
- Products with systemic solutions (not just cosmetic)

❌ **LESS IDEAL FOR:**
- SaaS with free trials (different funnel)
- Marketplaces (different architecture)
- Pure ecommerce (no diagnostic element)
- B2B sales (different process)

## Customization After Download

The PDF provides:
- **Copy**: Use as-is or rewrite for your voice
- **HTML**: Replace colors, images, copy, company names
- **Quiz**: Modify questions to your specific product
- **Personas**: Rename and adjust to your market
- **Architecture**: Add/remove components as needed

Nothing is locked in — it's all templates for you to customize.

## Next Steps After Getting the PDF

1. **Read the architecture section** → Understand the tech stack
2. **Copy the HTML code** → Into your project files
3. **Customize colors/images** → Brand it for your company
4. **Adapt the copy** → Make it your voice
5. **Follow the checklist** → Item by item before launch
6. **Deploy to Vercel** → Using the provided configuration

## Example Output Filenames

```
ProjectBlueprint_SleepStack_2026-04-14.pdf
ProjectBlueprint_ProductivityCoaching_2026-04-14.pdf
ProjectBlueprint_HairCareKit_2026-04-14.pdf
```

## Requirements

- Claude with file download capability (Claude Code, Claude.ai)
- Python 3.7+ (for PDF generation, runs automatically)
- ~2-3 minutes to answer questions
- ~30 seconds for PDF generation

## Tips for Best Results

1. **Be specific** about your product and pain point — generic inputs = generic output
2. **Know your audience** — the more specific, the better the personas
3. **Have pricing decided** — or estimate based on competitor products
4. **Think about tone** — premium vs casual, scientific vs fun, etc.
5. **Consider your timeline** — this affects the launch strategy recommendations

## Support

If the generated PDF doesn't match what you need:
- Ask the skill to regenerate with different answers
- Request specific customizations (different personas, pricing, etc.)
- Have Claude refine the HTML code examples

---

**Status:** ✅ Ready to use
**Version:** 1.0
**Base Framework:** IDERMA (proven sales funnel model)
**Last Updated:** April 2026
