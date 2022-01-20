from .db import db

class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    menu_id = db.Column(db.Integer, db.ForeignKey("menus.id"), nullable=False)
    title = db.Column(db.String(1000), nullable=False)

    menus = db.relationship("Menu", back_populates="categories")
    items = db.relationship("Item", back_populates="categories")

    def to_dict(self):

        return {
            'id': self.id,
            'menu_id': self.menu_id,
            'title': self.title
        }
