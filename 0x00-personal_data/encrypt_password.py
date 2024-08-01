#!/usr/bin/env python3
"""Module to hash a password"""
import bcrypt


def hash_password(password: str) -> bytes:
    """The function to hash the password using bcrypt"""
    hashed = bcrypt.hashpw(b"password", bcrypt.gensalt())
    return hashed


def is_valid(hashed_password: bytes, password: str) -> bool:
    """Function to check if passwd matches hashed passwd"""
    return bcrypt.checkpw(b"password", hashed_password)
