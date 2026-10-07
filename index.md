---
layout: default
title: project-page-template
description: A Jekyll theme for project pages with videos, in the style of academic project pages.
tldr: >-
  A Jekyll theme for project pages: write Markdown, list your videos in the front matter,
  and GitHub Pages builds the page.

authors:
  - name: Eric Plaß
    url: https://github.com/erelbng
links:
  - name: GitHub
    url: https://github.com/htwk-prodlog/project-page-template
    icon: github
  - name: Example page
    url: https://erelbng.github.io/mujoco-examples/

# Optional: logos as the affiliation row under the buttons
# logos:
#   - name: Your institution
#     src: assets/logos/institution.svg
#     url: https://example.org
#     height: 28

video_rows:
  - title: Up to three videos
    caption: Shown side by side, stacked on phones
    videos:
      - title: TurtleBot 4
        src: https://erelbng.github.io/mujoco-examples/assets/tb4_sim.mp4
        poster: https://erelbng.github.io/mujoco-examples/assets/tb4_sim_poster.jpg
      - title: PincherX 100
        src: https://erelbng.github.io/mujoco-examples/assets/pincherx_sim.mp4
        poster: https://erelbng.github.io/mujoco-examples/assets/pincherx_sim_poster.jpg
  - title: More than three videos
    caption: Shown as a carousel with arrows
    videos:
      - title: Clip 1
        src: https://erelbng.github.io/mujoco-examples/assets/tb4_sim.mp4
        poster: https://erelbng.github.io/mujoco-examples/assets/tb4_sim_poster.jpg
      - title: Clip 2
        src: https://erelbng.github.io/mujoco-examples/assets/pincherx_sim.mp4
        poster: https://erelbng.github.io/mujoco-examples/assets/pincherx_sim_poster.jpg
      - title: Clip 3
        src: https://erelbng.github.io/mujoco-examples/assets/tb4_sim.mp4
        poster: https://erelbng.github.io/mujoco-examples/assets/tb4_sim_poster.jpg
      - title: Clip 4
        src: https://erelbng.github.io/mujoco-examples/assets/pincherx_sim.mp4
        poster: https://erelbng.github.io/mujoco-examples/assets/pincherx_sim_poster.jpg
      - title: Clip 5
        src: https://erelbng.github.io/mujoco-examples/assets/tb4_sim.mp4
        poster: https://erelbng.github.io/mujoco-examples/assets/tb4_sim_poster.jpg

footer: >-
  This is the demo page of [project-page-template](https://github.com/htwk-prodlog/project-page-template).
---

## Text sections

Everything below the front matter is plain Markdown. Each `## Heading` starts a new section with a centered title.

A paragraph right after a heading can be turned into a grey subcaption:

```markdown
## Results
Short description in grey
{: .row-subcaption}
```

## Code

Code blocks get syntax highlighting and a copy button:

```bash
pip install mujoco
python3 sim.py
```

## Tables

| Robot | Topics |
|---|---|
| TurtleBot 4 | `/cmd_vel`, `/odom`, `/camera` |
| PincherX 100 | `/joint_commands`, `/joint_states` |

## Citation

```bibtex
@misc{example2025,
  author = {Your Name},
  title  = {your-project},
  year   = {2025},
  url    = {https://github.com/you/your-project}
}
```
