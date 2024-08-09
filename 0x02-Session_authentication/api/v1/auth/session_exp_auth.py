#!/usr/bin/env python3
"""Authentication module for the API.
"""
import re
from os import getenv
from typing import List, TypeVar
from flask import request
from .session_auth import SessionAuth
from datetime import datetime, timedelta


class SessionExpAuth(SessionAuth):
    """ Session expiry Authentication class.
    """
    def __init__(self) -> None:
        """Initialise the session_duration
        """
        dur = getenv('SESSION_DURATION', 0)
        try:
            self.session_duration = int(dur)
        except ValueError:
            self.session_duration = 0

    def create_session(self, user_id=None) -> str:
        """Overload the create session method
        """
        try:
            id = super().create_session(user_id)
        except Exception:
            return None
        session_dictionary = {'user_id': user_id,
                              'created_at': datetime.now()}
        self.user_id_by_session_id[id] = session_dictionary
        return id

    def user_id_for_session_id(self, session_id: str = None) -> str:
        """Retrieve the user_id by session_id considering expiration."""
        if session_id is None or session_id not in self.user_id_by_session_id:
            return None
        session_dict = self.user_id_by_session_id.get(session_id)
        if not session_dict:
            return None
        if self.session_duration <= 0:
            return session_dict.get("user_id")
        if "created_at" not in session_dict:
            return None
        created_at = session_dict.get("created_at")
        seconds = self.session_duration
        if created_at + timedelta(seconds=seconds) < datetime.now():
            return None
        return session_dict.get("user_id")
