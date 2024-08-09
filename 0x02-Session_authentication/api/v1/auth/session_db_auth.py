#!/usr/bin/env python3
"""Authentication module for the API.
"""
from uuid import uuid4
from datetime import datetime, timedelta

from .session_exp_auth import SessionExpAuth
from models.user_session import UserSession



class SessionDBAuth(SessionExpAuth):
    """ Session expiry Authentication class.
    """

    def create_session(self, user_id=None) -> str:
        if type(user_id) is str:
            session_id = str(uuid4())
            user = UserSession()
            user.user_id = user_id
            user.session_id = session_id
            user.save()
            return session_id
    
    def  user_id_for_session_id(self, session_id=None):
        """Retrieve the user id based on the session id"""
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
    
    def destroy_session(self, request=None) -> None:
        """Method to destroy the user instance"""
        session_id = self.session_cookie(request)
        user = UserSession.search({'session_id': session_id})
        user[0].remove()

