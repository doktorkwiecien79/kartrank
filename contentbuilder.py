#legacy backend sprzed zastosowania markdowna

import os
import json
from docx import Document


def read_docx(file_path):
    doc = Document(file_path)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    parts = '\n'.join(full_text).split('---')
    return parts

def extract_track_info(docx_parts):
    track_info = {}
    keys_for_track = ['name', 'type', 'date', 'score', 'city', 'countrycode']
    for part in docx_parts:
        if ':' in part:
            key, value = part.split(':', 1)
            key = key.strip().lower()
            if key in keys_for_track:
                track_info[key] = value.strip()
    return track_info

def build_json_files(posts_path):
    posts = {}
    tracks = []
    for rank, slug in enumerate(sorted(os.listdir(posts_path)), start=1):
        post_dir = os.path.join(posts_path, slug)
        if os.path.isdir(post_dir):
            posts[slug] = {'images': []}
            track = {'url': f'/posts/{slug}', 'rank': rank}
            text_part_counter = 1
            cover_image_found = False
            for item in os.listdir(post_dir):
                if item.endswith('.docx'):
                    docx_path = os.path.join(post_dir, item)
                    docx_parts = read_docx(docx_path)
                    track_info = extract_track_info(docx_parts)
                    track.update(track_info)
                    for part in docx_parts:
                        if not any(key + ':' in part for key in track_info):
                            part_key = f'textPart{text_part_counter}'
                            posts[slug][part_key] = part.strip()
                            text_part_counter += 1
                elif item.lower().endswith(('.png', '.jpg', '.jpeg', '.heic', '.mp4', '.webm', '.mov')):
                    media_type = 'image' if item.lower().endswith(('.png', '.jpg', '.jpeg', '.heic')) else f'video/{item.split(".")[-1]}'
                    posts[slug]['images'].append({
                        'src': f'/posts/{slug}/{item}',
                        'alt': f'{media_type.title()} for {slug}',
                        'type': media_type
                    }) 
                    if 'COVER' in item.upper() and not cover_image_found:
                        track['imageUrl'] = f'/posts/{slug}/{item}'
                        cover_image_found = True
            tracks.append(track)
    return posts, tracks

posts_path = 'public/posts/'
posts_data, tracks_data = build_json_files(posts_path)

# Writing posts data to JSON file
with open('src/data/posts.json', 'w') as f:
    json.dump(posts_data, f, indent=4)

# Writing tracks data to JSON file
with open('src/data/tracks.json', 'w') as f:
    json.dump(tracks_data, f, indent=4)
