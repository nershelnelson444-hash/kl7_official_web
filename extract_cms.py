import json
import os

base = "C:/Users/X1/.gemini/antigravity/brain/6989b78d-bbcf-4d86-87b6-ac7803af9380/.system_generated/steps"

def load_step(step_num):
    path = os.path.join(base, str(step_num), "output.txt")
    if not os.path.exists(path):
        return None
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
    lines = content.split("\n")
    json_lines = []
    in_json = False
    for line in lines:
        if line.startswith("1: {") or line.startswith("{"):
            in_json = True
        
        if in_json:
            # Strip line numbers if present
            if ": " in line and line.split(": ")[0].isdigit():
                json_lines.append(line.split(": ", 1)[1])
            else:
                json_lines.append(line)
                
    if not json_lines:
        return None
        
    try:
        return json.loads("\n".join(json_lines))
    except Exception as e:
        print(f"Error parsing step {step_num}: {e}")
        return None

inventory1 = load_step(60)
inventory2 = load_step(97)
blog = load_step(87)
legal = load_step(88)

inventory_items = []
if inventory1 and 'items' in inventory1: inventory_items.extend(inventory1['items'])
if inventory2 and 'items' in inventory2: inventory_items.extend(inventory2['items'])

blog_items = []
if blog and 'items' in blog: blog_items.extend(blog['items'])

legal_items = []
if legal and 'items' in legal: legal_items.extend(legal['items'])

cms_data = {
    "inventory": inventory_items,
    "blog": blog_items,
    "legal": legal_items
}

with open("c:/Users/X1/OneDrive/Desktop/new_kl7/app/src/data/cms.json", "w", encoding="utf-8") as f:
    json.dump(cms_data, f, indent=2)

print("CMS Data generated successfully.")
