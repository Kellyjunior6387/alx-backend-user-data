#!/usr/bin/env python3
"""Module to implement Basic authentication"""
from auth import Auth


class BasicAuth(Auth):
    """Inherits from Auth and encode and decode headers
    """
    def extract_base64_authorization_header(self, authorization_header:
                                            str) -> str:
        """ returns the Base64 part of the Authorization header
        for a Basic Authentication
        """
        if authorization_header and isinstance(authorization_header, str):
            if authorization_header.startswith('Basic '):
                return authorization_header.strip('Basic ')
        return None