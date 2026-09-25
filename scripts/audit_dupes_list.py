import json
import re

with open("lib/jashn/poetry-fallback.json", "r", encoding="utf-8") as f:
    poems = json.load(f)

def clean(t):
    return re.sub(r"[،۔,.\-—–!؟?؛;\"\'\s]+", " ", t).strip()

seen = {}
dupes_by_id = {}
for p in poems:
    norm = clean(p["originalText"].splitlines()[0])[:35]
    if norm in seen:
        dupes_by_id[p["id"]] = (seen[norm]["id"], p["originalText"].splitlines()[0])
    else:
        seen[norm] = p

print("Duplicate IDs count:", len(dupes_by_id))
for k, v in list(dupes_by_id.items())[:15]:
    print(f"  {k} duplicates {v[0]}: {v[1]}")
