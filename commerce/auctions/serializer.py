from rest_framework import serializers
from .models import auction, bids, Comments, sold, Category
from django.contrib.auth.models import User

class AuctionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = auction
        fields=('id','title','price','category','image')

class AuctionSerializer(serializers.ModelSerializer):
    comments = serializers.StringRelatedField(many=True)
    bid = serializers.StringRelatedField()
    watchlist = serializers.StringRelatedField(many=True, required=False)
    class Meta:
        model = auction
        fields = ('id', 'title', 'price', 'category', 'image', 'comments', 'bid', 'watchlist')

class AidsSerializer(serializers.ModelSerializer):
    class Meta:
        model = bids
        fields='__all__'

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields='__all__'

class SoldSerializer(serializers.ModelSerializer):
    class Meta:
        model = sold
        fields='__all__'