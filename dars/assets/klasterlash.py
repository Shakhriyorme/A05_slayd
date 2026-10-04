import re
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans

df = pd.read_csv("assets/mars.csv")                 # 16 ta "Mars" natijasi
STOP = set(open("assets/stop_uz.txt", encoding="utf-8").read().split())
SUF = sorted("lardagi laridan larning larida larini lariga lardan sining larda "
             "larni larga sidan ining dagi lari sida sini siga idan ning lar "
             "ida ini iga dan da ni ga si li i".split(), key=len, reverse=True)

def stem(w):                        # qo'shimchalarni kesamiz, o'zak >= 4 harf
    cut = True
    while cut:
        cut = False
        for s in SUF:
            if w.endswith(s) and len(w) - len(s) >= 4:
                w, cut = w[:-len(s)], True
                break
    return w

def tokens(text):
    words = (w.strip("'") for w in re.findall(r"[a-z0-9']+", text.lower()))
    return [stem(w) for w in words if len(w) > 1 and w not in STOP and not w.isdigit()]

vec = TfidfVectorizer(tokenizer=tokens, lowercase=False, token_pattern=None)
X = vec.fit_transform(df["snippet"])
print("X:", X.shape, "-> 16 hujjat x o'zaklar")

km = KMeans(n_clusters=4, n_init=10, random_state=42).fit(X)
df["klaster"] = km.labels_

terms = vec.get_feature_names_out()
for c, center in enumerate(km.cluster_centers_):
    print(f"klaster {c}:", ", ".join(terms[center.argsort()[::-1][:3]]))

print(pd.crosstab(df["klaster"], df["manosi"]))
