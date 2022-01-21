from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, URL, ValidationError
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class EditProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email')
    password = StringField('password')
    name = StringField('name')
    bio = StringField('bio')
    profilePicImg = StringField('profilePicImg')
    bannerPicImg = StringField('bannerPicImg')
    phoneNumber = IntegerField('phoneNumber')
    menu = BooleanField('menu')