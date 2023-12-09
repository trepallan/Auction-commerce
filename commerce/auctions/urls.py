from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('logout/', views.LogoutView.as_view(), name ='logout'),
    path('home/', views.HomeView.as_view(), name ='home'),
    path('auction/<int:pk>/', views.AuctionView.as_view(), name ='auction'),
    path('register/', views.CreateUserView.as_view(), name ='register'),
]