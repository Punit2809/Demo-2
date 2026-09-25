# -*- coding: utf-8 -*-
"""Regenerate the bundled JS runtime files.

Run after editing a component or data/jobs.json:
    python build.py

This bundles shared markup and job data into plain JS files so the site
renders correctly whether it is opened over http:// or by double-clicking a
file (file://) — avoiding the browser CORS/AJAX restriction that blocks
jQuery's .load() / .getJSON() on the file:// protocol.
"""
import os
import json

base = os.path.dirname(os.path.abspath(__file__))
os.chdir(base)

components = {
    "header": "components/header.html",
    "navbar": "components/navbar.html",
    "footer": "components/footer.html",
}


def esc(s):
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


# 1) Shared components -> js/components.js
parts = []
for key, path in components.items():
    with open(path, "r", encoding="utf-8") as f:
        content = f.read().strip("\n")
    parts.append("  %s: `%s`" % (key, esc(content)))

js = "window.COMPONENTS = {\n" + ",\n".join(parts) + "\n};\n"
with open("js/components.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Generated js/components.js (%d bytes)" % len(js))

# 2) Job data -> js/jobs-data.js
with open("data/jobs.json", "r", encoding="utf-8") as f:
    data = json.load(f)

js_jobs = "window.JOBS = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"
with open("js/jobs-data.js", "w", encoding="utf-8") as f:
    f.write(js_jobs)
print("Generated js/jobs-data.js (%d bytes, %d jobs)" % (len(js_jobs), len(data)))
