"""Generate responsive WebP copies of the checked-in project screenshots.

Run from any directory with Python and Pillow. Originals are retained.
"""

from pathlib import Path

from PIL import Image, ImageOps


PROJECTS_DIR = Path(__file__).resolve().parents[1] / "public" / "projects"
SCREENSHOTS = (
    "tapinaja.png",
    "merdeka-sejahtera.png",
    "autochef-screen.png",
    "rkd.png",
)
QUALITY = 85


def optimize() -> None:
    for filename in SCREENSHOTS:
        source = PROJECTS_DIR / filename
        with Image.open(source) as opened:
            original = ImageOps.exif_transpose(opened)
            if original.mode == "RGBA" and original.getchannel("A").getextrema() == (255, 255):
                original = original.convert("RGB")
            elif original.mode not in ("RGB", "RGBA"):
                original = original.convert("RGBA" if "transparency" in original.info else "RGB")

            for limit, suffix in ((640, "-640"), (1280, "")):
                image = original.copy()
                if image.width > limit:
                    height = round(image.height * limit / image.width)
                    image = image.resize((limit, height), Image.Resampling.LANCZOS)
                destination = source.with_name(f"{source.stem}{suffix}.webp")
                image.save(destination, "WEBP", quality=QUALITY, method=6)
                print(f"{destination.name}: {image.width}x{image.height}, {destination.stat().st_size} bytes")


if __name__ == "__main__":
    optimize()
