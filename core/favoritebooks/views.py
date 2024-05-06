from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import FavoriteBookSerializer

# Create your views here.
class FavoriteBookListCreateView(generics.ListCreateAPIView):
    serializer_class = FavoriteBookSerializer
    Permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.favorite_books.all()
    
class FavoriteBookDetailDestroyView(generics.DestroyAPIView):
    serializer_class = FavoriteBookSerializer
    Permission_classes = [IsAuthenticated]
    lookup_field = 'pk'
    
    def get_queryset(self):
        return self.request.user.favorite_books.all()