from auctions.models import auction, bids, Category, Comments, sold
from auctions.serializer import AuctionListSerializer, AidsSerializer, CommentsSerializer, SoldSerializer, AuctionSerializer
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
       content = auction.objects.all()
       serializer = AuctionListSerializer(content, many=True)
       return Response(serializer.data)
   
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
   
class AuctionView(APIView):
     # Load auction details
     permission_classes = (IsAuthenticated, )
     def get(self, request, pk):
          content = auction.objects.get(id=pk)
          serializer = AuctionSerializer(content)
          print(serializer.data)
          return Response(serializer.data)

