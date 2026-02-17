---
description: How to add new AI tools to the Neural Workflow Engine registry
---

# Adding New Tools

The Neural Workflow Engine now uses a centralized registry for its 260+ AI tools. To add new tools, you need to update two files:

## 1. Backend Registry (`backend/app/tools_registry.py`)

Add the tool to the appropriate category in the `TOOL_CATEGORIES` list:

```python
{
    "name": "New Category Name",
    "emoji": "✨",
    "tools": [
        {"name": "category.new_tool", "description": "Description of what the tool does"},
    ]
}
```

The backend will automatically pick this up for:
- The Planner AI prompt (context for choosing tools)
- The `/api/tools` endpoint (for frontend discovery)

## 2. Frontend Registry (`src/data/neuralTools.js`)

Add the corresponding entry to the `NEURAL_TOOLS` array:

```javascript
{ name: 'category.new_tool', category: 'New Category Name', emoji: '✨' },
```

Also verify `CATEGORY_EMOJIS` has an icon for your new category if you added one.

## 3. Restart

- Restart the backend: `python -m uvicorn app.main:app --reload`
- The frontend will hot-reload automatically.

## Naming Convention

Tools should follow the `category.action` format (e.g., `email.draft`, `code.generate`).
- **Category**: Broad domain (email, code, doc, analytics)
- **Action**: Specific verb or noun (draft, generate, review)

This helps the AI planner understand the tool's purpose and usage context.
