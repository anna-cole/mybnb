from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class Guest(db.Model, SerializerMixin):
    __tablename__ = 'guests'
    serialize_rules = ('-properties.guests', '-bookings.guest', '-reviews.guest', '-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    # Relationship mapping the guest to related bookings.
    bookings = db.relationship('Booking', back_populates='guest', cascade='all, delete-orphan')

    # Relationship mapping the guest to related reviews.
    reviews = db.relationship('Review', back_populates='guest', cascade='all, delete-orphan')

    # Association proxy to get properties for this guest through bookings. Establishes the many-to-many relationship between guests and properties.
    properties = association_proxy('bookings', 'property', creator=lambda property_obj: Booking(property=property_obj))

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<Guest ID: {self.id}, name: {self.name}>'


class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'
    serialize_rules = ('-guest.bookings', '-property.bookings',)
    
    id = db.Column(db.Integer, primary_key=True)
    check_in = db.Column(db.Date, nullable=False)
    check_out = db.Column(db.Date, nullable=False)
    guest_id = db.Column(db.Integer, db.ForeignKey('guests.id'))
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'))

    guest = db.relationship('Guest', back_populates="bookings")
    property = db.relationship('Property', back_populates="bookings")

    def __repr__(self):
        return f'<Booking {self.id}: guest {self.guest_id}, property {self.property_id}>'
    

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    __table_args__ = (db.CheckConstraint('LENGTH(content) >= 5'),)
    serialize_rules = ('-guest.reviews', '-property.reviews',)
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    content = db.Column(db.String, nullable=False)
    guest_id = db.Column(db.Integer, db.ForeignKey('guests.id'))
    property_id = db.Column(db.Integer, db.ForeignKey('properties.id'))

    guest = db.relationship('Guest', back_populates="reviews")
    property = db.relationship('Property', back_populates="reviews")

    def __repr__(self):
        return f'<Review {self.id}: {self.content}>'


class Property(db.Model, SerializerMixin):
    __tablename__ = 'properties'
    serialize_rules = ('-guests.properties', '-bookings.property', '-reviews.property',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String)

    # Relationship mapping the property to related bookings.
    bookings = db.relationship('Booking', back_populates='property', cascade='all, delete-orphan')

    # Relationship mapping the property to related reviews.
    reviews = db.relationship('Review', back_populates='property', cascade='all, delete-orphan')

    # Association proxy to get guests for this property through bookings. Establishes the many-to-many relationship between guests and properties.
    guests = association_proxy('bookings', 'guest', creator=lambda guest_obj: Booking(guest=guest_obj))

    def __repr__(self):
        return f'<Property ID: {self.id}, title: {self.title}>'
    




               

