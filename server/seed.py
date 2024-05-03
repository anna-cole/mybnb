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
            "https://i.pinimg.com/564x/35/fc/55/35fc5508a93fea6884bf72fdf288a477.jpg", 
            "https://i.pinimg.com/564x/f6/93/4a/f6934af159b4abee6c81d4369ebcdc74.jpg", 
            "https://i.pinimg.com/564x/2c/5a/0e/2c5a0eab64ce68666597b1e9cd9addd4.jpg", 
            "https://upload.wikimedia.org/wikipedia/en/a/a6/Pok%C3%A9mon_Pikachu_art.png", 
            "https://lumiere-a.akamaihd.net/v1/images/ct_mickeymouseandfriends_goofy_ddt-16970_5d1d64dc.jpeg", 
            "https://i.pinimg.com/236x/33/5b/42/335b42b0bf7b53dbe9e275c0cd353dd1.jpg",
            "https://i.pinimg.com/564x/ef/7e/18/ef7e1847dc8e37a5b8e318d46e46b44c.jpg", 
            "https://i.pinimg.com/564x/fc/87/3f/fc873f679490aa44cc4c3db63d002894.jpg", 
            "https://i.pinimg.com/564x/67/a7/56/67a75659b20247d04970867b9b6b7370.jpg" 
        ]
        properties = []

        for i in range(10):

            property = Property(
                title=fake.paragraph(nb_sentences=1),
                location=fake['en-US'].city(),
                price=fake.pydecimal(left_digits=2, right_digits=2, positive=True),
                # image_url=rc(images),
                image_url=fake.image_url(width=50, height=50),
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





    
