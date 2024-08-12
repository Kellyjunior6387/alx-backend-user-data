#!/usr/bin/env python3
"""Module to encrypt a password"""
import bcrypt
from db import DB
from user import User
from sqlalchemy.exc import InvalidRequestError, NoResultFound


def _hash_password(password: str) -> bytes:
    """Method to encrypt passowrd using bcrypt"""
    hashed = bcrypt.hashpw(b'password', bcrypt.gensalt())
    return hashed


class Auth:
    """Auth class to interact with the authentication database.
    """

    def __init__(self):
        self._db = DB()

    def register_user(self, email: str, password: str) -> User:
        """Method to register a unregistered user"""
        if email and password:
            try:
                self._db.find_user_by(email=email)
                raise ValueError(f'User {email} already exists')
            except NoResultFound:
                return self._db.add_user(email, _hash_password(password))