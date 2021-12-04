from flask import Blueprint, jsonify, request
from flask_login import current_user, login_user, logout_user, login_required
from flaskapp import login_manager, bcrypt, db, classifier
from flaskapp.models.user import User
from flaskapp.errors import (
    BadRequestError,
    UnauthorizedError,
    NotFoundError,
    MethodNotAllowedError,
)
from http import HTTPStatus
from pandas import DataFrame
from numpy import log1p

user = Blueprint("user", __name__)


@user.route("/register", methods=["POST"])
def register():
    req = request.json
    if not req:
        raise BadRequestError("Fields cannot be empty.")
    user = User.query.filter_by(username=req["username"]).first()
    if user:
        raise BadRequestError("Please choose a unique username.")
    user = User.query.filter_by(email=req["email"]).first()
    if user:
        raise BadRequestError("Please choose a unique email.")

    hashed_password = bcrypt.generate_password_hash(
        req["password"],
    ).decode("utf-8")
    user = User(username=req["username"], email=req["email"], password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return jsonify(
        status_code=HTTPStatus.CREATED,
        message="Your account has been created",
        data={"user_id": user.id},
    )


@user.route("/login", methods=["POST"])
def login():
    if current_user.is_authenticated:
        return (
            jsonify(
                status_code=HTTPStatus.OK,
                message="You are already logged in",
                data={"user_id": current_user.id},
            ),
            HTTPStatus.OK,
        )
    req = request.json
    if not req:
        raise BadRequestError("Fields cannot be empty.")
    user = User.query.filter_by(email=req["email"]).first()
    if not user:
        raise NotFoundError("Sorry. No user was found with this email.")
    if not bcrypt.check_password_hash(user.password, req["password"]):
        raise BadRequestError("Please enter valid password.")
    login_user(user, remember=req["remember"])
    return (
        jsonify(
            status_code=HTTPStatus.OK,
            message="You have successfully logged in.",
            data={"user_id": user.id},
        ),
        HTTPStatus.OK,
    )


@user.route("/logout", methods=["GET"])
def logout():
    if current_user.is_authenticated:
        logout_user()
        return (
            jsonify(
                status_code=HTTPStatus.OK,
                message="You have sucessfully logged out",
            ),
            HTTPStatus.OK,
        )
    else:
        raise MethodNotAllowedError("You are not logged in.")


@user.route("/classifier", methods=["POST"])
def classify():
    if not current_user.is_authenticated:
        raise UnauthorizedError("You are not logged in.")
    req = request.json
    features, values = [], []
    for feature, value in req.items():
        features.append("log_" + feature)
        values.append(log1p(value))
    prediction = int(classifier.predict(DataFrame([values], columns=features)))
    return (
        jsonify(
            status_code=HTTPStatus.OK,
            message="Prediction successful",
            data={"prediction": prediction},
        ),
        HTTPStatus.OK,
    )
