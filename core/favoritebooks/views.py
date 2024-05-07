from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import FavoriteBookSerializer, FavoriteBookCreateSerializer

# Create your views here.


class FavoriteBookListCreateView(generics.ListCreateAPIView):
    serializer_class = FavoriteBookSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return FavoriteBookCreateSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return super().perform_create(serializer)

    def get_queryset(self):
        return self.request.user.favorite_books.all()


class FavoriteBookDetailDestroyView(generics.DestroyAPIView):
    serializer_class = FavoriteBookSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        return self.request.user.favorite_books.all()
