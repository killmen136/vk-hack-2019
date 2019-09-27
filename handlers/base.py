import logging

from base64 import b64encode
from collections import OrderedDict
from hashlib import sha256
from hmac import HMAC
from urllib.parse import urlencode
import tornado.web
import json


client_secret = 'PqwFekrI1arHHZwXKk1w'


class BaseHandler(tornado.web.RequestHandler):
    def prepare(self):
        logging.warning(self.request.arguments)
        vk_subset = OrderedDict(sorted(x for x in self.request.arguments.items() if x[0][:3] == "vk_"))
        hash_code = b64encode(HMAC(client_secret.encode(), urlencode(vk_subset, doseq=True).encode(), sha256).digest())
        decoded_hash_code = hash_code.decode('utf-8')[:-1].replace('+', '-').replace('/', '_')
        sign = self.get_argument('sign')

        if sign != decoded_hash_code:
            self.send_error(403)
