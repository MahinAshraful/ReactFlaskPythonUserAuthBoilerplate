# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)
from datetime import timedelta
from models import db, User
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()


def create_app():
    app = Flask(__name__)

    # Ensure instance folder exists
    try:
        os.makedirs(app.instance_path, exist_ok=True)
    except OSError:
        pass

    # Remove this line since we don't need the sentence directory
    # os.makedirs("sentence", exist_ok=True)

    # Configure CORS
    CORS(app)

    # Database Configuration
    # Use absolute path for SQLite database
    db_path = os.path.join(app.instance_path, "database.db")
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # JWT Configuration
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "default-secret-key")
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

    # Initialize extensions
    jwt = JWTManager(app)
    db.init_app(app)

    # Create tables
    with app.app_context():
        db.create_all()

    return app


app = create_app()


@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    try:
        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({"access_token": access_token, "email": email})


@app.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(
        {
            "message": f"Hello {user.email}! This is a protected route.",
            "user_since": user.created_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
    )


@app.route("/api/users", methods=["GET"])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify({"users": [user.to_dict() for user in users]})


if __name__ == "__main__":
    app.run(debug=True)
