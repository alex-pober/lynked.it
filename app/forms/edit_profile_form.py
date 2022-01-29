
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, URL, ValidationError
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    username = field.data
    user = User.query.filter(User.email == email).first()
    print("HELLLLLLLLLO", current_user.username)
    if current_user.email == email:
        return
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if current_user.username == username:
        return
    if user:
        raise ValidationError('Username is already in use.')


class EditProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password')
    name = StringField('name')
    bio = StringField('bio')
    profilePicImg = StringField('profilePicImg')
    bannerPicImg = StringField('bannerPicImg')
    phoneNumber = IntegerField('phoneNumber')
    menu = BooleanField('menu')
