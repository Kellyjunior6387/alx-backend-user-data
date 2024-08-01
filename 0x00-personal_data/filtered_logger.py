#!/usr/bin/env python3
"""Module to filter and obsfucate PI from logs"""
import re
import logging
from typing import List


def filter_datum(fields: List[str], redaction: str, message: List[str],
                 separator: str):
    """Function to replace PI with obsufucated fields
    """
    return re.sub(rf"({'|'.join(fields)})=([^;{separator}]*)", lambda m:
                  f"{m.group(1)}={redaction}", message)


class RedactingFormatter(logging.Formatter):
    """ Redacting Formatter class
        """

    REDACTION = "***"
    FORMAT = "[HOLBERTON] %(name)s %(levelname)s %(asctime)-15s: %(message)s"
    SEPARATOR = ";"

    def __init__(self, fields: List[str]):
        super(RedactingFormatter, self).__init__(self.FORMAT)
        self.fields = fields

    def format(self, record: logging.LogRecord) -> str:
        record.msg = filter_datum(self.fields, self.REDACTION, record.msg,
                                  self.SEPARATOR)
        return super(RedactingFormatter, self).format(record)
