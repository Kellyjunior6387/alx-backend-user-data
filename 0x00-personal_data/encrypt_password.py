#!/usr/bin/env python3
"""Module to hash a password"""
import bcrypt


def hash_password(password: str) -> bytes:
    """The function to hash the password using bcrypt"""
    hashed = bcrypt.hashpw(b"password", bcrypt.gensalt())
    return hashed
