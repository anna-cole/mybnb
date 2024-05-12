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
        guest_id = session['guest_id']
        if guest_id:
            guest = Guest.query.filter(Guest.id == guest_id).first()
            return guest.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401 
    
class Login(Resource):
    def post(self):
        name = request.get_json()['name']
        password = request.get_json()['password']
        guest = Guest.query.filter(Guest.name == name).first()
        if guest.authenticate(password):           
            session['guest_id'] = guest.id
            return guest.to_dict(), 200       
        return {'error': 'Error 401: Unauthorized (invalid password)'}, 401
    
class Logout(Resource):
    def delete(self):
        if session['guest_id']:
            session['guest_id'] = None
            return {}, 204
        return {'error': '401 Unauthorized'}, 401
       
class Properties(Resource):
    def get(self):        
        properties = Property.query.all()
        resp = [property.to_dict() for property in properties]
        return make_response(resp, 200)

class PropertyById(Resource):
    def get(self, id):
        property = Property.query.filter_by(id=id).first()
        if property:
            return make_response(property.to_dict(), 200)
        return {'error': '422 Unprocessable Entity'}, 422
    
# class ProByName(Resource):
#     def get(self, name):
#         pros = Pro.query.all()
#         return [pro.to_dict() for pro in pros if pro.name.lower() == name.lower()], 200
    
# class ProsByService(Resource):
#     def get(self, service):
#         pros = Pro.query.filter(Pro.service==service).all()
#         return [pro.to_dict() for pro in pros], 200
    
# class ProsByAverageRating(Resource):
#     def get(self, average_rating):
#         pros = Pro.query.filter_by(average_rating=average_rating).all()
#         return [pro.to_dict() for pro in pros], 200
    
# class SortProsByAverageRating(Resource):
#     def get(self):
#         # pros = Pro.query.order_by(desc('average_rating')).all() # need to import desc
#         # return [pro.to_dict() for pro in pros], 200
#         pros = Pro.query.order_by(Pro.average_rating.desc()).all() # you can use asc for ascending
#         return [pro.to_dict() for pro in pros], 200
    
# class BestPro(Resource):
#     def get(self):
#         pro = Pro.query.order_by(desc('average_rating')).first() 
#         return pro.to_dict(), 200
    
# class ProsByReviewRating(Resource):
#     def get(self, rating):
#         reviews = Review.query.filter_by(rating=rating).all()
#         return [review.pro.to_dict(only=('id', 'name', 'service', 'reviews.rating',)) for review in reviews], 200
#     # def get(self):
#     # reviews = Review.query.all()
#     # return [review.pro.to_dict(only=('id', 'name')) for review in reviews if review.rating == 10], 200 

# class SortProsByNumberOfReviews(Resource):
#     def get(self):
#         pros = Pro.query.all()
#         pros.sort(reverse=True, key=lambda pro: len(pro.reviews)) # Python sort() method, it doesn't return anything, it only sorts the original list, so don't save it in a variable.
#         return [pro.to_dict() for pro in pros], 200
    
# class FilterProsByNumberOfReviews(Resource):
#     def get(self, n):
#         pros = Pro.query.all()
#         filtered_list = filter(lambda pro: len(pro.reviews) >= n, pros)  # to filter the pros whose reviews are equal or greater than n, use the Python filter function. It returns a new list, so to work you need to save it in a variable, otherwise you will get the original list. filtered_list = filter(function, list)
#         return [pro.to_dict(only=('name', 'reviews.content', 'reviews.rating')) for pro in filtered_list], 200
    
# class ProsReviewedByUser(Resource):
#     def get(self, username):
#         user = User.query.filter_by(username=username).first()
#         return [pro.to_dict(only=('id', 'name', 'reviews.content', 'reviews.user.username', 'reviews.rating',)) for pro in user.pros], 200
        
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
        
# class ReviewById(Resource):
#     def get(self, id):
#         review = Review.query.filter_by(id=id).first()
#         if review:
#             return make_response(jsonify(review.to_dict()), 200)
#         return {'error': '422 Unprocessable Entity'}, 422
    
# class SortReviewsByRating(Resource):
#     def get(self):
#         reviews = Review.query.order_by(Review.rating.desc()).all() # no need to import desc
#         return [review.to_dict(only=('id', 'content', 'rating', 'pro.name', 'pro.id', 'user.username',)) for review in reviews], 200
    
# class ReviewsByProId(Resource):
#     def get(self, pro_id):
#         pro = Pro.query.filter_by(id=pro_id).first()
#         return [review.to_dict(only=('id', 'content', 'rating', 'pro.name', 'pro.id', 'user.username',)) for review in pro.reviews], 200
    
# class ReviewsByUser(Resource):
#     def get(self, username):
#         user = User.query.filter_by(username=username).first()
#         return [review.to_dict() for review in user.reviews]
    
# class ReviewsByContent(Resource):
#     def get(self, content):
#         # all_reviews = Review.query.all()
#         # matching_reviews = [review.to_dict() for review in all_reviews if any(word in review.content.lower() for word in content.lower().split())]
#         # return matching_reviews, 200
#         reviews = Review.query.all()
#         return [review.to_dict() for review in reviews if content.lower() in review.content.lower()], 200

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
# api.add_resource(ProByName, '/pros/<string:name>', endpoint='pros/name')
# api.add_resource(ProsByService, '/pros/<string:service>', endpoint='pros/service')
# api.add_resource(ProsByAverageRating, '/pros/average_rating/<int:average_rating>', endpoint='pros/average_rating/average_rating')
# api.add_resource(SortProsByAverageRating, '/pros/by_average_rating', endpoint='pros/by_average_rating')
# api.add_resource(BestPro, '/pros/best_pro', endpoint='pros/best_pro')
# api.add_resource(ProsByReviewRating, '/pros/pros_by_review_rating/<int:rating>', endpoint='pros/pros_by_review_rating/rating')
# api.add_resource(SortProsByNumberOfReviews, '/pros/pros_by_number_of_reviews', endpoint='pros/pros_by_number_of_reviews')
# api.add_resource(FilterProsByNumberOfReviews, '/pro_reviews/<int:n>', endpoint='pro_reviews/n')
# api.add_resource(ProsReviewedByUser, '/pros/pros_by_user/<string:username>', endpoint='pros/pros_by_user/username')
api.add_resource(Reviews, '/reviews', endpoint='reviews')
# api.add_resource(ReviewById, '/reviews/<int:id>', endpoint='reviews/id')
# api.add_resource(SortReviewsByRating, '/reviews/by_rating', endpoint='reviews/by_rating')
# api.add_resource(ReviewsByProId, '/reviews/reviews_by_pro/<int:pro_id>', endpoint='reviews/reviews_by_pro/pro_id')
# api.add_resource(ReviewsByUser, '/reviews/reviews_by_user/<string:username>', endpoint='reviews/reviews_by_user/username')
# api.add_resource(ReviewsByContent, '/reviews/search_by_content/<string:content>', endpoint='reviews/search_by_content/content')
api.add_resource(Bookings, '/bookings', endpoint='bookings')
api.add_resource(BookingById, '/bookings/<int:id>', endpoint='bookings/id')
api.add_resource(Guests, '/guests', endpoint='guests') 
api.add_resource(GuestById, '/guests/<int:id>', endpoint='guests/id')
api.add_resource(GuestsByReviewRating, '/guests/guests_by_review_rating/<int:rating>', endpoint='guests/guests_by_review_rating/rating') 

if __name__ == '__main__':
    app.run(port=5555, debug=True)

