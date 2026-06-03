import os, glob

base = os.path.dirname(os.path.abspath(__file__))

# Header nav replacements: Chinese -> English
replacements = {
    '>文档<': '>Docs<',
    '>模块<': '>Modules<',
    '>开发<': '>Dev<',
}

# All HTML files that have headers
html_files = glob.glob(os.path.join(base, 'modules', '*.html')) + [os.path.join(base, 'developer.html')]

for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    changed = False
    for old, new in replacements.items():
        if old in content:
            content = content.replace(old, new)
            changed = True
    if changed:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated nav in {os.path.relpath(fpath, base)}')

print('Done.')
