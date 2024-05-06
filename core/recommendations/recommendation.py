# from surprise import Dataset, Reader
# from surprise import SVD
# from ratings.models import Rating
# from books.models import Book
# import pandas as pd
# import numpy as np

# class Recommendation:
#     def __init__(self):
#         self.model = None
#         self.data = None

#     def load_data(self):
#         ratings = Rating.objects.all().values('user_id', 'book_id', 'rating')
#         ratings_df = pd.DataFrame(ratings)

#         # add pre-defined ratings to ratings_df
#         books = Book.objects.all().values('id', 'rating')
#         books_df = pd.DataFrame(books)
#         books_df.rename(columns={'id': 'book_id'}, inplace=True)

#         # add dumped user_id to books_df
#         books_df['user_id'] = 0
#         ratings_df = pd.concat([ratings_df, books_df])

#         reader = Reader(rating_scale=(1, 5))
#         self.data = Dataset.load_from_df(ratings_df, reader)
        
#     def train(self):
#         trainset = self.data.build_full_trainset()
#         self.model = SVD()
#         self.model.fit(trainset)

#     def predict(self, user_id, book_id):
#         return self.model.predict(user_id, book_id).est

#     def get_top_n(self, user_id, n=10):
#         testset = self.data.build_full_trainset().build_anti_testset()
#         testset = filter(lambda x: x[0] == user_id, testset)
#         predictions = self.model.test(testset)
#         predictions = sorted(predictions, key=lambda x: x.est, reverse=True)
#         return predictions[:n] 