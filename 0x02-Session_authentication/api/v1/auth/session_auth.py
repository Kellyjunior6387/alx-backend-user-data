#!/usr/bin/env python3
"""Session authentication module for the API.
"""
from uuid import uuid4
from models.user import User
from .auth import Auth


class SessionAuth(Auth):
    """Session authentication class.
    """
    user_id_by_session_id = {}

    def create_session(self, user_id: str = None) -> str:
        """Creates a session id for the user.
        """
        if type(user_id) is str:
            session_id = str(uuid4())
            self.user_id_by_session_id[session_id] = user_id
            return session_id

    def user_id_for_session_id(self, session_id: str = None) -> str:
        """ Retrieves a user_idbased on the session id"""
        if type(session_id) is str:
            return self.user_id_by_session_id.get(session_id, None)

    def current_user(self, request=None):
        if request:
            cookie = self.session_cookie(request)
            user_id = self.user_id_for_session_id(cookie)
            user = User.get(user_id)
            return user
