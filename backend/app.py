from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from marshmallow import Schema, fields

# from sqlalchemy import Column
# from geoalchemy2 import Geometry

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# app.config.from_object("config.Config")
app.config["CORS_HEADERS"] = "Content-Type"
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://postgres:8YY7mwmU905NAJ8oGHJK@database-1.cznvnak7l6zj.us-west-2.rds.amazonaws.com:5432/stations"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Station(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # geometry = Column(Geometry(geometry_type='POINT'), nullable = False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    address = db.Column(db.String(600), nullable=False)
    provider = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    availability = db.Column(db.Boolean, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return self.name

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class StationSchema(Schema):
    id = fields.Integer()
    # geometry = fields.String()
    latitude = fields.Float()
    longitude = fields.Float()
    address = fields.String()
    provider = fields.String()
    quantity = fields.Integer()
    availability = fields.Boolean()
    createdAt = fields.DateTime()


@app.route("/")
def hello_world():
    return "Hello Earth!"


@app.route("/station", methods=["GET"])
def get_single_station_or_all_stations():
    id = request.args.get("id")
    if id is not None:
        station = Station.get_by_id(id)
        serializer = StationSchema()
        data = serializer.dump(station)
        return jsonify(data), 200
    else:
        stations = Station.get_all()
        serializer = StationSchema(many=True)
        data = serializer.dump(stations)
        return jsonify(data), 200


@app.route("/station", methods=["POST"])
def create_a_station():
    data = request.get_json()
    new_station = Station(
        latitude=data.get("latitude"),
        longitude=data.get("longitude"),
        address=data.get("address"),
        provider=data.get("provider"),
        quantity=data.get("quantity"),
        availability=data.get("availability"),
    )
    new_station.save()
    serializer = StationSchema()
    data = serializer.dump(new_station)
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/station", methods=["PUT"])
def update_station():
    id = request.args.get("id")
    updating_station = Station.get_by_id(id)
    data = request.get_json()
    updating_station.latitude = (data.get("latitude"),)
    updating_station.longitude = (data.get("longitude"),)
    updating_station.address = (data.get("address"),)
    updating_station.provider = (data.get("provider"),)
    updating_station.quantity = (data.get("quantity"),)
    updating_station.availability = data.get("availability")
    db.session.commit()
    serializer = StationSchema()
    data = serializer.dump(updating_station)
    return jsonify(data), 200


@app.route("/station", methods=["DELETE"])
def delete_station():
    id = request.args.get("id")
    deleting_station = Station.get_by_id(id)
    deleting_station.delete()
    return jsonify({"message": "Deleted"}), 204


@app.errorhandler(404)
def not_found(error):
    return jsonify({"message": "404: Resource not found."}), 404


@app.errorhandler(405)
def internal_server(error):
    return (
        jsonify({"message": "405: The method is not allowed for the requested URL."}),
        405,
    )


@app.errorhandler(500)
def internal_server(error):
    return jsonify({"message": "500: There is internal server issue."}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
