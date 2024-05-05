from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .recommendation import Recommendation
from books.models import Book
from ratings.models import Rating
from books.serializers import BookSerializer

class RecommendationForUserView(generics.GenericAPIView):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    queryset = Book.objects.all()

    def get(self, request):
        user_id = request.user.id
        # check if there are any ratings
        if not Rating.objects.filter(user_id=user_id).exists():
            top_books = Book.objects.all().order_by('-rating')[:10]
            serializer = self.serializer_class(
                top_books, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        recommendation = Recommendation()
        recommendation.load_data()
        recommendation.train()
        top_books = recommendation.get_top_n(user_id)
        top_books = [Book.objects.get(id=book[1]) for book in top_books]
        serializer = self.serializer_class(
            top_books, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class RecommendationForBookView(generics.GenericAPIView):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'
    queryset = Book.objects.all()

    def get(self, request, pk):
        book = Book.objects.get(id=pk)
        related_books = Book.objects.filter(
            categories__in=book.categories.all()).exclude(id=pk)[:10]
        serializer = self.serializer_class(
            related_books, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)