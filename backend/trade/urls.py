from django.urls import path
from . import views

urlpatterns = [
    path('withdraw/', views.WithdrawView.as_view()),
    path('deposit/', views.DepositView.as_view()),
    path('portfolio/', views.PortfolioView.as_view()),
    path('', views.TradeView.as_view()),
    path('transaction-history/', views.TransactionView.as_view()),
]