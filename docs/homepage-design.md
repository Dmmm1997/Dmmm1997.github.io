# Personal homepage

The homepage uses the existing GitHub Pages / Jekyll build. Its layout follows Rui Hu’s homepage at https://rickhh.github.io/: a cool-white background, blue/purple accents, circular portrait, news timeline, research cards, publication filters, and a journey timeline. No additional JavaScript framework or build step is required.

## Editing content

- `_layouts/home.html`: biography, section headings, and contact layout. Education appears only in the introductory biography.
- `_data/publications.json`: all first/co-first authored papers. `featured` selects the six research cards: SimpleSearch-VL, VideoSEG-O3, MomentSeg, InstanceVG, SimVG, and DenseUAV. `type` groups the full publication list into technical reports, conference papers, and journal papers (in that order). All papers are shown by default; topic filters hide empty groups. Categories are `agents`, `video`, `grounding`, and `localization`. Author HTML preserves bold names and equal-contribution markers; highlights use Markdown.
- `_data/news.json`: news, newest first, with an ISO month (`YYYY-MM`), `kind` badge, Markdown `text`, and standalone `links`. Group papers from the same conference edition into one item; its date is the latest existing update month among those papers. The first four items are visible; earlier items expand through a native disclosure. `_includes/news-item.html` renders both lists consistently.
- `_data/experience.yml`: industry and research internships, including company logos.
- `_data/honors.json`: selected honors and optional certificate assets. Five certificates from slide 4 of the supplied `ppt_new.pptx` appear beside their matching awards; each opens in the image dialog.
- `_config.yml`: public email, academic profile links, site URL, SEO, and the existing analytics identifier.
- `assets/css/home.css` and `assets/js/home.js`: responsive styles and progressive enhancements.

The homepage retains all 14 original papers. The supplied travel photograph is cropped and lightly adjusted for the circular avatar (`images/self_photo/portrait-travel.webp`); a blue-purple M monogram supplies the browser and touch icons (`images/favicon/monogram-*`). The original composition is preserved as `travel-original.jpg`. Photo and featured-figure previews are compressed WebP assets; figure links open the corresponding full-size figures. `featured_image`, `preview_image`, and `figure_alt` configure card artwork and its accessible description. The locally hosted fonts match the reference: Inter, Source Serif 4, and JetBrains Mono; their OFL licenses are included beside the font files.

## Preview

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 4173
```

Open `http://127.0.0.1:4173/`. To build without serving:

```sh
bundle exec jekyll build --strict_front_matter
```

The existing lockfile uses Bundler 2.2.19. On a system with that lockfile, install that Bundler version if requested. Old system Ruby versions can fail to install gems inside non-ASCII paths; configuring Bundler to use an ASCII-only local dependency directory avoids that issue without changing the site dependencies.

## Behavior

Theme selection follows the operating system until a manual preference is saved. Publication filters, the reading indicator, and figure dialogs enhance a fully server-rendered page. With JavaScript disabled, all publications and native disclosures remain available. Figure dialogs support Escape and return keyboard focus to their opener. Reduced-motion preferences disable animation and smooth scrolling.

`/about/`, `/about.html`, and the previous homepage section anchors remain compatible. The existing `/momentseg/` project is unchanged.

## Research figure sources

- SimpleSearch-VL and VideoSEG-O3 use the original illustrated research workflows.
- MomentSeg uses the formal teaser from `momentseg/figures/teaser.jpg`, covering moment-centric sampling, segmentation, and benchmark performance.
- InstanceVG and SimVG use their original network architecture diagrams from `images/publications/`.
- DenseUAV uses the existing dataset overview, showing drone and satellite views.

Card images are compressed previews of the original paper assets. Clicking a card image opens its corresponding full-resolution source. No video demo is embedded.

## Honors and company logos

Certificate images are extracted from the supplied deck without altering their content: doctoral national scholarship (image15), Global Campus AI first prize (image18), Air and Space Cup first prize (image16), Challenge Cup bronze award (image17), and Electronic Design regional third prize (image19). Full-size WebP images and small thumbnails are in `images/awards/`. The President’s Scholarship remains text-only because the deck does not contain its certificate.

Ant, Baidu, and ByteDance use existing logo assets with exterior whitespace cropped and WebP compression. NIO uses its official SVG from https://www.nio.com/cdn-static/mynio/nextjs/images/icons/nio-logo-white.svg, with a black fill for the white logo tile.

The honors list uses discreet certificate thumbnails (76 × 54 px on desktop, 56 × 42 px on mobile), retaining click-to-enlarge. All awards are listed chronologically in `_data/honors.json`. Additional competition years come from the original `_pages/includes/honers.md` (2022 Smart City, 2018 Robotics, 2017 Siemens) and the supplied certificates (2023 Challenge Cup, 2022 Electronic Design). The user supplied the top 1.4% and top 1.76% distinctions. Biography citation and highly-cited paper counts are user-supplied static figures.

## Publication metadata and counts

`ccf` supplies CCF-A/B labels for the 13 peer-reviewed first/co-first papers (8 A, 5 B); the technical report has no CCF rank. Journal venue names include their full names and abbreviations. `highly_cited` marks DenseUAV and FSRA, as specified by the user. CCF references: https://www.ccf.org.cn/Academic_Evaluation/AI/ and https://www.ccf.org.cn/Academic_Evaluation/CGAndMT/ .

The user supplied 20 Scholar records: 10 first-authored journal/conference papers, 9 other peer-reviewed papers, and 1 survey preprint. Adding ScanFocus, VideoSEG-O3, and DeRVOS yields 22 peer-reviewed published/accepted papers, including 13 first/co-first papers. The biography therefore says 20+ peer-reviewed papers and 13 first/co-first papers, excluding preprints from the publication total. Under the CCF A/B definition, 16 of those 22 papers qualify (the 13 first/co-first papers plus ST³, Q-Cache, and PARDet); the page does not describe all 20+ papers as CCF A/B.

The second biography paragraph reserves bold for the 13 first/co-first papers and the 1,300+ citation figure; company names, dates, venue names, and the remaining prose use normal weight.

Publication metadata uses distinct, theme-aware colors: slate-blue for venues, blue for paper names, purple for CCF-A, teal for CCF-B, rose for highly cited papers, and green for oral presentations. Selected Research uses the same badge palette.

The hero research focus rotates through five interests with a typewriter effect (78 ms typing, 38 ms deletion, 1.9 s hold). A hidden sizing label prevents layout shifts. Screen readers receive a stable list of interests; reduced-motion users and browsers without JavaScript see a static label. Animation pauses in background tabs.
