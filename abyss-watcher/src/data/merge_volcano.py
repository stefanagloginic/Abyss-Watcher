import json

with open('volcano_dataset.json') as og_f, open('volcano_with_impacts_dataset.json') as add_f:
    data = json.load(f)
