#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, Guest, Booking, Property, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        print("Deleting all records...")

        Review.query.delete()
        Guest.query.delete()
        Property.query.delete()
        Booking.query.delete()

        fake = Faker()
        
        print("Creating guests...")

        guests = []
        names = []

        for i in range(5):

            name = fake.name()
            while name in names:
                name = fake.name()
            names.append(name)

            guest = Guest(
                name=name,
                email=fake.email(),
            )

            guest.password_hash = guest.name + 'password'

            guests.append(guest)

        db.session.add_all(guests)
        db.session.commit()

        print("Creating properties...")

        images = [
            "./camboinhas.png", 
            "./camboinhas2.png", 
            "./itaqua.png", 
            "./camboinhas3.png", 
            "./tree_house.png", 
            "./icarai.png", 
            "./tree_house2.png", 
            "./tree_house3.png", 
            "./tree_house4.png",
            "./tree_house5.png",
        ]
        titles = [
            "Beautiful Beach House",
            "Cozy Cabin in the Woods",
            "Modern Apartment in the City",
            "Charming Cottage by the Lake",
            "Luxurious Villa with Pool",
            "Stylish Loft with Rooftop Terrace",
            "Spacious Family Home",
            "Rustic Farmhouse Retreat",
            "Trendy Studio in Downtown",
            "Elegant Mansion with Ocean View"
        ]
        locations = [
            "Los Angeles", 
            "Rio de Janeiro", 
            "Houston", 
            "Honolulu", 
            "San Francisco", 
            "Camboinhas", 
            "Orlando", 
            "Miami", 
            "Salvador",
            "Seattle",
        ]
        properties = []

        for i in range(10):

            property = Property(
                title=rc(titles),
                # title=fake.paragraph(nb_sentences=1),
                location=rc(locations),
                # location=fake['en-US'].city(),
                price=fake.pydecimal(left_digits=2, right_digits=2, positive=True),
                image_url=rc(images),
                # image_url=fake.image_url(width=50, height=50),
            )

            properties.append(property)

        db.session.add_all(properties)
        db.session.commit()

        print("Creating reviews...")

        reviews = []

        for i in range(20):
        
            review = Review(
                rating=randint(1,10),
                content=fake.paragraph(nb_sentences=2),
            )

            review.guest = rc(guests)
            review.property = rc(properties)

            reviews.append(review)

        db.session.add_all(reviews)
        db.session.commit()

        print("Creating bookings...")

        bookings = []

        for i in range(10):
        
            booking = Booking(
                check_in=fake.date_object(),
                check_out=fake.date_object(),
            )

            booking.guest = rc(guests)
            booking.property = rc(properties)

            bookings.append(booking)

        db.session.add_all(bookings)
        db.session.commit()
        
        print("Complete.")





    
