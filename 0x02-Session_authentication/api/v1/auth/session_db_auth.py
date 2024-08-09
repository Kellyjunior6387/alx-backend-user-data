#!/usr/bin/env python3
"""Session authentication with expiration
and storage support module for the API.
"""
from flask import request
from datetime import datetime, timedelta
from uuid import uuid4

from models.user_session import UserSession
from .session_exp_auth import SessionExpAuth


class SessionDBAuth(SessionExpAuth):
    """Session authentication class with expiration and storage support.
    """

    def create_session(self, user_id=None) -> str:
        """Creates and stores a session id for the user.
        """
        if type(user_id) is str:
            session_id = str(uuid4())
            user = UserSession()
            user.user_id = user_id
            user.session_id = session_id
            user.save()
            return session_id

    def user_id_for_session_id(self, session_id=None):
        """Retrieves the user id of the user associated with
        a given session id.
        """
        try:
            user = UserSession.search({'session_id': session_id})
        except KeyError:
            return None
        if len(user) <= 0:
            return None
        cur_time = datetime.now()
        time_span = timedelta(seconds=self.session_duration)
        exp_time = user[0].created_at + time_span
        if exp_time < cur_time:
            return None
        return user[0].user_id

    def destroy_session(self, request=None) -> bool:
        """Destroys an authenticated session.
        """
        session_id = self.session_cookie(request)
        try:
            user = UserSession.search({'session_id': session_id})
        except Exception:
            return False
        user[0].remove()
        return True
