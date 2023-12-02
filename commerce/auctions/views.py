from auctions.models import auction, bids, Category, Comments, sold
from auctions.serializer import AuctionSerializer, AidsSerializer, CommentsSerializer, SoldSerializer
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

class HomeView(APIView):
     
   permission_classes = (IsAuthenticated, )
   def get(self, request):
       content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}            
       return Response(content)
   
class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
   

@api_view(['GET'])
def auctions(request):
    content = auction.objects.all()
    serializer = AuctionSerializer(content, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUser(request):
    # Check if user is authenticated
    isUserAuth = request.user.username if request.user.is_authenticated  else ''
    return Response({'user': isUserAuth})


def login_view(request):
    return render(request, 'auctions/login.html')