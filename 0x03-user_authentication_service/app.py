#!/usr/bin/env  python3
"""Module to start a Flask server"""
from flask import Flask, jsonify, request, make_response, abort, redirect
from auth import Auth

app = Flask(__name__)
AUTH = Auth()


@app.route('/', methods=['GET'], strict_slashes=False)
def index() -> str:
    """Start the app"""
    return jsonify({"message": "Bienvenue"})


@app.route('/users', methods=['POST'], strict_slashes=False)
def users():
    """Endpoint to register a user using an email"""
    email = request.form.get('email')
    password = request.form.get('password')
    if email and password:
        try:
            AUTH.register_user(email, password)
            return jsonify({"email": email, "message": "user created"})
        except ValueError:
            return jsonify({"message": "email already registered"}), 400


@app.route('/sessions', methods=['POST'], strict_slashes=False)
def login():
    """Endpoint to implement the login function"""
    email = request.form.get('email')
    password = request.form.get('password')
    if email and password:
        if AUTH.valid_login(email, password):
            session_id = AUTH.create_session(email)
            user = AUTH._db.find_user_by(email=email)
            AUTH._db.update_user(user.id, session_id=session_id)
            response = make_response(jsonify({"email": email,
                                              "message": "logged in"}))
            response.set_cookie('session_id', session_id)
            return response
    return jsonify({'message': 'incorrect credentials'})


@app.route('/sessions', methods=['DELETE'], strict_slashes=False)
def logout():
    """Endpoint to implement logout and redirect to login"""
    session_id = request.cookies.get('session_id')
    user = AUTH.get_user_from_session_id(session_id)
    if user:
        AUTH.destroy_session(user.id)
        redirect('/')
    abort(403)


@app.route('/profile', strict_slashes=False)
def get_profile():
    """Endpoint to get the profile of a user"""
    session_id = request.cookies.get('session_id')
    user = AUTH.get_user_from_session_id(session_id)
    if user:
        return jsonify({"email": user.email}), 200
    abort(403)


@app.route('/reset_password', methods=['POST'], strict_slashes=False)
def get_reset_password_token():
    """Endpoint to get a token to reset password"""
    email = request.form.get('email')
    try:
        token = AUTH.get_reset_password_token(email)
        return jsonify({"email": "email", "reset_token": token})
    except ValueError:
        abort(403)


@app.route('/reset_password', methods=['PUT'], strict_slashes=False)
def update_password():
    """Endpoint to update the password"""
    email = request.form.get('email')
    reset_token = request.form.get('reset_token')
    new_passwd = request.form.get('new_password')
    if email and reset_token and new_passwd:
        try:
            AUTH.update_password(reset_token, new_passwd)
            return jsonify({"email": email, "message": "Password updated"})
        except ValueError:
            abort(403)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
