#!/usr/bin/env python3
import urllib.request
import json
import time
import re
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CACHE_FILE = os.path.join(SCRIPT_DIR, 'seats-cache.json')

def sync():
    film_ids = [13, 14, 15, 16, 17, 18]
    data = {}

    # Load existing cache as baseline
    try:
        with open(CACHE_FILE, 'r') as f:
            data = json.load(f).get('data', {})
    except Exception:
        pass

    for fid in film_ids:
        try:
            url = f"https://aruhganal.com/tiket/film/{fid}"
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            html = urllib.request.urlopen(req, timeout=5).read().decode('utf-8', errors='ignore')
            m = re.search(r'Kursi tersisa(?:&nbsp;|\s)+<b>(.*?)</b>', html)
            if m:
                raw = m.group(1).strip()
                sub = re.match(r'^(\d+)', raw)
                if sub:
                    rem = int(sub.group(1))
                    data[str(fid)] = {
                        'remaining': rem,
                        'text': f"sisa {rem} kursi" if rem > 0 else "tiket habis",
                        'raw': raw
                    }
                    continue
        except Exception:
            pass
        if str(fid) not in data:
            data[str(fid)] = {'remaining': 220, 'text': 'sisa 220 kursi'}

    # Special Pirunduk
    try:
        url = "https://aruhganal.com/tiket"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, timeout=5).read().decode('utf-8', errors='ignore')
        m = re.search(r'Sisa\s*<b[^>]*>(\d+)</b>\s*tiket', html)
        if m:
            rem = int(m.group(1))
            data['pirunduk'] = {
                'remaining': rem,
                'text': f"sisa {rem} tiket",
                'raw': f"{rem} dari 1000"
            }
    except Exception:
        if 'pirunduk' not in data:
            data['pirunduk'] = {'remaining': 997, 'text': 'sisa 997 tiket'}

    payload = {
        'status': 'success',
        'timestamp': int(time.time()),
        'data': data
    }

    with open(CACHE_FILE, 'w') as f:
        json.dump(payload, f, indent=2)

if __name__ == '__main__':
    sync()
