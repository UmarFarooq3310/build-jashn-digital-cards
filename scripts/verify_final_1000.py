# scripts/verify_final_1000.py
# -*- coding: utf-8 -*-
import json
import re

with open("lib/jashn/poetry-fallback.json", "r", encoding="utf-8") as f:
    poems = json.load(f)

print("=== FINAL 1,000 POETRY DATABASE VERIFICATION ===")
print("1. Total count:", len(poems))
assert len(poems) == 1000, f"Expected 1000 poems, got {len(poems)}"

# Check IDs
ids = [p["id"] for p in poems]
assert len(set(ids)) == 1000, "IDs are not unique!"
assert ids[0] == "poem-0001" and ids[-1] == "poem-1000", "ID bounds unexpected"

# Check unique opening lines
def norm(text):
    t = re.sub(r"[،۔,.\-—–!؟?؛;\"\'\s\u064B-\u065F\u0670]+", "", text)
    return t.strip().lower()

first_lines = set()
for p in poems:
    fl = p["originalText"].splitlines()[0]
    n = norm(fl)[:25]
    assert n not in first_lines, f"Duplicate found: {p['id']} - {fl}"
    first_lines.add(n)

print(f"2. Unique opening lines: {len(first_lines)} / 1000 (0 duplicates!)")

# Check Language Breakdown
by_lang = {}
for p in poems:
    lang = p.get("originalLanguage")
    poet = p.get("poet")
    by_lang.setdefault(lang, set()).add(poet)

print("3. Language breakdown & poets:")
for lang in sorted(by_lang.keys()):
    cnt = sum(1 for p in poems if p.get("originalLanguage") == lang)
    poets = sorted(list(by_lang[lang]))
    print(f"   [{lang}] ({cnt} poems): {', '.join(poets[:8])}{' ...' if len(poets) > 8 else ''}")

# Verify user-specific items
p91 = next(p for p in poems if p["id"] == "poem-0091")
print("\n4. Verification of poem-0091 (Darwish):")
print(f"   ID: {p91['id']} | Poet: {p91['poet']} | Urdu: {p91['poetUrdu']} | Origin: {p91['poetOrigin']} | Lang: {p91['originalLanguage']}")
print(f"   First line: {p91['originalText'].splitlines()[0]}")
print(f"   Urdu translation first line: {p91['urduTranslation'].splitlines()[0]}")
assert p91["poet"] == "Mahmoud Darwish" and p91["originalLanguage"] == "ar"

p50 = next(p for p in poems if "کبھی کبھی میرے دل میں خیال آتا ہے" in p["originalText"])
print("\n5. Verification of Sahir Ludhianvi (Kabhi Kabhi):")
for l in p50["originalText"].splitlines():
    print(f"   {l}")
assert "tujhe zameen" not in p50["originalText"], "Roman Urdu found in Sahir's poem!"
assert "تجھ کو زمیں پہ اتارا گیا ہے میرے لیے" in p50["originalText"]

# Check for Roman Urdu leaks in Urdu/Punjabi/Arabic/Persian originalText
roman_leak_count = 0
for p in poems:
    if p["originalLanguage"] in ["ur", "pa", "fa", "ar"]:
        # check if English letters exist in originalText
        if re.search(r"[a-zA-Z]", p["originalText"]):
            print(f"   Roman leak in {p['id']}: {p['originalText'][:40]}")
            roman_leak_count += 1

print(f"\n6. Roman Urdu leaks in RTL originalText: {roman_leak_count}")
assert roman_leak_count == 0, "Roman Urdu leaks detected!"

print("\n✅ ALL VERIFICATION CHECKS PASSED WITH 100% ACCURACY!")
