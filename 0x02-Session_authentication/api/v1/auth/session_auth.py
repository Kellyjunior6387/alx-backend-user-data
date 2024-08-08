#!/usr/bin/env python3
"""Session authentication module for the API.
"""
from uuid import uuid4
from flask import request

from .auth import Auth
from models.user import User


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
        """Retrieves the user id of the user associated with
        a given session id.
        """
        if type(session_id) is str:
            return self.user_id_by_session_id.get(session_id, None)

    def current_user(self, request=None) -> User:
        """Retrieves the user associated with the request.
        """
        if request:
            cookie = self.session_cookie(request)
            user_id = self.user_id_for_session_id(cookie)
            user = User.get(user_id)
            return user

    def destroy_session(self, request=None) -> None:
        if request:
            user_id = self.session_cookie(request)
            session_id = self.user_id_for_session_id(user_id)
            if user_id is not None or session_id is not None:
                if session_id in self.user_id_by_session_id:
                    del self.user_id_by_session_id[session_id]
                    return True
        return False
