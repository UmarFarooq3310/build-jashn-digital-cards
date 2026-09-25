import json
import re

# Load current poems
with open("lib/jashn/poetry-fallback.json", "r", encoding="utf-8") as f:
    poems = json.load(f)

print(f"Loaded {len(poems)} poems.")

# Let's inspect all poems that have duplicate first lines or texts
def clean_norm(s):
    if not s:
        return ""
    # strip diacritics / punctuation / whitespace
    s = re.sub(r"[،۔,.\-—–!؟?؛;\"\'\s\u064B-\u065F\u0670]+", " ", s)
    return s.strip().lower()

seen = {}
duplicates = []
uniques = []

for idx, p in enumerate(poems):
    lines = [l.strip() for l in p.get("originalText", "").splitlines() if l.strip()]
    first_line = lines[0] if lines else ""
    norm = clean_norm(first_line)[:35]
    
    if norm in seen:
        duplicates.append((idx, p, seen[norm]))
    else:
        seen[norm] = (idx, p)
        uniques.append(p)

print(f"Unique base poems: {len(uniques)}")
print(f"Duplicates to replace: {len(duplicates)}")
