from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from core.permissions import IsAdminUserOrReadOnly
from .serializers import RatingSerializer, RatingDetailSerializer
from .models import Rating
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class RatingListCreateView(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['user', 'book']
    ordering_fields = ['rating', 'created_at']

    def get_queryset(self):
        return Rating.objects.all()


class RatingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingDetailSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    lookup_field = 'pk'
