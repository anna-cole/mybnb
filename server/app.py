#!/usr/bin/env python3

from flask import jsonify, request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from sqlalchemy import desc
from config import app, db, api
from models import Guest, Booking, Property, Review
from datetime import datetime

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):
    def post(self):
        name = request.get_json().get('name')
        email = request.get_json().get('email') 
        password = request.get_json().get('password')
        try:
            guest = Guest(name=name, email=email)
            guest.password_hash = password
            db.session.add(guest)
            db.session.commit()
            session['guest_id'] = guest.id
            return guest.to_dict(), 201 
        except IntegrityError:   
            return {'error': 'Error 422: Unprocessable Entity (name already exists)'}, 422

class CheckSession(Resource):
    def get(self):
        guest_id = session.get('guest_id')
        if not guest_id:
            return {'error': 'Unauthorized'}, 401

        guest = Guest.query.filter_by(id=guest_id).first()
        if not guest:
            return {'error': 'Guest not found'}, 404

        return guest.to_dict(), 200
 
class Login(Resource):
    def post(self):
        email = request.get_json()['email']
        password = request.get_json()['password']
        guest = Guest.query.filter(Guest.email == email).first()
        if guest:
            if guest.authenticate(password):       
                session['guest_id'] = guest.id
                return guest.to_dict(), 200   
            return {'error': 'Error 401: Unauthorized (invalid password)'}, 401    
        return {'error': 'Error 401: Unauthorized (Please sign up)'}, 401
    
class Logout(Resource):
    def delete(self):
        if session['guest_id']:
            del session['guest_id']
            return {'message': 'You are not logged in.'}, 200
        return {'error': '401 Unauthorized'}, 401
       
class Properties(Resource):

    def get(self):        
        properties = Property.query.all()
        resp = [property.to_dict() for property in properties]
        return make_response(resp, 200)
    
    def post(self):
        title = request.get_json().get('title')
        location = request.get_json().get('location')
        price = request.get_json().get('price')
        image_url = request.get_json().get('image_url')
        try:
            property = Property(title=title, location=location, price=price, image_url=image_url)
            db.session.add(property)
            db.session.commit()
            return property.to_dict(), 201 
        except IntegrityError:   
            return {'error': '422 Unprocessable Entity'}, 422
    
class PropertyById(Resource):

    def get(self, id):
        property = Property.query.filter_by(id=id).first()
        if property:
            return make_response(property.to_dict(), 200)
        return {'error': '422 Unprocessable Entity'}, 422
    
    def patch(self, id):
        property = Property.query.filter_by(id=id).first()
        for attr in request.get_json():
            setattr(property, attr, request.get_json()[attr])
        db.session.add(property) 
        db.session.commit()
        return make_response(property.to_dict(), 200)
    
    def delete(self, id):
        property = Property.query.filter_by(id=id).first()
        db.session.delete(property)
        db.session.commit()
        response_body = {"message": ''}
        return make_response(response_body, 204)
    
class PropertyByTitle(Resource):
    def get(self, title):
        properties = Property.query.all()
        return [property.to_dict() for property in properties if property.title.lower() == title.lower()], 200
    
class PropertiesByLocation(Resource):
    def get(self, location):
        properties = Property.query.filter(Property.location==location).all()
        return [property.to_dict() for property in properties], 200
    
class SortPropertiesByPrice(Resource):
    def get(self):
        # properties = Property.query.order_by(desc('price')).all() # need to import desc
        # return [property.to_dict() for property in properties], 200
        properties = Property.query.order_by(Property.price.asc()).all() # you can use desc for descending
        return [property.to_dict() for property in properties], 200
    
class MostExpensiveProperty(Resource):
    def get(self):
        property = Property.query.order_by(desc('price')).first() 
        return property.to_dict(), 200

class SortPropertiesByNumberOfReviews(Resource):
    def get(self):
        properties = Property.query.all()
        properties.sort(reverse=True, key=lambda property: len(property.reviews)) # Python sort() method, it doesn't return anything, it only sorts the original list, so don't save it in a variable.
        return [property.to_dict() for property in properties], 200
    
class FilterPropertiesByNumberOfReviews(Resource):
    def get(self, n):
        properties = Property.query.all()
        filtered_list = filter(lambda property: len(property.reviews) >= n, properties)  # to filter the properties whose reviews are equal or greater than n, use the Python filter function. It returns a new list, so to work you need to save it in a variable, otherwise it will return the original list. filtered_list = filter(function, list)
        return [property.to_dict(only=('title', 'reviews.content', 'reviews.rating')) for property in filtered_list], 200
        
class Reviews(Resource):
    def get(self):       
        reviews = Review.query.all()
        return [review.to_dict() for review in reviews], 200
    
    def post(self):
        rating = request.get_json().get('rating')
        content = request.get_json().get('content')
        property_id = request.get_json().get('property_id') 
        guest_id = session.get('guest_id')
        try:
            review = Review(rating=rating, content=content, property_id=property_id, guest_id=guest_id)
            db.session.add(review)
            db.session.commit()
            return review.to_dict(), 201 
        except IntegrityError:   
            return {'error': '422 Unprocessable Entity'}, 422
        
class ReviewById(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            return make_response(review.to_dict(), 200)
        return {'error': '422 Unprocessable Entity'}, 422
    
class SortReviewsByRating(Resource):
    def get(self):
        reviews = Review.query.order_by(Review.rating.desc()).all() # no need to import desc
        return [review.to_dict(only=('id', 'content', 'rating', 'property.title', 'property.id', 'guest.name',)) for review in reviews], 200
    
class ReviewsByPropertyId(Resource):
    def get(self, property_id):
        property = Property.query.filter_by(id=property_id).first()
        return [review.to_dict(only=('id', 'content', 'rating', 'property.title', 'property.id', 'guest.name',)) for review in property.reviews], 200
    
class ReviewsByGuest(Resource):
    def get(self, name):
        guest = Guest.query.filter_by(name=name).first()
        return [review.to_dict() for review in guest.reviews]
    
class ReviewsByContent(Resource):
    def get(self, content):
        # all_reviews = Review.query.all()
        # matching_reviews = [review.to_dict() for review in all_reviews if any(word in review.content.lower() for word in content.lower().split())]
        # return matching_reviews, 200
        reviews = Review.query.all()
        return [review.to_dict() for review in reviews if content.lower() in review.content.lower()], 200

class Bookings(Resource):
    def get(self):       
        bookings = Booking.query.all()
        return [booking.to_dict() for booking in bookings], 200
    
    def post(self):
        # Convert the date strings to Python date objects (request.get_json() pulls data in strings)
        check_in = datetime.strptime(request.get_json()["check_in"], "%Y-%m-%d").date()
        check_out = datetime.strptime(request.get_json()["check_out"], "%Y-%m-%d").date()
        property_id = request.get_json().get('property_id') 
        guest_id = session.get('guest_id')
        try:
            booking = Booking(check_in=check_in, check_out=check_out, property_id=property_id, guest_id=guest_id)
            db.session.add(booking)
            db.session.commit()
            return booking.to_dict(), 201 
        except IntegrityError:   
            return {'error': '422 Unprocessable Entity'}, 422

class BookingById(Resource):

    def get(self, id):
        booking = Booking.query.filter_by(id=id).first()
        if booking:
            return make_response(booking.to_dict(), 200)
        return {'error': '422 Unprocessable Entity'}, 422
       
    def patch(self, id):
        booking = Booking.query.filter_by(id=id).first()
        # request.get_json() pulls the data in strings
        for attr in request.get_json(): 
            setattr(booking, attr, request.get_json()[attr])
        # Convert the date strings to Python date objects to be accepted by the db
        check_in = datetime.strptime(request.get_json()["check_in"], "%Y-%m-%d").date()
        check_out = datetime.strptime(request.get_json()["check_out"], "%Y-%m-%d").date()
        # Update the booking object attributes with the converted date objects
        booking.check_in = check_in
        booking.check_out = check_out
        db.session.add(booking) 
        db.session.commit()
        return make_response(booking.to_dict(), 200)
    
    def delete(self, id):
        booking = Booking.query.filter_by(id=id).first()
        db.session.delete(booking)
        db.session.commit()
        response_body = {"message": ''}
        return make_response(response_body, 204)

class Guests(Resource):
    def get(self):        
        guests = Guest.query.all()
        return [guest.to_dict() for guest in guests], 200
    
class GuestById(Resource):
    def get(self, id):
        guest = Guest.query.filter_by(id=id).first()
        if guest:
            return make_response(guest.to_dict(), 200)
        return {'error': '422 Unprocessable Entity'}, 422
    
class GuestsByReviewRating(Resource):
    def get(self, rating):
        reviews = Review.query.filter(Review.rating==rating).all()
        return [review.guest.to_dict() for review in reviews], 200
    
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Properties, '/properties', endpoint='properties')
api.add_resource(PropertyById, '/properties/<int:id>', endpoint='properties/id')
api.add_resource(PropertyByTitle, '/properties/<string:title>', endpoint='properties/title')
api.add_resource(PropertiesByLocation, '/properties/<string:location>', endpoint='properties/location')
api.add_resource(SortPropertiesByPrice, '/properties/by_price', endpoint='properties/by_price')
api.add_resource(MostExpensiveProperty, '/properties/most_expensive', endpoint='properties/most_expensive')
api.add_resource(SortPropertiesByNumberOfReviews, '/properties/properties_by_number_of_reviews', endpoint='properties/properties_by_number_of_reviews')
api.add_resource(FilterPropertiesByNumberOfReviews, '/property_reviews/<int:n>', endpoint='property_reviews/n')
api.add_resource(Reviews, '/reviews', endpoint='reviews')
api.add_resource(ReviewById, '/reviews/<int:id>', endpoint='reviews/id')
api.add_resource(SortReviewsByRating, '/reviews/by_rating', endpoint='reviews/by_rating')
api.add_resource(ReviewsByPropertyId, '/reviews/reviews_by_property/<int:property_id>', endpoint='reviews/reviews_by_property/property_id')
api.add_resource(ReviewsByGuest, '/reviews/reviews_by_guest/<string:name>', endpoint='reviews/reviews_by_guest/name')
api.add_resource(ReviewsByContent, '/reviews/search_by_content/<string:content>', endpoint='reviews/search_by_content/content')
api.add_resource(Bookings, '/bookings', endpoint='bookings')
api.add_resource(BookingById, '/bookings/<int:id>', endpoint='bookings/id')
api.add_resource(Guests, '/guests', endpoint='guests') 
api.add_resource(GuestById, '/guests/<int:id>', endpoint='guests/id')
api.add_resource(GuestsByReviewRating, '/guests/guests_by_review_rating/<int:rating>', endpoint='guests/guests_by_review_rating/rating') 

if __name__ == '__main__':
    app.run(port=5555, debug=True)

