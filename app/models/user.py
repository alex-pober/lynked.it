from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.String(2200))
    profilePicImg = db.Column(db.String(2000))
    bannerPicImg = db.Column(db.String(2000))
    phoneNumber = db.Column(db.BigInteger())
    menu = db.Column(db.Boolean, default=False)

    links = db.relationship('Link', back_populates='users', cascade="all,delete")
    menus = db.relationship('Menu', back_populates='users', cascade="all,delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'name': self.name,
            'bio': self.bio,
            'profilePicImg': self.profilePicImg,
            'bannerPicImg': self.bannerPicImg,
            'phoneNumber': self.phoneNumber,
            'menu': self.menu
        }
