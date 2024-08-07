#!/usr/bin/env python3
"""Authentication module for the API.
"""
import re
from typing import List, TypeVar
from flask import request


class Auth:
    """Authentication class.
    """
    def require_auth(self, path: str, excluded_paths: List[str]) -> bool:
         """Method to check if a path requires authentication
        """
        if path and excluded_paths:
            path = path.rstrip('/') + '/'
            for excluded_path in excluded_paths:
                excluded_path = excluded_path.rstrip('/') + '/'
                if path == excluded_path:
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
