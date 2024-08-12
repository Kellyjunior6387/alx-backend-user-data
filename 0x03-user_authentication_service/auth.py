#!/usr/bin/env python3
"""Module to encrypt a password"""
import bcrypt


def _hash_password(password: str) -> bytes:
    """Method to encrypt passowrd using bcrypt"""
    hashed = bcrypt.hashpw(b'password', bcrypt.gensalt())
    return hashed
