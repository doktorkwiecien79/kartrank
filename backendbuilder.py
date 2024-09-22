import os
import json
from docx import Document
import sys



def read_file(file_path):
    file_extension = os.path.splitext(file_path)[1].lower()
    full_text = []
    
    if file_extension == '.docx':
        doc = Document(file_path)
        for para in doc.paragraphs:
            full_text.append(para.text)
    elif file_extension == '.md':
        with open(file_path, 'r', encoding='utf-8') as file:
            md_content = file.read()
            full_text = [md_content]
    
    parts = '\n'.join(full_text).split('---')
    return parts

def extract_track_info(docx_parts):
    track_info = {}
    YTube = {} #yt
    keys_for_track = ['name', 'type', 'date', 'score', 'city', 'countrycode']
    for part in docx_parts:
        if ':' in part:
            key, value = part.split(':', 1)
            key = key.strip().lower()
            if key in keys_for_track:
                track_info[key] = value.strip()
            elif key == 'ytlink': #yt
                YTube['ytlink'] = value.strip()    
    return track_info, YTube #yt







def extract_race_info(docx_parts):
    race_info = {}
    keys_for_race = ['name', 'date', 'city', 'countrycode']
    for part in docx_parts:
        if ':' in part:
            key, value = part.split(':', 1)
            key = key.strip().lower()
            if key in keys_for_race:
                race_info[key] = value.strip()
    return race_info


def build_json_files(posts_path):
    posts = {}
    tracks = []
    for rank, slug in enumerate(sorted(os.listdir(posts_path)), start=1):
        post_dir = os.path.join(posts_path, slug)
        if os.path.isdir(post_dir):
            posts[slug] = {'images': [], 'textParts': [], 'YTlink': []}
            track = {'url': f'/posts/tracks/{slug}', 'rank': rank}
            cover_image_found = False

            for item in os.listdir(post_dir):
                if item.endswith(('.docx', '.md')):
                    docx_path = os.path.join(post_dir, item)
                    docx_parts = read_file(docx_path)
                    track_info, YTube = extract_track_info(docx_parts)
                    track.update(track_info)

                    # Add YTlink first if it exists
                    if 'ytlink' in YTube:
                        posts[slug]['YTlink'].append(YTube['ytlink'])

                    # Add text parts if the part is not in track_info or YTube
                    for part in docx_parts:
                        part_clean = part.strip()
                        key_in_info_or_yt = any(
                            part_clean.lower().startswith(key + ':') for key in {**track_info, **YTube}
                        )
                        if not key_in_info_or_yt:
                            posts[slug]['textParts'].append(part_clean)

                elif item.lower().endswith(('.png', '.jpg', '.jpeg', '.heic', '.mp4', '.webm', '.mov')):
                    media_type = 'image' if item.lower().endswith(('.png', '.jpg', '.jpeg', '.heic')) else f'video/{item.split(".")[-1]}'
                    posts[slug]['images'].append({
                        'src': f'/posts/tracks/{slug}/{item}',
                        'alt': f'{media_type.title()} for {slug}',
                        'type': media_type
                    })
                    if 'COVER' in item.upper() and not cover_image_found:
                        track['imageUrl'] = f'/posts/tracks/{slug}/{item}'
                        cover_image_found = True
            tracks.append(track)
    return posts, tracks



#funkcja dla race
def build_json_files2(posts_path):
    raceposts = {}
    races = []
    for rank, slug in enumerate(sorted(os.listdir(posts_path)), start=1):
        post_dir = os.path.join(posts_path, slug)
        if os.path.isdir(post_dir):
            raceposts[slug] = {'images': [], 'textParts': []}
            race = {'url': f'/posts/races/{slug}', 'rank': rank}
            cover_image_found = False
            for item in os.listdir(post_dir):
                if item.endswith(('.docx','.md')):
                    docx_path = os.path.join(post_dir, item)
                    docx_parts = read_file(docx_path)
                    race_info = extract_race_info(docx_parts)
                    race.update(race_info)
                    for part in docx_parts:
                        if not any(key + ':' in part for key in race_info):
                            raceposts[slug]['textParts'].append(part.strip())
                elif item.lower().endswith(('.png', '.jpg', '.jpeg', '.heic', '.mp4', '.webm', '.mov')):
                    media_type = 'image' if item.lower().endswith(('.png', '.jpg', '.jpeg', '.heic')) else f'video/{item.split(".")[-1]}'
                    raceposts[slug]['images'].append({
                        'src': f'/posts/races/{slug}/{item}',
                        'alt': f'{media_type.title()} for {slug}',
                        'type': media_type
                    }) 
                    if 'COVER' in item.upper() and not cover_image_found:
                        race['imageUrl'] = f'/posts/races/{slug}/{item}'
                        cover_image_found = True
            races.append(race)
    return raceposts, races


def main(post_type):
    posts_path = f'public/posts/{post_type}/'

    if post_type == 'tracks':
        posts_data, tracks_data = build_json_files(posts_path)
        with open('src/data/posts.json', 'w') as f:
            json.dump(posts_data, f, indent=4)
        with open('src/data/tracks.json', 'w') as f:
            json.dump(tracks_data, f, indent=4)
    elif post_type == 'races':
        posts_data, tracks_data = build_json_files2(posts_path)
        with open('src/data/raceposts.json', 'w') as f:
            json.dump(posts_data, f, indent=4)
        with open('src/data/races.json', 'w') as f:
            json.dump(tracks_data, f, indent=4)



if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python main.py <post_type>")
        sys.exit(1)

    post_type = sys.argv[1].lower()
    if post_type not in ["tracks", "races"]:
        print("Error: post_type should be 'track' or 'race'")
        sys.exit(1)

    main(post_type)


