#!/usr/bin/env python3
"""
Module to implement Basic authentication Module to implement
Basic authentication
"""
from api.v1.auth.auth import Auth
import binascii
import base64
from typing import Tuple, TypeVar
from models.user import User


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

    def extract_user_credentials(self, decoded_base64_authorization_header:
                                 str) -> Tuple[str, str]:
        if isinstance(decoded_base64_authorization_header, str):
            if ':' in decoded_base64_authorization_header:
                user = decoded_base64_authorization_header.split(':', 1)
                return (user[0], user[1])
        return (None, None)

    def user_object_from_credentials(self, user_email: str, user_pwd:
                                     str) -> TypeVar('User'):
        """
        Return an instance of the user with matching email
        and password
        """
        if isinstance(user_email, str) and isinstance(user_pwd, str):
            try:
                users = User.search({'email': user_email})
            except Exception:
                return None
            if len(users) > 0:
                if users[0].is_valid_password(user_pwd):
                    return users[0]
        return None

    def current_user(self, request=None) -> TypeVar('User'):
        """ Recieve the request and look for the user credentials
        """
        auth_header = self.authorization_header(request)
        b64_string = self.extract_base64_authorization_header(auth_header)
        decoded_string = self.decode_base64_authorization_header(b64_string)
        email, pswd = self.extract_user_credentials(decoded_string)
        return self.user_object_from_credentials(email, pswd)
