#!/usr/bin/env python3
"""
Content Audit Script for YourWillPro
Generates comprehensive CSV reports of all content and images
"""

import os
import csv
import re
from datetime import datetime
from pathlib import Path
import subprocess

BASE_DIR = Path("/Users/donmacintosh/Desktop/yourwillpro-content")

def parse_frontmatter(content):
    """Extract frontmatter from markdown file"""
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not match:
        return {}

    frontmatter = {}
    for line in match.group(1).split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            frontmatter[key] = value

    return frontmatter

def get_file_modified_time(filepath):
    """Get file modification time"""
    stat = os.stat(filepath)
    return datetime.fromtimestamp(stat.st_mtime).strftime('%Y-%m-%d %H:%M:%S')

def get_file_size_kb(filepath):
    """Get file size in KB"""
    size = os.path.getsize(filepath)
    return round(size / 1024, 2)

def get_image_dimensions(filepath):
    """Get image dimensions using file command"""
    try:
        result = subprocess.run(['file', filepath], capture_output=True, text=True)
        output = result.stdout
        # Try to extract dimensions from file output
        match = re.search(r'(\d+)\s*x\s*(\d+)', output)
        if match:
            return f"{match.group(1)}x{match.group(2)}"

        # Try with sips command (macOS)
        result = subprocess.run(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', filepath],
                              capture_output=True, text=True)
        width = re.search(r'pixelWidth:\s*(\d+)', result.stdout)
        height = re.search(r'pixelHeight:\s*(\d+)', result.stdout)
        if width and height:
            return f"{width.group(1)}x{height.group(2)}"
    except:
        pass
    return "Unknown"

def escape_csv_field(value):
    """Properly escape CSV fields"""
    if value is None:
        return ""
    value = str(value)
    if ',' in value or '"' in value or '\n' in value:
        value = value.replace('"', '""')
        return f'"{value}"'
    return value

def audit_user_stories():
    """Generate user stories audit CSV"""
    print("Auditing user stories...")
    stories_dir = BASE_DIR / "src/content/user-stories"
    stories = sorted([f for f in stories_dir.glob("*.md") if f.name != "_section.md"])

    with open(BASE_DIR / "user-stories-audit.csv", 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([
            "Title", "Filename", "Slug", "Summary", "Issue",
            "Jurisdiction", "Hero Image", "Status", "Read Time", "Last Modified"
        ])

        for story in stories:
            content = story.read_text(encoding='utf-8')
            fm = parse_frontmatter(content)

            writer.writerow([
                escape_csv_field(fm.get('title', '')),
                story.name,
                escape_csv_field(fm.get('slug', '')),
                escape_csv_field(fm.get('summary', '')),
                escape_csv_field(fm.get('issue', '')),
                escape_csv_field(fm.get('jurisdiction', '')),
                escape_csv_field(fm.get('heroImage', '')),
                escape_csv_field(fm.get('status', '')),
                escape_csv_field(fm.get('readTime', '')),
                get_file_modified_time(story)
            ])

    print(f"  Created user-stories-audit.csv ({len(stories)} stories)")
    return len(stories)

def audit_guides():
    """Generate guides audit CSV"""
    print("Auditing guides...")
    guides_dir = BASE_DIR / "src/content/guides"
    guides = sorted([f for f in guides_dir.glob("*.md") if f.name != "_section.md"])

    with open(BASE_DIR / "guides-audit.csv", 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([
            "Title", "Filename", "Slug", "Summary", "Category",
            "Difficulty", "Hero Image", "Status", "Read Time", "Last Modified"
        ])

        for guide in guides:
            content = guide.read_text(encoding='utf-8')
            fm = parse_frontmatter(content)

            # Check for both 'category' and 'guideCategory'
            category = fm.get('category', fm.get('guideCategory', ''))

            writer.writerow([
                escape_csv_field(fm.get('title', '')),
                guide.name,
                escape_csv_field(fm.get('slug', '')),
                escape_csv_field(fm.get('summary', '')),
                escape_csv_field(category),
                escape_csv_field(fm.get('difficulty', '')),
                escape_csv_field(fm.get('heroImage', '')),
                escape_csv_field(fm.get('status', '')),
                escape_csv_field(fm.get('readTime', '')),
                get_file_modified_time(guide)
            ])

    print(f"  Created guides-audit.csv ({len(guides)} guides)")
    return len(guides)

def audit_questions():
    """Generate common questions audit CSV"""
    print("Auditing common questions...")
    questions_dir = BASE_DIR / "src/content/common-questions"
    questions = sorted([f for f in questions_dir.glob("*.md") if f.name != "_section.md"])

    with open(BASE_DIR / "questions-audit.csv", 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([
            "Title", "Filename", "Slug", "Summary", "Category", "Status", "Last Modified"
        ])

        for question in questions:
            content = question.read_text(encoding='utf-8')
            fm = parse_frontmatter(content)

            writer.writerow([
                escape_csv_field(fm.get('title', '')),
                question.name,
                escape_csv_field(fm.get('slug', '')),
                escape_csv_field(fm.get('summary', '')),
                escape_csv_field(fm.get('category', '')),
                escape_csv_field(fm.get('status', '')),
                get_file_modified_time(question)
            ])

    print(f"  Created questions-audit.csv ({len(questions)} questions)")
    return len(questions)

def find_image_usage(image_name, content_dir, pattern="*.md"):
    """Find where an image is used in content files"""
    used_in = []
    for md_file in Path(content_dir).glob(pattern):
        content = md_file.read_text(encoding='utf-8')
        if image_name in content:
            used_in.append(md_file.name)
    return ", ".join(used_in) if used_in else "Not found"

def audit_images_stories():
    """Generate stories images audit CSV"""
    print("Auditing story images...")
    stories_dir = BASE_DIR / "public/images/stories"

    if not stories_dir.exists():
        print("  Warning: public/images/stories directory not found")
        return 0

    images = sorted([f for f in stories_dir.iterdir() if f.is_file() and not f.name.startswith('.')])

    with open(BASE_DIR / "images-stories-audit.csv", 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([
            "Filename", "Used In", "Dimensions", "File Size (KB)", "Last Modified"
        ])

        for image in images:
            used_in = find_image_usage(image.name, BASE_DIR / "src/content/user-stories")

            writer.writerow([
                image.name,
                escape_csv_field(used_in),
                get_image_dimensions(image),
                get_file_size_kb(image),
                get_file_modified_time(image)
            ])

    print(f"  Created images-stories-audit.csv ({len(images)} images)")
    return len(images)

def audit_images_guides():
    """Generate guides images audit CSV"""
    print("Auditing guide images...")
    guides_dir = BASE_DIR / "public/images/guides"

    if not guides_dir.exists():
        print("  Warning: public/images/guides directory not found")
        # Create empty CSV
        with open(BASE_DIR / "images-guides-audit.csv", 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow([
                "Filename", "Used In", "Dimensions", "File Size (KB)", "Last Modified"
            ])
        print("  Created images-guides-audit.csv (0 images)")
        return 0

    images = sorted([f for f in guides_dir.iterdir() if f.is_file() and not f.name.startswith('.')])

    with open(BASE_DIR / "images-guides-audit.csv", 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([
            "Filename", "Used In", "Dimensions", "File Size (KB)", "Last Modified"
        ])

        for image in images:
            used_in = find_image_usage(image.name, BASE_DIR / "src/content/guides")

            writer.writerow([
                image.name,
                escape_csv_field(used_in),
                get_image_dimensions(image),
                get_file_size_kb(image),
                get_file_modified_time(image)
            ])

    print(f"  Created images-guides-audit.csv ({len(images)} images)")
    return len(images)

def audit_images_other():
    """Generate other images audit CSV"""
    print("Auditing other images...")
    images_dir = BASE_DIR / "public/images"

    with open(BASE_DIR / "images-other-audit.csv", 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([
            "Filename", "Location", "Purpose", "Dimensions", "File Size (KB)", "Last Modified"
        ])

        total = 0
        # Get root level images
        for image in sorted(images_dir.glob("*")):
            if image.is_file() and not image.name.startswith('.'):
                writer.writerow([
                    image.name,
                    "root",
                    "general",
                    get_image_dimensions(image),
                    get_file_size_kb(image),
                    get_file_modified_time(image)
                ])
                total += 1

        # Get subdirectory images (excluding stories and guides)
        for subdir in sorted(images_dir.iterdir()):
            if subdir.is_dir() and subdir.name not in ['stories', 'guides', '.DS_Store']:
                for image in sorted(subdir.glob("*")):
                    if image.is_file() and not image.name.startswith('.'):
                        writer.writerow([
                            image.name,
                            subdir.name,
                            subdir.name,
                            get_image_dimensions(image),
                            get_file_size_kb(image),
                            get_file_modified_time(image)
                        ])
                        total += 1

    print(f"  Created images-other-audit.csv ({total} images)")
    return total

def audit_standalone_pages():
    """Generate standalone pages audit CSV"""
    print("Auditing standalone pages...")
    pages_dir = BASE_DIR / "src/pages"

    pages = [
        ("Homepage", "index.astro", "Home page"),
        ("About", "about.astro", "About YourWillPro"),
        ("Our Story", "our-story.astro", "Company story and mission"),
        ("Feedback", "feedback.astro", "User feedback form"),
        ("Start Here", "start-here.astro", "Getting started guide"),
        ("Privacy Policy", "privacy.astro", "Privacy policy"),
        ("Terms of Service", "terms.astro", "Terms and conditions"),
        ("Disclaimer", "disclaimer.astro", "Legal disclaimer"),
        ("Sitemap", "sitemap.astro", "Site navigation map")
    ]

    with open(BASE_DIR / "standalone-pages-audit.csv", 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([
            "Page", "Filename", "Location", "Description", "Last Modified"
        ])

        found = 0
        for page_name, filename, description in pages:
            filepath = pages_dir / filename
            if filepath.exists():
                writer.writerow([
                    page_name,
                    filename,
                    f"src/pages/{filename}",
                    description,
                    get_file_modified_time(filepath)
                ])
                found += 1
            else:
                writer.writerow([
                    page_name,
                    filename,
                    f"src/pages/{filename}",
                    f"{description} (FILE NOT FOUND)",
                    "N/A"
                ])

    print(f"  Created standalone-pages-audit.csv ({found}/{len(pages)} pages found)")
    return found

def check_broken_references():
    """Check for broken image references"""
    print("\nChecking for broken references...")
    broken = []

    # Check user stories
    stories_dir = BASE_DIR / "src/content/user-stories"
    for story in stories_dir.glob("*.md"):
        if story.name == "_section.md":
            continue
        content = story.read_text(encoding='utf-8')
        fm = parse_frontmatter(content)
        hero_image = fm.get('heroImage', '')
        if hero_image:
            # Remove leading slash and /images/ prefix
            img_path = hero_image.lstrip('/').replace('images/', '')
            full_path = BASE_DIR / "public/images" / img_path
            if not full_path.exists():
                broken.append(f"User Story '{fm.get('title', story.name)}': {hero_image}")

    # Check guides
    guides_dir = BASE_DIR / "src/content/guides"
    for guide in guides_dir.glob("*.md"):
        if guide.name == "_section.md":
            continue
        content = guide.read_text(encoding='utf-8')
        fm = parse_frontmatter(content)
        hero_image = fm.get('heroImage', '')
        if hero_image:
            img_path = hero_image.lstrip('/').replace('images/', '')
            full_path = BASE_DIR / "public/images" / img_path
            if not full_path.exists():
                broken.append(f"Guide '{fm.get('title', guide.name)}': {hero_image}")

    return broken

def main():
    print("=" * 60)
    print("YourWillPro Content Audit")
    print("=" * 60)
    print()

    # Run all audits
    stories_count = audit_user_stories()
    guides_count = audit_guides()
    questions_count = audit_questions()
    stories_images_count = audit_images_stories()
    guides_images_count = audit_images_guides()
    other_images_count = audit_images_other()
    pages_count = audit_standalone_pages()

    # Check for broken references
    broken = check_broken_references()

    # Print summary
    print()
    print("=" * 60)
    print("SUMMARY REPORT")
    print("=" * 60)
    print()
    print("Content Counts:")
    print(f"  User Stories:      {stories_count}")
    print(f"  Guides:            {guides_count}")
    print(f"  Common Questions:  {questions_count}")
    print(f"  Standalone Pages:  {pages_count}")
    print()
    print("Image Counts:")
    print(f"  Story Images:      {stories_images_count}")
    print(f"  Guide Images:      {guides_images_count}")
    print(f"  Other Images:      {other_images_count}")
    print()

    if broken:
        print(f"WARNING: {len(broken)} broken image references found:")
        for ref in broken:
            print(f"  - {ref}")
    else:
        print("No broken image references found.")

    print()
    print("CSV Files Created:")
    print("  1. user-stories-audit.csv")
    print("  2. guides-audit.csv")
    print("  3. questions-audit.csv")
    print("  4. images-stories-audit.csv")
    print("  5. images-guides-audit.csv")
    print("  6. images-other-audit.csv")
    print("  7. standalone-pages-audit.csv")
    print()
    print("=" * 60)
    print("Audit Complete!")
    print("=" * 60)

if __name__ == "__main__":
    main()
