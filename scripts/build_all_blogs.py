import json
import os
import re

# Load existing data.ts
data_path = os.path.join(os.path.dirname(__file__), "..", "lib", "blog", "data.ts")
with open(data_path, "r", encoding="utf-8") as f:
    data_content = f.read()

print("Read data.ts:", len(data_content), "bytes")