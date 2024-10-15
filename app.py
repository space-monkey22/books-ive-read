
from flask import Flask, jsonify,request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
app= Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:///data.db'
db=SQLAlchemy(app)

class Books(db.Model):
   id= db.Column(db.Integer, primary_key=True)
   name= db.Column(db.String(80), unique=True , nullable=False)
   description = db.Column(db.String(120))

   def __repr__(self):
      return f" {self.name} - {self.description}"
@app.route('/')
def index():
   return "hello"

@app.route('/book')
def get_books():
   books= Books.query.all()

   output=[]
   for book in books:
      books_data={'name':book.name,'description':book.description}
      output.append(books_data)
      
   return {"books":output}

@app.route('/books/<id>')
def get_book(id):
   book=Books.query.get_or_404(id)
   return {"name": book.name, "description": book.description}
@app.route('/books', methods=['POST'])
def add_books():
   book=Books(name= request.json['name'],description=request.json['description'])
   db.session.add(book)
   db.session.commit()
   return jsonify({"message": "Book added!"}), 201
@app.route('/books/<id>',methods=['DELETE'])
def delete_book(id):
   book=Books.query.get(id)
   if book is None:
      return "error"
   db.session.delete(book)
   db.session.commit()
   return {"message":"yeettt"}

