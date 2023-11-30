from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from auctions.models import auction, bids, Comments, sold, Category
from auctions.serializer import AuctionSerializer, AidsSerializer, CommentsSerializer, SoldSerializer

@api_view(['GET'])
def hello_world(request):
    content = auction.objects.all()
    serializer = AuctionSerializer(content, many=True)
    return Response(serializer.data)