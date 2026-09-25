import json
import re

# Load base poems
with open("lib/jashn/poetry-fallback.json", "r", encoding="utf-8") as f:
    current_poems = json.load(f)

def norm_line(s):
    if not s:
        return ""
    # strip non-letters, diacritics
    s = re.sub(r"[،۔,.\-—–!؟?؛;\"\'\s\u064B-\u065F\u0670]+", " ", s)
    return s.strip().lower()

# Check what first lines already exist
existing_first_lines = set()
for p in current_poems:
    text = p.get("originalText", "")
    fl = text.splitlines()[0] if text.splitlines() else ""
    nl = norm_line(fl)[:35]
    if nl:
        existing_first_lines.add(nl)

print("Existing normalized lines in DB:", len(existing_first_lines))
