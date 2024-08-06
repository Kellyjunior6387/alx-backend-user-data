#!/usr/bin/env python3
"""Module to manage the API authentication"""
from flask import request
from typing import List, TypeVar


class Auth:
    """Class to implement authentication
    """
    def require_auth(self, path: str, excluded_paths: List[str]) -> bool:
        if path and excluded_paths:
            path = path.rstrip('/') + '/'
            for excluded_path in excluded_paths:
                excluded_path = excluded_path.rstrip('/') + '/'
                if path == excluded_path:
                    return False
        return True

    def authorization_header(self, request=None) -> str:
        return None

    def current_user(self, request=None) -> TypeVar('User'):
        return None
