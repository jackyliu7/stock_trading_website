from django.urls import path
from . import views

urlpatterns = [
    path('history/', views.TickerHistoryView.as_view()),
    path('search/', views.TickerView.as_view()),
]