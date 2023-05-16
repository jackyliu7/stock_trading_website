from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.TickerHistoryView.as_view()),
    path('history/', views.TickerView.as_view()),
]