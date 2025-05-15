from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from random import randint, choice as rc
from faker import Faker
import os

# Initialize Flask app
app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "sqlite:///app.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Initialize extensions
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)
api = Api(app)

CORS(app, supports_credentials=True, origins=[
    'http://localhost:3000',
    'https://mybnb-frontend.onrender.com'
])

# # Import models (make sure this is after db setup)
# from models import Guest, Property, Booking, Review

# # Table creation and seeding on first request
# @app.before_first_request
# def create_tables_and_seed():
#     db.create_all()

#     # Check if already seeded
#     if Guest.query.first():
#         print("Data already seeded. Skipping.")
#         return

#     print("Seeding database...")
#     fake = Faker()

#     # --- Seed Guests ---
#     guests = []
#     names = set()
#     for _ in range(5):
#         name = fake.unique.name()
#         guest = Guest(
#             name=name,
#             email=fake.email()
#         )
#         guest.password_hash = name + 'password'
#         guests.append(guest)
#     db.session.add_all(guests)
#     db.session.commit()

#     # --- Seed Properties ---
#     images = [
#         "./camboinhas.png", "./camboinhas2.png", "./itaqua.png",
#         "./camboinhas3.png", "./tree_house.png", "./icarai.png",
#         "./tree_house2.png", "./tree_house3.png", "./tree_house4.png", "./tree_house5.png"
#     ]
#     titles = [
#         "Beautiful Beach House", "Cozy Cabin in the Woods", "Modern Apartment in the City",
#         "Charming Cottage by the Lake", "Luxurious Villa with Pool", "Stylish Loft with Rooftop Terrace",
#         "Spacious Family Home", "Rustic Farmhouse Retreat", "Trendy Studio in Downtown", "Elegant Mansion with Ocean View"
#     ]
#     locations = [
#         "Los Angeles", "Rio de Janeiro", "Houston", "Honolulu", "San Francisco",
#         "Camboinhas", "Orlando", "Miami", "Salvador", "Seattle"
#     ]

#     properties = []
#     for _ in range(10):
#         prop = Property(
#             title=rc(titles),
#             location=rc(locations),
#             price=fake.pydecimal(left_digits=2, right_digits=2, positive=True),
#             image_url=rc(images)
#         )
#         properties.append(prop)
#     db.session.add_all(properties)
#     db.session.commit()

#     # --- Seed Reviews ---
#     reviews = []
#     for _ in range(20):
#         review = Review(
#             rating=randint(1, 10),
#             content=fake.paragraph(nb_sentences=2),
#             guest=rc(guests),
#             property=rc(properties)
#         )
#         reviews.append(review)
#     db.session.add_all(reviews)
#     db.session.commit()

#     # --- Seed Bookings ---
#     bookings = []
#     for _ in range(10):
#         booking = Booking(
#             check_in=fake.date_object(),
#             check_out=fake.date_object(),
#             guest=rc(guests),
#             property=rc(properties)
#         )
#         bookings.append(booking)
#     db.session.add_all(bookings)
#     db.session.commit()

#     print("Database seeded successfully.")

# # Entry point
# if __name__ == "__main__":
#     app.run(port=5555, debug=True)
