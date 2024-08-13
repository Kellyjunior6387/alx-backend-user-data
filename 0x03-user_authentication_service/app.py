#!/usr/bin/env  python3
"""Module to start a Flask server"""
from flask import Flask, jsonify, request, make_response, abort
from auth import Auth

app = Flask(__name__)
AUTH = Auth()


@app.route('/', methods=['GET'], strict_slashes=False)
def index() -> None:
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
            user.session_id = session_id
            response = make_response(jsonify({"email": email,
                                              "message": "logged in"}))
            response.set_cookie('session_id', session_id)
            return response
    abort(401)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
