import sys, glob
from PIL import Image
pre, cols, scale = sys.argv[1], int(sys.argv[2]), float(sys.argv[3])
files = sorted(glob.glob(f"{pre}-[0-9][0-9].png"))
ims = [Image.open(f) for f in files]
w, h = int(ims[0].width*scale), int(ims[0].height*scale)
per = cols*2
for s in range(0, len(ims), per):
    chunk = ims[s:s+per]; rows = (len(chunk)+cols-1)//cols
    sheet = Image.new("RGB", (w*cols+8*(cols-1), h*rows+8*(rows-1)), (255,255,255))
    for i, im in enumerate(chunk):
        sheet.paste(im.resize((w, h)), ((i%cols)*(w+8), (i//cols)*(h+8)))
    sheet.save(f"_sheet-{pre}-{s//per+1}.png")
    print(f"_sheet-{pre}-{s//per+1}.png", [f for f in files[s:s+per]])
