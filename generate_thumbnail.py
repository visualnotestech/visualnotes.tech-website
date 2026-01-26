#!/usr/bin/env python3
"""
Thumbnail Generator for VisualNotes Study Guides
Automatically generates thumbnail images based on topic and category
"""

from PIL import Image, ImageDraw, ImageFont
import os
import sys

# Category-based color schemes
COLOR_SCHEMES = {
    'infrastructure': {
        'gradient_start': (99, 102, 241),   # #6366f1
        'gradient_end': (139, 92, 246),     # #8b5cf6
        'icon_color': (255, 255, 255)       # White
    },
    'cloud': {
        'gradient_start': (14, 165, 233),   # #0ea5e9
        'gradient_end': (6, 182, 212),      # #06b6d4
        'icon_color': (255, 255, 255)
    },
    'security': {
        'gradient_start': (239, 68, 68),    # #ef4444
        'gradient_end': (236, 72, 153),     # #ec4899
        'icon_color': (255, 255, 255)
    },
    'osint': {
        'gradient_start': (251, 191, 36),   # #fbbf24
        'gradient_end': (249, 115, 22),     # #f97316
        'icon_color': (255, 255, 255)
    }
}

# Icon suggestions by topic keywords
ICON_SUGGESTIONS = {
    'dns': '🌐',
    'tcp': '🔄',
    'ip': '🔄',
    'network': '🔗',
    'cloud': '☁️',
    'aws': '☁️',
    'azure': '☁️',
    'gcp': '☁️',
    'security': '🔒',
    'https': '🔒',
    'ssl': '🔒',
    'oauth': '🔑',
    'osint': '🔍',
    'load': '⚖️',
    'cdn': '🌍',
    'server': '🖥️',
}

def create_gradient(width, height, color_start, color_end):
    """Create a gradient image from top-left to bottom-right"""
    base = Image.new('RGB', (width, height), color_start)
    top = Image.new('RGB', (width, height), color_end)
    mask = Image.new('L', (width, height))
    
    mask_data = []
    for y in range(height):
        for x in range(width):
            # Diagonal gradient
            distance = ((x / width) + (y / height)) / 2
            mask_data.append(int(255 * distance))
    
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def draw_icon(draw, width, height, icon_emoji, color):
    """Draw an icon in the center (simplified - using circle as placeholder)"""
    # For simplicity, draw a large circle as icon placeholder
    # In production, you'd use actual icon SVGs or fonts
    center_x, center_y = width // 2, height // 2
    radius = min(width, height) // 4
    
    # Draw outer circle
    draw.ellipse(
        [center_x - radius, center_y - radius, 
         center_x + radius, center_y + radius],
        outline=color,
        width=8
    )
    
    # Draw inner details (simple globe representation)
    if icon_emoji == '🌐':
        # Vertical lines
        draw.line([center_x, center_y - radius, center_x, center_y + radius], fill=color, width=6)
        # Horizontal lines
        draw.line([center_x - radius, center_y, center_x + radius, center_y], fill=color, width=6)
        # Curved lines (approximated)
        draw.arc([center_x - radius//2, center_y - radius, 
                  center_x + radius//2, center_y + radius], 
                 0, 180, fill=color, width=6)

def generate_thumbnail(topic, category, output_path):
    """
    Generate a thumbnail for a study guide
    
    Args:
        topic: Topic name (e.g., "DNS Administration")
        category: Category name (e.g., "infrastructure", "cloud", "security", "osint")
        output_path: Where to save the thumbnail
    """
    # Image dimensions (16:9 aspect ratio)
    width, height = 800, 450
    
    # Get color scheme
    category_lower = category.lower()
    if category_lower not in COLOR_SCHEMES:
        print(f"Warning: Unknown category '{category}'. Using 'infrastructure' colors.")
        category_lower = 'infrastructure'
    
    colors = COLOR_SCHEMES[category_lower]
    
    # Create gradient background
    img = create_gradient(
        width, height,
        colors['gradient_start'],
        colors['gradient_end']
    )
    
    # Draw icon
    draw = ImageDraw.Draw(img)
    
    # Try to find matching icon
    topic_lower = topic.lower()
    icon = '🌐'  # Default
    for keyword, emoji in ICON_SUGGESTIONS.items():
        if keyword in topic_lower:
            icon = emoji
            break
    
    # Draw the icon representation
    draw_icon(draw, width, height, icon, colors['icon_color'])
    
    # Save thumbnail
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, 'PNG', quality=95)
    print(f"✅ Generated thumbnail: {output_path}")
    print(f"   Category: {category}")
    print(f"   Icon: {icon}")

def main():
    if len(sys.argv) < 3:
        print("Usage: python generate_thumbnail.py <topic> <category> [output_path]")
        print("\nExamples:")
        print("  python generate_thumbnail.py 'DNS Administration' infrastructure")
        print("  python generate_thumbnail.py 'AWS Basics' cloud guides/thumbnails/aws-basics.png")
        print("\nCategories: infrastructure, cloud, security, osint")
        sys.exit(1)
    
    topic = sys.argv[1]
    category = sys.argv[2]
    
    # Generate output filename
    if len(sys.argv) >= 4:
        output_path = sys.argv[3]
    else:
        # Auto-generate filename
        filename = topic.lower().replace(' ', '-').replace('/', '-') + '.png'
        output_path = os.path.join('guides', 'thumbnails', filename)
    
    generate_thumbnail(topic, category, output_path)
    print(f"\n📝 Add this to your guides array:")
    print(f"   thumbnail: '{output_path}',")

if __name__ == '__main__':
    main()
