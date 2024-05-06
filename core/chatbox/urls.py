from django.urls import path
from chatbox.views import CodeExplainView

urlpatterns = [
    path('code-explain/', CodeExplainView.as_view(), name='code-explain')
]