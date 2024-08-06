#!/usr/bin/env python3
"""Module to manage the API authentication"""
import requests from flask


class Auth:
    """Class to implement authentication
    """
    def require_auth(self, path: str, excluded_paths: List[str]) -> bool:
        return False

    def authorization_header(self, request=None) -> str:
        return None

    def current_user(self, request=None) -> TypeVar('User'):
        return None
