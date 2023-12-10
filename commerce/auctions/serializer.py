from rest_framework import serializers
from .models import auction, bids, Comments, sold, Category
from django.contrib.auth.models import User

class AuctionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = auction
        fields=('id','title','price','category','image')

class AuctionSerializer(serializers.ModelSerializer):
    comments = serializers.StringRelatedField(many=True)
    watchlist = serializers.SerializerMethodField()
    class Meta:
        model = auction
        fields = ('id', 'title', 'price', 'category', 'image', 'comments', 'watchlist')
    def get_watchlist(self, obj):
        request = self.context.get('request')
        user = request.user
        return user in obj.watchlist.all()

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