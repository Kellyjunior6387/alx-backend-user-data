#!/usr/bin/env python3
"""Module to filter and obsfucate PI from logs"""
import re
import logging
from typing import List
import os
import mysql.connector
PII_FIELDS = ('name', 'ssn', 'password', 'email', 'phone')


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
        """Initialise the class"""
        super(RedactingFormatter, self).__init__(self.FORMAT)
        self.fields = fields

    def format(self, record: logging.LogRecord) -> str:
        """Obsufucate the PI fileds from th e logs"""
        record.msg = filter_datum(self.fields, self.REDACTION, record.msg,
                                  self.SEPARATOR)
        return super(RedactingFormatter, self).format(record)


def get_logger() -> logging.Logger:
    """
    Function to formart and implement get logger
    """
    logger = logging.getLogger('user_data')
    logger.setLevel(logging.INFO)
    logger.propagate = False
    stream_handler = logging.StreamHandler()
    formatter = RedactingFormatter(fields=PII_FIELDS)
    stream_handler.setFormatter(formatter)
    logger.addHandler(stream_handler)

    return logger


def get_db() -> mysql.connector.connection.MySQLConnection:
    """Connect to a database using environment variables"""
    config = {
        'user': os.environ.get('PERSONAL_DATA_DB_USERNAME '),
        'password': os.environ.get('PERSONAL_DATA_DB_PASSWORD'),
        'host': os.environ.get('PERSONAL_DATA_DB_HOST'),
        'database': os.environ.get('PERSONAL_DATA_DB_NAME')
    }
    conn =  mysql.connector.connect(**config)
    return conn
