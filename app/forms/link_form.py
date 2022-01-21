from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Link

class NewLinkForm(FlaskForm):
    link = StringField('Link URL', validators=[DataRequired()])
    title = StringField('Link Title', validators=[DataRequired()])
