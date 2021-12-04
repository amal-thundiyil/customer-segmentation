from flaskapp.errors.api_error import APIError
from http import HTTPStatus


class NotFoundError(APIError):
    def __init__(self, message):
        super().__init__(message, HTTPStatus.NOT_FOUND)
