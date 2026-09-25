import json
import re

with open("lib/jashn/poetry-fallback.json", "r", encoding="utf-8") as f:
    poems = json.load(f)

def norm(t):
    return re.sub(r"[،۔,.\-—–!؟?؛;\"\'\s\u064B-\u065F\u0670]+", "", t).strip()

seen = {}
dupes = []
for p in poems:
    fl = p["originalText"].splitlines()[0]
    n = norm(fl)[:25]
    if n in seen:
        dupes.append(p)
    else:
        seen[n] = p

print("Total unique base poems:", len(seen))
print("Total duplicates to replace:", len(dupes))

by_poet = {}
for d in dupes:
    by_poet[d["poet"]] = by_poet.get(d["poet"], 0) + 1


print("\nDuplicates breakdown by poet:")
for poet, cnt in sorted(by_poet.items(), key=lambda x: -x[1])[:20]:
    print(f"  {poet}: {cnt}")

