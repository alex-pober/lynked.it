from .db import db

class Item(db.Model):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    categories_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)
    title = db.Column(db.String(1000), nullable=False)
    description = db.Column(db.String(2200))
    price = db.Column(db.String(50))
    item_img = db.Column(db.String(3000))

    categories = db.relationship("Category", back_populates="items")

    def to_dict(self):

        return {
            'id': self.id,
            'menu_id': self.menu_id,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'item_img': self.item_img
        }
