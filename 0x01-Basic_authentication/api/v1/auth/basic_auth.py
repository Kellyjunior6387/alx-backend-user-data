#!/usr/bin/env python3
"""
Module to implement Basic authentication Module to implement
Basic authentication
"""
from api.v1.auth.auth import Auth
import binascii
import base64


class BasicAuth(Auth):
    """
    Inherits from Auth and encode and decode headers.
    """
    def extract_base64_authorization_header(self, authorization_header:
                                            str) -> str:
        """
        Returns the Base64 part of the Authorization header
        for a Basic Authentication
        """
        if authorization_header and isinstance(authorization_header, str):
            if authorization_header.startswith('Basic '):
                return authorization_header.strip('Basic ')
        return None

    def decode_base64_authorization_header(self, base64_authorization_header:
                                           str) -> str:
        """ Decode and return the authorization header
        """
        if isinstance(base64_authorization_header, str):
            try:
                res = base64.b64decode(base64_authorization_header,
                                       validate=True)
                return res.decode('utf-8')
            except (binascii.Error):
                return None
