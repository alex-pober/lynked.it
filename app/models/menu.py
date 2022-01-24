from .db import db

class Menu(db.Model):
    __tablename__ = 'menus'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(1000), nullable=False)
    link = db.Column(db.String(3000), nullable=False)

    users = db.relationship("User", back_populates="menus")
    categories = db.relationship("Category", back_populates="menus")

    def to_dict(self):

        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'link': self.link
        }
