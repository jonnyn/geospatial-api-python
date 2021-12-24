import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = "Content-Type"


class ProductionConfig(Config):
    ENV = "production"
    DEVELOPMENT = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    ENV = "development"
    DEVELOPMENT = True
    DEBUG = True
    TESTING = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True
