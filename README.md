# project-page-template

A Jekyll theme for academic project pages with videos, image galleries and before/after comparisons.
You write Markdown and list your media in the front matter. GitHub Pages builds the page; there is no HTML to edit.

- Centered hero with title, one-line summary, authors, optional venue, resource buttons and logos
- Video rows: up to three videos side by side, more than three as a carousel; click a video to open a full-size player
- Responsive image galleries with captions and optional colour legends
- Before/after image sliders, usable with a mouse, touch or keyboard
- Markdown sections with centered titles, syntax-highlighted code blocks with copy buttons, and tables

Demo: <https://htwk-prodlog.github.io/project-page-template/>

## Use it in a project

1. Create a `docs/` folder in your repository with two files.

   `docs/_config.yml`:
   ```yaml
   remote_theme: htwk-prodlog/project-page-template
   plugins:
     - jekyll-remote-theme
   title: my-project
   description: One sentence about the project.
   ```

   `docs/index.md`:
   ```markdown
   ---
   layout: default
   tldr: One sentence about the project, shown under the title.
   links:
     - name: Code
       url: https://github.com/you/my-project
       icon: github
   video_rows:
     - title: Demos
       videos:
         - title: First demo
           src: assets/demo.mp4
           poster: assets/demo.jpg
   ---

   ## About

   Plain Markdown from here on.
   ```

2. Put your videos and images in `docs/assets/`.
3. On GitHub, open Settings → Pages and set the source to "Deploy from a branch", branch `main`, folder `/docs`.

The page is published at `https://<user>.github.io/<repository>/`. Changes to this template reach every page that uses it on that page's next build.

## Front matter reference

All fields are optional except `layout: default`.

| Field | Description |
|---|---|
| `title`, `description` | Page title and description. Default to `title` and `description` in `_config.yml`. |
| `image` | Preview image for links shared on social media. |
| `tldr` | One-line summary under the title. Markdown links work. |
| `authors` | List of `name`, `url` and `affiliation` (a superscript such as `1`). |
| `affiliations` | List of affiliation strings, shown under the authors. |
| `venue` | Plain-text conference, journal or event line below the affiliations. |
| `links` | Buttons: list of `name`, `url` and optional `icon` or `icon_src`; see [resource buttons](#resource-buttons). |
| `logos` | Logo row under the buttons: list of `name`, `src`, `url` and `height` in pixels (default 32). |
| `video_rows` | List of rows with `title`, `caption` and `videos`. Each video has `title`, `caption`, `src` (MP4) and `poster`. |
| `image_rows` | List of rows with `title`, `caption`, `images` and optional `legend`; see [image galleries](#image-galleries). |
| `comparison_rows` | List of rows with `title`, `caption` and `comparisons`; see [before/after comparisons](#beforeafter-comparisons). |
| `footer` | Markdown shown in the footer. |
| `favicon` | Path to a favicon. |

Media paths (`src`, `poster`, logo sources and `icon_src`) can be relative to `docs/` (`assets/demo.mp4`) or full URLs. Local media paths automatically include the site's GitHub Pages base path.

All additions are opt-in: existing pages need no changes. The page order is hero → video rows → image rows → comparison rows → Markdown sections → footer. Empty image/comparison rows are omitted.

### Resource buttons

Built-in icons: `github`, `paper`, `arxiv`, `video`, `dataset` and `huggingface` (🤗). Icons are inline SVGs or text, with no icon-font dependency. Omit `icon` for a text-only button; unrecognized names also render text-only.

Use `icon_src` for your own image or SVG, such as an institution or dataset logo. It takes precedence over `icon`. The button's `name` supplies its accessible label.

```yaml
venue: "Conference 2026 · Leipzig, Germany"
links:
  - name: Paper
    url: https://example.org/paper.pdf
    icon: paper
  - name: arXiv
    url: https://arxiv.org/abs/your-paper
    icon: arxiv
  - name: Dataset
    url: https://huggingface.co/datasets/your-team/your-data
    icon: huggingface
  - name: Project
    url: https://example.org
    icon_src: assets/project-logo.svg
```

### Image galleries

Galleries show up to three images per row, wrap larger collections, and stack on phones. Images retain their original proportions. Captions sit below the images so they do not obscure results. Images are lazy-loaded.

Each image has a required `src` and optional `title`, `caption` and `alt`. Supply descriptive `alt` text; it defaults to `title` (or empty for a decorative image). An optional row `legend` lists `label` and CSS `color` pairs.

```yaml
image_rows:
  - title: Dataset samples
    caption: Images from two recording locations
    images:
      - src: assets/lab.jpg
        alt: Robot approaching a ball in the laboratory
        title: Laboratory
        caption: Indoor recording
      - src: assets/field.jpg
        alt: Two robots beside a goalpost on the competition field
        title: Competition
    legend:
      - label: Robot
        color: "#ee786a"
      - label: Ball
        color: "#ebc45a"
```

### Before/after comparisons

Each comparison has optional `title` and `caption`, plus required `before` and `after` objects. Each side has `src`, `alt` and an optional `label` (defaults to “Before” / “After”). Use pixel-aligned images with the **same aspect ratio**: the first image determines the frame size and the second fills that frame.

Rows use the same responsive layout as galleries. The divider starts at 50%; drag or tap anywhere on the image to move it. Keyboard users can Tab to the slider and use arrow keys, Home or End. Screen readers receive the side labels and visible percentages. Without JavaScript, the images remain visible as a static 50/50 comparison.

```yaml
comparison_rows:
  - title: RGB and depth
    caption: Drag the divider to compare
    comparisons:
      - title: Laboratory frame
        before:
          src: assets/rgb.jpg
          alt: RGB camera image of a robot on the field
          label: RGB
        after:
          src: assets/depth.jpg
          alt: Aligned depth map of the same scene
          label: Depth
```

### Video encoding

Videos play muted in a loop while they are on screen. Encode them as H.264 MP4 without audio, and keep them small:

```bash
ffmpeg -i input.mov -an -c:v libx264 -crf 26 -preset slow -vf "scale=1280:-2" -movflags +faststart demo.mp4
ffmpeg -ss 1 -i demo.mp4 -frames:v 1 -q:v 3 demo.jpg
```

## Preview locally

Add a `docs/Gemfile`:

```ruby
source "https://rubygems.org"
gem "github-pages", group: :jekyll_plugins
```

Then run `bundle install` and `bundle exec jekyll serve` in `docs/`, and open <http://localhost:4000>.

## License

The template is licensed under [CC BY-SA 4.0](LICENSE). It is adapted from the
[Nerfies](https://github.com/nerfies/nerfies.github.io) project page, and the footer of every page keeps that credit.
[Bulma](https://bulma.io) in `assets/vendor/` is MIT licensed.
