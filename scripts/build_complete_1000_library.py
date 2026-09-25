# scripts/build_complete_1000_library.py
# -*- coding: utf-8 -*-
import json
import re

print("Starting 1,000 Poetry Library Overhaul...")

# Load current 1,000 poems
with open("lib/jashn/poetry-fallback.json", "r", encoding="utf-8") as f:
    current_poems = json.load(f)

print(f"Loaded {len(current_poems)} poems.")
