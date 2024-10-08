#!/usr/bin/env python3
"""Module to handle routes for session authentication"""
from flask import request, jsonify, make_response, abort
from os import getenv

from models.user import User
from api.v1.views import app_views


@app_views.route('/auth_session/login', methods=['POST'], strict_slashes=False)
def session_handler() -> dict:
    """
    Route to handle session authentication
    """
    email = request.form.get('email')
    pswd = request.form.get('password')
    if not email:
        return jsonify({"error": "email missing"}), 400
    if not pswd:
        return jsonify({"error": "password missing"}), 400
    try:
        user = User.search({'email': email})
    except IndexError:
        return jsonify({"error": "no user found for this email"}), 404
    user = user[0] if user else None
    if not user:
        return jsonify({"error": "no user found for this email"}), 404
    if not user.is_valid_password(pswd):
        return jsonify({"error": "wrong password"}), 401
    from api.v1.app import auth
    session_id = auth.create_session(user.id)
    user_dict = make_response(jsonify(user.to_json()))
    user_dict.set_cookie(getenv("SESSION_NAME"), session_id)
    return user_dict

@app_views.route(
    '/auth_session/logout', methods=['DELETE'], strict_slashes=False)
def logout():
    """DELETE /api/v1/auth_session/logout
    Return:
      - An empty JSON object.
    """
    from api.v1.app import auth
    is_destroyed = auth.destroy_session(request)
    if not is_destroyed:
        abort(404)
    return jsonify({})
