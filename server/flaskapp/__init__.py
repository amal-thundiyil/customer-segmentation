import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flaskapp.config import Config
from flask_cors import CORS
from flask_migrate import Migrate, stamp, migrate, upgrade
import pickle

db = SQLAlchemy()
bcrypt = Bcrypt()
cors = CORS()
mgr = Migrate()
with open("./flaskapp/classifier", "rb") as f:
    classifier = pickle.load(f)


def create_app(config_class=Config):
    app = Flask(__name__, static_folder="/static")
    app.config.from_object(config_class)
    db.init_app(app)
    bcrypt.init_app(app)
    mgr.init_app(app, db)
    if os.environ.get("FLASK_ENV") == "development":
        cors.init_app(app, resources=r"/*", origins="*", supports_credentials=True)

    from flaskapp.auth.routes import auth
    from flaskapp.users.routes import user
    from flaskapp.main.routes import main
    from flaskapp.errors import errors

    app.register_blueprint(auth)
    app.register_blueprint(user)
    app.register_blueprint(main)
    app.register_blueprint(errors)

    @app.before_first_request
    def deploy():
        # create databse and tables
        db.create_all()
        # migrate databsae to latest revision
        stamp()
        migrate()
        upgrade()

    return app
