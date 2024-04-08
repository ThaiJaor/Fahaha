from .models import Book, Category, Publisher
from .serializers import BookSerializer, CategorySerializer, PublisherSerializer
from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticatedOrReadOnly]


class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticatedOrReadOnly]
