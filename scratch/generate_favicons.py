import os
import subprocess
import struct

SVG_CONTENT = '''<svg viewBox="0 0 512 512" width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cz-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#064e3b" />
      <stop offset="100%" stop-color="#022c22" />
    </linearGradient>
    <linearGradient id="cz-shine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#d97706" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="cz-spark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
  </defs>

  <rect width="512" height="512" rx="120" fill="url(#cz-bg)" />
  <rect width="512" height="512" rx="120" fill="url(#cz-shine)" />

  <rect
    x="92" y="154" width="328" height="215"
    rx="40"
    fill="white" fill-opacity="0.15"
    stroke="white" stroke-width="15" stroke-linejoin="round"
  />

  <path
    d="M92 195 L256 277 L420 195"
    stroke="white" stroke-width="15"
    stroke-linecap="round" stroke-linejoin="round"
    fill="none"
  />

  <path
    d="M256 333 C256 333 205 292 205 261 C205 244 219 230 236 230 C245 230 253 235 256 241 C259 235 267 230 276 230 C293 230 307 244 307 261 C307 292 256 333 256 333 Z"
    fill="white" fill-opacity="0.9"
  />

  <path
    d="M389 82 C389 100 398 108 417 108 C398 108 389 116 389 135 C389 116 380 108 361 108 C380 108 389 100 389 82 Z"
    fill="url(#cz-spark)"
  />
</svg>'''

def main():
    os.makedirs('scratch/fav_build', exist_ok=True)
    svg_file = 'scratch/fav_build/master_icon.svg'
    with open(svg_file, 'w') as f:
        f.write(SVG_CONTENT)

    # Render base PNG using qlmanage
    subprocess.run(['qlmanage', '-t', '-s', '512', '-o', 'scratch/fav_build', svg_file], check=True)
    base_png = 'scratch/fav_build/master_icon.svg.png'

    sizes = {
        'favicon-16x16.png': (16, 16),
        'favicon-32x32.png': (32, 32),
        'favicon-48x48.png': (48, 48),
        'apple-touch-icon.png': (180, 180),
        'android-chrome-192x192.png': (192, 192),
        'android-chrome-512x512.png': (512, 512),
    }

    for name, (w, h) in sizes.items():
        out_p = f'scratch/fav_build/{name}'
        subprocess.run(['sips', '-z', str(h), str(w), base_png, '--out', out_p], check=True)

    # Build favicon.ico from 16x16, 32x32, 48x48
    make_ico([
        ('scratch/fav_build/favicon-16x16.png', 16, 16),
        ('scratch/fav_build/favicon-32x32.png', 32, 32),
        ('scratch/fav_build/favicon-48x48.png', 48, 48)
    ], 'scratch/fav_build/favicon.ico')

    print("Generated all PNGs and favicon.ico successfully!")

def make_ico(png_files, out_path):
    images = []
    for path, w, h in png_files:
        with open(path, 'rb') as f:
            data = f.read()
        images.append((w, h, data))
    
    num = len(images)
    header = struct.pack('<HHH', 0, 1, num)
    dir_entries = []
    offset = 6 + 16 * num
    
    for w, h, data in images:
        w_b = 0 if w >= 256 else w
        h_b = 0 if h >= 256 else h
        size = len(data)
        entry = struct.pack('<BBBBHHII', w_b, h_b, 0, 0, 1, 32, size, offset)
        dir_entries.append(entry)
        offset += size
    
    with open(out_path, 'wb') as f:
        f.write(header)
        for entry in dir_entries:
            f.write(entry)
        for _, _, data in images:
            f.write(data)

if __name__ == '__main__':
    main()
