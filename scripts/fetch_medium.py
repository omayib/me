"""Fetch the Medium RSS feed and save the latest posts as contents/medium.json.

Run by .github/workflows/medium-feed.yml so the site can read the feed from
its own origin instead of depending on a third-party CORS proxy.
"""
import html
import json
import re
import urllib.request
import xml.etree.ElementTree as ET

FEED_URL = 'https://medium.com/feed/@akbarul'
OUT_FILE = 'contents/medium.json'
LIMIT = 3
NS = {
    'dc': 'http://purl.org/dc/elements/1.1/',
    'content': 'http://purl.org/rss/1.0/modules/content/',
}


def snippet(raw_html, length=160):
    text = html.unescape(re.sub(r'<[^>]+>', ' ', raw_html or ''))
    text = re.sub(r'\s+', ' ', text).strip()
    return text[:length] + '...' if len(text) > length else text


req = urllib.request.Request(FEED_URL, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=30) as resp:
    root = ET.fromstring(resp.read())

items = []
for item in root.find('channel').findall('item')[:LIMIT]:
    items.append({
        'title': item.findtext('title', ''),
        'link': item.findtext('link', ''),
        'pubDate': item.findtext('pubDate', ''),
        'author': item.findtext('dc:creator', '', NS),
        'description': snippet(item.findtext('content:encoded', '', NS)),
    })

if not items:
    raise SystemExit('Feed returned no items; keeping existing file.')

with open(OUT_FILE, 'w', encoding='utf-8') as f:
    json.dump({'items': items}, f, ensure_ascii=False, indent=2)
    f.write('\n')
print(f'Saved {len(items)} posts to {OUT_FILE}')
