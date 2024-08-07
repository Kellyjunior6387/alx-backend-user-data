#!/usr/bin/env python3
"""Authentication module for the API.
"""
import re
from os import getenv
from typing import List, TypeVar
from flask import request


class Auth:
    """Authentication class.
    """
    def require_auth(self, path: str, excluded_paths: List[str]) -> bool:
        """Method to check if a path requires authentication"""
        if path is not None and excluded_paths is not None:
            for path in map(lambda x: x.strip(), excluded_paths):
                pattern = ''
                if path[-1] == '*':
                    pattern = '{}.*'.format(path[0:-1])
                elif path[-1] == '/':
                    pattern = '{}/*'.format(path[0:-1])
                else:
                    pattern = '{}/*'.format(path)
                if re.match(pattern, path):
                    return False
        return True

    def authorization_header(self, request=None) -> str:
        """Gets the authorization header field from the request.
        """
        if request is not None:
            return request.headers.get('Authorization', None)
        return None

    def current_user(self, request=None) -> TypeVar('User'):
        """Gets the current user from the request.
        """
        return None

    def session_cookie(self, request=None):
        """ Returns a cookie value from a request
        """
        SESSION_NAME = getenv('SESSION_NAME')
        if request:
            return request.cookies.get(SESSION_NAME)
