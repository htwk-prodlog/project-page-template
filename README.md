# project-page-template

A Jekyll theme for project pages with videos, in the style of academic project pages.
You write Markdown and list your videos in the front matter. GitHub Pages builds the page; there is no HTML to edit.

- Centered hero with title, one-line summary, authors, buttons and an optional row of logos
- Video rows: up to three videos side by side, more than three as a carousel; click a video to open a full-size player
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
| `links` | Buttons: list of `name`, `url` and `icon` (`github` is the only icon). |
| `logos` | Logo row under the buttons: list of `name`, `src`, `url` and `height` in pixels (default 32). |
| `video_rows` | List of rows with `title`, `caption` and `videos`. Each video has `title`, `caption`, `src` (MP4) and `poster`. |
| `footer` | Markdown shown in the footer. |
| `favicon` | Path to a favicon. |

Paths in `src`, `poster` and `logos` can be relative to `docs/` (`assets/demo.mp4`) or full URLs, for videos hosted elsewhere.

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
