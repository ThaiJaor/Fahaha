from surprise import Dataset, Reader
from surprise import SVD
from ratings.models import Rating
from books.models import Book
import pandas as pd
import numpy as np

class Recommendation:
    def __init__(self):
        self.model = None
        self.data = None

    def load_data(self):
        ratings = Rating.objects.all().values('user_id', 'book_id', 'rating')
        ratings_df = pd.DataFrame(ratings)
        # print(ratings_df)

        # add pre-defined ratings to ratings_df
        books = Book.objects.all().values('id', 'rating')
        books_df = pd.DataFrame(books)
        books_df.rename(columns={'id': 'book_id'}, inplace=True)

        # add dumped user_id to books_df
        books_df['user_id'] = 0
        ratings_df = pd.concat([ratings_df, books_df])
        # print(ratings_df)

        reader = Reader(rating_scale=(1, 5))
        self.data = Dataset.load_from_df(ratings_df, reader)