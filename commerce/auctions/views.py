from auctions.models import auction, bids, Category, Comments, sold
from auctions.serializer import AuctionListSerializer, AuctionSerializer, soldSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.http import JsonResponse

class HomeView(APIView):
     
   permission_classes = (IsAuthenticated, )
   def get(self, request):
       content = auction.objects.all()
       serializer = AuctionListSerializer(content, many=True)
       return Response(serializer.data)
   

class CreateUserView(APIView):
     def post(self, request):
          try:
               username = request.data["username"]
               password = request.data["password"]
               email = request.data["email"]
               User.objects.create_user(username=username, password=password, email=email)
               return Response(status=status.HTTP_201_CREATED)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
   
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
   

class CategoryView(APIView):
     # Load all categories available
     def get(self, request):
          content = Category
          return JsonResponse(list(content.choices), safe=False)
 
 
class AuctionView(APIView):
     # Load auction details
     permission_classes = (IsAuthenticated, )
     def get(self, request, pk):
          try:
              content = auction.objects.filter(id=pk).first()
              if content:
                  serializer = AuctionSerializer(content, context={'request': request})
                  return Response(serializer.data)
              else:
                  content = sold.objects.get(auction_id=pk)
                  serializer = soldSerializer(content)
                  return Response(serializer.data)
          except Exception as e:
               print(e)
               return Response(status=status.HTTP_400_BAD_REQUEST)
     
class WatchlistView(APIView):
     # Add or remove item from watchlist
     permission_classes = (IsAuthenticated, )
     def post(self, request):
          try:
               auction_id = request.data
               user = request.user
               if user in auction.objects.get(id=auction_id).watchlist.all():
                    auction.objects.get(id=auction_id).watchlist.remove(user)
               else:
                    auction.objects.get(id=auction_id).watchlist.add(user)
               return Response(status=status.HTTP_200_OK)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
          

class BidView(APIView):
     # Add or remove item from watchlist
     permission_classes = (IsAuthenticated, )
     def post(self, request, pk):
          try:
               auction_id = pk
               user = request.user
               price = request.data / 100
               try:
                    bid = bids.objects.get(auction=auction_id, user=user)
                    bid.bid = price
                    bid.save()
               except Exception as e:
                    bids.objects.create(auction=auction.objects.get(id=auction_id), user=user, bid=price)
               return Response(status=status.HTTP_200_OK) 

          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
          
class NewAuctionView(APIView):
     # Create new auction
     permission_classes = (IsAuthenticated, )
     def post(self, request):
          try:
               title = request.data["title"]
               description = request.data["description"]
               price = request.data["price"]
               seller = request.user
               category = request.data["category"]
               image = request.data["image"]
               auction.objects.create(title=title, description=description, price=price, seller=seller, category=category, image=image)
               return Response(status=status.HTTP_201_CREATED)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
          

class DeleteAuctionView(APIView):
     # Create new auction
     permission_classes = (IsAuthenticated, )
     def delete(self, request, pk):
          try:
               seller = request.user
               try:
                    winner = bids.objects.get(auction=auction.objects.get(id=pk), bid=auction.objects.get(id=pk).price).user
                    auction_title = auction.objects.get(id=pk).title
                    value = auction.objects.get(id=pk).price
                    if seller != winner:
                         sold.objects.create(auction_id=pk ,auction_title=auction_title , buyer=winner , seller=seller , value=value) 
               except Exception as e:
                    print(e)
               auction.objects.get(id=pk).delete()
               return Response(status=status.HTTP_204_NO_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)