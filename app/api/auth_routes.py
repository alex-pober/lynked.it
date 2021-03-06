from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import EditProfileForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            name=form.data['name'],
            bio=form.data['bio'],
            profilePicImg=form.data['profilePicImg'],
            bannerPicImg=form.data['bannerPicImg'],
            phoneNumber=form.data['phoneNumber'],
            menu=form.data['menu']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/edit-profile', methods=['PUT'])
@login_required
def edit_profile():
    # print("HEELLLLOOOOOOO")
    # print(current_user.username)
    form = EditProfileForm()
    user_id = request.json['id']
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(form.validate_on_submit())
    if form.validate_on_submit():
        user = User.query.get(user_id)
        if form.data['username'] != user.username:
            user.username = form.data['username']
        user.name = form.data['name']
        user.bio = form.data['bio']
        user.email = form.data['email']
        user.profilePicImg = form.data['profilePicImg']
        user.bannerPicImg = form.data['bannerPicImg']
        user.phoneNumber = form.data['phoneNumber']
        user.menu = form.data['menu']
        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/<id>', methods=["DELETE"])
@login_required
def delete_profile(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return "Post deleted"

@auth_routes.route('/<id>', methods=['GET'])
def get_user_id(id):
    userId = User.query.filter(User.username == id).all()
    return {'user': [user.to_dict() for user in userId]}



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
