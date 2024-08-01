#!/usr/bin/env python3
"""Module to filter and obsfucate PI from logs"""
import re
from typing import List


def filter_datum(fields: List[str], redaction: str, message: List[str],
                 separator: str):
    """Function to replace PI with obsufucated fields
    """
    return re.sub(rf"({'|'.join(fields)})=([^;{separator}]*)", lambda m: f"{m.group(1)}={redaction}", message)
