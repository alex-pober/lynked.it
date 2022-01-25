from flask import Blueprint, jsonify, request
from app.models import db
from flask_login import login_required, current_user
from app.models import db, Menu, User
from app.forms import NewMenuForm

menu_routes = Blueprint('menus', __name__)

#GET /api/menu/:id
@menu_routes.route('/<id>')
def get_menu(id):
    menus = Menu.query.filter(Menu.user_id == id).all()
    return {'menus': [menu.to_dict() for menu in menus]}


#POST /api/menu
@menu_routes.route('/', methods=["POST"])
@login_required
def new_menu():
    data = request.json
    form = NewMenuForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        menu = Menu(
            user_id=data['user_id'],
            link=form.data['link'],
            title=form.data['title']
        )
        db.session.add(menu)
        db.session.commit()
        return menu.to_dict()
    return (form.errors)

#PUT /api/menu/:id
@menu_routes.route('/<id>', methods=["PUT"])
@login_required
def update_menu(id):
    form = NewMenuForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        menu = Menu.query.get(id)
        menu.title = form.data['title']
        menu.link = form.data['link']
        db.session.commit()
        return {'menu': menu.to_dict()}
    return (form.errors)

#DELETE /api/menu/:id
@menu_routes.route('/<id>', methods=["DELETE"])
@login_required
def delete_menu(id):
    menu = Menu.query.get(id)
    db.session.delete(menu)
    db.session.commit()
    return "Menu deleted"
