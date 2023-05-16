from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginView.as_view()),
    path('logout/', views.logoutView),
    path('register/', views.RegisterView.as_view()),
]