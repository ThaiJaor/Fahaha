from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from core.permissions import IsAdminOrOwnerOrReadOnly, IsAuthenticatedOrReadOnly
from .serializers import RatingSerializer, RatingDetailSerializer, UserRatingSerializer
from .models import Rating
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class RatingListCreateView(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['user', 'book']
    ordering_fields = ['rating', 'created_at']

    def get_queryset(self):
        return Rating.objects.all()

    def get_serializer_class(self):
        if not self.request.user.is_staff and self.request.method == 'POST':
            return UserRatingSerializer
        return RatingSerializer

    def perform_create(self, serializer):
        if self.request.user.is_staff:
            serializer.save()
        else:
            serializer.save(user=self.request.user)


class RatingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingDetailSerializer
    permission_classes = [IsAdminOrOwnerOrReadOnly]
    lookup_field = 'pk'
