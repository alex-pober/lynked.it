from flask import Blueprint, jsonify, request
from app.models import db
from flask_login import login_required, current_user
from app.models import db, Link
from app.forms import NewLinkForm


link_routes = Blueprint('links', __name__)

#GET /api/links/:userId
@link_routes.route('/<id>')
def get_link(id):
    links = Link.query.filter(Link.user_id == id).all()
    allLinks = [link.to_dict() for link in links]
    return {'links': allLinks}


#GET /api/links/:userId/edit
@link_routes.route('/<id>/edit')
def get_one_link(id):
    links = Link.query.get(id)
    return links.to_dict()

#POST /api/links
@link_routes.route('/', methods=["POST"])
@login_required
def new_post():
    data = request.json
    form = NewLinkForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        link = Link(
            user_id=data['user_id'],
            link=form.data['link'],
            title=form.data['title']
        )
        db.session.add(link)
        db.session.commit()
        return link.to_dict()
    return (form.errors)

#PUT /api/links/:id
@link_routes.route('/', methods=["PUT"])
@login_required
def update_link(id):
    form = NewLinkForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        link = Link.query.get(id)
        link.title = form.data['link']
        link.link = form.data['title']
        db.session.commit()
        return {'link': link.to_dict()}
    return (form.errors)

#DELETE /api/links/:id
@link_routes.route('/<id>', methods=["DELETE"])
@login_required
def delete_link(id):
    link = Link.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return "Post deleted"
