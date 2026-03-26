import os

def get_all_files(directory):
    files = []
    for root, _, filenames in os.walk(directory):
        for f in filenames:
            if f.endswith((".js", ".ts", ".py", ".jsx", ".tsx")):
                files.append(os.path.join(root, f))
    return files