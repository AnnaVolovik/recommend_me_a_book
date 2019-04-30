from bs4 import BeautifulSoup
import json
import random
import requests

from flask import Flask, render_template
from flask.ext.cache import Cache

app = Flask(__name__,
            static_folder='../static/dist',
            template_folder='../static')

cache = Cache(app, config={'CACHE_TYPE': 'simple'})


@app.route("/")
def index():
    return render_template("index.html")


@cache.cached(timeout=600)
def get_a_book_list():
    """Get a list of top books on https://thegreatestbooks.org/, cache the list"""

    url = 'https://thegreatestbooks.org/'

    book_list = []

    for page in range(1, 3):

        r = requests.get(f"{url}?page={page}")
        soup = BeautifulSoup(r.content, 'html.parser')

        ol = soup.find('ol', {'class': 'list-unstyled'})

        for li in ol.select('li'):
            tmp = {}

            try:
                tmp['name'] = (li.select('a'))[0].get_text(strip=True)
                tmp['author'] = (li.select('a'))[1].get_text(strip=True)
                tmp['description'] = (li.select('p'))[0].get_text(strip=True)
                book_list.append(tmp)
            except:
                continue

    return book_list


@app.route("/recommend_me_a_book")
def recommend_me_a_book():
    """Return a random book out of the list"""

    random_book = random.choice(get_a_book_list())
    return json.dumps(random_book)


if __name__ == "__main__":
    app.run()
