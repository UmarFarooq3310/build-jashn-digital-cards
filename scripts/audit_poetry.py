import json
import re

with open("lib/jashn/poetry-fallback.json", "r", encoding="utf-8") as f:
    poems = json.load(f)

def clean(t):
    t = re.sub(r"[،۔,.\-—–!؟?؛;\"\'\s]+", " ", t).strip()
    return t

first_lines = {}
full_cleans = {}

print("=== CHECKING NEAR DUPLICATES ===")
dupes = []
for p in poems:
    c = clean(p["originalText"])
    fl = clean(p["originalText"].splitlines()[0])
    if c in full_cleans:
        dupes.append((p["id"], full_cleans[c]["id"], p["originalText"].splitlines()[0]))
    else:
        full_cleans[c] = p

print("Full text near-duplicates count:", len(dupes))
for d in dupes:
    print(f"  {d[0]} duplicates {d[1]}: {d[2]}")

print("\n=== CHECKING FIRST-LINE DUPLICATES ===")
fl_dupes = []
for p in poems:
    fl = clean(p["originalText"].splitlines()[0])
    if fl in first_lines:
        fl_dupes.append((p["id"], first_lines[fl]["id"], fl))
    else:
        first_lines[fl] = p

print("First line duplicates count:", len(fl_dupes))
for d in fl_dupes[:25]:
    print(f"  {d[0]} & {d[1]}: {d[2]}")

seen = set()
unique_poems = []
duplicates = []

for p in poems:
    sig = clean(p["originalText"].splitlines()[0])[:40]
    if sig in seen:
        duplicates.append(p)
    else:
        seen.add(sig)
        unique_poems.append(p)

print("\n--- SUMMARY ---")
print("Unique poems count:", len(unique_poems))
print("Duplicate poems count to replace:", len(duplicates))

